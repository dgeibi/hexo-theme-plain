const csso = require('postcss-csso');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: '> 3% in CN, ie 10, last 2 versions',
    }),
    csso,
  ],
};
