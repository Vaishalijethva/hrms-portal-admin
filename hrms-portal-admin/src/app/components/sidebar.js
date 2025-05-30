'use client';
import React,{useState} from "react";
import Link from "next/link";
import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGear, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";

// import {Dashborad_img} from "../../.././public/images/Dashboard.svg";


export default function Sidebar({isOpen, toggleSidebar}){
    // const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const [activeIndex, setActiveIndex] = useState(0);

    
// fonticon: faUser,
    const menuItems = [
        { name: 'Home', path: '/', icon: ('/images/sidebar_dashboard.svg') },
        { name: 'Report', path: '/report',  icon: ('/images/sidebar_report.svg') },
        { name: 'Employee', path: '/employeelisting', icon: ('/images/sidebar_employee.svg') },
        { name: 'Leaves and Attendance', path: '/leavesandattendance', icon: ('/images/sidebar_leaves_and_attendance.svg') },
        { name: 'Claim', path: '/claim', icon: ('/images/sidebar_claim.svg') },
        { name: 'New Pension Scheme', path: '/newpensionscheme', icon: ('/images/sidebar_new_pension_scheme.svg')},
        { name: 'GPF', path: '/gpf', icon: ('/images/sidebar_gpf.svg')},
        { name: 'Loan Management', path: '/loanmanagement', icon: ('/images/sidebar_loan_management.svg')},
        { name: 'Trust Management', path: '/trustmanagement', icon: ('/images/sidebar_pension_fixation.svg')}
    ];

    return(
        <>
        <div className={`sidebar  shadow  bg-[#FFF] transform transition-all delay-75 ease-in-out h-[100%]`} >
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
                        {menuItems.map((item) => (
                                            
                            <li key={item.path} className={` py-[10px] px-[5px] transition-all delay-75 ease-in-out  ${isOpen ? 'text-center': 'text-start'}  onClick={() => setActiveIndex(index)`}>
                                <Link href={item.path} className={` hover:text-[#0E99FF] flex items-center  ${pathname === item.path ? 'text-[#0E99FF] font-semibold' : 'text-[#D4D4D4]'}`}>
                                {/* {item.fonticon &&  <FontAwesomeIcon icon={item.fonticon} />} */}
                               <Image src={item.icon} alt={item.name} width={20} height={20} />
                                <span className={`inline transition-all delay-75 ease-in-out  ${isOpen ? 'text-[0px] leading-0 pl-0': 'text-[14px] leading-[20px] pl-[10px]'}`}>{item.name}</span></Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}