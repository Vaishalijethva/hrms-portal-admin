'use client';
import React, {useState} from "react";
import Image from "next/image";
import { motion } from "framer-motion"; 
import Userimage from "../../../public/images/User.png";
import Lockimage from "../../../public/images/Lock.png";  
import Showimage from "../../../public/images/Visible.png";
import Hideimage from "../../../public/images/Visiblehide.svg";
import Refreshimage from "../../../public/images/refresh.svg";

export default function Login({onLoginSuccess}) { 
    // const [showPassword, setShowPassword] = useState(false);
    // const [showForgotPassword, setShowForgotPassword] = useState(false);
    // const [captcha, setCaptcha] = useState('Dwsep23');

    // const refreshCaptcha = () => {
    //     setCaptcha(Math.random().toString(36).substring(2, 8));
    // };

    const handleLogin = (e) => {
        e.preventDefault();
        if (typeof onLoginSuccess === "function") {
            onLoginSuccess();
        } else {
            console.error("onLoginSuccess prop is not provided or not a function.");
        }
    }
    return(
        <>
        <div className="login h-screen">
            <div className=" ">
                <div className="login-form bg-[#E6F4FF] text-[#3b9be0] max-w-[450px] w-full absolute top-[50%] transform translate-y-[-50%] left-0 right-0 mx-0-auto m-auto py-[40px] px-[20px] border rounded-[5px] border-[#E6F4FF]" >
                    <div className="loginform-header border-b-[1px] border-[#D3D3D3] mb-[20px]">
                        <h2 className="text-[28px] leading-[38px] font-bold text-[#3b9be0] pb-[15px]">Login</h2>
                    </div>
                    <form onSubmit={handleLogin} autoComplete="off">
                        <div className="mb-5">
                        <label className="text-[#3b9be0] text-[14px] block pb-[5px] form-control">User Name</label>
                        <input type="text" placeholder="User Name" className="h-[45px]"  />
                        </div>
                        <div className="mb-5">
                        <label className="text-[#3b9be0] text-[14px] block pb-[5px] form-control">Password</label>
                        <input type="password" placeholder="Password" className="h-[45px]" />
                        </div>
                        <div className="">
                        <motion.button
                            whileHover={{ scale: 1.05, background: "linear-gradient(to right, #3b9be0, #3b9be0)" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="relative hover:cursor-pointer overflow-hidden rounded-lg px-6 py-3 font-semibold text-white transition-all duration-0.5 
                            login-btn"
                        >
                            Login
                        </motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
