import React, { useEffect, useState } from "react";

const palabras = ["Creativo", "Resolutivo", "Organizado" , "Resiliente"];

function Title() {
  const [primeraPalabra, setPrimeraPalabra] = useState(0);

  useEffect(() => {
    const intervalos = setInterval(() => {
      setPrimeraPalabra((indiceanterior) => (indiceanterior + 1) % palabras.length);
    }, 2000);

    return () => clearInterval(intervalos);
  }, []);

  return (
        <h2 className="word animate-fade-down animate-once animate-delay-[1200ms] animate-ease-linear">{palabras[primeraPalabra]}</h2>

  );
}

export default Title;
