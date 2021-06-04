<template>
  <header>
    <div class="header-logo">
      <a href="http://localhost:8000/api/user"
        ><img src="@/assets/image/logo.png" alt=""
      /></a>
    </div>
    <nav>
      <ul>
        <li><a href="" class="btn register-btn">登録する</a></li>
        <li v-if="$store.state.auth.isLoggedIn === true">
          <button @click="logout" class="btn login-btn">ログアウト</button>
        </li>
        <li v-else>
          <nuxt-link to="/auth/login" class="btn login-btn">ログイン</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      this.$axios
        .post("http://localhost:8000/logout")
        .then((response) => {
          console.log(response);
          this.$store.dispatch("auth/logoutAuthUser");
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // position: fixed;
  // top: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
  background: rgb(239, 251, 255);
  text-align: center;
  .header-logo {
    display: inline-block;
    // position: fixed;
    left: 50%;
    transform: translateX(-50%);
    // -webkit-transform: translateX(-50%);Ï
    margin: auto;
    img {
      width: 150px;
    }
  }
  nav {
    ul {
      display: flex;
      li {
        margin: 0 20px 0 0;
      }
    }
  }
  .btn {
    display: inline-block;
    padding: 5px 15px;
    color: #fff;
    font-size: 1em;
  }
  .register-btn {
    background: rgb(129, 170, 185);
  }
  .login-btn {
    background: rgb(185, 142, 129);
  }
}
</style>