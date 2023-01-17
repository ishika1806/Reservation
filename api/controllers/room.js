import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
export const createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelId;
    const room=req.body
    try{
       const RoomNew=new Room(room);
       const savedRoom= await RoomNew.save();
       try{
          await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
       }
       catch(e){
        next(e);
       }
       res.status(200).json({savedRoom})
    }
    catch(err){
        next(err)
    }
}

export const updateRoom=async(req,res,next)=>{
    try{
        const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedRoom);
    }
    catch(e){
        next(e)
    }
}
export const deleteRoom=async(req,res,next)=>{
   
        try{
            await Room.findByIdAndDelete(req.params.id)
            try{
                await Hotel.findByIdAndUpdate(req.params.hotelId,{
                    $pull:{rooms:req.params.id}
                })
            }
            catch(e){
                next(e);
            }
            res.status(200).json('Room deleted successfully');
        }
        catch(e){
           next(e)
        }
   
}

export const getRoom=async(req,res,next)=>{
    try{
        const updatedRoom=await Room.findById(req.params.id)
        res.status(200).json(updatedRoom);
    }
    catch(e){
        next(e);
    }

}

export const getRooms=async(req,res,next)=>{
    try{
        const updatedRoom=await Room.find()
        res.status(200).json(updatedRoom);
    }
    catch(e){
        next(e)
    }
}