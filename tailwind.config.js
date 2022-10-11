module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      fontSize: {
        xxs: ['12px', { lineHeight: '14px' }],
        xs: ['13px', { lineHeight: '15px' }],
        sm: ['14px', { lineHeight: '16px' }],
        base: ['16px', { lineHeight: '19px' }],
        m: ['16px', { lineHeight: '21.6px' }],
        lg: ['18px', { lineHeight: '21px' }],
        xl: ['20px', { lineHeight: '23px' }],
        '2xl': ['28px', { lineHeight: '33px' }],
        '3xl': ['60px', { lineHeight: '70px' }],
        '4xl': ['44px', { lineHeight: '48px' }],
      }
    },
  },
  plugins: [],
};
