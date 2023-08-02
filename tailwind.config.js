/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      fondo: '#2f2c31',
      fondo2:'#645ebf',
      },
      fontFamily:{
        roboto:['Roboto Slab'],
      },
    },
  },
  plugins: [
    
  ],
}

