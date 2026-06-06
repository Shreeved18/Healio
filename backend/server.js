import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB()
connectCloudinary()

//middlewares
app.use(express.json()); // for parsing application/json
app.use(cors()); // for allowing cross-origin requests b/w frontend and backend

//api endpoint
app.use('/api/admin',adminRouter)  //localhost:3000/api/admin/add-doctor {url to execute addDoctor function in adminContoller.js}
app.use('/api/doctor',doctorRouter) 
app.use('/api/user',userRouter) 

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});