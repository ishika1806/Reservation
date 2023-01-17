import express from 'express';
import { createUser,loginUser } from '../controllers/auth.js';
const router=express.Router();
//create user
router.post('/',createUser)

//login user
router.post('/login',loginUser)
export default router