import React from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import HotelList from '../../components/list/HotelList'
const List = () => {
  
  return (
    <div>
        <Navbar/>
        <Header inList={true}/>
        <HotelList/>
        
    </div>
  )
}

export default List