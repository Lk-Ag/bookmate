import React, { useEffect } from 'react'
import camera from '../images/camera.png' ;
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import data from '../Data';


const Sell = ({token,userCredentials,pathname,setPathname}) => {
  setPathname(window.location.pathname);

    const [file1, setFile1] = useState(camera);
    const [file2, setFile2] = useState(camera);

    const [url1,setUrl1] = useState("");
    const [url2,setUrl2] = useState("");
    
    useEffect(()=>{
      setProductData(prevState => ({
        ...prevState,
        frontImage: url1,
        backImage:url2
    }));
    },[url1,url2])

    const uploadImage1 = async(files) => {
      const data = new FormData()
      data.append("file", files)
      data.append("upload_preset", "bookmate")
      data.append("cloud_name","dwe0wcaty")
     await fetch("  https://api.cloudinary.com/v1_1/dwe0wcaty/image/upload",{
      method:"post",
      body: data
      })
      .then(resp => resp.json())
      .then(data => {
      setUrl1(data.secure_url);
      })
      .catch(err => console.log(err))

      }

      const uploadImage2 = async(files) => {
        const data = new FormData()
        data.append("file", files)
        data.append("upload_preset", "bookmate")
        data.append("cloud_name","dwe0wcaty")
       await fetch("  https://api.cloudinary.com/v1_1/dwe0wcaty/image/upload",{
        method:"post",
        body: data
        })
        .then(resp => resp.json())
        .then(data => {
        setUrl2(data.secure_url);
        })
        .catch(err => console.log(err))
  
        }

    const handleChange1 = async(e) => {
        console.log(e.target.files[0]);
        setFile1(URL.createObjectURL(e.target.files[0]));
        uploadImage1(e.target.files[0]);
         setProductData(prevState => ({
          ...prevState,
          frontImage: url1
      }));
    }
    const handleChange2 = async(e) =>{
        console.log(e.target.files[0]);
        setFile2(URL.createObjectURL(e.target.files[0]));
        uploadImage2(e.target.files[0]);
        setProductData(prevState => ({
          ...prevState,
          backImage: url2
      }));
    }

    const [productData,setProductData] = useState({userId:userCredentials.id,category:"",bookname:"",description:"",price:"",condition:"",location:"",mobile_no:"",frontImage:"",backImage:""});
    

 function handleChange(event){
    const { name, value } = event.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
  }));
  }


  const navigate = useNavigate();
 function  handleSubmit(e) {
    if(userCredentials.id){
      e.preventDefault()
    axios.post("http://localhost:8000/sell", productData, {
    }).then(res => {
      console.log("HEOKOPJAJknosijfcso")
        console.log(res.data.message);
        console.log(res.data);
        localStorage.removeItem('productId');
        localStorage.setItem('productId',JSON.stringify(res.data.productId));
        alert(res.data.message);
    })
    }else{
      alert("Please Login First");
      navigate('/login');
    }

    
}
  return (
    <>
    <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-fit object-cover"
          src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="bg"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        
        <div className='relative w-full px-4 py-2 z-50'>
        <div className=" text-white p-14 pt-10 block m-auto bg-black/75 w-[600px] h-[990px]">
        <h1 className='font-bold text-4xl mb-4'>Post your Ad</h1>
         <form  onSubmit={handleSubmit}>
           <div className='flex flex-col w-full '>
             <label>Category</label>
             <select className="p-3 my-2 text-white bg-gray-700 rounded" name="category" value={productData.category} onChange={handleChange} id="category">
              {data.category.map((data)=>(<option value={data}>{data}</option>))}
             </select>

             <label>Book Name</label>
             <input className="p-3 my-2 text-white bg-gray-700 rounded" type="text" name="bookname" value={productData.bookname} onChange={handleChange} required />

             <label>Description</label>
             <textarea className="p-3 my-2 text-white bg-gray-700 rounded" type="text" name="description" value={productData.description} onChange={handleChange} required />

             <label>Set Price</label>
             <input className="p-3 my-2 text-white bg-gray-700 rounded" type="text" name="price" value={productData.price} onChange={handleChange} required />

             <label>Condition in 1-5</label>
             <input className="p-3 my-2 text-white bg-gray-700 rounded" type="number" name='condition' value={productData.condition} onChange={handleChange} max="5" min="1" />
           </div>

           <div>
             <h2>Add Image:</h2>
             <div className="flex justify-between align-middle h-full">
               <div className='block m-auto w-[50%]'>
                 <p>Front Side</p>
                 <div className="">
                   <input className='hidden' id="front-img" type="file" name="front-img"  onChange={handleChange1} />
                   <label htmlFor='front-img'><img className="w-[35%]" src={file1} alt="front side" /></label>
                 </div>
               </div>

               <div className='block m-auto w-[50%]'>
                 <p>Back Side</p>
                 <div className="">
                   <input className='hidden' id="back-img" type="file" name="back-img"  onChange={handleChange2} />
                   <label htmlFor='back-img'><img className="w-[35%]" src={file2} alt="back side" /></label>
                 </div>
               </div>
             </div>
           </div>

           <div className='flex flex-col'>
             <label>Location</label>
             <select className="p-3 my-2 text-white bg-gray-700 rounded" name="location" id="location" value={productData.location} onChange={handleChange} required>
             {data.locations.map((data)=>(<option value={data}>{data}</option>))}
             </select>
                                                      
             <label>Phone Number</label>
             <input className="p-3 my-2 text-white bg-gray-700 rounded" type="tel" name="mobile_no" value={productData.mobile_no} onChange={handleChange} required />
           </div>

           <button className="w-full p-3 my-2 text-white bg-blue-500 rounded" type='submit'>POST</button>
         </form>
        </div>
        </div>
      </div>
    </>
  )
}

export default Sell
