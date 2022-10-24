const cssnanoOptions = { zindex: false };

module.exports = ({ file, options, env }) => ({
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    //'postcss-preset-env': {}, //includes autoprefixer
    cssnano: env === 'production' ? cssnanoOptions : false,
  }
});
