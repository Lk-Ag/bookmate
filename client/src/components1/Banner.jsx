import React from 'react'




    const url1= "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
    const url2= "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    const url3= "https://images.unsplash.com/photo-1588287028941-99e3c7601d0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"

const Banner = () => {
  return (
    <div className='w-full '>
      <div className='absolute w-full h-[400px] bg-gradient-to-br from-black z-[90]'></div>
      <img src={url1} alt="first" className='w-full h-[400px] object-cover'/>
    </div>
  )
}

export default Banner
