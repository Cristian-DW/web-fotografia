import React from 'react';
import Slider from 'react-slick'; // Cambia el nombre de la importación a Slider
import ImgSkill from "../media/html.svg"
import ImgSkill2 from "../media/css.svg"
import ImgSkill3 from "../media/js.svg"
import ImgSkill4 from "../media/git.svg"
import ImgSkill5 from "../media/react.svg"
import ImgSkill6 from "../media/sass.svg"
import ImgSkill7 from "../media/figma.svg";
import "slick-carousel/slick/slick.css"; // Asegúrate de importar los estilos de react-slick
import "slick-carousel/slick/slick-theme.css"; // Asegúrate de importar los estilos del tema de react-slick

function Skills() {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2300,
    pauseOnHover: true,
  };

  return (
    <div id='skill' className=" h-20 lg:h-40  bg-fondo2 flex flex-col justify-center items-center  ">
      <div  className='w-1/2 h-40  flex justify-center items-center'>
      {/* Utiliza el componente Slider en lugar de SlickCarousel */}
      <Slider {...settings} className='w-full '>
      <div  className="flex justify-center items-center h-full ml-3  md:ml-14"> 
          <img src={ImgSkill} alt="imag" width="auto" height="auto" className=" w-20 lg:w-40" />
        </div>
        <div className="flex justify-center items-center h-full ml-3   md:ml-14"> 
        
          <img src={ImgSkill2} alt="ima2" width="auto" height="auto"  className=" w-20 lg:w-40" />
        </div>
        <div className="flex justify-center items-center h-full ml-3   md:ml-14"> 
        
          <img src={ImgSkill3} alt="ima3" width="auto" height="auto"  className= " w-20 lg:w-40" />
        </div>
        <div className="flex justify-center items-center h-full ml-3  md:ml-14"> 
        
          <img src={ImgSkill4} alt="ima3" width="auto" height="auto"  className= " w-20 lg:w-40" />
        </div>
        <div className="flex justify-center items-center h-fullml-3   md:ml-14"> 
        
          <img src={ImgSkill5} alt="ima3" width="auto" height="auto"  className= " w-20 lg:w-40" />
        </div>
        <div className="flex justify-center items-center h-full ml-3lg:ml-14"> 
        
          <img src={ImgSkill7} alt="ima3" width="auto" height="auto"  className= " w-20 lg:w-40" />
        </div>
        <div className="flex justify-center items-center h-full ml-3 md:ml-14"> 
        
          <img src={ImgSkill6} alt="ima3" width="auto" height="auto"  className= " w-20 lg:w-40" />
        </div>
      </Slider>
    </div>
    </div>
  );
}

export default Skills;
