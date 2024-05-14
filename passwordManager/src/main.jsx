import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /> <App /> <Footer /> </>,
  },
  {
    path: "/about",
    element: <><Navbar /> <About /> <Footer /> </>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>,
)
