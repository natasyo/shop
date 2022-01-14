import { createStore } from 'vuex'

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
    }

  },
  mutations: {
    increment (state) {
      state.count++
    },
    changeCurrentCurrency (state, value) {
      state.currencies.current = value
    }
  },
  actions: {
  },
  modules: {
  }
})
