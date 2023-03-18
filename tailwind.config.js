export default {
    content: ['{pages,src,components}/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    important: true, // important in prod is must be
    theme: ['dark'],
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['dark']
    }
};
