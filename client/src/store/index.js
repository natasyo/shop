import { createStore } from 'vuex'
import { creditinals } from './creditinals'
export default createStore({
  state: {
    count: 0,
    currencies: {
      items: {
        usd: {
          id: 'usd',
          designation: '$'
        },
        rur: {
          id: 'rur',
          designation: '₽'
        }
      },
      current: 'usd'
    },
    user: {}
  },
  mutations: {
    increment (state) {
      state.count++
    },
    changeCurrentCurrency (state, value) {
      state.currencies.current = value
    },

    isAuthenticate (state, value) {
      const user = value
      console.log(!!user)
      if (user) {
        state.user = user
        console.log('userOk')
      } else {
        state.user = null
      }
    }
  },
  actions: {},
  modules: {
    creditinals
  }
})
