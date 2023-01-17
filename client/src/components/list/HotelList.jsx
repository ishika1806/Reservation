import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import './HotelList.css'
import { DateRange } from 'react-date-range'
import SearchItem from '../searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
const HotelList = () => {
  const location = useLocation();
  console.log(location)
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min,setMin]=useState(undefined);
  const [max,setMax]=useState(undefined);
  const { err, loading, data } = useFetch(`http://localhost:3000/api/hotels?city=${destination}&min=${min||1}&max=${max||999}`)
  console.log(data)
  return (
    <div className="hotelList">
      <div className="hotelWrapper">
        <div className="hotelSearch">
          <div className="lsTitle">Search</div>

          <div className="lsItems">
            <label>Destination/property name:</label>
            <input type="text" placeholder={destination} />
          </div>

          <div className="lsItems">
            <label>CheckIn Date</label>
            <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
            {openDate && <DateRange onChange={item => setDate([item.selection])} ranges={date} minDate={new Date()} />}
          </div>

          <div>
            <label>Options</label>
            <div className='lsOptions'>
              <div className="optionItem">
                <span className="optionText">
                  Min price <small>per night</small>
                </span>
                <input type="number" className="lsOptionInput" onChange={e=>setMin(e.target.value)}/>
              </div>

              <div className="optionItem">
                <span className="optionText">
                  Max price <small>per night</small>
                </span>
                <input type="number" className="lsOptionInput" onChange={e=>setMax(e.target.value)}/>
              </div>

              <div className="optionItem">
                <span className="optionText">
                  Adults
                </span>
                <input type="number" className="lsOptionInput" min={1} placeholder={options.adults} />
              </div>

              <div className="optionItem">
                <span className="optionText">
                  Children
                </span>
                <input type="number" className="lsOptionInput" min={0} placeholder={options.child} />
              </div>

              <div className="optionItem">
                <span className="optionText">
                  Rooms
                </span>
                <input type="number" className="lsOptionInput" min={1} placeholder={options.rooms} />
              </div>
            </div>
            <button className='searchBtn'>Search</button>
          </div>
        </div>
        <div className="hotelResult">
          {
            data.map((item) => {
              return <SearchItem item={item} key={item._id}/>
            })
          }

        </div>
      </div>
    </div>
  )
}

export default HotelList