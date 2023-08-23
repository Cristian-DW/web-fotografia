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
    <div id='contact' className=' flex flex-wrap  gap-x-10 w-screen p-10 lg:p-40 bg-fondo grid-cols-5 justify-center items-center  min-h-screen '>
    <div className='col-2'>
        <h3 className=''>Contáctame</h3>
        <p>¿Tienes un problema que resolver? <br></br>
            Cuéntame tus ideas para desarrollar el sitio web de tus sueños.
        </p>
    </div>

    <div className='col-3'> 
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col mb-2'>
        <label htmlFor="name">Nombre</label>
        <input className='input'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='flex flex-col mb-2'>
        <label htmlFor="email">Email</label>
        <input className='input w-auto h-12'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='flex flex-col mb-2'>
        <label htmlFor="message">Mensaje</label>
        <textarea className='input min-w-20 max-h-28'
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button className='button hover:text-fondo mt-6 ' type="submit">Enviar</button>
    </form>
    </div>
    </div>
  );
};

export default ContactForm;

