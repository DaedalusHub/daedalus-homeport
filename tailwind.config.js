// tailwind.config.js
// https://tailwindcss.com/
// https://github.com/tailwindlabs/tailwindcss
// https://daisyui.com/
// https://github.com/saadeghi/daisyui

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
