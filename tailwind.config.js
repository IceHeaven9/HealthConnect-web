import tailwindcssAnimated from 'tailwindcss-animated';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors:{
              blackBlue:"#111827",
              darkBlue:"#628eff80",
              lightBlue:"#628eff",
              cakeBlue:"#90b2ff",
              lightCakeBlue:"#bdd0ff",
              light:"#cad6ff",
              carbon:"#161617",
              blueGray:"#6B7280",
              smokeWhite:"#f5f5f5"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ["roboto-regular", "sans-serif"],
        ubuntu:[ "ubuntu-regular", "sans-serif" ],
      },
    },
  },
  plugins: [tailwindcssAnimated],
}