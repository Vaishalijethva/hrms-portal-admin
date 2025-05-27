import React, {useState} from "react";
import Link from "next/link";

export default function ScrechCart({activeCard, cardName, onClick, title, imgClass, number }){
    const [isOpen, setIsOpen] = useState(true);
    return(
        <>
        {/* 2xl:mr-[20px] lg:mr-[10px] md:mr-[10px] mr-[10px] ${isOpen ? "w-[231px]" : "w-[231px]" }  */}
            <div className={`module-card group ${activeCard === cardName ? "active" : ""}  2xl:flex lg:flex md:flex flex 2xl:items-center lg:items-center md:items-center items-center 2xl:justify-start lg:justify-start md:justify-start justify-start  2xl:p-[20px] lg:p-[20px] md:p-[20px] sm:p-[10px] bg-white rounded-[10px] border border-[#FFF] cursor-pointer transition-transform duration-75 ease-in-out mt-[20px]` }  onClick={() => onClick(cardName)}>
                <Link href="#" className="link-absolute focus-visible:outline-none" title={title}></Link>
                {/* group-[.active]:bg-[#7081CB] */}
                <div className={`module-up-img-card ${imgClass} 2xl:w-[50px] lg:w-[50px] md:w-[50px] w-[50px] 2xl:h-[50px] lg:h-[50px] md:h-[50px] h-[50px] rounded-[10px] 2xl:p-[20px] lg:p-[10px] flex items-center justify-center text-center mr-[15px] bg-[#E6F4FF] relative before:content[''] before:absolute before:left-0 before:right-0 before:w-[25px] before:h-[25px] before:bg-no-repeat  before:m-auto  before:transition-transform before:duration-75 before:ease-in-out  transition-transform duration-75 ease-in-out ` } ></div>
                {/* group-[.active]:font-medium */}<div>
                <p className="2xl:text-[16px] lg:text-[16px] leading-[20px] font-bold 2xl:text-[#555555] lg:text-[#555555] ">
                    {title.split(" ")[0]}<br />
                    {title.split(" ")[1]}
                </p>
                {/* <span className="block 2xl:text-[22px] lg:text-[22px] leading-[32px] text-[#323232] font-bold">{number.split(" ")[0]}</span> */}
                </div>
            </div>  
        </>
    )
}