//1/构建静态 登录界面   20:00
import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import logo from './imges/logo.png'//引入图片文件夹
import './css/login.less'  //引入当前文件夹下的 less

const{Item}= Form

 

export default class Login extends Component {
 

  // 特点 : 自动收集表单数据  提交表单且 验证通过的回调 (表单提交回调函数)
    onFinish = async values => {
       let result=await reqLogin(values)
      console.log(result);
       // 由于在相应拦截器里处理了 失败回调 所以 在这里就不做处理了
      };


    // 密码自定义验证
    demo = (_,value="") => {
      let errMsgArr =[]
      if(!value.trim())errMsgArr.push('密码必须输入')
      else if(value.length < 4)errMsgArr.push('密码必须大于等于4位')
      else if(value.length > 12)errMsgArr.push('密码必须小于等于12位')
      else if(!(/^\w+$/).test(value))errMsgArr.push('密码必须是英文,数字下划线')
      if (errMsgArr.length !== 0) return Promise.reject(errMsgArr)
      else return Promise.resolve() 
    }

  render() {
    return (
      <div className="login">
       <header>
         <img src={logo} alt="logo"/>
          <h1>商品管理系统</h1>
       </header>
       <section>
        <span className="text1" > 用户登录</span>
        <Form
         className="login-form"
         onFinish={this.onFinish}
        >
          {/* 规则需求 
            1/  必须填些信息
            2/ 必须4位以上
            3/不能大于12
            4/必须英文数字下划线
          */}

          {/* 用户名 ````------- */}
          <Item 
        name="username"
        rules={[
          {required:true,message:'用户名必须填写信息!!'},
          {min:4,message:'用户名必须大于等于4位!!'},
          {max:12,message:'用户名必须小于等于12位'},
          {pattern:/^\w+$/,message:'用户名必须是英文,数字,下划线组成!'}
        ]}
        >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}
         placeholder="用戶名" 
         />
        </Item>
          {/* 密码 ````----------- */}
          <Item
							name="password"
							rules={[{validator:this.demo}]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="密码"
							/>
						</Item>
          {/* 登录 ````------- */}
         <Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
         登录
        </Button>
      </Item>
   </Form>
       </section>
      </div>
    )
  }
}
