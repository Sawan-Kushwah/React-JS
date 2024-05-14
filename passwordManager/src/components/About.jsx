
import wolf from "../assets/about.png"
const About = () => {
    return (
        <>

            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="head text-center text-white text-4xl"><h1>Welcome to Passguard Pro</h1></div>
                <div className="about w-4/5 m-auto p-9 pb-2 max-[400px]:p-2 max-[400px]:m-1 max-[400px]:pt-3 max-[400px]:w-full">At Passguard Pro, we understand the frustration of forgetting passwords and the hassle of resetting them. Thats why we have created a user-friendly, responsive password manager designed to securely store your login credentials for easy access whenever you need them.
                </div>
                <div className="container px-5 py-7 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
                        <img alt="feature" className="object-fill object-center   h-full w-full invert" src={wolf} />
                    </div>
                    <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
                        <div className="flex flex-col mb-10 lg:items-start items-center">
                            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-red-400 mb-5">
                                <svg fill="none" stroke="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-white text-lg title-font font-medium mb-3">Our Purpose</h2>
                                <p className="leading-relaxed text-base">Our primary goal is to simplify your digital life by providing a secure and efficient solution for managing your passwords. With our app, you can say goodbye to the tedious process of resetting passwords and regain control over your online accounts.
                                </p>

                            </div>
                        </div>
                        <div className="flex flex-col mb-10 lg:items-start items-center">
                            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-red-400 mb-5">
                                <svg fill="none" stroke="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                    <circle cx="6" cy="6" r="3"></circle>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-white text-lg title-font font-medium mb-3">Key Features</h2>
                                <p className="leading-relaxed text-base"><ul >
                                    <li className="py-1">Securely Store Passwords: Safely store your usernames, passwords, and website URLs in one centralized location.
                                    </li>
                                    <li className="py-1">    User-Friendly Interface: Our intuitive interface makes it easy for users of all levels to navigate and manage their passwords effortlessly.

                                    </li>
                                    <li className="py-1">    Responsive Design: Access your passwords anytime, anywhere, on any device. Whether you are on your desktop, tablet, or smartphone, our app adapts to fit your screen.

                                    </li>
                                    <li className="py-1">    Quick Access: Instantly copy your passwords with just a few clicks, eliminating the need to manually type them in.

                                    </li>
                                </ul></p>

                            </div>
                        </div>
                        <div className="flex flex-col mb-10 lg:items-start items-center">
                            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-red-400 mb-5">
                                <svg fill="none" stroke="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-white text-lg title-font font-medium mb-3">How to Use?</h2>
                                <p className="leading-relaxed text-base">Sign up for an account. <br />
                                    Add your website URLs, usernames, and passwords. <br />
                                    Access your passwords anytime, anywhere, and copy them with ease whenever you need them.</p>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-xs text-red-400 tracking-widest font-medium title-font mb-1">Get Started Today</h2>
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Stay Secure, Stay Organized
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">With Passguard Pro, you can rest assured that your sensitive information is encrypted and stored securely. Say goodbye to the stress of forgotten passwords and hello to a more organized and secure digital life.
                            .</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About