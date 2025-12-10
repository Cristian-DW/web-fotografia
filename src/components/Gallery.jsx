import React from "react";

import Photo1 from '../media/photos-gallery/photo1.jpg';
import Photo2 from '../media/photos-gallery/photo2.jpg';
import Photo3 from '../media/photos-gallery/photo3.jpg';
import Photo4 from '../media/photos-gallery/photo4.jpg';
import Photo5 from '../media/photos-gallery/photo5.jpg';
import Photo6 from '../media/photos-gallery/photo6.jpg';
import Photo7 from '../media/photos-gallery/photo7.jpg';
import Photo8 from '../media/photos-gallery/photo8.jpg';

/**
 * Gallery Component
 * Renders a responsive photography gallery with hover effects
 */
export default function Gallery() {
  const photos = [
    { src: Photo1, class: "md:col-span-2 md:row-span-2" },
    { src: Photo2, class: "md:col-span-1 md:row-span-1" },
    { src: Photo3, class: "md:col-span-1 md:row-span-2" },
    { src: Photo4, class: "md:col-span-1 md:row-span-1" },
    { src: Photo5, class: "md:col-span-1 md:row-span-1" },
    { src: Photo6, class: "md:col-span-2 md:row-span-1" },
    { src: Photo7, class: "md:col-span-1 md:row-span-2" },
    { src: Photo8, class: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <section id="gallery" className="section-padding bg-fondo relative">
      <div className="limited">
        <h2 className="title mb-8">Nuestra <span className="text-gradient-gold">Galería</span></h2>
        <p className="subtitle !text-xl !font-normal text-gray-400 max-w-2xl mx-auto mb-16">
          Una selección curada de nuestros mejores momentos capturados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-lg cursor-pointer ${photo.class}`}
            >
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
              </div>
              <img
                src={photo.src}
                alt={`Gallery photo ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

