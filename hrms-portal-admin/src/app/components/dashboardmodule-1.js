import React, {useState} from "react";
import GenderRatioChart from "./genderratiochart";
import StaffDistributionChart from "./staffdistributionchart";
import EmployeeInformationForm from "../compoents/componentss/EmployeeInformationForm";
import TenurePieChart from "./tenurepiechart";
import DepartmentWiseEmployees from "./departmentwiseemployees";
// import MainModule from "./mainmodule";

export default function DashboardModule({onClick}) {
    //  const [isOpen, setIsOpen] = useState(true);
    //    const [isdropdownOpen, setIsdropdownOpen] = useState(null);
    // const toggleSidebar = () => setIsOpen(!isOpen);
    
    return(
        <>
        {/* <div className={`float-right right-0 transition-all delay-75 ease-in-out ${isOpen ? 'w-[calc(100%-74px)]': 'w-[calc(100%-250px)]'}`}> */}
            <div className="p-[20px] relative bg">
                <div className="heading-sec mb-[20px] flex items-center justify-between">
                    <h2 className="text-[18px] leading-[22px] font-bold text-[#323232]"> Human Resource Dashboard</h2>
                    <div className="new-profile-add-btn ">
                        <button className="bg-[#0E99FF] text-[#FFF] text-[14px] leading-[20px] font-normal py-[10px] px-[20px] rounded-[5px]" onClick={onClick}>Add New Profile</button>

                    </div>
                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[15px]">
                    <GenderRatioChart />
                    <StaffDistributionChart />
                    <TenurePieChart />
                </div>
                {/* <MainModule /> */}
            </div>
        {/* </div> */}
        
        
        {/* <EmployeeInformationForm /> */}
        </>
    )
}