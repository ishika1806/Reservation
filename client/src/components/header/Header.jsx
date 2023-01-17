import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faTaxi, faPlane, faCar, faSearch, faPerson, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import './Header.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react'
import { format } from 'date-fns'
import{ useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { searchContext } from '../../context/SearchContext';
const Header = ({ inlist }) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [options, setOptions] = useState({
        adults: 1,
        child: 0,
        rooms: 1
    })
    const handleChange = (name, type) => {

        setOptions((prev) => {
            return {
                ...prev, [name]: (type ==='d') ? options[name] - 1 : options[name] + 1
            }
        })
    }
    const [destination,setDestination] = useState("")
    const [openOptions, setOpenOptions] = useState(false);
    const navigate=useNavigate();
    const {dispatch}=useContext(searchContext);
    const onFinalButtonClick=()=>{
        // console.log('first')
        dispatch({type:'NEW_SEARCH',payload:{destination,date,options}})
        navigate('/hotels',{state:{
            destination,date,options
        }})
    }
    const onChangeDestination=(e)=>{
      setDestination(e.target.value)
    }
   
    
    return (
        <div className="header">
            <div className={(inlist===false)?"header-container":"header-container listMode"}>
                <div className="header-list-items">
                    <div className="header-items active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="header-items active">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="header-items active">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car  Rentals</span>
                    </div>
                    <div className="header-items active">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Taxi</span>
                    </div>
                </div>
                {inlist === false && <>   <h1 className="header-title"> A lifetime of discounts? It's Genius.</h1>
                    <p className="headerDesc">
                        Get rewarded for your travels – unlock instant savings of 10% or
                        more with a free Lamabooking account
                    </p>
                    <button className="headerBtn">Sign in / Register</button>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faSearch} className='headerSearchLogo' />
                            <input className='headerSearchInput' type="text" placeholder="Where are you going?" onChange={onChangeDestination}></input>

                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className='headerSearchLogo' onClick={() => setOpen(!open)} />
                            <span className='headerSearchText'>{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
                            {open && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                className='date'
                            />}
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className='headerSearchLogo' />
                            <span className='headerSearchText' onClick={() => setOpenOptions(!openOptions)}>{`${options.adults} Adults ${options.child} Children ${options.rooms} Room`}</span>
                            {openOptions && <div className="option-container">
                                <div className="option-items">
                                    <span className="option-itemstext">Adults</span>
                                    <button className='optionBtn' onClick={() => handleChange('adults', 'd')} disabled={options.adults <= 1}>-</button>{options.adults}<button className='optionBtn' onClick={() => handleChange('adults', 'i')}>+</button>
                                </div>
                                <div className="option-items">
                                    <span className="option-itemstext">Children</span>
                                    <button className='optionBtn' onClick={() => handleChange('child', 'd')} disabled={options.child <= 0}>-</button>{options.child}<button className='optionBtn' onClick={() => handleChange('child', 'i')}>+</button>
                                </div>
                                <div className="option-items">
                                    <span className="option-itemstext">Room</span>
                                    <button className='optionBtn' onClick={() => handleChange('rooms', 'd')} disabled={options.rooms <= 1}>-</button>{options.rooms}<button className='optionBtn' onClick={() => handleChange('rooms', 'i')}>+</button>
                                </div>
                            </div>}
                        </div>
                        <div className="headerSearchItem">
                            <button className='headerBtn' onClick={onFinalButtonClick}>Search</button>
                        </div>
                    </div></>}
            </div>
        </div>
    )
}

export default Header