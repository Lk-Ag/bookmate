import React from 'react'
import{RxAvatar} from 'react-icons/rx';
import{RiAdvertisementFill} from 'react-icons/ri';
import{BiHelpCircle} from 'react-icons/bi';
import{GoSettings} from 'react-icons/go';
import{RiLogoutBoxLine} from 'react-icons/ri';
import{MdFavoriteBorder} from 'react-icons/md';
import { Link } from 'react-router-dom';
export default function Profile(props) {
  console.log("PROFILE"+ props.userCredentials.email);
  const name = localStorage.getItem("name"); 


  function handleProfile(){
    props.setProfile(!props.profile);
  }
  function handleLogout(){
    console.log("LOGOUT CLICKED");
    localStorage.clear();
    props.setUserCredentials({id:"",name:"",email:"",mobile_no:""});
    alert("User logged out successfull")
  }

  return (
    <div className="absolute z-[150] top-16 right-6 bg-gray-700 p-4 w-[15%] text-gray-300 rounded">
      <div className='flex justify-center align-middle h-[100px] '>
        <div className='h-full w-[30%]'>
        <RxAvatar className="h-full w-full"/>
        </div>
        <div className='w-[70%] h-full p-2'>
            <p className='text-xl'>Hello,</p>
            <h5 className='text-2xl'>{name?name:"User"}</h5>
            <div className='text-gray-500 cursor-pointer'>Edit Profile</div>
        </div>
      </div>

      <div className='p-2'>
        <Link to='/myads' onClick={handleProfile}>
        <div className='w-full p-2 px-0 flex justify-center align-middle cursor-pointer border-y hover:font-bold'>
            <div className='w-[20%]' ><RiAdvertisementFill/></div>
            <p className='w-[80%] text-center'>My Ads</p>
        </div>
        </Link>
        <Link to="/wishlist" onClick={handleProfile}>
        <div className='w-full p-2 px-0 flex justify-center align-middle cursor-pointer border-b hover:font-bold'>
            <div className='w-[20%] '><MdFavoriteBorder/></div>
            <p className='w-[80%] text-center'>Wishlist</p>
        </div>
        </Link>
        <div className='w-full p-2 px-0 flex justify-center align-middle cursor-pointer border-b hover:font-bold'>
            <div className='w-[20%]'><BiHelpCircle/></div>
            <p className='w-[80%] text-center'>Help</p>
        </div>
        <div className='w-full p-2 px-0 flex justify-center align-middle cursor-pointer border-b hover:font-bold'>
            <div className='w-[20%]'><GoSettings/></div>
            <p className='w-[80%] text-center'>Settings</p>
        </div>
        <div className='w-full p-2 px-0 flex justify-center align-middle cursor-pointer border-b hover:font-bold' onClick={handleLogout}>
            <div className='w-[20%]'><RiLogoutBoxLine/></div>
            <p className='w-[80%] text-center'>Logout</p>
        </div>
      </div>
    </div>
  )
}
