import React from "react";
import Card from "./Card";
// Need to update imports to use different images if available, for now using placeholder logic or same image
import Img from "../media/logo.png";
// In a real scenario we would import specific icons/images for each service

/**
 * Services Component
 * Renders the services section with glassmorphism cards
 */
function Services() {
  const services = [
    {
      title: 'Digitalización',
      description: 'Preserva tus recuerdos más preciados. Digitalizamos tus fotografías antiguas con la máxima calidad para que perduren eternamente.',
      img: Img
    },
    {
      title: 'Sesiones de Estudio',
      description: 'Retratos profesionales que capturan tu mejor versión. Iluminación experta y dirección artística para resultados impactantes.',
      img: Img
    },
    {
      title: 'Eventos Sociales',
      description: 'Cobertura completa de tus momentos especiales. Desde bodas hasta graduaciones, no dejamos escapar ningún detalle importante.',
      img: Img
    }
  ];

  return (
    <section id="services" className="section-padding relative bg-fondo2 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/50 to-transparent z-0"></div>

      <div className="limited relative z-10 w-full">
        <h2 className="title">Nuestros Servicios</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-20 font-inter text-lg">
          Ofrecemos una gama completa de soluciones fotográficas diseñadas para satisfacer tus necesidades creativas y profesionales.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              imgCard={service.img}
              titCard={service.title}
              contentCard={service.description}
              contentButton='Ver Detalles'
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
