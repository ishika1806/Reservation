import './login.css'
import React, { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import image from './images.jpg'
const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })
    const handleChange = (e) => {
        setCredentials((prev) => {
            return {
                ...prev, [e.target.id]: e.target.value
            }
        })
    }
    const navigate = useNavigate()
    const { dispatch, loading, error } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' })
        try {
            const res = await axios.post('http://localhost:3000/api/register/login', credentials);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.otherdetails })
            navigate('/home')


        }
        catch (e) {
            dispatch({ type: 'LOGIN_FAILED', payload: e.response.data })
        }


    }
    return (
        <div style={{
            backgroundImage: `url(${image})`
        }} className="login" >
            <div className="lContainer">
                <input type='text' id='username' onChange={handleChange} placeholder="Username" className='lInput' />
                <input type='text' id='password' onChange={handleChange} placeholder="Password" className='lInput' />
                <button disabled={loading} className='lButton' onClick={handleSubmit}>
                    Submit
                </button>
                {error && <span style={{color:'red'}}>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login