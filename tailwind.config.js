/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];

export const theme = {
  extend: {
    colors: {
      fondo: '#080806',
      fondo2: '#6919ff',
      letra: '#fffef9',
    },
    fontFamily: {
      Audiowide: ['Audiowide'],
      roboto: ['Roboto Condensed'],
    },
    // fontSize:{
    //   tit:'120px',
    // },
    screens: {
      'xxl': '2560px',
    },

  },
};
export const plugins = [
  require('tailwindcss-animated')
];
