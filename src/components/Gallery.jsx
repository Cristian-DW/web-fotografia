import React, {useEffect, Masonry, useRef} from "react";

   const photos = [
      { id: 1, url: 'URL_DE_LA_IMAGEN_1', title: 'Título 1', width: 1, height: 2 },
      { id: 2, url: 'URL_DE_LA_IMAGEN_2', title: 'Título 2', width: 2, height: 1 },
      { id: 3, url: 'URL_DE_LA_IMAGEN_3', title: 'Título 3', width: 1, height: 1 },
      // Agrega más objetos para más fotos con diferentes tamaños
    ];

   export default function Gallery() {
      const galleryRef = useRef(null);

  useEffect(() => {
    const masonry = new Masonry(galleryRef.current, {
      // Configura las opciones de Masonry según tus necesidades
      itemSelector: '.photo-item',
      columnWidth: 200, // Ancho de las columnas
      gutter: 20, // Espacio entre los elementos
    });
    masonry.layout();
  }, []);

  return (
    <>
      <section id="Gallery" className=" w-screen min-h-screen ">
        <div ref={galleryRef} className="grid">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`photo-item w-${(photo.width * 1) / 4} h-${
                (photo.height * 1) / 4
              }`}
            >
              <img src={photo.url} alt={photo.title} />
              <p>{photo.title}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
