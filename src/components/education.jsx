import React, { useState } from 'react';
import ImgSena from "../media/sena.png"
import ImgMicrosoft from "../media/microsoft.png"
import ImgGoogle from "../media/google.png"
import Modals from "../components/extras/modals"

function Education() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [iconoSeleccionado, setIconoSeleccionado] = useState('');

  const manejarCierreModal = () => {
    setMostrarModal(false);
  };

  const manejarClicIcono = (icono) => {
    setIconoSeleccionado(icono);
    setMostrarModal(true);
  };

  return (
    <div id="education" className=" md:grid grid-cols-5 gap-10 justify-center items-center md:p-32">
      <div className="md:col-span-2 flex-col  xxl:flex justify-center ">
        <h3>Educación</h3>
        <p>
          Profesional con habilidades para interpretar y diseñar sistemas
          informáticos que satisfacen las necesidades del usuario. Con
          conocimientos en programación, análisis de datos, interfaces de
          usuario, bases de datos y seguridad informática. Destreza en trabajar
          con computadoras, comunicarse con usuarios y colegas, y experiencia en
          metodologías ágiles para el desarrollo de software.
        </p>
      </div>
      <div className="md:col-span-3">
        <article className="flex items-center justify-center max-w-xl border" onClick={() => manejarClicIcono('icono1')}>
          <img className="w-16" src={ImgMicrosoft} alt="curso " />
          <p>Certificación de Microsoft en fundamentos del desarrollo de software</p>
        </article>

        <article className="flex items-center justify-center max-w-xl border " onClick={() => manejarClicIcono('icono2')}>
          <img className="w-16" src={ImgGoogle} alt="curso" />
          <p>Certificación de Google en fundamentos de marketing digital</p>
        </article>

        <article className="flex items-center justify-center  max-w-xl border" onClick={() => manejarClicIcono('icono3')}>
          <img className="w-16" src={ImgSena} alt="curso" />
          <p>Tecnólogo del SENA en análisis y desarrollo de software</p>
        </article>

      </div>

      {/* Modal para el icono seleccionado */}
      {mostrarModal && (
        <Modals show={mostrarModal} onHide={manejarCierreModal} boton={iconoSeleccionado} />
      )}

    </div>
  );
}

export default Education;
