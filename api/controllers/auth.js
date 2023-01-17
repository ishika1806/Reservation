import User from "../models/User.js";
import bcrypt from 'bcrypt'
import {createError} from '../error/newError.js'
import jwt from 'jsonwebtoken'

export const createUser=async(req,res,next)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try{
        const newUser=new User({
            username:req.body.username,
            password:hash,
            email:req.body.email,
        });
        await newUser.save();
        res.status(201).json({newUser})
    }
    catch(e){
        next(e)
    }
}
export const loginUser=async(req, res,next) =>{
     try{
          const user=await User.findOne({username:req.body.username})
          if(!user){
            return next(createError(404, "User not found"));
          }
          else{
            const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
            if(!isPasswordCorrect){
                return next(createError(400, "Password incorrect"));
            }
            else{
                
                const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},"jwt-secret-key");
                const {isAdmin, password,...otherdetails} = user._doc

                res.cookie("access_token",token,{
                    httpOnly: true
                }).status(200).json({otherdetails})
            }
          
          }
     }
     catch(e){
        next(e)
     }
}