<template>
  <header>
    <div class="header-logo">
      <nuxt-link to="/"
        ><img src="@/assets/image/logo.png" alt=""
      /></nuxt-link>
    </div>
    <nav>
      <ul>
        <li><a href="" class="btn register-btn">登録する</a></li>
        <template v-if="$store.state.auth.isLoggedIn === true">
          <li>
            <button @click="logout" class="btn login-btn">ログアウト</button>
          </li>
          <li v-shortkey.once="['ctrl','w']" @shortkey="$router.push('/posts/create')"><nuxt-link to="/posts/create">メモする</nuxt-link></li>
          <button type="button" class="btn btn-outline-primary"></button>
          <li class="account-dropdown-list">
            <span style="cursor: pointer" @click="isOpen = !isOpen"
              >アカウント名</span
            >
            <div
              class="dropdown-open-bg"
              @click="isOpen = !isOpen"
              v-if="isOpen"
            ></div>
            <div class="dropdown-list" v-if="isOpen">
              <li>プロフィール</li>
              <li>メモ執筆</li>
            </div>
          </li>
        </template>
        <template v-else>
          <li>
            <nuxt-link to="/auth/login" class="btn login-btn"
              >ログイン</nuxt-link
            >
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    async logout() {
      this.$axios
        .post("http://localhost:8000/logout")
        .then((response) => {
          // console.log(response);
          this.$store.dispatch("auth/logoutAuthUser");
        })
        .catch((err) => {});
    },
    console(){
      console.log('成功')
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
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

      .account-dropdown-list {
        position: relative;
      }

      .dropdown-list {
        position: absolute;
        top: 40px;
        right: 0;
        text-align: left;
        width: 150px;
        padding: 10px;
        border: 1px solid rgb(235, 235, 235);
        background-color: white;
        box-shadow: 2px 2px 5px 0px rgba(192, 192, 192, 0.281);
        z-index: 9999;
      }

      .dropdown-open-bg {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 9998;
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