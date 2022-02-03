export const creditinals = {
  state: {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    setRole: (state, role) => {
      state.role = role
      localStorage.setItem('role', role)
    },
    setUser: (state, user) => {
      state.role = user.role
      localStorage.setItem('role', user.role)
      state.token = user.token
      localStorage.setItem('token', user.token)
    },
    removeUser: (state, user) => {
      state.role = null
      localStorage.removeItem('role')
      state.token = null
      localStorage.removeItem('token')
    },
    removeToken: (state) => {
      state.token = null
      console.log(localStorage.getItem('token'))
      localStorage.removeItem('token')
    }
  },
  actions: {}
}
