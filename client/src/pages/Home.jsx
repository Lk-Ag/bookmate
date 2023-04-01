import React from 'react'
import Banner from '../components1/Banner'
import Footer from '../components1/Footer'
import Main from '../components1/Main'
import Search from '../components1/Search'

const Home = ({parameter,setParameter,userCredentials,setUserCredentials,pathname,setPathname}) => {
  setPathname(window.location.pathname);

  return (
    <div className='block'>
    <div className='absolute w-[70%]  p-4 z-[200] mr-[20%] ml-[20%]'>
    <Search parameter={parameter} setParameter={setParameter}/>
    </div>
    <Banner/>
    <Main parameter={parameter} setParameter={setParameter} userCredentials={userCredentials} setUserCredentials={setUserCredentials}/>
    <Footer/>

    </div>
  )
}

export default Home
