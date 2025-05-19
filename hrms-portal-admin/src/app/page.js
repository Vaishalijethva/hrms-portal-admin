'use client';
import { useState } from "react";
import Image from "next/image";
import Login from "./components/login";
import Sidebar from "./components/sidebar";
import MainModule from "./components/mainmodule";
// import { html, Head, Main, NextScript } from "next/document";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    
    <div className="body-main bg-[#f2f5f9] dark:bg-black">
      {isLoggedIn ? (
        <>
        <MainModule onLogout={handleLogout}/>
         {/* <Sidebar /> */}
        </>
      ):(
        <Login onLoginSuccess={handleLoginSuccess}/>
      )} 
    </div>

  );
}
