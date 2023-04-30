// babel.config.js
const plugins = [];

if (process.env.TEST === 'true') {
    console.log(
        'Detected development environment. Instrumenting code for coverage.'
    );
    plugins.push('istanbul');
}

module.exports = {
    presets: ['next/babel'],
    plugins
};
