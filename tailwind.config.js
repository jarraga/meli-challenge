module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#fff159',
        blue: '#2D7CF4',
        primary: '#3483fa',
        primaryHover: '#2968c8',
        gray1: '#eee',
        gray2: '#999',
        gray3: '#666',
        gray4: '#333',
      },
      screens: {
        sm: '640px',
        md: '769px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}
