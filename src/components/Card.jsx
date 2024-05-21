import React from "react";

/**
 * Card component renders a stylized card with an image, title, content, and an optional button.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.imgCard - URL of the image to be displayed on the card.
 * @param {string} props.titCard - Title of the card.
 * @param {string} props.contentCard - Content or description text of the card.
 * @example
 * return (
 *   <Card 
 *     imgCard="https://example.com/image.jpg" 
 *     titCard="Card Title" 
 *     contentCard="This is the card content."
 *   />
 * )
 */
const Card = (props) => {
  return (
    <div className="rounded-3xl overflow-hidden shadow-lg bg-zinc-800 w-1/4">
      {/* Image section */}
      <img className="w-full" src={props.imgCard} alt="Imagen de la tarjeta" />
      <div className="px-6 py-4">
        {/* Title section */}
        <h2 className="font-bold text-2xl text-yellow-500 mb-2 font-Audiowide">{props.titCard}</h2>
        {/* Content section */}
        <p className="text-gray-700">
          {props.contentCard}
        </p>
        {/* Button section, currently hidden */}
        <button className="hidden button bg-gray-400 text-black before:bg-orange-500 hover:text-orange-200 mt-10 w-48">
          <span className="relative z-10">
            <a href="#porfolio">Ver Más</a>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Card;




