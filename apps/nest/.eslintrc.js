module.exports = {
  ...require('eslint-config/nest'),
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
