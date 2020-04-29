// 二次封装  axios  库  
// 1/配置请求的基础路径
// 2/配置超时时间
// 3/统一处理post 请求json编码问题(转为urlencoded)
// 4/统一返回真正的数据data 而不是response对象



//  1/判断请求 如果是post请求并且参数形式为json,  直接转为urlencoded
// 统一处理post请求  json编码问题  (转为urlencoded)
// 2 /统一处理返回真正的数据data ,而不是axios包装的response对象

import axios from 'axios'//axios核心库
import qs from 'querystring'//用于将对象转为urlencoded字符串
import {message as msg} from 'antd'

// 配置 请求基础路径
axios.defaults.baseURL="http://localhost:3000"
// 配置超时时间
axios.defaults.timeout =2000

 // axios请求拦截器 ------------------------ : 
 axios.interceptors.request.use((config)=>{
  // console.log("执行 ?",config);
  //  1/判断请求 如果是post请求并且参数形式为json,  直接转为urlencoded
    // 统一处理post请求  json编码问题  (转为urlencoded)
  const {method,data}=config//所有请求信息解构赋值
  if(method.toLowerCase()==='post' && data instanceof Object){
    config.data=qs.stringify(data)//(转为urlencoded)
  }
  return config 
})

  // 相应拦截器----------------
// 2 /统一处理返回真正的数据data ,而不是axios包装的response对象
axios.interceptors.response.use(
  // 成功  回调 状态码  2开头

  response => {
    console.log("response");
    
    return response.data
  },

  // 失败的回调  条件 1/超时时间  2/返回的状态码不是二开头的: 3/网络不通
  err => {
    let errmsg = '未知错误,请联系管理员'
    const{message}=err
    if (message.indexOf("401")!==1) errmsg="未登录成功,重启登录" 
    else if(message.indexOf("Network Error") !== -1) errmsg="网络不通,检查网络链接!"
    else if (message.indexOf("timeout")!==-1) errmsg="网络不稳定,连接超时!!"
    msg.error(errmsg)
    return new Promise (()=>{})//返回一个 pending状态的promise处理失败
    // 中断Promise链

  }

)
export default axios