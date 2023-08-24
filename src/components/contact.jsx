import React, { useState } from 'react';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar el código para enviar el formulario a tu servidor o realizar alguna acción con los datos recopilados.
    console.log(formData);
  };

  return (
    <div id='contact' className=' flex flex-wrap  gap-x-32 w-full p-10 lg:p-40 bg-fondo grid-cols-5 justify-center items-center  min-h-screen '>
    <div className='col-2 text-left'>
        <h3 className='text-xl lg:text-5xl mb-4'>Contáctame</h3>
        <h4 className='text '><span className='text-xl lg:text-3xl'>¿Tienes un problema que resolver?</span></h4>
        <p className='text-md font-light  lg:text-2xl'>Cuéntame tus ideas para desarrollar el sitio web de tus sueños.</p>
        
    </div>

    <div className='col-3 w-1/4'> 
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col mb-4'>
        <label htmlFor="name" className='mb-1 font-light '>Nombre</label>
        <input className='w-full px-4 py-3 border border-gray-300  bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors  '
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='flex flex-col mb-4'>
        <label htmlFor="email" className='mb-1 font-light '>Email</label>
        <input className='w-full px-4 py-3 border border-gray-300  bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors '
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='flex flex-col mb-4'>
        <label htmlFor="message" className='mb-1 font-light  '>Mensaje</label>
        <textarea className='w-full min-h-20 max-h-32   px-4 py-3 border border-gray-300  bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors '
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button className="flex h-12 w-96 mt-10 items-center justify-center overflow-hidden bg-transparent border shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:bg-white  before:text-opacity-10 before:duration-500 before:ease-out hover:shadow-white hover:before:h-12 hover:before:w-96 hover:text-fondo" type="submit">Enviar 	&#x1F680;</button>
    </form>
    </div>
    </div>
  );
};

export default ContactForm;

