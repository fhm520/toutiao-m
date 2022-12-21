//封装模块
//导入axios
import axios from "axios"
import store from "@/store"
//处理数据中超出js安全数据范围的问题
import JSONbig from 'json-bigint'
//自定义配置创建一个新的 axios 实例
const request = axios.create({
    // baseURL: '/api'//接口的基准路径
    baseURL: 'http://toutiao.itheima.net/',//接口的基准路径
    //自定义后端返回的原始数据
    //data: 后端返回的原始数据，json格式的字符串
    transformResponse: [function (data) {
      // 对接收的 data 进行任意转换处理
      try {
        return JSONbig.parse(data)
      } catch (err) {
        return data
      }
      
    }],
})
//请求拦截器
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    //请求发起会经过这里
    //config,本次请求的请求配置对象
    const {user} = store.state
    if(user && user.token) {
        //请求头
        config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log(config)
    return config//必须返回
  }, function (error) {
    // Do something with request error
    //如果请求出错了，会进入到这里
    return Promise.reject(error);
  })


//响应拦截器



//导出
export default request