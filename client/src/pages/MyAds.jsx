import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import MyAdsCard from "../components1/MyAdsCard";
export default function MyAds(props) {
  props.setPathname(window.location.pathname);

  const[myProductData,setMyProductData] = useState([]);
  var productArray = JSON.parse(localStorage.getItem('productId'));

  console.log(localStorage.getItem('productId'));
  console.log("Wishlist Fav " + productArray);

  useEffect(() => {
    axios
      .get("https://bookmate-server-3op8.onrender.com/myads", {
        params:{
          productId: productArray
        }
      })
      .then((response) => {
        console.log("PRODUCT ARRAY DATA");
        console.log(response.data);
        setMyProductData(response.data);
        console.log(" DAtA " + myProductData); 
      }).catch((error)=>{console.log(error)});
  }, [props.userCredentials.productId]);

  myProductData.map((item)=>(console.log('DATA FROM WISHLIST ' + item.bookname)));

  console.log('DATA FROM WISHLIST ' + myProductData);

  return (
    <div className="py-[5%] bg-gray-900 min-h-screen">
      <h1 className="text-white font-bold text-3xl w-[70%] m-auto p-4">MY ADS</h1>

      {myProductData.map((item)=>(<MyAdsCard userCredentials={props.userCredentials} setUserCredentials={props.setUserCredentials} item = {item}/>))}

      
    </div>
  );
}
