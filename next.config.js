// next.config.js
/** @type {import("next").NextConfig} */
const nextConfig = {
    webpack(config) {
        config.resolve.alias['@/components'] = './components';
        config.resolve.alias['@/core'] = './core';
        config.resolve.alias['@/pages'] = './pages';
        config.resolve.alias['@/lib'] = './lib';
        config.resolve.alias['@/styles'] = './styles';
        config.resolve.alias['@/constants'] = './constants';
        return config;
    },
};

module.exports = nextConfig;
