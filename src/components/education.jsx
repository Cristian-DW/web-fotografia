import React from "react";
import { ImageWithPopover } from "./extras/Popover";
import ImgMicrosoft from "../media/microsoft.png";
import ImgGoogle from "../media/google.png";
import ImgSena from "../media/sena.png"; // Adjust the path accordingly

function Education() {
  return (
    <div
      id="education"
      className="p-10 lg:grid lg:py-72 grid-cols-7 gap-x-10 justify-center items-center lg:px-40 min-h-screen "
    >
      <div className=" mb-8 lg:col-span-4 flex-col xxl:flex justify-center lg:border-r-2 lg:pr-4">
        <h3 className="text-center text-xl lg:text-5xl mb-4 lg:text-left">
          Educación
        </h3>
        <p className="text-md font-light lg:text-2xl">
          Profesional capacitado y apasionado por la creación de soluciones tecnológicas innovadoras. Mi sólida formación en análisis y desarrollo de aplicaciones me ha brindado una comprensión profunda de cómo crear sistemas eficientes y robustos. Sin embargo, mi enfoque va más allá de la funcionalidad técnica: combino mis habilidades técnicas con un conocimiento profundo de marketing digital y diseño UX/UI para ofrecer productos que no solo cumplen con los requisitos técnicos, sino que también cautivan a los usuarios y generan resultados comerciales positivos.
        </p>
      </div>
      <div className="lg:col-span-3 flex  justify-between">
        <article className="hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgSena}
            name="Certificación Tecnologo en analisis y desarrollo de software"
            bio="Tuve la oportunidad de participar en"
            fecha="2010"
            ubication="caca"
          />
        </article>

        <article className=" hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgMicrosoft}
            name="Tania Andrew"
            username="canwu"
            bio="Frontend Developer • Major interest in Web Development: motivated to achieve measurable results, to deepen my knowledge and improve my skills."
            fecha="2010"
            ubication="caca"
          />
        </article>

        <article className="hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgGoogle}
            name="Tania Andrew"
            username="canwu"
            bio="Frontend Developer • Major interest in Web Development: motivated to achieve measurable results, to deepen my knowledge and improve my skills."
            fecha="2010"
            ubication="caca"
          />
        </article>
        
        <article className="hidden lg:block hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgGoogle}
            name="Tania Andrew"
            username="canwu"
            bio="Frontend Developer • Major interest in Web Development: motivated to achieve measurable results, to deepen my knowledge and improve my skills."
            fecha="2010"
            ubication="caca"
          />
        </article>
      </div>
    </div>
  );
}
export default Education;