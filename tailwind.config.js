/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Add this if you have an index.html file
    './src/**/*.{vue,js,ts,jsx,tsx}',// Include all files in src with Vue, JS, and other extensions
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
