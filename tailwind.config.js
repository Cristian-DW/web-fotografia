/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];

export const theme = {
  extend: {
    colors: {
      fondo: '#050505', // Deep black for better contrast
      fondo2: '#1a1a1a', // Rich dark gray
      primary: '#D4AF37', // Gold accent
      secondary: '#C0C0C0', // Silver accent
      accent: '#8A2BE2', // Deep purple accent (kept from original idea but refined)
      letra: '#f4f4f5', // Soft white for text
      glass: 'rgba(255, 255, 255, 0.05)',
    },
    fontFamily: {
      audiowide: ['Audiowide', 'cursive'],
      playfair: ['"Playfair Display"', 'serif'], // New premium heading font
      inter: ['Inter', 'sans-serif'], // New clean body font
      roboto: ['Roboto Condensed', 'sans-serif'],
    },
    screens: {
      'xxl': '2560px',
    },
    animation: {
      'fade-in': 'fadeIn 1s ease-out',
      'slide-up': 'slideUp 0.8s ease-out',
      'slide-in-right': 'slideInRight 0.5s ease-out',
      'float': 'float 6s ease-in-out infinite',
      'shimmer': 'shimmer 2s linear infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      slideInRight: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      shimmer: {
        'from': { backgroundPosition: '0 0' },
        'to': { backgroundPosition: '-200% 0' },
      },
    },
  },
};
export const plugins = [
  require('tailwindcss-animated')
];
