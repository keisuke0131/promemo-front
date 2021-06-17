<template>
  <header>
    <div class="header-logo">
      <nuxt-link to="/"><img src="@/assets/image/logo.png" alt="" /></nuxt-link>
    </div>
    <nav>
      <ul>
        <template v-if="$store.state.auth.isLoggedIn === true">
          <li
            v-shortkey.once="['ctrl', 'w']"
            @shortkey="$router.push('/posts/create')"
            class="create-memo-btn"
          >
            <nuxt-link to="/posts/create">
              <span> <i class="fas fa-pen"></i>メモする </span>
            </nuxt-link>
          </li>
          <li class="account-dropdown-list">
            <span style="cursor: pointer" @click="onOpen">
              {{ $store.state.auth.auth_user.name }}
            </span>
            <div class="DropdownOpenBg" @click="onOpen" v-if="isOpen"></div>
            <div class="DropdownList" v-if="isOpen">
              <li @click="onOpen">
                <i class="fas fa-user-alt"></i>
                <nuxt-link
                  :to="'/users/' + $store.state.auth.auth_user.id + '/profile'"
                  >プロフィール</nuxt-link
                >
              </li>
              <li>
                <button @click="logout">
                  <i class="fas fa-sign-out-alt"></i> ログアウト
                </button>
              </li>
            </div>
          </li>
        </template>
        <template v-else>
          <li><a href="" class="btn register-btn">登録する</a></li>
          <li>
            <nuxt-link to="/auth/login" class="btn login-btn">
              ログイン
            </nuxt-link>
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
    onOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: flex;
  align-items: center;
  margin-bottom: 20px;
  // position: fixed;
  // top: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
  // background: rgb(239, 251, 255);
  background-color: white;
  text-align: center;

  .header-logo {
    margin-left: 20px;

    img {
      width: 150px;
    }
  }

  nav {
    margin-left: auto;
    ul {
      display: flex;
      align-items: center;

      li {
        margin: 0 10px;
        &:last-child {
          margin-right: 30px;
        }
      }

      .account-dropdown-list {
        position: relative;
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

  .create-memo-btn {
    background-color: #7cb0fd;
    border-radius: 3px;
    padding: 5px 10px;
    span {
      color: white;
    }
  }
}
</style>