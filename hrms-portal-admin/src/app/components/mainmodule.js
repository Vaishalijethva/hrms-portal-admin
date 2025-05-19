import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import EmployeeTotal from "./modulecards/employeetotal";
import ModuleCards from "./modulecards/modulecards";

export default function MainModule({ onLogout}){
    const [isOpen, setIsOpen] = useState(true);
     const [isdropdownOpen, setIsdropdownOpen] = useState(null);
     const [activeCard, setActiveCard] = useState("employeetotal");

     const handleCardClick = (cardName) => {
        setActiveCard(cardName);
     }
     
     const modulecomponents = {
        employeetotal : <EmployeeTotal />
     }

    const toggleSidebar = () => setIsOpen(!isOpen);
    return(
        <>
        <div className="main-module">
            <div className="flex">
                <div className={`${isOpen ? 'w-[74px]' : 'w-[250px]'}`}>
                    <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                </div>
                <div className={`float-right right-0 transition-all delay-75 ease-in-out ${isOpen ? 'w-[calc(100%-74px)]': 'w-[calc(100%-250px)]'}`}>
                    <Header isOpen={isOpen}  isdropdownOpen={isdropdownOpen} setIsdropdownOpen={setIsdropdownOpen} onLogout={onLogout}/>

                    <div className="p-[20px]">
                        <div className="flex items-center justify-center flex-wrap">
                            <ModuleCards 
                                title="EmployeeTotal" 
                                cardName="employeetotal"
                                number='1,238'
                                activeCard={activeCard}
                                onClick={handleCardClick}
                                imgClass="employee-total" 
                            />
                            <ModuleCards 
                                title="PresentToday" 
                                cardName="presenttoday"
                                number='1087'
                                activeCard={activeCard}
                                onClick={handleCardClick}
                                imgClass="present-today" 
                            />
                            <ModuleCards 
                                title="OnLeave" 
                                cardName="onleave"
                                number='151'
                                activeCard={activeCard}
                                onClick={handleCardClick}
                                imgClass="on-leave" 
                            />
                            <ModuleCards 
                                title="OpenPositions" 
                                cardName="openpositions"
                                number='151'
                                activeCard={activeCard}
                                onClick={handleCardClick}
                                imgClass="open-positions" 
                            />
                            <ModuleCards 
                                title="PendingRequests" 
                                cardName="pendingrequests"
                                number='151'
                                activeCard={activeCard}
                                onClick={handleCardClick}
                                imgClass="pending-requests" 
                            />
                        </div>
                    </div>
                </div>
                
            </div>
            {/* <div className={`module-card group ${activeCard === cardName ? 'active' : '' }`} onClick={() => onClick(cardName)} >

            </div> */}

            
        </div>

        </>
    )
}