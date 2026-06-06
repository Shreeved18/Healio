import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import userModel from '../models/userModel.js'
import appointmentModel from '../models/appointmentModel.js'
import jwt from 'jsonwebtoken'
//api to add doctors

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file
        // --cr--
        if (!imageFile) {
            return res.json({ success: false, message: "Image file is required" })
        }
        //  --cr--

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({success:false,message:"Missing details"})
        }

        //validating email
         if(!validator.isEmail(email)) return res.status(400).json({success:false,message:"Please enter a valid email"})

        //validating strong password
       if(password.length < 8) return res.status(400).json({success:false,message:"Password length should be greater than 8"})


        //hashing doctor password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save()
        res.json({ success: true, message: "Doctor Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api for admin login

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message || 'Login failed' })
    }
}

//api for retrieving doctors data

const allDoctors = async (req, res) => {

    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message || 'Failed to fetch doctors' })
    }
}

//api to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message || 'Failed to fetch appointments' })
    }
}

//api for appointment cancellation by admin 

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
   
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) return res.json({ success: false, message: 'No Appointment Found' })
      

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
//API TO GET DASHBOARD DATA FOR ADMIN PANEL
const adminDashboard = async (req, res) => {
    try {
        const totalDoctors = await doctorModel.countDocuments();
        const totaluser = await userModel.countDocuments();
        const appointments = await appointmentModel.find({});
       
        const dashData={
            totalDoctors,
            totalappointments:appointments.length,
            patients:totaluser,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({ success: true, dashData});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || 'Failed to fetch dashboard data' });
    }
}
export { addDoctor, loginAdmin, allDoctors,appointmentsAdmin ,appointmentCancel,adminDashboard}