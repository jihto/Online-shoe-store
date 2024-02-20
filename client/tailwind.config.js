/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px', 
    },
    extend: {
      backgroundImage: {
        't-shirt': "url('public/images/T-shirt.png')",
      },
      colors:{
        'base1': '#18EFFA',
        'base2': '#0D72FD',
        'primary': 'white',
        "secondary" : "black"
      },
      dropShadow:{
        // 'full':'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        move:{
          '0%, 100%': { transform: 'translateY(-40px)' },
          '50%': { transform: 'translateY(10px)' },
        }
      }, 
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
        'move-slow': 'move 5s linear infinite',
      }
    },
  },
  plugins: [],
}