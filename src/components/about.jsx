import React from "react";
import imgAbout from '../media/img-about.png'


function About() {
  return (
    <div
      id="about"
      className="w-full bg-fondo2 md:grid grid-cols-6 gap-10 justify-center items-center  lg:min-h-screen"
    >
      <div className=" md:col-span-3 font-roboto px-24 ">
      <h3 className=" text-xl lg:text-3xl mb-4">¡HOLA!</h3>
        <p className="text-md font-light  lg:text-3xl">
        En Frame Fusion, la fotografía es nuestra pasión y vida. Somos un apasionado equipo de fotógrafos comprometidos en capturar momentos únicos y transformarlos en recuerdos eternos. Cada clic de nuestra cámara es un intento de detener el tiempo y capturar la autenticidad de la vida. Nuestra gama de servicios abarca desde bodas emocionales y retratos personales únicos hasta la cobertura de eventos y la inmortalización de impresionantes paisajes. Somos narradores visuales, buscando constantemente la innovación y la creatividad en cada proyecto. En Frame Fusion, la fotografía es una forma de arte y una poderosa forma de comunicación. Permítenos ser la razón detrás de tus recuerdos inolvidables y proyectos visuales excepcionales. Contáctanos y únete a nosotros en este emocionante viaje a través de la magia de la fotografía.
        </p>
        <button className=" hidden   button  lg:hover:text-fondo mt-20 w-48 ">
          <span class="relative z-10">
            <a href="#porfolio">Contáctanos</a>
          </span>
        </button>
      </div>
      <div className="  md:col-span-3   ">
        <img  className="max-h-screen" src={imgAbout} alt=""/>
        
      </div>
      
    </div>
  );
}

export default About;