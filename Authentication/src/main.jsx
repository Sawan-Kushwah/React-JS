import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';
import { AuthProvider } from './context/context.jsx';
import VerifiyEmail from './components/VerifiyEmail.jsx';
import ForgetPassword from './components/ForgetPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <> <Navbar /> <App /> <Footer /> </>
  },
  {
    path: "/verifyEmail",
    element: <>   <VerifiyEmail />  </>
  },
  {
    path: "/login",
    element: <> <Login />  </>
  },
  {
    path: "/reset",
    element: <> <ResetPassword />  </>
  },
  {
    path: "/signUp",
    element: <> <SignUp />  </>
  },
  {
    path: "/profile",
    element: <> <Profile />  </>
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
