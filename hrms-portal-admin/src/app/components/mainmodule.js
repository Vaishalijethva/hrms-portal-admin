import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "./sidebar";
import Header from "./header";
import EmployeeTotal from "./modulecards/employeetotal";
import ModuleCards from "./modulecards/modulecards";
import ScrechCart from "./modulecards/screchcart";
// import AddProfile from "./add-profile";
import PresentToday from "./modulecards/presenttoday";
import OnLeave from "./modulecards/onleave";
import OpenPositions from "./modulecards/openpositions";
import PendingRequests from "./modulecards/pendingrequests";
import DashboardModule from "./dashboardmodule";
import DepartmentWiseEmployees from "./departmentwiseemployees";
import InOutMetrics from "./in-and-out-metrics";
import addicon from "../../../public/images/Icon-ion-add-circle-outline.svg";
import EmployeeInformationForm from "../compoents/componentss/EmployeeInformationForm";


export default function MainModule({ onLogout, onClick}){
    const [isOpen, setIsOpen] = useState(true);
    const [isdropdownOpen, setIsdropdownOpen] = useState(null);
    const [activeCard, setActiveCard] = useState("employeetotal");
    // const { openModal } = useModal();

    const handleCardClick = (cardName) => {
        setActiveCard(cardName);
    }
     
     const modulecomponents = {
        employeetotal : <EmployeeTotal />,
        presenttoday : <PresentToday />,
        onleave : <OnLeave />,
        openpositions : <OpenPositions />,
        pendingrequests : <PendingRequests />
        

     }

    const toggleSidebar = () => setIsOpen(!isOpen);
    return(
        <>
                <div>
                    <div className="p-[20px] relative bg">
                        {activeCard === "nextmodule" ? (
                            <div>
                               
                                <EmployeeInformationForm />
                              
                            </div>
                        ) : (
                            <>
                            <div className="heading-sec mb-[20px] flex items-center justify-between">
                                <h2 className="text-[18px] leading-[22px] font-bold text-[#323232]"> Human Resource Dashboard</h2>
                                <div className="new-profile-add-btn ">
                                    <button
                                        className="bg-[#0E99FF] text-[#FFF] text-[14px] leading-[20px] font-normal flex py-[10px] px-[20px] rounded-[5px] cursor-pointer"
                                        onClick={() => setActiveCard("nextmodule")}
                                    >
                                        <Image src={addicon} alt="add icon" className="mr-[10px]" />
                                        Create New Profile
                                    </button>
                                </div>
                            </div>
                                <div className="grid grid-cols-1 2xl:grid-cols-5 lg:grid-cols-5 sm:grid-cols-3  gap-[20px] mb-[20px]">
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
                                <DashboardModule />
                                <div className="grid grid-cols-1 2xl:grid-cols-6 lg:grid-cols-6 sm:grid-cols-3  gap-[20px] ">
                                    <ScrechCart 
                                        title="Employee Salary Slip" 
                                        cardName="employeesalaryslip"
                                        activeCard={activeCard}
                                        onClick={handleCardClick}
                                        imgClass="employee-salary-slip" 
                                    />
                                    <ScrechCart 
                                        title="Pending Applications" 
                                        cardName="pendingapplications"
                                        activeCard={activeCard}
                                        onClick={handleCardClick}
                                        imgClass="pending-applications" 
                                    />
                                    <ScrechCart 
                                        title="Leave Balance" 
                                        cardName="leavebalance"
                                        activeCard={activeCard}
                                        onClick={handleCardClick}
                                        imgClass="leave-balance" 
                                    />
                                    <ScrechCart 
                                        title="Attendance Summary" 
                                        cardName="attendancesummary"
                                        activeCard={activeCard}
                                        onClick={handleCardClick}
                                        imgClass="attendance-summary" 
                                    />
                                    <ScrechCart 
                                        title="Attendance Calendar" 
                                        cardName="attendancecalendar"
                                        activeCard={activeCard}
                                        onClick={handleCardClick}
                                        imgClass="attendance-calendar" 
                                    />
                                    <ScrechCart 
                                        title="Holiday Details" 
                                        cardName="holiday-details"
                                        activeCard={activeCard}
                                        onClick={handleCardClick}
                                        imgClass="holiday-details" 
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-[20px] mt-[15px]">
                                    <DepartmentWiseEmployees />
                                    <InOutMetrics />
                                </div>
                                
                                <div className="grid grid-cols-3 gap-[20px] mt-[15px]">
                                    <DepartmentWiseEmployees />
                                    <InOutMetrics />
                                </div>
                            </>
                        )}
                    </div>
                               
                </div>

        </>
    )
}