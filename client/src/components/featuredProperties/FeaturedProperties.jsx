import React from 'react'
import useFetch from '../../hooks/useFetch'
import './FeaturedProperties.css'
const FeaturedProperties = () => {
    const { err, loading, data } = useFetch('http://localhost:3000/api/hotels?featured=true&limit=4')
    console.log(data)
    return (
        <div className="fpContainer">
            {
                loading ? <div>Loading...</div> :
                    <>
                        {data.map((item) => {  
                            // {console.log(1)}
                          return  <div className="fpItems" key={item._id}>
                                <img
                                    src={item.photos[0]}
                                    alt=""
                                    className="fpImg"
                                />
                                <span className="fpName">{item.name}</span>
                                <span className="fpCity">{item.city}</span>
                                <span className="fpPrice">Starting from {item.cheapestPrice}</span>
                                <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>
                            </div>
                        })}
                        {/* <div>HELLO</div> */}
                    </>
            }
          
        </div>
    )
}

export default FeaturedProperties