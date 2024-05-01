// import { useState } from 'react'

import { useState, useEffect } from 'react'
import './App.css'
import { createClient } from "pexels";


function App() {
  // const inpRef = useRef()
  const [images, setimages] = useState([]);
  // pixels  client
  const fetchImg = (e) => {
    const apiKey = "m3JV4ZDxjnud4WBhE0rzZTQDkmn2JGFOLP6Xr5VBBw2hhTXnI7pMWmm7";
    const client = createClient(apiKey);
    // const query = document.getElementById('search').value;
    const query = e;
    client.photos.search({ query, per_page: 10 })
      .then(img => setimages(img.photos[0]), console.log(images));
  }


  useEffect(() => {
    const handleClick = () => {
      fetchImg(document.getElementById("search").value);
    };

    const btn = document.getElementById('btn');
    if (btn) {
      btn.addEventListener('click', handleClick);
    }

    // Cleanup function to remove event listener when component unmounts
    return () => {
      if (btn) {
        btn.removeEventListener('click', handleClick);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render



  useEffect(() => {
    // fetchingData();
    fetchImg();
  }, [])



  return (
    <>
      <input type="text" name="search" id="search" className='border   p-4 mt-3 border-black m-auto ml-40' />
      <button type="submit" id='btn'>Search</button>
      <div className="container w-full flex-col flex justify-center items-center m-3 mt-8">
        {images && images.src && (
          <div className="card border border-black w-[500px]  m-auto my-4  rounded-lg bg-gray-700 text-white text-xl">
            <h1 className='text-center py-4'>{images.alt}</h1>
            <img src={images.src.original} alt="" className="w-fit  h-[500px] rounded-lg" />
            <div className="id ml-2 p-3"> By : {images.photographer}</div>
            <div className="url ml-2 p-3">  Image link : <a href={images.url} target='__blank'>{images.url}</a></div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
