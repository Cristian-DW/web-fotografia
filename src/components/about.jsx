import React from "react";
import ImgCard from '../media/img-about.webp';


function About() {
  return (
    <div
      id="about"
      className="w-full p-10 lg:py-44 bg-fondo lg:grid grid-cols-5 gap-10 justify-center items-center lg:px-40  min-h-screen"
    >
      <div className=" lg:col-span-2 lg:block xxl:flex justify-center">
        <img
          width="auto"
          height="auto"
          className="py-10 lg:p-0 xxl:max-w-2xl "
          src={ImgCard}
          alt="foto"
        />
      </div>
      <div className="  lg:col-span-3 ">
        <h3 className=" text-xl lg:text-3xl mb-4">¡HOLA!</h3>
        <p className="text-md font-light  lg:text-2xl">
          Soy Cristian Castro, un enamorado del desarrollo frontend web con
          conocimientos en la creación de experiencias digitales atractivas y
          funcionales. Durante mi carrera profesional, he trabajado en diversos
          proyectos, desde sitios web empresariales hasta aplicaciones web
          dinámicas. Estoy familiarizado con los estándares de la industria y
          las mejores prácticas de desarrollo frontend, y me mantengo
          actualizado con las últimas tendencias y tecnologías.{" "}
        </p>
        <button className="button  hover:text-fondo mt-20 w-48">
          <span class="relative z-10">
            <a href="#porfolio">Contáctame</a>
          </span>
        </button>
      </div>
      
    </div>
  );
}

export default About;