/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: { 
      '4k': {'max': '2560px'},
      '1536': {'max': '1536px'},
      '1280': {'max': '1280px'},
      '1024': {'max': '1024px'},
      '768': {'max': '768px'},
      '640': {'max': '640px'},
      '576': {'max': '576px'},
      '430': {'max': '430px'},
      '375': {'max': '375px'}
    },
    extend: {},
  },
  plugins: [],
}

