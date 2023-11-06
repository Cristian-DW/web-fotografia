import React from "react";
//images
import Photo1 from '../media/photos-gallery/photo1.jpg'
import Photo2 from '../media/photos-gallery/photo2.jpg'
import Photo3 from '../media/photos-gallery/photo3.jpg'
import Photo4 from '../media/photos-gallery/photo4.jpg'
import Photo5 from '../media/photos-gallery/photo5.jpg'
import Photo6 from '../media/photos-gallery/photo6.jpg'
import Photo7 from '../media/photos-gallery/photo7.jpg'
import Photo8 from '../media/photos-gallery/photo8.jpg'


export default function Gallery() {
  return (
    <>
      <section id="Gallery" className=" w-10/12 mx-auto  max-h-screen grid grid-rows-6 grid-cols-4 gap-4">
          <div className=" col-span-2 row-span-3 border-4 border-red-600  overflow-hidden">
          <img src={Photo1} alt="img" width= 'auto' height= 'auto'  />
          </div>
          <div className="col-span-1 col-start-3 row-span-2 border-4 border-red-600  overflow-hidden" >
            <img src={Photo2} alt="img"  width= '100%' height= 'auto'  />
          </div>
          <div className="col-span-1 col-start-4 row-span-3 border-4 border-red-600  overflow-hidden">
          <img src={Photo3} alt="img" width= '100%' height= 'auto' />
          </div>
          <div className="col-span-1 col-start-1 row-span-3 border-4 border-red-600  overflow-hidden">
          <img src={Photo4} alt="img"  width= '100%' height= 'auto'  />
          </div>
          <div className="col-span-1 col-start-2 row-span-3 border-4 border-red-600  overflow-hidden">
          <img src={Photo5} alt="img"  width= '100%' height= 'auto'  />
          </div>
          <div className="col-span-1 col-start-3 row-span-2 row-start-3 border-4 border-red-600  overflow-hidden">
          <img src={Photo6} alt="img"  width= '100%' height= 'auto' />
          </div>
          <div className="col-span-1 col-start-4 row-span-3 border-4 border-red-600  overflow-hidden">
          <img src={Photo7} alt="img"  width= '100%' height= 'auto'  />
          </div>
          <div className="col-span-1 col-start-3 row-span-2 row-start-5 border-4 border-red-600  overflow-hidden">
          <img src={Photo8} alt="img"  width= '100%' height= 'auto'  />
          </div>
      </section>
    </>
  );
}
