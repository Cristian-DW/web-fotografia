import React from 'react';
import '../App.css';
import ProjectUno from '../media/projectUno.webp'
import ProjectDos from '../media/project2.webp'


const ProjectsCard = ({ title, description, fecha, backgroundImage }) => {
  return (
    <div className="relative w-80 h-44  md:w-[45rem] md:h-96 shadow-md overflow-hidden transform transition-transform  hover:scale-105 duration-1000 ease-in-out">
      <div
        className="absolute inset-0 bg-center opacity-80 transform transition-transform bg-cover  hover:scale-105 duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-opacity-70 bg-black flex flex-col justify-center items-center text-white transform transition-opacity opacity-0 hover:opacity-100 duration-1000 ease-in-out">
        <h3 className=" text-2xl lg:text-5xl font-semibold uppercase my-2 lg:mb-7 ">
          {title}
        </h3>
        <p className="text-white font-light lg:font-normal lg:text-xl">{description}</p>
        <p className="text-white font-light text-sm lg:text-xl">{fecha}</p>
       <button className="button  hover:text-fondo mt-10 w-28   ">
          <span class="relative z-10 text-xs lg:text-xl">
            <a href="#">Ver Más</a>
          </span>
        </button>
      </div>
    </div>
  );
};

const Project = () => {
  const projects = [
    {
      title: "ViajaYa",
      description: "Landing page",
      fecha: "Marzo de 2022",
      backgroundImage:
        ProjectDos,
    },
    {
      title: "Codecraft",
      description: "Proyecto realizado en equipo con la finalidad de ",
      fecha: "Landing page",
      backgroundImage: ProjectUno,
    },
     {
      title: "Codecraft",
      description: "Proyecto realizado en equipo con la finalidad de ",
      fecha: "Landing page",
      backgroundImage: ProjectUno,
    },
     {
      title: "Codecraft",
      description: "Proyecto realizado en equipo con la finalidad de ",
      fecha: "Landing page",
      backgroundImage: ProjectUno,
    },
  ];

  return (
    <div id="porfolio"  className="flex flex-col justify-center items-cente min-h-screen  ">
      <h2 className="subtitle text-center">Proyectos</h2>
      <p  className=" text-md font-light lg:text-2xl text-center mb-12">Explora mis creaciones</p>
      <div className="flex flex-wrap justify-center items-center  mx-auto gap-6 p-5 lg:p-0 ">
        {projects.map((project, index) => (
          <ProjectsCard
            key={index}
            title={project.title}
            description={project.description}
            fecha={project.fecha}
            backgroundImage={project.backgroundImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;

