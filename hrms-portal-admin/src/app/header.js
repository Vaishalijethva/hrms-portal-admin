import React from "react";
import Image from "next/image";
import Logo from "../../public/images/Logo.svg";
import Link from "next/link";

export default function Header({isOpen}){
    // const [isOpen, setIsOpen] = useState(true);

    return(
        <>
    
        <div className={`header  float-right transition-all delay-75 ease-in-out py-[25px] px-[20px] bg-FFFFFF ${isOpen ? 'w-[calc(100%-74px)]': 'w-[calc(100%-250px)]'}`} >
            <div className="flex items-center justify-between">
                <div className=" flex items-center ">
                    <div className="logo pr-[20px] border border-t-0 border-l-0 border-b-0 border-r-[#D4D4D4]">
                        <Link href="\">
                        <Image src={Logo} alt={Logo} className="max-w-full"/></Link>
                    </div>
                    <div className="userdetails pl-[20px]">
                        <h2>Pratap Sahu</h2>
                        <span className="small-text block">Welcome back</span>
                    </div>
                </div>
                <div className="search_sec">
                    
                </div>
            </div>
        </div>

        </>
    )
}