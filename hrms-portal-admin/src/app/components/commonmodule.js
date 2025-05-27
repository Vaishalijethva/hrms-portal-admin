import React, {useState} from "react";
import Sidebar from "./sidebar";
import Header from "./header";
// import DashboardModule from "./dashboardmodule";

// export default function CommonModule({onLogout}) {
export default function CommonModule() {
    // const [isOpen, setIsOpen] = useState(true);
    // const [isdropdownOpen, setIsdropdownOpen] = useState(null);

 

    // const toggleSidebar = () => setIsOpen(!isOpen);

    return(
        <>
          {/* <div className="flex">
                <div className={`${isOpen ? 'w-[74px]' : 'w-[250px]'}`}>
                        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                </div>
                <div className={`float-right right-0 transition-all delay-75 ease-in-out ${isOpen ? 'w-[calc(100%-74px)]': 'w-[calc(100%-250px)]'}`}>
                        <Header isOpen={isOpen}  isdropdownOpen={isdropdownOpen} setIsdropdownOpen={setIsdropdownOpen} onLogout={onLogout}/>
                        <DashboardModule />
                </div>   
                
                

            </div>
         */}

        </>

    );
}