import { NavLink } from "react-router-dom"
import logo from '../assets/about.png'
const Navbar = () => {
    return (



        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <img src={logo} alt="" className=" invert w-12" />
                    <span className="ml-3 text-xl cursor-pointer">PassGuard Pro</span>
                </a>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
                    <NavLink to={"/"} className={` mr-5  cursor-pointer text-lg hover:text-white   `} >Home</NavLink>
                    <NavLink to={"/about"} className={` mr-5 cursor-pointer text-lg hover:text-white    `} >About</NavLink>

                </nav>
                <a href="https://github.com/Sawan-Kushwah/React-JS/tree/master/passwordManager" target="__blank">
                    <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">GitHub
                        <svg fill="none" stroke="currentColor" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </a>
            </div>
        </header>





    )
}

export default Navbar