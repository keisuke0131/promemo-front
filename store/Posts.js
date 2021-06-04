export const state = () => ({
    Posts: []
  })
  
  export const getters = {
    list (state) {
      return state.Posts
    }
  }
  
  export const mutations = {
    setList (state, data) {
      state.Posts = data
    },
    //追加
    create (state, data) {
      state.Posts.push(data)
    },
    delete (state, data) {
      state.Posts.forEach((Post, index) => {
        if (Post.id === data.id) {
          state.Posts.splice(index, 1)
        }
      })
    },
    update (state, data) {
      state.Posts.forEach((Post, index) => {
        if (Post.id === data.id) {
          state.Posts.splice(index, 1, data)
        }
      })
    }
  }
  
  export const actions = {
    async fetchList () {
      return await this.$axios.$get('/api/posts')
        .catch(err => {
          console.log(err)
        })
    },
    //追加
    async create ({ commit }, Post) {
      const response = await this.$axios.$post('/api/posts', Post)
        .catch(err => {
          console.log(err)
        })
      commit('create', response)
    },
    async delete ({ commit }, Post) {
      const response = await this.$axios.$delete(`/api/posts/${Post.id}`)
        .catch(err => {
          console.log(err)
        })
      commit('delete', response)
    },
    async update ({ commit }, Post) {
      const response = await this.$axios.$patch(`/api/posts/${Post.id}`, Post)
        .catch(err => {
          console.log(err)
        })
      commit('update', response)
    }
  }