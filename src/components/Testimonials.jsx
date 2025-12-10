import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

/**
 * Testimonials Component
 * Renders customer testimonials with premium carousel design
 */
export default function Testimonials() {
  const testimonials = [
    {
      text: "Frame Fusion capturó la esencia mágica de nuestra boda. Las fotos son simplemente impresionantes y nos hacen revivir ese día cada vez que las vemos.",
      name: "Ana García",
      role: "Novia Feliz",
      image: "https://i.ibb.co/4g1D9cv/imgslider1.png"
    },
    {
      text: "Profesionalismo puro. La sesión de fotos corporativa elevó la imagen de nuestra empresa a otro nivel. Altamente recomendados.",
      name: "Carlos Rodríguez",
      role: "CEO, TechStart",
      image: "https://i.ibb.co/4g1D9cv/imgslider1.png"
    },
    {
      text: "Tienen un ojo increíble para los detalles. Mis fotos de retrato salieron mejor de lo que jamás imaginé. ¡Gracias por hacerme sentir tan cómoda!",
      name: "Laura Martínez",
      role: "Modelo",
      image: "https://i.ibb.co/4g1D9cv/imgslider1.png"
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-fondo2 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -left-20 top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>

      <div className="limited relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">

          {/* Header Section */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-primary mb-4 animate-fade-in">TESTIMONIOS</h3>
            <h2 className="title !text-left !mb-8 !lg:text-6xl">
              Lo que dicen <br />
              <span className="text-gradient-gold">nuestros clientes</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md mb-12 font-inter leading-relaxed">
              La satisfacción de quienes confían en nosotros es nuestra mayor recompensa. Historias reales de experiencias inolvidables.
            </p>

            {/* Custom Navigation Helper - Visual Only */}
            <div className="hidden lg:flex gap-4">
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <div className="w-4 h-1 bg-gray-600 rounded-full"></div>
              <div className="w-4 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="glass-card p-8 md:p-12 rounded-3xl relative">
            <div className="absolute top-8 right-8 text-primary opacity-20">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L14.017 18C14.017 16.0547 14.5029 14.5516 15.4746 13.4912C16.4463 12.4316 17.6533 11.5977 19.0957 10.9883L19.7822 10.666L19.7822 7.6416C19.0303 7.61816 18.2812 7.42676 17.5352 7.06836C16.7891 6.70996 16.1553 6.22363 15.6309 5.60938L14.8818 4.79395H10.1504V10.2295C10.1504 12.4492 10.6543 14.6592 11.6621 16.8584C12.6709 19.0576 13.4561 20.4385 14.017 21ZM4.97266 21L4.97266 18C4.97266 16.0547 5.45898 14.5516 6.43066 13.4912C7.40234 12.4316 8.60938 11.5977 10.0518 10.9883L10.7383 10.666L10.7383 7.6416C9.98633 7.61816 9.2373 7.42676 8.49023 7.06836C7.74512 6.70996 7.11035 6.22363 6.58691 5.60938L5.83789 4.79395H1.10645V10.2295C1.10645 12.4492 1.61035 14.6592 2.61816 16.8584C3.62695 19.0576 4.41211 20.4385 4.97266 21Z" />
              </svg>
            </div>

            <CarouselProvider
              naturalSlideWidth={100}
              isIntrinsicHeight={true}
              totalSlides={testimonials.length}
              isPlaying={true}
              interval={5000}
            >
              <Slider>
                {testimonials.map((testimonial, index) => (
                  <Slide index={index} key={index}>
                    <div className="flex flex-col h-full justify-between py-4">
                      <p className="text-xl md:text-2xl font-playfair italic text-gray-200 leading-relaxed mb-8">
                        "{testimonial.text}"
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary p-1">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">{testimonial.name}</p>
                          <p className="text-primary text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </Slide>
                ))}
              </Slider>

              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
                <ButtonBack className="p-3 rounded-full border border-white/20 text-white hover:bg-primary hover:border-primary transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </ButtonBack>
                <ButtonNext className="p-3 rounded-full border border-white/20 text-white hover:bg-primary hover:border-primary transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>
        </div>
      </div>
    </section>
  );
}

