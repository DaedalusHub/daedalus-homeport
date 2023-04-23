// tailwind.config.js
module.exports = {
    content: ['{pages,src,components}/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    important: true,
    theme: ['dark'],
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['dark']
    }
};
