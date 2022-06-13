import { createStore } from 'vuex'
import theme from './modules/theme'

const store = createStore({

  modules: {
    theme: theme
  },

  state() {
    return {
      user: {
        _id: "",
        name: "",
        username: "",
        token: "",
        logged: false
      }
    }
  },

  mutations: {
    setLogged(state, payload) {
      state.user = payload
    },
    setLoggOut(state) {
      state.user = {
        _id: "",
        name: "",
        username: "",
        token: "",
        logged: false
      }
    }
  },

  getters: {
    getId(state) {
      return state.user._id
    },
    getName(state) {
      return state.user.name
    },
    getToken(state) {
      return state.user.token
    },
    getUsername(state) {
      return state.user.username
    },
    isLogged(state) {
      return state.user.logged
    },
  },

})

export default store
