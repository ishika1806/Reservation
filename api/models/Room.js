import mongoose from "mongoose";
const RoomSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    rooms:[{roomNo:Number,unavailableDates:[Date]}],
},{timestamps:true}
)
export default mongoose.model('Room',RoomSchema)