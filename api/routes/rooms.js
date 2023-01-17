import express from 'express'
import { createRoom ,getRoom,getRooms,deleteRoom,updateRoom} from '../controllers/room.js';
import { verifyAdmin } from '../error/verifyToken.js';
const router=express.Router();
//createRoom
router.post('/:hotelId',verifyAdmin,createRoom)

//update the room
router.put('/:id',verifyAdmin,updateRoom)

//Delete a new instance

router.delete('/:id/:hotelId',verifyAdmin,deleteRoom)

//get a new instance

router.get('/:id',getRoom)

//get all properties

router.get('/',getRooms)
export default router