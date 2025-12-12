import { useState } from 'react';

/**
 * ContactForm Component
 * Renders a premium contact form with real-time validation
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'name' && value.trim().length < 2) {
      error = 'El nombre debe tener al menos 2 caracteres';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Email inválido';
      }
    } else if (name === 'message' && value.trim().length < 10) {
      error = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors({ ...errors, [name]: error });
    return error === '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isMessageValid = validateField('message', formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      console.log(formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTouched({});

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  const InputField = ({ label, name, type = "text", value, onChange }) => {
    const hasError = touched[name] && errors[name];
    const isValid = touched[name] && !errors[name] && value;

    return (
      <div className="relative mb-8 group">
        <input
          className={`block py-4 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors duration-300 ${hasError ? 'border-red-500' : isValid ? 'border-green-500' : 'border-gray-600 focus:border-primary'
            }`}
          type={type}
          id={name}
          name={name}
          placeholder=" "
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required
        />
        <label
          htmlFor={name}
          className={`absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${hasError ? 'text-red-400' : isValid ? 'text-green-400' : 'text-gray-400 peer-focus:text-primary'
            }`}
        >
          {label}
        </label>
        {hasError && (
          <p className="text-red-400 text-sm mt-1">{errors[name]}</p>
        )}
      </div>
    );
  };

  const TextAreaField = ({ label, name, value, onChange }) => {
    const hasError = touched[name] && errors[name];
    const isValid = touched[name] && !errors[name] && value;

    return (
      <div className="relative mb-8 group">
        <textarea
          className={`block py-4 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors duration-300 min-h-[120px] resize-none ${hasError ? 'border-red-500' : isValid ? 'border-green-500' : 'border-gray-600 focus:border-primary'
            }`}
          id={name}
          name={name}
          placeholder=" "
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required
        />
        <label
          htmlFor={name}
          className={`absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${hasError ? 'text-red-400' : isValid ? 'text-green-400' : 'text-gray-400 peer-focus:text-primary'
            }`}
        >
          {label}
        </label>
        {hasError && (
          <p className="text-red-400 text-sm mt-1">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div id="contact" className="section-padding bg-fondo relative flex items-center justify-center min-h-screen">
      {/* Background decoration */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]"></div>

      <div className="limited w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-bold tracking-[0.2em] text-primary mb-4 animate-fade-in">CONTACTO</h3>
            <h2 className="title !text-left !mb-6">
              ¿Listo para crear <br />
              <span className="text-gradient-gold">el próximo proyecto?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 font-inter leading-relaxed">
              Cuéntanos tus ideas y desarrollemos juntos el sitio web de tus sueños. Estamos ansiosos por empezar a trabajar contigo.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>contacto@framefusion.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>+34 123 456 789</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-10 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
                  ✓ ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                </div>
              )}

              <InputField
                label="Nombre Completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                label="Correo Electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextAreaField
                label="Mensaje"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />

              <button
                className={`w-full py-4 px-6 rounded-lg text-black font-bold text-lg tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-lg ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-white hover:shadow-primary/50'}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ENVIANDO...
                  </span>
                ) : (
                  <span>ENVIAR MENSAJE</span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactForm;
