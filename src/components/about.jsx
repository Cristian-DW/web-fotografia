import React from "react";
import ImgCard from '../media/img-about.webp';


function About(){
    return(
        <div id="about" className='w-screen p-10 py-28 bg-fondo md:grid grid-cols-5 gap-10 justify-center items-center md:p-32 '>
            <div className='hidden md:col-span-2 md:block xxl:flex justify-center'>
                <img className="md:p-12 xxl:max-w-2xl " src= {ImgCard} alt="foto"/>
            </div>
            <div className='  md:col-span-3 '>
            <h3 className=" text-xl md:text-3xl mb-4">¡HOLA!</h3>
                <p className="text-lg font-light  md:text-xl">Soy Cristian Castro, un enamorado del desarrollo frontend web con conocimientos en la creación de experiencias digitales atractivas y funcionales. Durante mi carrera profesional, he trabajado en diversos proyectos, desde sitios web empresariales hasta aplicaciones web dinámicas. Estoy familiarizado con los estándares de la industria y las mejores prácticas de desarrollo frontend, y me mantengo actualizado con las últimas tendencias y tecnologías. </p>
            </div>
           
        </div>
    );
}

export default About;