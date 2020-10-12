import './index.less'

// 引入polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// 为了支持热重热
import { hot } from 'react-hot-loader'

/*
 * 解决mobx-react-lite黄条警告
 * https://github.com/mobxjs/mobx-react-lite/#observer-batching
 */
import 'mobx-react-lite/batchingForReactDom'

import React from 'react'
import ReactDOM from 'react-dom'
import App from '@src'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const WarpApp = hot(module)(() => <App />)

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <WarpApp />
  </ConfigProvider>,
  document.getElementById('main-container')
)
