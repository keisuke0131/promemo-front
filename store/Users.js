export const state = () => ({
    Users: []
  })
  
export const getters = {
  list (state) {
    return state.Users
  }
}

export const mutations = {
  setList (state, data) {
    state.Users = data
  },
  create (state, data) {
    state.Users.push(data)
  },
  delete (state, data) {
    state.Users.forEach((User, index) => {
      if (User.id === data.id) {
        state.Users.splice(index, 1)
      }
    })
  },
  update (state, data) {
    state.Users.forEach((User, index) => {
      if (User.id === data.id) {
        state.Users.splice(index, 1, data)
      }
    })
  }
}

export const actions = {
  async fetchList () {
    return await this.$axios.$get('/users')
      .catch(err => {
        console.log(err)
      })
  },
  async create ({ commit }, User) {
    const response = await this.$axios.$post('/users', User)
      .catch(err => {
        console.log(err)
      })
    commit('create', response)
  },
  async delete ({ commit }, User) {
    const response = await this.$axios.$delete(`/users/${User.id}`)
      .catch(err => {
        console.log(err)
      })
    commit('delete', response)
  },
  async update ({ commit }, User) {
    const response = await this.$axios.$patch(`/users/${User.id}`, User)
      .catch(err => {
        console.log(err)
      })
    commit('update', response)
  }
}