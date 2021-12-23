export const state = () => ({
    adminUsers: []
  })
  
  export const getters = {
    list (state) {
      return state.adminUsers
    }
  }
  
  export const mutations = {
    setList (state, data) {
      state.adminUsers = data
    },
    create (state, data) {
      state.adminUsers.push(data)
    },
    delete (state, data) {
      state.adminUsers.forEach((adminUser, index) => {
        if (adminUser.id === data.id) {
          state.adminUsers.splice(index, 1)
        }
      })
    },
    update (state, data) {
      state.adminUsers.forEach((adminUser, index) => {
        if (adminUser.id === data.id) {
          state.adminUsers.splice(index, 1, data)
        }
      })
    }
  }
  
  export const actions = {
    async fetchList () {
      return await this.$axios.$get('/admin_users')
        .catch(err => {
          console.log(err)
        })
    },
    async create ({ commit }, adminUser) {
      const response = await this.$axios.$post('/admin_users', adminUser)
        .catch(err => {
          console.log(err)
        })
      commit('create', response)
    },
    async delete ({ commit }, adminUser) {
      const response = await this.$axios.$delete(`/admin_users/${adminUser.id}`)
        .catch(err => {
          console.log(err)
        })
      commit('delete', response)
    },
    async update ({ commit }, adminUser) {
      const response = await this.$axios.$patch(`/admin_users/${adminUser.id}`, adminUser)
        .catch(err => {
          console.log(err)
        })
      commit('update', response)
    }
  }