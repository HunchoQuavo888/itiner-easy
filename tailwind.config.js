// tailwind.config.js
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        blob: "blob 10s infinite",
      },
      keyframes:{
        blob:{
          "0%":{
            transform:"translate(0px,0px) scale(1)"
          },
          "33%":{
            transform:"translate(30px,-10px) scale(1.1)"
          },
          "66%":{
            transform:"translate(-10px,10px) scale(0.9)"
          },
          "100%":{
            transform:"translate(0px,0px) scale(1)"
          }
        }
      },
      fontFamily:{
        'navbar':['Fjalla One', 'sans-serif'],
        'body':['Rubik', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    },
    animation: {
      'text-slide': 'text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
  },
  keyframes: {
      'text-slide': {
          '0%, 16%': {
              transform: 'translateY(0%)',
          },
          '20%, 36%': {
              transform: 'translateY(-16.66%)',
          },
          '40%, 56%': {
              transform: 'translateY(-33.33%)',
          },
          '60%, 76%': {
              transform: 'translateY(-50%)',
          },
          '80%, 96%': {
              transform: 'translateY(-66.66%)',
          },
          '100%': {
              transform: 'translateY(-83.33%)',
          },
      },                    
    },
  },
  daisyui: {
    themes: [
      {
        aqua: {
          "base-100": "#F0F8FF"
        }
      }
    ],
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
    require("daisyui"),
    require("tailwindcss")
  ],
}
