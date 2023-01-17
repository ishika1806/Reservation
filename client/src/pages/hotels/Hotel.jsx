import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import './Hotel.css'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/footer/Footer'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { searchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'
const Hotel = () => {
  const location = useLocation();
  const navigate=useNavigate();
  console.log(location)
  const id = location.pathname.split("/")[2];
  const { err, loading, data } = useFetch(`http://localhost:3000/api/hotels/find/${id}`)
  console.log(data)
  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];
  const [open, setOpen] = useState(false);
  const [ind, setIndex] = useState(null);
  const [modal, setOpenModal] = useState(false);
  const handleOpen = (i) => {
    setIndex(i);
    setOpen(true);
  }
  const { user } = useContext(AuthContext)

  const handleSlider = (dir) => {
    let SliderNumber;
    if (dir == 'l') {
      SliderNumber = (ind == 0) ? data.photos.length - 1 : ind - 1;
    }
    else {
      SliderNumber = (ind == data.photos.length - 1) ? 0 : ind + 1;
    }
    setIndex(SliderNumber);
  }
  const { date, options } = useContext(searchContext)

  const TimeDifference = (date2, date1) => {
    const timeDiff = date2.getTime() - date1.getTime();
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24)
    return dayDiff
  }
  const days = TimeDifference(date[0].endDate, date[0].startDate)
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  }
  return (
    <div>
      <Navbar />
      <Header inlist={true} />

      <div className="hotel-container">
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpen(false)} />
          <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleSlider('l')} />


          <div className="sliderWrapper">
            <img src={data.photos[ind]} alt='' className='sliderImg' />
          </div>


          <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleSlider('r')} />
        </div>}

        {loading && <div>Loading...</div>}
        {!loading && <div className="hotelWrapper">

          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address} {data.city}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance} from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>


          <div className="hotelImages">
            {data.photos?.map((photo, index) => {
              return <div className="hotelImgWrapper" key={index}>
                <img
                  src={photo}
                  alt=""
                  className="hotelImg"
                  onClick={() => handleOpen(index)}
                />
              </div>
            })}
          </div>


          <div className="hotelDetails">

            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>


            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data.cheapestPrice * options.rooms}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>

          </div>

        </div>}
        <MailList />
        <Footer />
      </div>
      {modal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel