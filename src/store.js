import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

let userData = window.localStorage.getItem('userData')
if (userData) {
  userData = JSON.parse(userData)
}

export default new Vuex.Store({
  state: {
    isLogin: userData ? true : false,
    userData: userData || '',
    firstLogin: false,
    canClick: true // 防重变量
  },
  mutations: {
    saveUserData(state, data) {
      state.userData = data
      window.localStorage.setItem('userData', JSON.stringify(data))
      state.isLogin = data.accessKey ? true : false
    },
    saveData(state, data) {
      state[data.key] = data.value
      window.localStorage.setItem(data.key, JSON.stringify(data.value))
    },
    setData(state, data) {
      state[data.key] = data.value
    },
    logout(state) {
      state.userData = ''
      state.isLogin = false
      window.localStorage.removeItem('userData')
      router.push({
        name: 'login'
      });
    },
  },
  actions: {
    saveUserData: ({
      commit
    }, data) => commit('saveUserData', data),
    saveData: ({
      commit
    }, data) => commit('saveData', data),
    setData: ({
      commit
    }, data) => commit('setData', data),
    logout: ({
      commit
    }) => commit('logout')
  },
  getters: {
    isLogin: state => state.isLogin,
    userData: state => state.userData,
    firstLogin: state => state.firstLogin,
    canClick: state => state.canClick,
  }
})
