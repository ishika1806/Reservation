import express from 'express'
const route=express.Router();
import Hotel from '../models/Hotel.js'
import {createHotel,deleteHotel,getHotel,updateHotel,getHotels, getCountHotels,getCountTypes,getRooms} from '../controllers/hotel.js'
import { verifyAdmin } from '../error/verifyToken.js';
//Create a new instance
route.post('/',verifyAdmin,createHotel)

//Update a new instance
route.put('/:id',verifyAdmin,updateHotel)

//Delete a new instance

route.delete('/:id',verifyAdmin,deleteHotel)

//get a new instance

route.get('/find/:id',getHotel)

//get all properties

route.get('/',getHotels)
route.get('/countCity',getCountHotels);
route.get('/countTypes',getCountTypes);
route.get('/getRooms/:id',getRooms);
export default route