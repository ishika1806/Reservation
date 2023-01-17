import express from 'express';
import { updateUser,deleteUser,getUser, getUsers } from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../error/verifyToken.js';
const router=express.Router();

// router.get('/checktoken',verifyToken,(req,res,next)=>{
//     res.json({success:'you are authenticated'});
// })

// router.get('/verifyuser/:id',verifyUser,(req,res,next)=>{
//     res.json({success:'you van update or delete user'});
// })

// router.get('/isadmin/:id',verifyAdmin,(req,res,next)=>{
//     res.json({success:'you are admin'});
// })

router.put('/:id',verifyUser,updateUser)
router.delete('/:id',verifyUser,deleteUser);
router.get('/:id',verifyUser,getUser);
router.get('/',verifyAdmin,getUsers)
export default router