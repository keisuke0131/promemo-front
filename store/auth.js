export const state = () => ({
  // 認証中の一般ユーザー
  auth_user: null,

  // 認証中の管理者ユーザー
  admin_user: null
})

export const mutations = {
  setAdminUser(state, admin_user) {
    state.admin_user = admin_user
  },
  setAuthUser(state, auth_user) {
    state.auth_user = auth_user
  }
}

export const actions = {
  async login({ commit }, { email, password }) {
    const response = await this.$axios.$post('/login', { email, password })
      .catch(err => {
        console.log(err)
      })
    commit('setAdminUser', response)
  },
  async loginAuthUser({ commit }) {
    commit('setAuthUser',true)
  },
  async logoutAuthUser({ commit }) {
    commit('setAuthUser',false)
  }
}