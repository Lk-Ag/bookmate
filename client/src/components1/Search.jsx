import React, { useEffect } from "react";
import data from "../Data";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";


const locations = data.locations;
const Search = ({setParameter,parameter}) => {
  
  const [location, setLocation] = useState("");
  const [inputText, setInputText] = React.useState("");
  const [searchData, setSearchData] = useState("");
  
  useEffect(()=>{
    axios.get('https://bookmate-server-3op8.onrender.com/search').then((response) => {
      console.log("SEARCH DATA FROM BACKEND");
      console.log(response.data);
      setSearchData(response.data);
    }).catch((error)=>{console.log(error)});

  },[])
  const getFilteredItems = (inputText) => {
    if (!inputText) {
      return [""];
    }
    let text = inputText.toLowerCase();
    console.log("FROM FILTER " + searchData.filter((event) => event.toLowerCase().includes(text)));
    return searchData.filter((event) => event.toLowerCase().includes(text));
  };
  const filteredItems = getFilteredItems(inputText);
  
  function handleChange(event) {
    setLocation(event.target.value);
    setParameter((prevState)=>({...prevState,location:event.target.value,load:false}))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setParameter((prevState)=>({...prevState,bookname:inputText,load:!prevState.load}))
  }

  
  return (
    
    <>
      <div className="flex justify-center align-middle w-[80%] m-auto h-10">
        <form className="flex justify-center align-middle w-full" onSubmit={handleSubmit}>
          <div className="mr-4 ml-4 w-2/6">
            <select
              className="h-full w-full rounded bg-gray-700 text-white"
              name="location"
              value={location}
              onChange={handleChange}
              
            >
              <option className="select-location" value="" selected>
                {" "}
                &nbsp;&nbsp;&nbsp;Location
              </option>
              {locations.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className=" mr-4 w-4/6">
            <div className="flex justify-center align-middle w-full h-full">
              <input
                className="h-full w-full rounded-l bg-gray-700 text-white pl-2"
                type="text"
                onChange={(e) => setInputText(e.target.value)}
                value={inputText}
                placeholder=" Enter something"
              />
              <button className="" type="submit">
                <BsSearch className="text-white bg-blue-500 h-full w-full p-1 rounded-r" />
              </button>
            </div>
            <ul className={inputText?"absolute text-white w-[28%] bg-gray-700 ":"hidden"}>
              {filteredItems.map((value) => (
                <p className="p-2 border-b"
                  onClick={(e) => {
                    setInputText(value);
                  }}
                  key={value}
                >
                  {value}
                </p>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
