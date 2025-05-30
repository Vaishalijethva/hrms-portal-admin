'use client';
import React, {useState} from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

export default function ChildLayout({ children, onLogout}) { 
     const [isOpen, setIsOpen] = useState(true);
     const [isdropdownOpen, setIsdropdownOpen] = useState(null);
     const toggleSidebar = () => setIsOpen(!isOpen);

     
    return (
        <>
            <div className="main-module">
                <div className="flex">
                    <div className={`float-left left-0 ${isOpen ? 'w-[74px]' : 'w-[250px]'}`}>
                        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                    </div>
                    <div className={`float-right right-0 transition-all delay-75 ease-in-out ${isOpen ? 'w-[calc(100%-74px)]': 'w-[calc(100%-250px)]'}`}>
                        <Header isOpen={isOpen}  isdropdownOpen={isdropdownOpen} setIsdropdownOpen={setIsdropdownOpen} onLogout={onLogout}/>

                        <div className=" ">
                            {children}
                        </div>
                       
                    </div>
                </div>
            </div>

        </>
    )
}