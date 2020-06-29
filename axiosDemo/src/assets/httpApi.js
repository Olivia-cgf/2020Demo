import axios from 'axios'
import qs from 'qs'
import router from './../router'
const toLogin = () => {
  router.push({
    path: './login'
  })
}
const errorHandle = (status, other) => {
  switch (status) {
    case 400:
      console.log('信息校验失败')
      break
    case 401:
      // 去登录
      toLogin()
      console.log("'认证失败'")
      break
    case 403:
      // 去登录
      toLogin()
      // token过时了
      // 清除token存储
      localStorage.removeItem("'token'")
      console.log("'token校验失败'")
      break
    case 404:
      console.log("'请求的资源不存在'")
      break
  }
}
// 创建axios实例
var instance = axios.create({
  timeout: 5000
})
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// instance.defaults.headers.common['Authorization'] = localStorage.getItem("token")

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  // 判断post请求需求添加qs转化
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const {
      response
    } = error
    if (response) {
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      console.log('断网了')
    }
  }
)

export default instance
