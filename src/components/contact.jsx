import { useState } from 'react';

/**
 * Renders a contact form.
 * @returns {JSX.Element} The rendered contact form.
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  /**
   * Handles changes in the form inputs.
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles the form submission event.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code here to send the form data to your server or perform any action with the collected data.
    console.log(formData);
  };

  return (
    <div
      id="contact"
      className="p-10 lg:grid grid-cols-7 justify-center items-center lg:px-40 min-h-screen"
    >
      <div className="mb-8 lg:col-span-3 lg:col-start-2 flex-col justify-center items lg:pr-32">
        <h3 className="subtitle text-center lg:text-left">Contáctame</h3>
        <h4 className="text">
          <span className="text-xl lg:text-3xl">
            ¿Tienes un problema que resolver?
          </span>
        </h4>
        <p className="text-md font-light lg:text-2xl">
          Cuéntame tus ideas para desarrollar el sitio web de tus sueños.
        </p>
      </div>

      <div className="lg:col-span-2 lg:lg:col-start-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-1 font-light">
              Nombre
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1 font-light">
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="message" className="mb-1 font-light">
              Mensaje
            </label>
            <textarea
              className="w-full min-h-20 max-h-32 px-4 py-3 border border-gray-300 bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="flex h-12 w-full lg:w-full mt-10 items-center justify-center overflow-hidden bg-transparent border shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:bg-white  before:text-opacity-10 before:duration-500 before:ease-out hover:shadow-white hover:before:h-12 hover:before:w-[28.2rem] hover:text-fondo"
            type="submit"
          >
            <span className="z-20">Enviar &#x1F680;</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

