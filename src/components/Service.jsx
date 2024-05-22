import React from "react";
import Card from "./Card";
import Img from "../media/logo.png";

/**
 * Componente Services
 * 
 * Este componente renderiza una sección que muestra los servicios ofrecidos por la empresa.
 * Cada servicio se presenta en un componente `Card` que incluye una imagen, un título,
 * una descripción y un botón.
 * 
 * @component
 * @example
 * return (
 *   <Services />
 * )
 */
function Services() {
  return (
    <>
      {/* Sección de servicios con estilo flex para centrar el contenido */}
      <section id="services" className="w-screen min-h-screen flex flex-col items-center justify-center">
        {/* Título de la sección */}
        <h2 className="text-5xl text-center mb-44 font-Audiowide">Servicios</h2>
        
        {/* Contenedor de las tarjetas de servicios */}
        <div className="w-screen flex justify-around items-center">
          
          {/* Tarjeta de servicio: Digitalización */}
          <Card 
            imgCard={Img}
            titCard='Digitalización'
            contentCard='Podemos ayudarte en la digitalización de tus fotografías para que perduren en el tiempo'
            contentButton='Ver Más'
          />
          
          {/* Tarjeta de servicio: Digitalización */}
          <Card 
            imgCard={Img}
            titCard='Digitalización'
            contentCard='Podemos ayudarte en la digitalización de tus fotografías para que perduren en el tiempo'
            contentButton='Ver Más'
          />
          
          {/* Tarjeta de servicio: Digitalización */}
          <Card 
            imgCard={Img}
            titCard='Digitalización'
            contentCard='Podemos ayudarte en la digitalización de tus fotografías para que perduren en el tiempo'
            contentButton='Ver Más'
          />
        </div>
      </section>
    </>
  );
}

export default Services;
