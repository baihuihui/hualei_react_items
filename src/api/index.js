// 这个文件是用来管理项目里所有ajax请求,每个请求对应一个请求函数

import ajax from './ajax'
// 请求登录的函数  loginObj形如{username:xxx,password:xx}
export const reqLogin = (loginObj) => ajax.post("/login",loginObj)

