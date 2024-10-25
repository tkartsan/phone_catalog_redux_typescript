export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        10: '10px',
        12: '12px',
        13: '13px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        28: '28px',
      },
      boxShadow: {
        outlineBlueLight: '0px 0px 0px 2px rgba(5, 145, 255, 0.10)',
      },
      spacing: {
        0: 0,
        1: '0.25rem', // 4px2: '0.5rem', // 8px
        3: '0.75rem', // 12px
        4: '1rem', // 16px
        5: '1.25rem', // 20px
        6: '1.5rem', // 24px
        7: '1.75rem', //	28px
        8: '2rem', // 32px
        9: '2.25rem', // 36px
        10: '2.5rem', // 40px
        11: '3rem', // 48px
        12: '3.5rem', // 56px
        13: '4rem', // 64px
        14: '4.5rem', // 72px
        15: '5rem', // 80px
        16: '6rem', // 96px
        17: '7rem', // 112px
      },
      colors: {
        colorTextBase: '#000000',
        colorBgBase: '#FFFFFF',
        colorBgRed: '#FF0000',
        colorBgBlue: '#0000FF',
        colorBgLightBlue: '#ADD8E6',
        colorBgGrey: '#4C564C',
        colorPurple: '#A020F0',
        colorGrey: '#808080',
        colorDarkGrey: '#2B2B2B',
        colorLightGrey: '#DEDEDE',
        colorBlack: '#000000',
        colorDarkerWhite: '#D9D9D9',
        colorDifferentGrey: '#89939A',
        colorBorderGrey: '#e2e6e9',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
