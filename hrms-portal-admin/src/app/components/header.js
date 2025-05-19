import React,{useEffect, useState, useRef}from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "../../../public/images/Logo.svg";
import Link from "next/link";
import Search from '../../../public/images/Search.png';
import ProfileImage from '../../../public/images/profile-img.png';
import Notification from '../../../public/images/notification.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser, faArrowRightFromBracket, faMoon } from "@fortawesome/free-solid-svg-icons";
// import {items} from '@/data/items';

export default function Header({isOpen, onLogout, setIsdropdownOpen,isdropdownOpen}){
    const [searchTerm, setSearchTerm] = useState('');
    const [showResult, setShowResults] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const wrapperRef = useRef(null);
    

    const toggleDropdown = (dropdownId) => {
        // setIsdropdownOpen(isOpen === dropdownId ? null : dropdownId);
        setIsdropdownOpen((prev) => (prev === dropdownId ? null : dropdownId));
    };
    const items =[
        { id: 1, name: 'Dashboard' },
        { id: 2, name: 'Settings' },
        { id: 3, name: 'Users' },
        { id: 4, name: 'Reports' },
        { id: 5, name: 'Analytics' },
    ]

    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(wrapperRef.current && !wrapperRef.current.contains(event.target)){
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, []);

    // useEffect(() => {
    //     //dark mode 
    //     const body = document.body;
    //     const root = document.documentElement;
    //     if(darkMode) {
    //         root.classList.add('dark');
    //     } else {
    //         root.classList.remove('dark');
    //     }

        

    // }, [darkMode])
    
    // useEffect(() => {
    //     const savedTheme = localStorage.getItem("theme");
    //     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    //     if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    //       document.documentElement.classList.add("dark");
    //       setDarkMode(true);
    //     } else {
    //       document.documentElement.classList.remove("dark");
    //       setDarkMode(false);
    //     }
    //   }, []);
    
    //   const toggleDarkMode = () => {
    //     const isDark = !darkMode;
    //     setDarkMode(isDark);
    //     localStorage.setItem("theme", isDark ? "dark" : "light");
    
    //     document.documentElement.classList.toggle("dark", isDark);
    //   };

    useEffect(() => {
        // Read user's preference from localStorage
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
          document.documentElement.classList.add("dark");
          setDarkMode(true);
        } else {
          document.documentElement.classList.remove("dark");
          setDarkMode(false);
        }
      }, []);
    
      const toggleDarkMode = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    
        document.documentElement.classList.toggle("dark", isDark);
      };
    
    return(
        <>
    
        <div className={`header py-[20px] pb-[15px] px-[20px] bg-white dark:bg-black `} >
            <div className="flex items-center justify-between">
                <div className=" flex items-center ">
                    <div className="logo pr-[20px] border border-t-0 border-l-0 border-b-0 border-r-[#D4D4D4]">
                        <Link href="\">
                        <Image src={Logo} alt={Logo} className="max-w-full "/></Link>
                    </div>
                    <div className="userdetails pl-[20px]">
                        <h2>Pratap Sahu</h2>
                        <span className="small-text block">Welcome back</span>
                    </div>
                </div>
                <div className="search_sec relative max-w-[482px] w-full" ref={wrapperRef}>
                    <input type="text" placeholder="Search... " value={searchTerm} onFocus={() => setShowResults(true)} onChange={(e) => setSearchTerm(e.target.value)} className="header_search w-full bg-[#E6F4FF] "/>
                    <div className="absolute right-[10px] top-[50%] transform translate-y-[-50%]"><Image src={Search} alt="search"/></div>
                    {showResult && searchTerm.length > 0 && (
                    <ul className="absolute w-full p-[10px] bg-FFFFFF">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <li key={item.id} className="py-[5px] px-[5px] text-[#323232]"> {item.name}</li>
                            ))
                        ) : (
                            <li className="">No items found</li>
                        )}
                    </ul>
                    )}
                </div>

                <div className="header-right-sec flex items-center justify-end">
                    <div className="mode">
                        <button onClick={toggleDarkMode} className="dark:bg-[#000] dark:text-[#FFF]"><FontAwesomeIcon icon={faMoon} />
                        {/* {darkMode ? 'Light Mode' : 'Dark Mode'} */}
                        </button>
                    </div>

                    <div className="dropdown ml-[24px] relative">
                                {/* <div onClick={() => setIsOpen(!isOpen)} className="transition-transform cursor-pointer duration-300 ease-in-out"> */}
                                <div onClick={() => toggleDropdown(1)} className="transition-transform cursor-pointer duration-300 ease-in-out">
                                    <Image src={Notification} alt="notification" />
                                </div>

                                {/* Dropdown Menu */}
                                {isdropdownOpen === 1 && (
                                    // <div className={`absolute right-0 mt-3 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-[1] before:content[''] before:absolute before:w-[15px] before:h-[15px] before:bg-white before:top-[-8px]  before:right-[10px]  before:rotate-[50deg] before:border-l before:border-t before:border-gray-300 before:z-[-1] transform ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2" } transition-all duration-[0.5] ease-out`}>
                                    <motion.div initial={{ top:[10], opacity: 0 }} animate={{  top:0, opacity: 1 }} exit={{ top:[10], opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className={`absolute right-0 mt-11 w-70 bg-white border border-[#C4CAEB] rounded-lg shadow-lg z-[1] before:content[''] before:absolute before:w-[15px] before:h-[15px] before:bg-white before:top-[-9px]  before:right-[10px]  before:rotate-[45deg] before:border-l before:border-t before:border-[#C4CAEB] before:z-[-1] transform ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2" } transition-all duration-[0.5] ease-out`}>
                                        <ul className="py-2 px-2">
                                            <li>
                                            <Link href="#" className="block px-4 py-2 hover:bg-[#e6f4ff] text-[16px] leading-[20px] font-normal text-[#323232] rounded-8">
                                                {/* <FontAwesomeIcon icon={faUser} className="pr-2"/> */}
                                                New application submitted.
                                            </Link>
                                            </li>
                                            <li>
                                            <Link href="#" className="block px-4 py-2  hover:bg-[#e6f4ff] text-[16px] leading-[20px] font-normal text-[#323232] rounded-8">
                                                {/* <FontAwesomeIcon icon={faGear} className="pr-1"/>
                                                Settings */}
                                                Your leave request was approved.
                                            </Link>
                                            </li>
                                            <li>
                                            <Link href="#" className="block px-4 py-2 hover:bg-[#e6f4ff] text-[16px] leading-[20px] font-normal text-[#323232] rounded-8">
                                                New company policy update available.
                                            </Link>
                                            </li>
                                            <li>
                                            <Link href="#" className="block px-4 py-2 hover:bg-[#e6f4ff] text-[16px] leading-[20px] font-normal text-[#323232] rounded-8">
                                                {/* <FontAwesomeIcon icon={faArrowRightFromBracket} className="pr-1"/>
                                                Logout */}
                                                Attendance report ready for download.
                                            </Link>
                                            </li>
                                            
                                        </ul>
                                    </motion.div>
                                    /* </div> */
                                )}
                            </div>

                    <div className="profile ml-[20px] relative">
                               
                        <div onClick={() => toggleDropdown(3)} className="transition-transform cursor-pointer duration-300 ease-in-out">
                            <Image src={ProfileImage} alt="profile Image" width={48} height={48}/>
                        </div>
                        {/* {isprofileshow && ( */}
                        {isdropdownOpen === 3 && (
                            
                            <motion.div initial={{ top:[10], opacity: 0 }} animate={{  top:0, opacity: 1 }} exit={{ top:[10], opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className={`absolute right-0 mt-16 w-40 bg-white border border-[#C4CAEB] rounded-lg shadow-lg z-[1] before:content[''] before:absolute before:w-[15px] before:h-[15px] before:bg-white before:top-[-8px]  before:right-[10px]  before:rotate-[45deg] before:border-l before:border-t before:border-[#C4CAEB] before:z-[-1] transform ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"} transition-all duration-[0.5] ease-out`}
                            >
                                <ul className="py-2 px-2">
                                    <li><Link href="\" className="block px-2 py-2 text-[16px] leading-[20px] font-normal text-[#323232] hover:bg-[#e6f4ff] rounded-8 transition-transform duration-75 ease-in-out"><FontAwesomeIcon icon={faUser} className="pr-3"/>Profile</Link></li>
                                    <li><Link href="\" className="block px-2 py-2 text-[16px] leading-[20px] font-normal text-[#323232] hover:bg-[#e6f4ff] rounded-8"><FontAwesomeIcon icon={faGear} className="pr-2"/>Setting</Link></li>
                                    <li className="block px-2 py-2 text-[16px] leading-[20px] font-normal text-[#323232] hover:bg-[#e6f4ff] rounded-8  cursor-pointer" onClick={onLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} className="pr-2"/>Logout</li>
                                </ul>
                            </motion.div>
                            
                         )}
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}