/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      fondo: '#211F40',
      fondo2: '#6919ff',
      letra: '#fffef9',
    },
    fontFamily: {
      roboto: ['Roboto Slab'],
    },
  },
};
export const plugins = [];

