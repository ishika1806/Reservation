import { createError } from "./newError.js"
import jwt from 'jsonwebtoken'

//for verifying if user identity is valid
export const verifyToken=(req,res,next)=>{
     
    const token=req.header('auth-token')

    if(!token){
        return next(createError(400,'User not authenticated'))
    }
    jwt.verify(token,"jwt-secret-key",(err,user)=>{
        if(err){
            return next(createError(400,'Invalid token'))
        }
        else{
            req.user=user  
      
            return next()
        }
    })
}
//for deletion or updation of user
export const verifyUser=(req,res,next)=>{
  
    verifyToken(req,res,()=>{
       console.log('first')
        if(req.user.id===req.params.id||req.user.isAdmin){
            next()
        }
        else{
         
            next(createError(403,'User not authorized'))

        }
    })
}

export const verifyAdmin=(req,res,next)=>{

    verifyToken(req,res,()=>{

        if(req.user.isAdmin){
            next()
        }
        else{
         
            next(createError(403,'User not authorized'))

        }
    })
}
