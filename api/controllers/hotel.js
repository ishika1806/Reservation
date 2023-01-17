import { createError } from "../error/newError.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createHotel = async (req, res, next) => {
    const newHotel = req.body;
    try {
        const savedHotel = new Hotel(newHotel);
        await savedHotel.save();
        res.status(200).json(savedHotel);

    }
    catch (e) {
        next(e)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel);
    }
    catch (e) {
        next(e)
    }
}
export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel deleted successfully');
    }
    catch (e) {
        next(e)
    }

}

export const getHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findById(req.params.id)
        res.status(200).json(updatedHotel);
    }
    catch (e) {
        next(e);
    }

}

export const getHotels = async (req, res, next) => {
    const {min,max,...other}=req.query;
    try {
        const updatedHotel = await Hotel.find({...other,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 }
        }).limit(req.query.limit)
        res.status(200).json(updatedHotel);
    }
    catch (e) {
        next(e)
    }
}
export const getCountHotels = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map((city) => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)

    }
    catch (e) {
        next(e)
    }
}
export const getCountTypes = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ title: "HOTEL" })
        const apartmentCount = await Hotel.countDocuments({ title: "apartment" })
        const resortCount = await Hotel.countDocuments({ title: "resort" })
        const villaCount = await Hotel.countDocuments({ title: "villa" })
        const cabinsCount = await Hotel.countDocuments({ title: "cabins" })
        res.status(200).json([
            { type: 'hotel', count: hotelCount },
            { type: 'apartemnt', count: apartmentCount },
            { type: 'resort', count: resortCount },
            { type: 'villa', count: villaCount },
            { type: 'cabins', count: cabinsCount },
        ])
    }
    catch (e) {
        next(e)
    }
}
export const getRooms=async(req,res,next)=>{
    try{

         const hotel=await Hotel.findById(req.params.id);
         console.log(hotel)
         const list=await Promise.all(hotel.rooms.map((room)=>{
           return  Room.findById(room)
         }))
         res.status(200).json(list)
    }catch(e){
        next(e)
    }
}