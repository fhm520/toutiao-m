import Vue from 'vue'
import Vuex from 'vuex'
//导入封装的本地操作模块
import {setItem, getItem} from './storage.js'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    //存储用户登录信息（token等）
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    //修改state状态
    setUser(state, data) {
      state.user = data
      //为防止刷新丢失，需存到本地
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
