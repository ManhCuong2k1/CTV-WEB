module.exports = ({ dev, rootDir, srcDir }) => ({
    important: true,
    theme: {},
    variants: {},
    plugins: [],
    purge: {
        enabled: !dev,
        content: [
            `${srcDir}/components/**/*.{vue,js}`,
            `${srcDir}/layouts/**/*.vue`,
            `${srcDir}/pages/**/*.vue`,
            `${srcDir}/plugins/**/*.{js,ts}`,
            `${rootDir}/nuxt.config.{js,ts}`,
        ],
    },
});
