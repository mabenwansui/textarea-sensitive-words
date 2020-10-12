module.exports = {
  presets: ['@tools/babel-preset'],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  }
}
