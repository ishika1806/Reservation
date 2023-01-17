import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./Reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { searchContext } from "../../context/SearchContext";



const Reserve = ({ setOpen, hotelId }) => {
    const { data, error, loading } = useFetch(`http://localhost:3000/api/hotels/getRooms/${hotelId}`)

    const [selectedRooms,setSelectedRooms]=useState([])

    const handleClickCheckBox=(e)=>{
        const checked=e.target.checked;
        const val=e.target.value;
        setSelectedRooms(
            (checked)?[...selectedRooms,val]:
            selectedRooms.filter((item)=>item!==val)
        )
    }
    console.log(selectedRooms)

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                {data.map((item) => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.type}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        {item.rooms.map((room) => {

                            return <div className="room">
                                
                                <label>{room.roomNo}</label>
                                <input type="checkbox" value={room._id} onChange={handleClickCheckBox} />
                            </div>
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reserve;