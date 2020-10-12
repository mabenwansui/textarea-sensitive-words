// 配置说明 https://alloyteam.github.io/eslint-config-alloy/?language=zh-CN
// 因为eslint开启了缓存，并且没有提供清缓存回调，所以当修改配置后，需手动执行 npm run clear 清理缓存。这样配置才会生效。

module.exports = {
  extends: ['@tools/alloy'],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则   0(off)  1(warning)  2(error)
  }
}
