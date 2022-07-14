module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUpAndFade: {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        sans: ['Noto Sans'],
        poppins: ['Poppins'],
      },

      colors: {
        twitterBlue: '#2F80ED',
        gray: ' #4F4F4F',
        gray2: '#4F4F4F',
        gray3: '#828282',
        gray4: '#BDBDBD',
        grayHover: '#F2F2F2',
        lightGray: '#FAFAFA',
      },

      animation: {
        fade: 'fade 0.2s ease-in',
        slideUpAndFade: 'slideUpAndFade 0.2s ease-in-out',
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [],
};
