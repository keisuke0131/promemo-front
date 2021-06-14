export const state = () => ({
  Categories: []
})

export const getters = {
  list (state) {
    return state.Categories
  }
}

export const mutations = {
  setList (state, data) {
    state.Categories = data
  },
  get (state, data) {
    state.Categories = data
  },
  create (state, data) {
    state.Categories.push(data)
  },
  delete (state, data) {
    state.Categories.forEach((Category, index) => {
      if (Category.id === data.id) {
        state.Categories.splice(index, 1)
      }
    })
  },
  update (state, data) {
    state.Categories.forEach((Category, index) => {
      if (Category.id === data.id) {
        state.Categories.splice(index, 1, data)
      }
    })
  }
}

export const actions = {
  async fetchList () {
    return await this.$axios.$get('/api/categories')
      .catch(err => {
        console.log(err)
      })
  },
  async create ({ commit }, Category) {
    const response = await this.$axios.$post('/api/categories', Category)
      .catch(err => {
        console.log(err)
      })
    commit('create', response)
  },
  async delete ({ commit }, Category) {
    const response = await this.$axios.$delete(`/api/categories/${Category.id}`)
      .catch(err => {
        console.log(err)
      })
    commit('delete', response)
  },
  async update ({ commit }, Category) {
    const response = await this.$axios.$patch(`/api/categories/${Category.id}`, Category)
      .catch(err => {
        console.log(err)
      })
    commit('update', response)
  }
}