import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        "theme-grey": "#d4d4d4",
        "theme-white": "#e1e1e1",
        "theme-black": "#151515",
        "theme-darkgrey": "#343434",
        "theme-brown": "#acaca0",
        "theme-red": "#d63124",
      },
      borderRadius: {
        'default': '8px',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          xl:'1024px',
          '2xl':'1440px'
        }
      },
      backgroundImage: {
        'theme-pattern': "url('/images/background/background-02.svg')"
      },
      boxShadow: {
        'theme-1': 'rgba(0, 0, 0, 0.1) 6px 2px 16px 0px, rgba(0, 0, 0, .05) -6px -2px 16px 0px',
        'theme-2': 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
        'card': 'rgba(0, 0, 0, 0.1) 2.4px 2.4px 3.2px'
      }
    },
  },
  plugins: [],
}
export default config
