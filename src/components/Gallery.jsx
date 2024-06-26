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
 * Gallery component renders a gallery of photos in a grid layout.
 *
 * @component
 * @example
 * return (
 *   <Gallery />
 * )
 */
export default function Gallery() {
  return (
    <>
      {/* Gallery title */}
      <h2 className="text-5xl text-center mb-32 mt-10 font-Audiowide">
        Galería
      </h2>

      {/* Gallery section */}
      <section
        id="Gallery"
        className="w-10/12 mx-auto max-h-screen grid grid-rows-6 grid-cols-4 gap-4"
      >
        {/* Photo 1 */}
        <div className="col-span-2 row-span-3 shadow-md shadow-zinc-700 border border-gray-400 overflow-hidden">
          <img src={Photo1} alt="Photo 1" width="auto" height="auto" />
        </div>

        {/* Photo 2 */}
        <div className="col-span-1 col-start-3 row-span-2 shadow-md shadow-zinc-700 border border-gray-400 overflow-hidden">
          <img src={Photo2} alt="Photo 2" width="100%" height="auto" />
        </div>

        {/* Photo 3 */}
        <div className="col-span-1 col-start-4 row-span-3 shadow-md shadow-zinc-700 border border-gray-400 overflow-hidden">
          <img src={Photo3} alt="Photo 3" width="100%" height="auto" />
        </div>

        {/* Photo 4 */}
        <div className="col-span-1 col-start-1 row-span-3 shadow-md shadow-zinc-700 border border-gray-400 overflow-hidden">
          <img src={Photo4} alt="Photo 4" width="100%" height="auto" />
        </div>

        {/* Photo 5 */}
        <div className="col-span-1 col-start-2 row-span-3 shadow-md shadow-zinc-700 border border-gray-400 overflow-hidden">
          <img src={Photo5} alt="Photo 5" width="100%" height="auto" />
        </div>

        {/* Photo 6 */}
        <div className="col-span-1 col-start-3 row-span-2 row-start-3 shadow-md shadow-zinc-700 border border-gray-400 overflow-hidden">
          <img src={Photo6} alt="Photo 6" width="100%" height="auto" />
        </div>

        {/* Photo 7 */}
        <div className="col-span-1 col-start-4 row-span-3 shadow-md shadow-zinc-700 border border-gray-400 overflow-hidden">
          <img src={Photo7} alt="Photo 7" width="100%" height="auto" />
        </div>

        {/* Photo 8 */}
        <div className="col-span-1 col-start-3 row-span-2 row-start-5 shadow-md shadow-zinc-700 border border-gray-400 overflow-hidden">
          <img src={Photo8} alt="Photo 8" width="100%" height="auto" />
        </div>
      </section>
    </>
  );
}

