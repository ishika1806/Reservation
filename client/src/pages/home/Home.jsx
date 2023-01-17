import React from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import './Home.css'
import PropertyList from '../../components/property/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/footer/Footer'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header inlist={false}/>
        <div className="homeContainer">
            <Featured/>
            <h1 className="homeTitle">Browse By property type</h1>
            <PropertyList/>
  
            <h1 className="homeTitle">Home guests love</h1>
           <FeaturedProperties/>
           <MailList/>
           <Footer/>
        </div>
        
    </div>
  )
}

export default Home