import React from 'react';

const ProjectsCard = ({ title, description }) => {
  return (
    <div className="projects-card">
      <div className="project-info-container">
        <h3 className="project-title">{title}</h3>
        <span className="project-load-bar"></span>
        <p className="project-short-desc">{description}</p>
        <button className=" button">See More</button>
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
    <div className="flex flex-col justify-center items-center min-h-screen mt-20">
      <h2 className='text-xl md:text-3xl mb-4'>Proyectos</h2>
      <div className="flex justify-center items-center flex-wrap container mx-auto gap-5">
        {projects.map((project, index) => (
          <ProjectsCard key={index} title={project.title} description={project.description} />
        ))}
      </div>
    </div>
  );
};

export default Project;
