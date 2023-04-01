import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Sell from './pages/Sell';
import Info from './pages/Info';
import useToken from './components1/useToken';
import { useState } from 'react';
import Wishlist from './pages/Wishlist';
import Navbar from './components1/Navbar';
import MyAds from './pages/MyAds';
function getFromLocal(param){
return localStorage.getItem(param);
}
function App() {
  const [pathname,setPathname] = useState(window.location.pathname);
  const [parameter,setParameter] = useState({bookname:"",location:"",load:true});

  const { token, setToken } = useToken();
  const [userCredentials,setUserCredentials] = useState({id:getFromLocal("id"),name:getFromLocal("name"),email:getFromLocal("email"),mobile_no:getFromLocal("mobile_no"),favorite:getFromLocal("favorite"),productId:getFromLocal("productId")});
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar pathname={pathname} setPathname={setPathname} token={token} userCredentials={userCredentials} setUserCredentials={setUserCredentials}/>
      <Routes>
  
        <Route path="/" element={<Home pathname={pathname} setPathname={setPathname} parameter={parameter} setParameter={setParameter} userCredentials={userCredentials} setUserCredentials={setUserCredentials}/>} ></Route>
        <Route path="/login" element={<Login pathname={pathname} setPathname={setPathname} userCredentials={userCredentials} setToken={setToken} setUserCredentials={setUserCredentials} token={token}/>}></Route>
        <Route path="/signup" element={<SignUp pathname={pathname} setPathname={setPathname}/>}/>
        <Route path="/sell" element={<Sell pathname={pathname} setPathname={setPathname} token={token} userCredentials={userCredentials}/>}/>
        <Route path="/:id" element={<Info pathname={pathname} setPathname={setPathname} token={token} userCredentials={userCredentials} setUserCredentials={setUserCredentials}/>}/>
        <Route path="/wishlist" element={<Wishlist pathname={pathname} setPathname={setPathname} userCredentials={userCredentials} setUserCredentials={setUserCredentials}/>} />
        <Route path="/myads" element={<MyAds pathname={pathname} setPathname={setPathname} userCredentials={userCredentials} setUserCredentials={setUserCredentials}/>} />
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
