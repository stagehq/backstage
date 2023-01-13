const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@stagehq/ui/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        'landing-xs': ['0.75rem', { lineHeight: '1rem' }],
        'landing-sm': ['0.875rem', { lineHeight: '1.5rem' }],
        'landing-base': ['1rem', { lineHeight: '1.5rem' }],
        'landing-lg': ['1.125rem', { lineHeight: '2rem' }],
        'landing-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'landing-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'landing-3xl': ['2rem', { lineHeight: '3rem' }],
        'landing-4xl': ['2.5rem', { lineHeight: '3rem' }],
        'landing-5xl': ['3rem', { lineHeight: '1' }],
        'landing-6xl': ['3.75rem', { lineHeight: '1' }],
        'landing-7xl': ['4.5rem', { lineHeight: '1' }],
        'landing-8xl': ['6rem', { lineHeight: '1' }],
        'landing-9xl': ['8rem', { lineHeight: '1' }],
      },
      colors: {
        "blue-gray": colors.slate,
        "yellow-light": "#fffd6c",
        "indigo-light": "#f5f7fe",
        background: "#f7f7f7",
        gray: colors.neutral,
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        handwritten: ["Nanum Pen Script", ...defaultTheme.fontFamily.serif],
        mono: ["jetBrainsMono", ...defaultTheme.fontFamily.mono],
      },
      animation: {
        'fade-in': 'fade-in 0.5s linear forwards',
        marquee: 'marquee var(--marquee-duration) linear infinite',
        'spin-slow': 'spin 4s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'spin-reverse-slow': 'spin-reverse 4s linear infinite',
        'spin-reverse-slower': 'spin-reverse 6s linear infinite',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
      },
      maxWidth: {
        '2xl': '40rem',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
