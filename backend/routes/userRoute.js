import express, { Router } from 'express'
import { registerUser,loginUser, getProfile ,updateProfile, bookAppointment,getAppointments,cancelAppointment,paymentRazorpay,verifyPayment} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = new Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)

// cr
userRouter.post('/update-profile',authUser,upload.single('image'),updateProfile)
// cr

userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/get-appointments',authUser,getAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verify-payment',authUser,verifyPayment)
export default userRouter