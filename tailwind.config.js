// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        logoColor: "#1ed760",
      },
      animation: {
        'bounce-1': 'bounce 1s infinite ease-in-out',
        'bounce-2': 'bounce 1s infinite ease-in-out 0.2s',
        'bounce-3': 'bounce 1s infinite ease-in-out 0.4s',
      },
      keyframes: {
        bounce: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
