import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import {FiStar} from 'react-icons/fi';
import {FaStar} from 'react-icons/fa';
import {MdFavorite, MdFavoriteBorder } from 'react-icons/md';


export default function Card({item,userCredentials,setUserCredentials}) {
const condition = item.condition;
var star=[];

var fav = JSON.parse(localStorage.getItem('favorite'));

for(var i=0;i<5;i++){
  if(i<condition)
  star.push(<FaStar key={i}/>);
  else
  star.push(<FiStar key={i}/>);
}

function handleFavorite(){

  const userId = localStorage.getItem('id');

  console.log("HANDLE FAV EXECUTTED");
  console.log(userCredentials)
  axios.post("https://bookmate-server-3op8.onrender.com/fav", {
        productId: item._id,
        userId: userCredentials.id ? userCredentials.id : userId
    }).then((res) => {
      setUserCredentials(prevState=>({...prevState,favorite:res.data.favorite}))
      window.localStorage.removeItem('favorite');
      localStorage.setItem('favorite',JSON.stringify(res.data.favorite));
      console.log("RESPONSE FROM FAVORITE BACKEND" + res.data.favorite);
    }).catch((error)=>{console.log(error)});
}


  return (
    <>
      <div className="w-auto text-white">
        <div className="w-full h-full">
          <div className="group font-bold absolute w-[18%] h-[350px] text-2xl p-2 flex justify-end z-[150] hover:bg-black opacity-80  hover:opacity-90 text-white">
            <div className=" hidden w-full h-full group-hover:flex flex-col">
              <div className='w-full flex justify-end'>
              {fav?
             <div>
             {(fav.indexOf(item._id)!==-1)?<MdFavorite onClick={handleFavorite} className="text-red-500 m-1 text-3xl cursor-pointer" /> : <MdFavoriteBorder onClick={handleFavorite} className="text-red-500 m-1 text-3xl cursor-pointer" />}
           </div>:
           <div><MdFavoriteBorder  className="text-red-500 m-1 text-3xl cursor-pointer" onClick={handleFavorite}/></div>}
              </div>
              <Link className='m-auto' to={"/"+item._id}>
              <p className="m-auto w-fit bg-gray-50 text-black p-2 rounded-md hover:bg-gray-600 hover:text-gray-800 cursor-pointer">More Details</p>
              </Link>
            </div>
          </div>


          <img
            className="bg-white w-full h-[350px] rounded-t"
            src={item.img1}
            alt="book"
          />
        </div>
        <div className="bg-gray-900 p-4 block ">
          <div className="h-20">
            <div className="flex justify-between align-middle">
              <h4 className="text-xl font-bold">&#8377;&nbsp;1000</h4>
              <div className="flex text-yellow-300 text-[70%]">
                {star.map((st) => st)}
              </div>
            </div>
            <p>{item.bookname} </p>
          </div>

          <div className="text-gray-500 flex justify-between align-middle">
            <p className="location">{item.location}</p>
            <p className="time">
              <Moment fromNow>{item.date}</Moment>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}



