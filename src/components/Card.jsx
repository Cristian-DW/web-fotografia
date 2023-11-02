import React from "react";


const Card = (props) => {


  return (
    <div className=" rounded-3xl overflow-hidden shadow-lg bg-white w-1/4  ">
      <img className="w-full" src={props.imgCard} alt="Imagen de la tarjeta" />
      <div className="px-6 py-4">
         <h2 className="font-bold text-2xl text-yellow-500 mb-2 font-Audiowide">{props.titCard}</h2>
        <p className="text-gray-700">
        {props.contentCard}
        </p>
      <button className=" hidden button bg-gray-400 text-black  before:bg-orange-500 hover:text-orange-200  mt-10 w-48 ">
          <span class="relative z-10">
            <a href="#porfolio">Ver Más</a>
          </span>
        </button>
        </div>
    </div>
  );
};

export default Card;




