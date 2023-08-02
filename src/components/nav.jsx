import React from "react";
import Logo from "../media/logo.svg"
import Red1 from "../media/bxl-gmail.svg"
import Red2 from "../media/bxl-linkedin.svg"
import Red3 from "../media/bxl-github.svg"



function Nav() {

  return (
    <div className="flex justify-around items-center bg-purple-400"  >
      <div>
        <a href="/"><img src={Logo} alt="logo" /></a>
      </div>
      <div className="flex gap-x-4 text-white  ">
        <a href="#about">Conóceme</a>
        <a href="#Education">Educación</a>
        <a href="#project">Porfolio</a>
        <a href="#contact">Contáctame</a>
      </div>
      <div className="flex justify-between  ">
        <a href="mailto:cristtiiank@gmail.com"> <img className="red1" src={Red1} alt="gmail"/></a>
        <a href="https://www.linkedin.com/in/cristian-castro-pineda"> <img className="red2" src={Red2} alt="linkedln"/></a>
        <a href="https://github.com/Cristian-DW"> <img className="red3" src={Red3} alt="gitHub"/></a>
      </div>
    </div>
  );
}

export default Nav;