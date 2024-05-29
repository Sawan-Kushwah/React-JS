import './App.css'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eyeOpen from "./assets/eyeOp.png"
import eyeClose from "./assets/eyeCl.png"
// import 'dotenv/config'
// let BASE_URL = "http://localhost:3000"
function App() {
  //usestates
  const [webPassInfo, setwebPassInfo] = useState({ website: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  let ref = useRef();
  let passRef = useRef();


  //Get data from database
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000");
    let passwords = await req.json()
    setpasswordArray(passwords)
  }


  useEffect(() => {
    getPasswords()
  }, [])


  //Handling user input
  const handleChange = (e) => {
    setwebPassInfo({ ...webPassInfo, [e.target.name]: e.target.value, id: uuidv4() });
  }


  // saving data
  const savePassword = async () => {
    if (webPassInfo.password.length < 3 || webPassInfo.username.length < 3 || webPassInfo.website.length < 3) {
      return;
    }
    toast.success('Password Saved', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });

    // delete with same id 
    await fetch("http://localhost:3000", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: webPassInfo.id }) })

    // Update passwordArray state
    setpasswordArray([...passwordArray, webPassInfo]);

    // Save passwords to localStorage
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, webPassInfo]));

    //save to localstorage
    await fetch("http://localhost:3000", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...webPassInfo }) })

    // Clear input fields
    setwebPassInfo({ website: "", username: "", password: "" });
  }




  //handling delte funtion 
  const handleDelete = async (id) => {
    let webName = passwordArray.filter((i) => i.id === id);
    let con = confirm(`Do you want to delete website ${webName[0].website} ?`);
    if (con) {
      toast.warn('Deleting Password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });

      let pass = passwordArray.filter((item) => item.id !== id)
      setpasswordArray(pass)
      //delete from localstorage
      // localStorage.setItem('passwords', pass);

      //delete from database
      await fetch("http://localhost:3000", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

    }
  }


  // handling edit event
  const handleEdit = (id) => {
    let editweb = passwordArray.filter((i) => i.id === id);
    if (confirm(`Do you want to Edit ${editweb[0].website} ?`)) {
      toast('Edit Password', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
      setwebPassInfo(editweb[0]);
      let pass = passwordArray.filter((item) => item.id !== id)
      setpasswordArray(pass)
    }
  }


  const showPassword = () => {
    // alert("helo");
    if (passRef.current.type !== "text") {
      passRef.current.type = "text";
      ref.current.src = eyeOpen;
    } else {
      passRef.current.type = "password";
      ref.current.src = eyeClose;
    }
    // ref.current.style.backgroundColor = "red";
  }


  const copy = (text) => {

    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />

      <section className="text-gray-400 bg-gray-900 body-font relative w-full">
        <div className="container px-5 py-5 mx-auto  ">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Password Manager App</h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2 max-[500px]:w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-400">Website name</label>
                  <input onChange={handleChange} type="text" name="website" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 focus:bg-gray-900 focus:ring-2 focus:ring-red-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={webPassInfo.website ? webPassInfo.website : ""} />

                </div>
              </div>
              <div className="p-2 w-1/2 max-[500px]:w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-400">UserName</label>
                  <input onChange={handleChange} type="text" name="username" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 focus:bg-gray-900 focus:ring-2 focus:ring-red-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={webPassInfo.username ? webPassInfo.username : ""} />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-400">PassWord</label>
                  <input onChange={handleChange} ref={passRef} type="password" name="password" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 focus:bg-gray-900 focus:ring-2 focus:ring-red-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={webPassInfo.password ? webPassInfo.password : ""} />
                  <div className=' absolute top-[35px] right-[14px] cursor-pointer' onClick={showPassword} ><img ref={ref} src={eyeClose} alt="eye" className=' invert' /></div>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={savePassword} >Save Password</button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center"></div>


            </div>
          </div>
        </div>
        <section className="text-gray-400 bg-gray-900 body-font pb-40" >
          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-col text-center w-full mb-2">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Passwords</h1>

            </div>
            <div className="lg:w-4/5 w-full mx-auto overflow-auto">
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">Website</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Username</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Password</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 text-center">Actions</th>
                  </tr>
                </thead>
                {passwordArray.map(item => {
                  return (
                    <tbody key={item.id}>
                      <tr>
                        <td className="px-4 py-3"><a href={item.website} target='__blank'>{item.website}</a></td>
                        <td className="px-4 py-3 cursor-pointer" onClick={() => copy(item.username)}  > {item.username}  </td>
                        <td className="px-4 py-3 cursor-pointer" onClick={() => copy(item.password)}>{"*".repeat(item.password.length)}</td>
                        <td className="px-4 py-3 text-lg text-white flex gap-2 justify-center items-center">
                          <button className="flex   text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded" onClick={() => handleDelete(item.id)}>Delete</button>
                          <button className="flex   text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded" onClick={() => handleEdit(item.id)}>Edit</button>
                        </td>

                      </tr>
                    </tbody>
                  )
                })}
              </table>
            </div>

          </div>
        </section>

      </section>


    </>
  )
}

export default App
