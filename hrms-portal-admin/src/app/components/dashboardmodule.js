import React,{useState} from 'react';
import GenderRatioChart from "./genderratiochart";
import StaffDistributionChart from "./staffdistributionchart";
import TenurePieChart from "./tenurepiechart";

export default function DashboardModule({ onClick }) {
    return (
        <>
        
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[15px]">
                <GenderRatioChart />
                <StaffDistributionChart />
                <TenurePieChart />
            </div>
       
        </>
    )
}