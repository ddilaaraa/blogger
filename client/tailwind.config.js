/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        seksek:"#FAEB37",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        'melodrama-variable': ['Melodrama-Variable', 'sans'],
        'melodrama-light': ['Melodrama-Light', 'sans'],
        'melodrama-regular': ['Melodrama-Regular', 'sans'],
        'melodrama-medium': ['Melodrama-Medium', 'sans'],
        'melodrama-semibold': ['Melodrama-Semibold', 'sans'],
        'melodrama-bold': ['Melodrama-Bold', 'sans'],
        'clash-variable': ['ClashDisplay-Variable', 'sans'],
        'clash-extralight': ['ClashDisplay-Extralight', 'sans'],
        'clash-light': ['ClashDisplay-Light', 'sans'],
        'clash-regular': ['ClashDisplay-Regular', 'sans'],
        'clash-medium': ['ClashDisplay-Medium', 'sans'],
        'clash-semibold': ['ClashDisplay-Semibold', 'sans'],
        'clash-bold': ['ClashDisplay-Bold', 'sans'],
        'Inter-Light': ['Inter-Light', 'sans'],
        'Inter-Medium': ['Inter-Medium', 'sans'],
        'Inter-SemiBold': ['Inter-SemiBold', 'sans'],
      }
    },
  },
  plugins: [
    
  ],
};
