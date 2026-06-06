import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import Razorpay from 'razorpay'
// API TO REGISTER USER

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //validating sign up data
        if (!name || !email || !password) return res.json({ success: false, message: 'Missing Details' })

        if (!validator.isEmail(email)) return res.json({ success: false, message: 'Enter Valid Email' })

        if (password.length < 8) return res.json({ success: false, message: 'Enter Strong Password' })

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.json({ success: true, token })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API FOR USER LOGIN

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) return res.json({ success: false, message: 'No user Found' })

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Password does not Match' })
        }


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// API to get User Profile

const getProfile = async (req, res) => {
    try {

        const { userId } = req
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API TO UPDATE USEER PROFILE

const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body
        const userId = req.userId
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }
        // --cr--
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address)
        } catch {
            return res.json({ success: false, message: 'Invalid address format' })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, gender, dob })
        //--cr--

        if (imageFile) {
            //upload img to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, message: 'Profile Updated' })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}


//API TO BOOK APPOINTMENT

const bookAppointment = async (req, res) => {
    try {

        const { docId, slotDate, slotTime } = req.body
        const { userId } = req;
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData) return res.json({ success: false, message: 'Doctor Not Found' })

        //check if doctor available
        if (!docData.available) return res.json({ success: false, message: 'Doctor Unavailable' })

        //check if slot available

        let slots_booked = docData.slots_booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots data in docData

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: 'Appointment Booked' })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API TO GET USER APPOINTMENTS

const getAppointments = async (req, res) => {
    try {
        const { userId } = req
        const appointments = await appointmentModel.find({ userId }).sort({ date: -1 });
        res.json({ success: true, appointments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const { userId } = req;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) return res.json({ success: false, message: 'No Appointment Found' })
        if (appointmentData.userId !== userId) return res.json({ success: false, message: 'Unauthorized' })

        const { docId, slotDate, slotTime } = appointmentData;

        //remove slot from doctor data
        const docData = await doctorModel.findById(docId);
        let slots_booked = docData.slots_booked;
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime)
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        }

        //delete appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        res.json({ success: true, message: 'Appointment Cancelled' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API TO MAKE PAYMENT FOR APPOINTMENT
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData) return res.json({ success: false, message: 'No Appointment Found' })

        const amount = appointmentData.amount * 100

        var options = {
            amount,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        };


        const order = await razorpayInstance.orders.create(options);
        if (!order) return res.json({ success: false, message: 'Error in creating order' })

        res.json({ success: true, order })

    } catch (error) {

        res.json({ success: false, message: error.message })
    }
}

//API TO VERIFY PAYMENT
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (!orderInfo) return res.json({ success: false, message: 'Order not found' })
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            return res.json({ success: true, message: 'Payment Verified' })
        } else {
            return res.json({ success: false, message: 'Payment not successful' })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getAppointments, cancelAppointment, paymentRazorpay, verifyPayment }