import { useEffect } from "react";
import { useState } from "react"
import axios from 'axios'
const useFetch=(url)=>{
   const [data,setData]=useState([]);
   const [err,setErr]=useState(false);
   const [loading,setLoading]=useState(false);
  useEffect(()=>{
    
     const fetchData=async()=>{
        setLoading(true);
        try{
            const res=await axios.get(url)
            setData(res.data);
            console.log(1)
        }
        catch(e){
            setErr(e);
        }
        setLoading(false)
          
     }
     fetchData();
  },[url])

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setErr(err);
    }
    setLoading(false);
  };
  return {data,err,loading,reFetch};
}

export default useFetch