import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsChevronUp } from 'react-icons/bs';
import { RxAvatar } from 'react-icons/rx';
import { AiFillWechat } from 'react-icons/ai';
import Profile from './Profile';


const Navbar = ({token,userCredentials,setUserCredentials,pathname,setPathname}) => {
  
  setPathname(window.location.pathname);

  const navigate = useNavigate();
  const [profile, setProfile] = React.useState(false);
  function handleProfile(){
    if(!profile){
      setProfile(!profile);
    }else{
      setProfile(!profile);
    }
    
  }

  useEffect(()=>{setProfile(false)},[pathname])
console.log("TOKEN FROM NAV",token);

function handleSellAlert(){
  alert("Please Login First!!!");
}


function handleBack(){
  navigate(-1);
}
  if(localStorage.getItem('token')){
    return (
      <>
      <div className='w-full absolute flex justify-between align-middle p-4 z-[100] top-0'>
         <Link to="/"> <h1 className='text-blue-500 text-4xl font-bold cursor-pointer '>BOOKMATE</h1></Link>

          {pathname ==="/" ? 
          <div className='min-w-max flex justify-center align-middle'>
          <AiFillWechat className="text-white font-bolder text-4xl h-full mx-2" />
          { profile ? <BsChevronUp className="text-white font-bolder text-4xl h-full mx-2" onClick={handleProfile}/> : <RxAvatar className="text-white font-bolder text-4xl h-full mx-2" onClick={handleProfile}/> }

          <Link to="/sell">
          <button className='text-white bg-blue-500 px-6 py-2 rounded cursor-pointer h-full'>Sell</button>

          </Link>
          </div>:<div className='hidden'></div>}
          {pathname !== "/" ? (
            <button className="text-white bg-blue-500 px-6 py-2 mx-2 rounded cursor-pointer h-full" onClick={handleBack}>
            Back
          </button>
          ) : (
            <div className="hidden"></div>
          )}
      </div>
      {profile? <Profile profile={profile} setProfile={setProfile} userCredentials={userCredentials} setUserCredentials={setUserCredentials}/> : <div className='hidden'></div>}
      </>
    )
  }
  return (
    <>
      <div className="w-full absolute flex justify-between align-middle p-4 z-[100] top-0">
        <Link to="/">
          {" "}
          <h1 className="text-blue-500 text-4xl font-bold cursor-pointer h-full">
            BOOKMATE
          </h1>
        </Link>
        <div className="min-w-max">
          {pathname !== "/login" ? (
            pathname === "/" ? (
              <Link to="/login">
                <button className="text-white pr-4 h-full">Login</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="text-white bg-blue-500 px-6 py-2 rounded cursor-pointer h-full">
                  Login
                </button>
              </Link>
            )
          ) : (
            <div className="hidden"></div>
          )}

          {pathname === "/login" ? (
            <Link to="/signup">
              <button className="text-white bg-blue-500 px-6 py-2 rounded cursor-pointer h-full">
                SignUp
              </button>
            </Link>
          ) : (
            <div className="hidden"></div>
          )}

          {pathname === "/" ? (
            <button
              className="text-white bg-blue-500 px-6 py-2 rounded cursor-pointer h-full"
              onClick={handleSellAlert}
            >
              Sell
            </button>
          ) : (
            <div className="hidden"></div>
          )}

          {pathname !== "/" ? (
            <button className="text-white bg-blue-500 px-6 py-2 mx-2 rounded cursor-pointer h-full" onClick={handleBack}>
            Back
          </button>
          ) : (
            <div className="hidden"></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar
