const colors = require('tailwindcss/colors');

function invertColor(hex) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? 'black' : 'white';
}

module.exports = {
  content: ['./libs/ui/src/**/*.{html,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.green,
          complementary: invertColor(colors.green[500]),
        },
        secondary: {
          ...colors.orange,
          complementary: invertColor(colors.orange[500]),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
