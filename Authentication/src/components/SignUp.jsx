// import React from 'react'
import { useForm } from "react-hook-form"
import { useState } from "react"
import { NavLink } from "react-router-dom"
const SignUp = () => {
    const [isSignup, setisSignup] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data);
        let res = await fetch("http://localhost:3000/signUp", {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify({ ...data })
        });

        let r = await res.json();

        if (res.ok) {
            alert(r.message);
            setisSignup(true);
        }
        reset()
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
            <section className="text-gray-400 bg-gray-900 body-font relative min-h-[79vh]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Sign Up</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form className="flex flex-wrap -m-2" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="firstName" className="leading-7 text-sm text-gray-400">Name</label>
                                    <input type="text" id="firstName" name="firstName" {...register("firstName", { required: { value: true, message: "This field is required" }, minLength: { value: 4, message: "Minimum length is 4" } })} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors.firstName && <div className=" text-red-500 pl-1">{errors.firstName.message}</div>}
                                </div>
                            </div>


                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                                    <input type="email" id="email" name="email" {...register("email", { required: { value: true, message: "This field is required" }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email address" } })} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors.email && <div className=" text-red-500 pl-1">{errors.email.message}</div>}
                                </div>
                            </div>

                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="address" className="leading-7 text-sm text-gray-400">Address</label>
                                    <input type="text" id="address" name="address" {...register("address", { required: { value: true, message: "This field is required" } })} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors.address && <div className=" text-red-500 pl-1">{errors.address.message}</div>}
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
                            {isSignup && <div className=" text-green-400 text-2xl cursor-pointer"> <NavLink to={"/login"} >Go to login page</NavLink></div>}


                            <div className="p-2 w-full">
                                <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Sign Up</button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>


        </>
    )
}

export default SignUp