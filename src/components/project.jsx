import React from 'react';
import '../App.css'

const ProjectsCard = ({ title, description }) => {
  return (
    <div className="relative w-80 h-96 shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out">
      <div className="absolute inset-0 bg-cover bg-center transform transition-transform hover:scale-105 duration-300 ease-in-out " style={{ backgroundImage: "url(https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)" }}></div>
      <div className="absolute inset-0 bg-opacity-70 bg-black flex flex-col justify-end text-white transform transition-opacity opacity-0 hover:opacity-100 duration-300 ease-in-out">
        <h3 className="text-xl font-semibold uppercase mb-1.5 transition-colors hover:text-white text-purple-700">
          {title}
        </h3>
        <p className="text-white font-light opacity-0 mb-1 transition-opacity duration-1000 ease-in-out animation-delay-800">
          {description}
        </p>
        <button className="block bg-purple-700 text-white py-2 px-6 text-sm font-semibold rounded-full transform transition-transform hover:scale-105 duration-300 ease-in-out">
          <a href="#">Ver Más</a>
        </button>
      </div>
    </div>
  );
};



const Project = () => {
  const projects = [
    {
      title: "Project 1",
      description: "Description for Project 1",
    },
    {
      title: "Project 2",
      description: "Description for Project 2",
    },
    {
      title: "Project 3",
      description: "Description for Project 3",
    },
    {
      title: "Project 4",
      description: "Description for Project 4",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center ">
      <h2 className='text-xl lg:text-3xl mb-4'>Proyectos</h2>
      <div className="flex justify-center items-center flex-wrap container mx-auto gap-5">
        {projects.map((project, index) => (
          <ProjectsCard key={index} title={project.title} description={project.description} />
        ))}
      </div>
    </div>
  );
};

export default Project;
