/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#6366f1',
        secondary: '#10b981',
        dark: '#0f172a',
        light: '#f8fafc',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in forwards',
        'slide-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-right': 'slideInRight 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideInLeft: {
          'from': { transform: 'translateX(-50px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          'from': { transform: 'translateX(50px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
