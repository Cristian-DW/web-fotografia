import React from "react";
import { ImageWithPopover } from "./extras/Popover";
import ImgMicrosoft from "../media/microsoft.png";
import ImgGoogle from "../media/google.png";
import ImgSena from "../media/sena.png"; // Adjust the path accordingly

function Education() {
  return (
    <div
      id="education"
      className="p-10 md:grid grid-cols-7 gap-x-52 justify-center items-center md:p-32"
    >
      <div className=" mb-8 md:col-span-4 flex-col xxl:flex justify-center md:border-r-2 md:p-12">
        <h3 className="text-center text-xl md:text-3xl mb-4 md:text-left">
          Educación
        </h3>
        <p className="text-md font-light md:text-xl">
          Profesional con habilidades para interpretar y diseñar sistemas
          informáticos que satisfacen las necesidades del usuario. Con
          conocimientos en programación, análisis de datos, interfaces de
          usuario, bases de datos y seguridad informática. Destreza en trabajar
          con computadoras, comunicarse con usuarios y colegas, y experiencia en
          metodologías ágiles para el desarrollo de software.
        </p>
      </div>
      <div className="md:col-span-3 flex flex-col justify-center gap-y-10">
        <article className="flex items-center p-2 hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgSena}
            name="Yet Another Name"
            username="yetanotherusername"
            bio="Bio for the third image."
          />
        </article>

        <article className="flex items-center min-w-2xl p-2 hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgMicrosoft}
            name="Tania Andrew"
            username="canwu"
            bio="Frontend Developer • Major interest in Web Development: motivated to achieve measurable results, to deepen my knowledge and improve my skills."
          />
        </article>

        <article className="flex items-center max-w-2xl p-2 hover:cursor-pointer">
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