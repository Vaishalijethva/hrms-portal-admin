'use client';
import { useState } from "react";
import Image from "next/image";
import Login from "./components/login";
import Sidebar from "./components/sidebar";
import MainModule from "./components/mainmodule";
import CommonModule from "./components/commonmodule";
// import DashboardModule from "./components/dashboardmodule";
import {useRouter} from "next/navigation";
import ChildLayout from "./components/childLayout";
// import { html, Head, Main, NextScript } from "next/document";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLoginSuccess = () => {
    //  router.push("/mainmodule"); // or set login state if conditional rendering
    setIsLoggedIn(true);
  }

 
  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    
    <div className="body-main bg-[#f2f5f9] dark:bg-black">
      {/* {isLoggedIn ? ( */}
        <>
          {/* <CommonModule onLogout={handleLogout} onClick={handleLoginSuccess}/> */}
         
          {/* <MainModule onLogout={handleLogout} onClick={handleLoginSuccess}/> */}
          {/* <ChildLayout /> */}
          <MainModule onLogout={handleLogout}/>
         {/* <Sidebar /> */}
        </>
      {/* ):(
        <Login onLoginSuccess={handleLoginSuccess}/>
      )}  */}
    </div>

  );
}
