import React from 'react'
import Card from './Card';
import { useState,useEffect } from 'react';
import axios from 'axios';

const Main = ({parameter,setParameter,userCredentials,setUserCredentials}) => {

  const [dataSize, setDataSize] = useState(12);
    const [productData,setProductData] = useState([]);
    const [showLimit, setShowLimit] = useState(12);

    function handleShow(){
        setShowLimit(showLimit + 12);
        setDataSize(dataSize+12);  
        setParameter((prevState)=>({...prevState,load:!parameter.load}))
    }

    useEffect(() => {
      axios
        .get("http://localhost:8000/all", {
          params: {
            bookname: parameter.bookname,
            location: parameter.location,
            showLimit: showLimit
          },
        })
        .then((response) => {
          console.log("HELLO DATA");
          console.log(response.data);
          setProductData(response.data);
        }).catch((error)=>{console.log(error)});
    }, [parameter.load]);


    console.log(productData);
 
  return (
    <>
        <div>
          <h1 className='text-white font-bold text-3xl w-full m-6 mb-0 mx-36'>Fresh Recommendations </h1>
          <div className='grid grid-cols-4  m-auto p-10 gap-5 justify-items-center w-[80%]'>
          

          {productData.map((item)=>(<div className='w-full'><Card item={item} userCredentials={userCredentials} setUserCredentials={setUserCredentials}/></div>))}

          
          </div>
          <div className='text-white font-bold w-full flex justify-center p-4'>
            <button className='bg-gray-700 p-4 rounded border-none hover:bg-gray-500' onClick={handleShow}>Show More</button>
          </div>
        </div>
    </>
  )
}

export default Main
