import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
//配置使用处理相对时间的插件
dayjs.extend(relativeTime)
//默认语言是英文，需配置中文
dayjs.locale('zh-cn')
//定义一个过滤器，然后在任何组件的模板中使用
//其实过滤器就相当于一改全局可用的方法
//参数一：过滤器名称
//参数二：过滤器函数
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value)) // .. 年前
})



