import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import WishCard from "../components1/WishCard";
export default function Wishlist(props) {
  props.setPathname(window.location.pathname);

  const[wishData,setWishData] = useState([]);
  var fav = JSON.parse(localStorage.getItem('favorite'));

  console.log(localStorage.getItem('favorite'));
  console.log("Wishlist Fav " + fav);

  useEffect(() => {
    axios
      .get("https://bookmate-server-3op8.onrender.com/wishlist", {
        params:{
          fav: fav
        }
      })
      .then((response) => {
        console.log("WISHED DATA");
        console.log(response.data);
        setWishData(response.data);
        console.log("WISHEDDD DAtA " + wishData); 
      }).catch((error)=>{console.log(error)});
  }
  // , [props.userCredentials.favorite]
  );

  wishData.map((item)=>(console.log('DATA FROM WISHLIST ' + item.bookname)));

  console.log('DATA FROM WISHLIST ' + wishData);

  return (
    <div className="py-[5%] bg-gray-900 min-h-screen">
      <h1 className="text-white font-bold text-3xl w-[70%] m-auto p-4">WISHLIST</h1>

      {wishData.map((item)=>(<WishCard userCredentials={props.userCredentials} setUserCredentials={props.setUserCredentials} item = {item}/>))}

      
    </div>
  );
}
