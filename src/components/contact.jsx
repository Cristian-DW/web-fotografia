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
    <div className=''>
    <div className=''>
        <h3>Contáctame</h3>
        <p>¿Tienes un problema que resolver? <br></br>
            Cuéntame tus ideas para desarrollar el sitio web de tus sueños.
        </p>
    </div>

    <div className=''> 
    <form onSubmit={handleSubmit}>
      <div className=''>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className=''>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='t'>
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button className='button' type="submit">Enviar</button>
    </form>
    </div>
    </div>
  );
};

export default ContactForm;

