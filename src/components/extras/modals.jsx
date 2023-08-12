import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';

  function Modals({ show, onHide, boton }) {
    const manejarCierreModal = () => {
      onHide();
    };


  const dialogHeaderStyles = 'bg-blue-500 text-white';
  const dialogBodyStyles = 'h-[20rem] overflow-scroll bg-gray-100';
  const dialogContentStyles = 'text-gray-800';

  return (
    <Dialog open={show} onClose={manejarCierreModal} size="md" className="mx-auto">
      {boton === 'icono1' && (
        <>
          <DialogHeader className={dialogHeaderStyles}>Certificación de Microsoft</DialogHeader>
          <DialogBody divider className={dialogBodyStyles}>
            <Typography className={dialogContentStyles}>
              Contenido para el icono 1 - Certificación de Microsoft.
            </Typography>
          </DialogBody>
        </>
      )}

      {boton === 'icono2' && (
        <>
          <DialogHeader className={dialogHeaderStyles}>Certificación de Google</DialogHeader>
          <DialogBody divider className={dialogBodyStyles}>
            <Typography className={dialogContentStyles}>
              Contenido para el icono 2 - Certificación de Google.
            </Typography>
          </DialogBody>
        </>
      )}

      {boton === 'icono3' && (
        <>
          <DialogHeader className={dialogHeaderStyles}>Tecnólogo del SENA</DialogHeader>
          <DialogBody divider className={dialogBodyStyles}>
            <Typography className={dialogContentStyles}>
              Contenido para el icono 3 - Tecnólogo del SENA.
            </Typography>
          </DialogBody>
        </>
      )}

      <DialogFooter className='space-x-2'>
        <Button variant="outlined" color="red" buttonType="link" onClick={manejarCierreModal}>
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
