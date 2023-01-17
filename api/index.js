import express from "express";
import mongoose from "mongoose";
import authrouter from "./routes/auth.js";
import  hotelRouter from './routes/hotels.js'
import userRouter from './routes/users.js';
import roomRouter from './routes/rooms.js';
import cors from 'cors'


const app =express();
const PORT=process.env.PORT||3000
const connect =async ()=>{
    try{
       await  mongoose.connect("mongodb://localhost:27017/booking", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
    catch(e){
       console.log(e)
    }
  
}
mongoose.connection.on("connected",()=>{
    console.log('Connected to mongoose')
})
app.use(cors()) 
app.use(express.json())
app.use('/api/register',authrouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/user',userRouter)
app.use('/api/rooms',roomRouter)
//error handler middlewareFunctions
app.use((err,req,res,next)=>{
   const errStatus=err.status||500
   const errMsg=err.message||'Something went wrong'
   console.log(errStatus)
   return res.status(errStatus).json({
    status: errStatus,
    message: errMsg,
    stack:err.stack
   })
})


app.listen(PORT,()=>{
    connect();
    console.log('Listening on port '+PORT)
})