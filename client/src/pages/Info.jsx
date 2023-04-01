import React from 'react'
import { useState,useEffect } from 'react';
import {BsShareFill } from 'react-icons/bs';
import {FiStar} from 'react-icons/fi';
import {FaStar} from 'react-icons/fa';
import {MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from 'react-moment';

const Info = ({userCredentials,setUserCredentials,pathname,setPathname}) => {
  setPathname(window.location.pathname);

    const [data, setData] = useState([]);
  const [image,setImage] = useState('');
  const {id} = useParams();
  console.log("ID ID " + id);
  var fav = JSON.parse(localStorage.getItem('favorite'));
  console.log("FAV " + fav)

 
  useEffect(() => {
    axios
      .get("http://localhost:8000/info", {
        params: {
          _id: id
        },
      })
      .then((response) => {
        console.log("INFO DATA");
        console.log(response.data);
        setData(response.data);
        setImage(response.data.img1);
      }).catch((error)=>{console.log(error.response.data)});
  });

  const condition = data.condition;
var star=[];

for(var i=0;i<5;i++){
  if(i<condition)
  star.push(<FaStar key={i}/>);
  else
  star.push(<FiStar key={i}/>);
}

  function handleImage(){
    if(image === data.img1)
      setImage(data.img2)
    else
      setImage(data.img1);
  }


   function handleFavorite(){
    const userId = localStorage.getItem('id');
    console.log("HANDLE FAV EXECUTTED");
    console.log(userCredentials)
    axios.post("http://localhost:8000/fav", {
          productId: data._id,
          userId: userCredentials.id ? userCredentials.id : userId
      }).then((res) => {
        setUserCredentials(prevState=>({...prevState,favorite:res.data.favorite}))
        window.localStorage.removeItem('favorite');
        localStorage.setItem('favorite',JSON.stringify(res.data.favorite));
        console.log("RESPONSE FROM FAVORITE BACKEND" + res.data.favorite);
      }).catch((error)=>{console.log(error)});
  }


  return (
    <div className="w-[100%] p-auto mt-[5%] py-8 bg-gray-700">
    <div className="flex justify-center align-middle w-[80%] m-auto">
      <div className="w-[60%]">
        <div className="flex justify-center align-top">
          <button className='font-bold text-6xl bg-gray-900 text-white w-[15%] hover:text-gray-500' onClick={handleImage}>&lt;</button>
          <div className="w-[70%] h-[450px]">
            <img src={image} alt="book" className='w-full h-full'></img>
          </div>

          <button className='font-bold text-6xl bg-gray-900 text-white w-[15%] hover:text-gray-500' onClick={handleImage}>&gt;</button>
        </div>
        <div className="bg-gray-400">
            {image === data.img1?
            <div className='flex  justify-center align-middle h-[150px] py-4'>
            <img src={data.img1} alt="front" className="m-1 hover:m-1" onClick={()=>setImage(data.img1)}></img>
            <img src={data.img2} alt="back" className="m-2 hover:m-1" onClick={()=>setImage(data.img2)}></img>
          </div>:
          <div className='flex  justify-center align-middle h-[150px] py-4'>
          <img src={data.img1} alt="front" className="m-2 hover:m-1" onClick={()=>setImage(data.img1)}></img>
          <img src={data.img2} alt="back" className="m-1 hover:m-1" onClick={()=>setImage(data.img2)}></img>
        </div>}
          
        </div>
        <div className="bg-gray-900 text-white p-4">
          <h3 className='font-bold text-2xl'>Description</h3>
          <p>{data.description}</p>
        </div>
      </div>

      <div className="w-40%  flex flex-col justify-center align-middle p-6 text-white bg-gray-900 border-l">
        <div className="block h-[250px]">
          <div className=" flex justify-between align-middle font-bold text-3xl p-2">
            <h2 className='w-[60%]'>&#8377; {data.price}</h2>
            <div>
              <BsShareFill className="" />
            </div>

            {fav?
             <div>
             {(fav.indexOf(data._id)!==-1)?<MdFavorite onClick={handleFavorite} className="text-red-600 cursor-pointer" /> : <MdFavoriteBorder onClick={handleFavorite} className="text-red-600 cursor-pointer" />}
           </div>:
           <div><MdFavoriteBorder  className="text-red-600 cursor-pointer" onClick={handleFavorite}/></div>} 
           
          </div>

          <div className="">
            <h4 className='text-2xl w-[20rem] p-2'>{data.bookname}</h4>
            <div className="flex justify-start align-middle text-yellow-400 text-xl p-2">{star.map((st) => st)}</div>
          </div>

          <div className="flex justify-between align-middle p-2 text-xl text-gray-500">
            <p>{data.location}</p>
            <p>
              <Moment fromNow>{data.date}</Moment>
            </p>
          </div>
        </div>

        <div className="h-[120px] bg-gray-800 rounded p-2">
          <h3 className='font-bold text-2xl p-2'>Connect with Seller</h3>

          <button className='bg-blue-500 px-6 py-2 m-2 font-bold text-xl rounded-md'>Chat</button>
        </div>

        <div className="block p-4">
          <h4 className='p-2 font-bold text-xl'>Find on Map!!</h4>
          <img
            alt="maps"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ25K7sVKkDwHK9Cs-4UbhFhoaWZOBKzlLML4R6aoRFAGjV4cnT-9xN1Cc2k6sC_KcDO0&usqp=CAU"
            className="cursor-pointer"
          ></img>
        </div>
      </div>
    </div>

  </div>
  )
}

export default Info
