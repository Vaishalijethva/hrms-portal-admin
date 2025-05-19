'use client';
import React,{useState} from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar({isOpen, toggleSidebar}){
    // const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();
    const [activeIndex, setActiveIndex] = useState(0);

    

    const menuItems = [
        { name: 'Home', path: '/', fonticon: faHouse},
        { name: 'Profile', path: '/profile', fonticon: faUser},
        { name: 'Setting', path: '/settings', fonticon: faGear},
    ];

    return(
        <>
        <div className={`sidebar  shadow  bg-[#FFF] h-auto transform transition-all delay-75 ease-in-out `} >
            <div className="h-[100vh]">
                <div className="togglebar  pb-[22px] border-b-[1px] border-[#D4D4D4] py-[25px] px-[20px]">
                    <button onClick={toggleSidebar} className=" bg-[#E6F4FF] h-[34px] w-[34px] border border-[#E6F4FF] p-[10px] rounded-[5px]" >
                        <span className="w-[14px] h-[2px] bg-[#0E99FF] mb-[2px] block"></span>
                        <span className="w-[10px] h-[2px] bg-[#0E99FF]  mb-[2px] block"></span>
                        <span className="w-[14px] h-[2px] bg-[#0E99FF] block"></span>
                    </button>
                </div>
                <div className="pt-[20px] py-[25px] px-[20px]">
                    <ul>
                        {/* <li className={` transition-all delay-75 ease-in-out p-2 ${isOpen ? 'flex items-center justify-center' : 'flex items-center justify-start'}`}><FontAwesomeIcon icon={faHouse}/> <span className={`inline transition-all delay-75 ease-in-out pl-[10px] ${isOpen ? 'text-[0px] leading-0': 'text-[14px] leading-[20px]'}`}>Home</span></li> */}
                        {menuItems.map((item, index) => (
                            <li key={item.path} className={` py-[5px] transition-all delay-75 ease-in-out  ${isOpen ? 'text-center': 'text-start'} `} onClick={() => setActiveIndex(index)}>
                                <Link href={item.path} className={` hover:text-[#0E99FF] text-[#D4D4D4] ${pathname === item.path ? 'text-0E99FF': 'text-D4D4D4'}`}>{item.fonticon &&  <FontAwesomeIcon icon={item.fonticon} />}<span className={`inline transition-all delay-75 ease-in-out  ${isOpen ? 'text-[0px] leading-0 pl-0': 'text-[14px] leading-[20px] pl-[10px]'}`}>{item.name}</span></Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}