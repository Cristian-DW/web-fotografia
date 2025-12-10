import React from 'react';
import imgAbout from '../media/img-about.webp';

/**
 * About Component
 * Renders the about section with premium layout and typography
 */
function About() {
  return (
    <div id="about" className="section-padding relative overflow-hidden bg-fondo">
      <div className="limited relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h3 className="text-sm font-bold tracking-[0.2em] text-primary mb-4 animate-fade-in">SOBRE NOSOTROS</h3>
            <h2 className="title text-left lg:text-5xl mb-8 !text-left !bg-none !text-white !block">
              Capturando la <span className="text-gradient-gold">autenticidad</span> de la vida
            </h2>

            <div className="space-y-6 text-gray-300 font-inter text-lg font-light leading-relaxed">
              <p>
                En <span className="font-bold text-white">Frame Fusion</span>, la fotografía es más que una profesión; es nuestra forma de ver el mundo. Somos un equipo apasionado comprometido en transformar momentos efímeros en recuerdos eternos.
              </p>
              <p>
                Cada clic de nuestra cámara busca detener el tiempo y capturar la emoción cruda del instante. Desde bodas emotivas hasta retratos personales únicos, nuestra misión es narrar tu historia con elegancia y creatividad.
              </p>
              <p>
                Permítenos ser los artífices de tus recuerdos inolvidables. Únete a nosotros en este emocionante viaje a través de la magia de la fotografía.
              </p>
            </div>

            <div className="mt-12">
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-fondo bg-primary rounded-none hover:bg-white transition-colors duration-300 tracking-wider">
                CONTÁCTANOS
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="order-1 lg:order-2 relative group">
            <div className="absolute inset-0 border-2 border-primary/30 transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img
                className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                src={imgAbout}
                alt="About Frame Fusion"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
