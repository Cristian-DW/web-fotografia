import React from "react";
import Card from "./Card";
import Img from "../media/logo.png";


function Services(){
   

   return (
     <>
       <section id="services" className="w-screen min-h-screen flex flex-col items-center justify-center">
         <h2 className="text-5xl text-center mb-44 font-Audiowide">Servicios</h2>
         <div className=" w-screen flex justify-around items-center">
         <Card imgCard={Img} titCard='Digitalización' contentCard='Podemos ayudarte en la digitalización de tus fotografias para que perduren en el tiempo' contentButton='Ver Más' />
         <Card imgCard={Img} titCard='Digitalización' contentCard='Podemos ayudarte en la digitalización de tus fotografias para que perduren en el tiempo' contentButton='Ver Más' />
         <Card imgCard={Img} titCard='Digitalización' contentCard='Podemos ayudarte en la digitalización de tus fotografias para que perduren en el tiempo' contentButton='Ver Más' />
         </div>
       </section>
     </>
   );
}

export default Services;