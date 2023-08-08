import React from 'react';
import Slider from 'react-slick';
import ImgSkill from "../media/html.svg"
import ImgSkill2 from "../media/css.svg"
import ImgSkill3 from "../media/js.svg"
import ImgSkill4 from "../media/git.svg"
import ImgSkill5 from "../media/react.svg"
import ImgSkill6 from "../media/sass.svg"
import ImgSkill7 from "../media/figma.svg"





const Skills = () => {
  const settings = {
    dots: false, // Ocultar los puntos de indicación (dots)
    arrows: false, // Ocultar los botones de navegación (flechas)
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Mostrar 3 imágenes a la vez
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Ajusta el breakpoint según tus necesidades
        settings: {
          slidesToShow: 2, // Mostrar solo 2 imágenes a la vez en pantallas más pequeñas
        },
      },
    ],
    autoplay: true, // Habilitar el autoplay
    autoplaySpeed: 2300, // Tiempo de espera entre cada cambio (en milisegundos)
    pauseOnHover: true,
  };

  return (
    <div className="sliders">
      <Slider {...settings}>
        <div className="img-slide">
          <img src={ImgSkill} alt="HTML" title='HTML' />
        </div>
        <div className="img-slide">
          <img src={ImgSkill2} alt="CSS" title='CSS'/>
        </div>
        <div className="img-slide">
          <img src={ImgSkill3} alt="JavaScript" title='JavaScript' />
        </div>
        <div className="img-slide">
          <img src={ImgSkill4} alt="Git" title='Git'/>
        </div>
        <div className="img-slide">
          <img src={ImgSkill5} alt="React" title='React JS'/>
        </div>
        <div className="img-slide">
          <img src={ImgSkill6} alt="Sass" title='Sass' />
        </div>
        <div className="img-slide">
          <img src={ImgSkill7} alt="Figma" title='Figma'/>
        </div>
        
      </Slider>
    </div>
  );
};

export default Skills;