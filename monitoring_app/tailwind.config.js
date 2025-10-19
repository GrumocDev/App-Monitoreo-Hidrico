/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue:{
          DEFAULT: "#4C98CF",
          steel: "#368FD0",
        },
        gray:{
          light: "#D9D9D9",
          DEFAULT: "#5A5A5A",
          dark: "#F9F8F8"
        },
        green:{
          mediumSpring: "#12E09B",
          teal: "#068A5E",
          LightSea: "#08bd80"
        },
        cyan:{
          dark: "#0F859F"
        },
        yellow:{
          goldenrod: "#D88D1C",
          gold: "#FCCA1A",
        },
        slate:{
          darkgray: "#0B5D51"
        },
        salmon:{
          light: "#F2B963"
        },
        white:{
          DEFAULT: "#FFFFFF",
          ghost: "#F8F9FC"
        }
      },
      boxShadow: {
        // TODO how can I get this color from the colors above?
        green: '-1px 2px 0 0 #068A5E',
        retro: '-1px 2px 0 0 #D3D9DB',
      },
    },
  },
  plugins: [],
  corePlugins: {
    fontFamily: false,
  }
}
