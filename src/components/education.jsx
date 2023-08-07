import React, { useState } from 'react';
import ImgSena from "../media/sena.png"
import ImgMicrosoft from "../media/microsoft.png"
import ImgGoogle from "../media/google.png"
import Modals from "./modals"

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
    
    <div id="education" className="">
      <div className="">
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
      <div></div>
      <div className="">

          <article className=""  onClick={() => manejarClicIcono('icono1')}    >
          <img className="" src={ImgMicrosoft} alt="curso"/>
          <p>Certificación de microsoft en fundamentos del desarrollo de software</p>
          <Modals show={mostrarModal} onHide={manejarCierreModal} boton={iconoSeleccionado}onClose={manejarCierreModal}/>

          </article>
          <article className="" onClick={() => manejarClicIcono('icono2')}>
          <img className="" src={ImgGoogle} alt="curso"/>
          <p>Certificación de Google en fundamentos de marketing digital</p>
          <Modals show={mostrarModal} onHide={manejarCierreModal} boton={iconoSeleccionado}onClose={manejarCierreModal}/>

          </article>

          <article className=""  >
          <img className="" src={ImgSena} alt="curso"  onClick={() => manejarClicIcono('icono3')}/>
          <p>Tecnologo del SENA en analisis y desarrollo de software </p>
          <Modals show={mostrarModal} onHide={manejarCierreModal} boton={iconoSeleccionado}onClose={manejarCierreModal}/>
          
          </article>

      </div>
    </div>
  );
}

export default Education;