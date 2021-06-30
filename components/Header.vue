<template>
  <header>
    <div class="header-logo">
      <nuxt-link to="/"><img src="@/assets/image/logo.png" alt="" /></nuxt-link>
    </div>
    <div class="search">
      <input v-model="searchWord" @focus="searchMemo" @input="searchMemo" type="text" />
      <div
        @click="closeSearchResult"
        v-if="searchWord !== '' && isOpenSearchResult"
        class="DropdownOpenBg"
      ></div>
      <div
        v-if="searchWord !== '' && isOpenSearchResult"
        class="search-result BoxShadow"
      >
        <template v-if="posts.length">
          <div v-for="post in posts" :key="post.id">
            <nuxt-link @click.native="closeSearchResult" :to="'/posts/' + post.id + '/show'">{{
              post.title
            }}</nuxt-link>
          </div>
        </template>
        <template v-else>
          <p>検索結果に一致するメモは存在しません。</p>
        </template>
      </div>
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
            <transition>
              <div class="DropdownList" v-if="isOpen">
                <li @click="onOpen" class="memo-edit-link">
                  <i class="fas fa-user-alt"></i>
                  <nuxt-link
                    :to="
                      '/users/' + $store.state.auth.auth_user.id + '/profile'
                    "
                    >プロフィール</nuxt-link
                  >
                </li>
                <li @click="onOpen" class="memo-edit-link">
                  <i class="fas fa-palette"></i>
                  <nuxt-link :to="'/categories/setting'">色設定</nuxt-link>
                </li>
                <li class="memo-edit-link" style="margin-right: 0px">
                  <button @click="logout">
                    <i class="fas fa-sign-out-alt"></i> ログアウト
                  </button>
                </li>
              </div>
            </transition>
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
      isOpenSearchResult: false,
      searchWord: "",
      posts: [],
    };
  },
  methods: {
    async logout() {
      this.$axios
        .post("http://localhost:8000/logout")
        .then((response) => {
          this.$store.dispatch("auth/logoutAuthUser");
          this.$router.go();
        })
        .catch((err) => {});
    },
    searchMemo() {
      this.isOpenSearchResult = true;
      this.$axios
        .post("/api/searchMemo", {
          word: this.searchWord,
        })
        .then((res) => {
          console.log(res.data.post);
          this.posts = res.data.post;
        })
        .catch((err) => {});
    },
    closeSearchResult() {
      this.isOpenSearchResult = false;
    },
    onOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-leave-active,
.v-enter-active {
  transition: opacity 0.2s;
}

/* 表示アニメーション */
.v-enter,
.v-leave-to {
  opacity: 0;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  height: 70px;
  box-shadow: rgba(60, 64, 67, 0.06) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  background-color: white;
  text-align: center;
  z-index: 9997;

  .header-logo {
    margin-left: 20px;
    flex: 1;
    text-align: left;

    a {
      display: inline-block;
    }

    img {
      width: 150px;
    }
  }

  .search {
    flex: 1 1 0%;
    position: relative;

    input {
      border-radius: 20px;
      border: 1px solid $BORDER_GRAY01;
      width: 100%;
      text-align: left;
      padding: 5px 15px;
      &:focus {
        outline: none !important;
      }
    }

    .search-result {
      width: 100%;
      overflow-y: scroll;
      background: white;
      position: absolute;
      max-height: 250px;
      top: 40px;
      left: 0;
      z-index: 9999;
      border: 1px solid rgb(234, 234, 234);

      div {
        max-width: 100%;
        overflow-y: scroll;
      }

      a {
        display: block;
        transition-duration: 0.3s;
        max-width: 100%;
        overflow: hidden;
        padding: 10px 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
        text-align: left;
        border-bottom: 1px solid rgb(234, 234, 234);

        &:hover {
          background: #c3dbff;
          color: white !important;
        }
      }
    }
  }

  nav {
    margin-left: auto;
    flex: 1 1 0%;
    ul {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      li {
        margin: 0 10px;
        &:last-child {
          margin-right: 30px;
        }
      }

      .account-dropdown-list {
        position: relative;
        a {
          width: 100%;
        }
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
    background-color: #5699ff;
    border-radius: 3px;
    padding: 5px 10px;
    transition: 0.3s;
    &:hover {
      background-color: #88b7ff;
    }
    span {
      color: white;
    }
  }
}
</style>