import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function MainModule({children}){
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);
    return(
        <>
        <div className="main-module">
            <div className="">
                <div>
                    <Header isOpen={isOpen} />
                </div>
                <div>
                    <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                </div>
            </div>
        </div>

        </>
    )
}