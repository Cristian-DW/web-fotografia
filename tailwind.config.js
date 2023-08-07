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
    gridTemplateColumns: {
      '20': 'repeat(5, 1fr)',
    },
    gridTemplateRows: {
      '20': 'repeat(4, 1fr)',
    },
  },
};
export const plugins = [];
