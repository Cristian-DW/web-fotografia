import React from 'react'
import Red1 from "../media/bxl-github.svg"
import Red2 from "../media/bxl-gmail.svg"
import Red3 from "../media/bxl-linkedin.svg"


function Social (){
  return (
    <div className='fixed  flex justify-evenly items-center bottom-1 right-5 z-20 w-96 h-16  rounded  backdrop-blur-lg '>
      <div className=''>
        <a href="#" className="px-1 ">
          <img className=" md:h-16 w-auto" src={Red1} alt="logo" />
        </a>
      </div>

      <div className=''>
        <a href="#" className=" px-1">
          <img className="md:h-16 w-auto" src={Red2} alt="logo" />
        </a>
      </div>

      <div className=' '>
        <a href="#" className=" px-1">
          <img className="md:h-16 w-auto" src={Red3} alt="logo" />
        </a>
      </div>
    </div>
  );
};

export default Social
