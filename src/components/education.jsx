import React from "react";
import { ImageWithPopover } from "./extras/Popover";
import ImgMicrosoft from "../media/microsoft.png";
import ImgGoogle from "../media/google.png";
import ImgSena from "../media/sena.png"; // Adjust the path accordingly

function Education() {
  return (
    <div
      id="education"
      className="p-10 lg:grid lg:py-72 grid-cols-7 gap-x-10 justify-center items-center lg:px-40"
    >
      <div className=" mb-8 lg:col-span-4 flex-col xxl:flex justify-center lg:border-r-2 lg:pr-4">
        <h3 className="text-center text-xl lg:text-3xl mb-4 lg:text-left">
          Educación
        </h3>
        <p className="text-md font-light lg:text-xl">
          Profesional con habilidades para interpretar y diseñar sistemas
          informáticos que satisfacen las necesidades del usuario. Con
          conocimientos en programación, análisis de datos, interfaces de
          usuario, bases de datos y seguridad informática. Destreza en trabajar
          con computadoras, comunicarse con usuarios y colegas, y experiencia en
          metodologías ágiles para el desarrollo de software.
        </p>
      </div>
      <div className="lg:col-span-3 flex  justify-between  gap-x-20">
        <article className="hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgSena}
            name="Yet Another Name"
            username="yetanotherusername"
            bio="Bio for the third image."
          />
        </article>

        <article className=" hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgMicrosoft}
            name="Tania Andrew"
            username="canwu"
            bio="Frontend Developer • Major interest in Web Development: motivated to achieve measurable results, to deepen my knowledge and improve my skills."
          />
        </article>

        <article className="hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgGoogle}
            name="Tania Andrew"
            username="canwu"
            bio="Frontend Developer • Major interest in Web Development: motivated to achieve measurable results, to deepen my knowledge and improve my skills."
          />
        </article>
        
        <article className="hidden lg:block hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgGoogle}
            name="Tania Andrew"
            username="canwu"
            bio="Frontend Developer • Major interest in Web Development: motivated to achieve measurable results, to deepen my knowledge and improve my skills."
          />
        </article>
      </div>
    </div>
  );
}
export default Education;