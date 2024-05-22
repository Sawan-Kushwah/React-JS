// import React from 'react'
import { useForm } from "react-hook-form"
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from './Footer.jsx';
import { AuthContext } from "../context/context.jsx";

const Login = () => {
    const [error, seterror] = useState("");
    const { setIsLogin } = useContext(AuthContext);
    setIsLogin(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            let res = await fetch("http://localhost:3000/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data }) });
            let result = await res.json();

            if (res.ok) {
                console.log(result)
                // setuserdata(result)
                // <profile /> 
                navigate("/profile", { state: { ...result } })
                setIsLogin(true);
            } else {
                console.log(result.message)
                seterror(result.message);
            }

        } catch (error) {
            console.log(error);
            seterror("An error occur please try again later")

        }

        reset()
        // seterror("");
    }

    const showPassword = () => {

        let pass = document.getElementById("password");
        if (pass.type === "password") {
            pass.type = "text";
        } else {
            pass.type = "password";
        }
    }

    return (
        <>
            <Navbar />
            <section className="text-gray-400 bg-gray-900 body-font relative min-h-[79vh]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Login</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form className="flex flex-wrap -m-2" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                                    <input type="email" id="email" name="email" {...register("email", { required: { value: true, message: "This field is required" }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email address" } })} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors.email && <div className=" text-red-500 pl-1">{errors.email.message}</div>}
                                </div>
                            </div>


                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
                                    <input type="password" id="password" name="password" {...register("password", { required: { value: true, message: "This field is required" }, minLength: { value: 6, message: "Minimum length is 6" } })} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    <span className=" absolute top-[34px] right-[10px] cursor-pointer" onClick={showPassword}>show</span>
                                    {errors.password && <div className=" text-red-500 pl-1">{errors.password.message}</div>}
                                </div>
                            </div>

                            {error && <div className=" text-red-500 pl-3">{error}</div>}
                            <div className="p-2 w-full">
                                <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Login</button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Login