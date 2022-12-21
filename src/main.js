import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import './utils/dayjs'

// 导入vant组件库及全局样式
import Vant from 'vant'
import 'vant/lib/index.css'

//rem适配
//导入rem基准值
import 'amfe-flexible'

// 注册组件库
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
