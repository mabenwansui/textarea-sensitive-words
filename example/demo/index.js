import './index.less'

// 引入polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// 为了支持热重热
import { hot } from 'react-hot-loader'

import React from 'react'
import ReactDOM from 'react-dom'
import App from '@src'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const WarpApp = hot(module)(()=> <App highlightWords = {['猎聘', '最[好]', '最']} defaultVal="覅哦额喷气机最佛前最诶文件" onChange={(isWarning, html)=> {
  console.log(isWarning, html)
}} />)

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <WarpApp />
  </ConfigProvider>,
  document.getElementById('main-container')
)
