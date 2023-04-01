import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = ({setUserCredentials,userCredentials,setToken,pathname,setPathname}) => {
  setPathname(window.location.pathname);

  const [userData,setUserData] = useState({email:"",password:""});
  const navigate = useNavigate();
 function handleChange(event){
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
  }));
  }

   
   const handleSubmit = async e => {
    e.preventDefault();

  await  axios.post('http://localhost:8000/login',{userData}).then((res)=>{
      console.log(res.data);

      if(res.data.token){
        localStorage.clear();
        setToken(res.data.token);
        localStorage.setItem('name',res.data.name);
        localStorage.setItem('email',res.data.email);
        localStorage.setItem('mobile_no',res.data.mobile_no);
        localStorage.setItem('id',res.data.id);
        localStorage.setItem('favorite',JSON.stringify(res.data.favorite));
        localStorage.setItem('productId',JSON.stringify(res.data.productId));
        setUserCredentials(res.data);
        console.log(userCredentials);
        // console.log("USer Creds" + userCredentials.email);
        navigate('/'); 
      }else{
        alert(res.data.message);
      }
    })
  }

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-contain"
          src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="bg"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        
        <div className='fixed w-full px-4 py-24 z-50'>
        <div className="p-14  block m-auto bg-black/75 w-[400px] h-[450px]">
          <h1 className="font-bold text-4xl text-white">Login</h1>
          <form className="flex flex-col py-4" onSubmit={handleSubmit}>
            <input
              className="p-3 my-2 text-white bg-gray-700 rounded"
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
            />
            <input
              className="p-3 my-2 text-white bg-gray-700 rounded"
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
            />
            <button className="p-3 my-2 text-white bg-blue-500 rounded" type="submit">Login</button>

            <div className='flex justify-between items-center text-sm text-gray-600'>
                  <p>
                    <input className='mr-2' type='checkbox' />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
          </form>
          <div className="text-gray-600 flex justify-center align-center">
          <p>New to BookMate?</p>
          <Link className='text-white font-bold' to="/signup">SignUp</Link>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;
