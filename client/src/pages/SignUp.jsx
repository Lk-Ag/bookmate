import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = ({pathname,setPathname}) => {
  setPathname(window.location.pathname);

  const navigate = useNavigate();

  const [userData,setUserData] = useState({name:"",email:"",password:"",mobile_no:""});

 function handleChange(event){
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
  }));
  }


  function handleSubmit(event){
    
 
    axios.post('http://localhost:8000/signup', {userData})
    .then((response)=> {
        console.log(response.data.message)
        alert(response.data.message);
        if(response.data.message === "user added successfully"){
          navigate("/login");
        }
      });
 
    event.preventDefault();
}

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="bg"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        
        <div className='fixed w-full px-4 py-24 z-50'>
        <div className="p-14  block m-auto bg-black/75 w-[400px] h-[auto]">
          <h1 className="font-bold text-4xl text-white">SignUp</h1>
          <form className="flex flex-col py-4" onSubmit={handleSubmit}>
          <input
              className="p-3 my-2 text-white bg-gray-700 rounded"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              className="p-3 my-2 text-white bg-gray-700 rounded"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              className="p-3 my-2 text-white bg-gray-700 rounded"
              type="tel"
              name="mobile_no"
              value={userData.mobile_no}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <input
              className="p-3 my-2 text-white bg-gray-700 rounded"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button className="p-3 my-2 text-white bg-blue-500 rounded">SignUp</button>

            <div className='flex justify-between items-center text-sm text-gray-600'>
                  <p>
                    <input className='mr-2' type='checkbox' />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
          </form>
          <div className="text-gray-600 flex justify-center align-center">
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
