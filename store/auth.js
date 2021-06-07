export const state = () => ({
  // 認証中の一般ユーザー
  auth_user: null,
  isLoggedIn:false,
  // 認証中の管理者ユーザー
  admin_user: null
})

export const mutations = {
  // 認証中の一般ユーザー
  setAuthUser(state, user) {
    state.auth_user = user
  },
  setLoggedIn(state, payload) {
    state.isLoggedIn = payload;
  },
  // 認証中の管理者ユーザー
  setAdminUser(state, admin_user) {
    state.admin_user = admin_user
  }
}

export const actions = {
  // 管理者用
  async login({ commit }, { email, password }) {
    const response = await this.$axios.$post('/login', { email, password })
      .catch(err => {
        console.log(err)
      })
    commit('setAdminUser', response)
  },

  async loadUser({ commit, dispatch }) {
      try {
        const user = (await this.$axios.get("/api/user")).data;
        commit("setAuthUser", user);
        commit('setLoggedIn', true);
      } catch (error) {
        commit('setLoggedIn', false);
        commit("setAuthUser", '');
        console.log(error)
      }
  },

  async loginAuthUser({commit}){
    const user = (await this.$axios.get("/api/user")).data;
        console.log(user)
        commit("setAuthUser", user);
        commit('setLoggedIn', true);
  },
  logoutAuthUser({ commit }) {
    commit('setAuthUser','');
    commit('setLoggedIn', false);
    logOut();
  }
}