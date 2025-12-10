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
        <p className="text-gray-400 font-inter leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
          {contentCard}
        </p>
      </div>

      {/* Button section */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <button className="flex items-center text-sm font-bold text-primary tracking-wider uppercase group-hover:text-white transition-colors">
          {contentButton || 'Ver Más'}
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;




