import { createStore } from 'vuex'

const store = createStore({

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
