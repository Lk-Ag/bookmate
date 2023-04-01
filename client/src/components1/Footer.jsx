import React from 'react';
import {FaTwitter,FaInstagram,FaFacebookF} from 'react-icons/fa';
export default function Footer(){
    return (
        <div className="p-4 text-white flex flex-col border-t border-gray-700 pt-8 mt-8">
            <div className="row flex justify-around align-middle text-center py-4">
               <div className="column about">
                <h4 className='font-bold text-xl py-2'>About Us</h4>
                <p><a href="/">Aim</a></p>
                <p><a href="/">Vision</a></p>
                <p><a href="/">Testimonials</a></p>
               </div>

               <div className="column contacts">
               <h4 className='font-bold text-xl py-2'>Contacts</h4>
                <p><a href="/">New York, NY 100123,US</a></p>
                <p><a href="/">bookMate@gmail.com</a></p>
                <p><a href="/">+91 988 343 65</a></p>
               </div>

               <div className="column links">
               <h4 className='font-bold text-xl py-2'>Links</h4>
                <p><a href="/">Customer Care</a></p>
                <p><a href="/">Careers</a></p>
                <p><a href="/">Help</a></p>
               </div>
               
            </div>

            <div className="flex flex-col text-center py-10">
                <h3 className='font-bold text-3xl'>Follow us on...</h3>
                <div className="flex justify-between align-middle text-3xl w-[20%] m-auto py-8">
                <p><a href="/"><FaTwitter/></a></p>
                <p><a href="/"><FaInstagram/></a></p>
                <p><a href="/"><FaFacebookF/></a></p>
                </div>
            </div>
        </div>

    );
}