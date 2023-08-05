/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      fondo: '#211F40',
      fondo2:'#6919ff',
      letra:'#fffef9',
      },
      fontFamily:{
        roboto:['Roboto Slab'],
      },
    },
  },
  plugins: [
    
  ],
}

