'use client';
import { useState } from "react";
import Image from "next/image";
import Login from "./login";
import Sidebar from "./sidebar";
import MainModule from "./mainmodule";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    
    <div className="body-main">
      {isLoggedIn ? (
        <>
        <MainModule />
         {/* <Sidebar /> */}
        </>
      ):(
        <Login onLoginSuccess={handleLoginSuccess}/>
      )} 
    </div>

  );
}
