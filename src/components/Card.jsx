import React from "react";

/**
 * Card component renders a stylized card with glassmorphism design
 */
const Card = ({ imgCard, titCard, contentCard, contentButton }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden p-6 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/10 group h-full flex flex-col">
      {/* Icon/Image section */}
      <div className="w-16 h-16 mb-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-colors duration-300">
        {/* Placeholder for icon if image is used as icon, otherwise can be adjusted */}
        <img className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" src={imgCard} alt={titCard} />
      </div>

      {/* Content section */}
      <div className="flex-grow">
        <h3 className="text-2xl font-playfair font-bold text-white mb-4 group-hover:text-primary transition-colors">{titCard}</h3>
        <p className="text-gray-400 font-inter leading-relaxed group-hover:text-gray-300 transition-colors">
          {contentCard}
        </p>
      </div>
    </div>
  );
};

export default Card;




