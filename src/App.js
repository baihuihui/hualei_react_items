import React, { Component } from 'react'
// 引入组件   注意不能 同时展示
import Admin from './pages/Admin/Admin'
import Login from './pages/Login/Login'


import {Switch,Route} from 'react-router-dom'
export default class App extends Component {
  render() {
    return (
      // 切换路由展现不同的组件界面
      <Switch> 
        <Route path='/login' component={Login} />
        <Route path='/admin' component={Admin} />
      </Switch>
    )
  }
}
