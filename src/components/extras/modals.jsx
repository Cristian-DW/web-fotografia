import React from 'react';
import {Button, Dialog, DialogHeader, DialogBody,  DialogFooter, Typography,} from "@material-tailwind/react";

function Modals({ show, onHide, boton }) {
  const manejarCierreModal = () => {
    onHide();
  };

  return (
    <Dialog open={show} onClose={manejarCierreModal} className='size="sm"'>
      {boton === 'icono1' && (
        <>
          <DialogHeader className="bg-blue-500 text-white">Certificación de Microsoft</DialogHeader>
          <DialogBody divider className='h-[40rem] overflow-scroll'>
            <Typography>
              Contenido para el icono 1 - Certificación de Microsoft.
            </Typography>
          </DialogBody>
        </>
      )}

      {boton === 'icono2' && (
        <>
          <DialogHeader className="bg-green-500 text-white">Certificación de Google</DialogHeader>
          <DialogBody divider className='h-[40rem] overflow-scroll'>
            <Typography>
              Contenido para el icono 2 - Certificación de Google.
            </Typography>
          </DialogBody>
        </>
      )}

      {boton === 'icono3' && (
        <>
          <DialogHeader className="bg-purple-500 text-white">Tecnólogo del SENA</DialogHeader>
          <DialogBody divider className='h-[40rem] overflow-scroll'>
            <Typography>
              Contenido para el icono 3 - Tecnólogo del SENA.
            </Typography>
          </DialogBody>
        </>
      )}

      <DialogFooter className='space-x-2'>
        <Button variant="outlined" color="red"  buttonType="link" onClick={manejarCierreModal}>
          Cerrar
        </Button>
        <Button color="green" onClick={manejarCierreModal}>
          Guardar cambios
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default Modals;
