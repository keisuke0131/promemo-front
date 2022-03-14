<template>
  <div>
    <main>
      <video id="video" webkit-playsinline playsinline muted autoplay loop>
        <!--
poster：動画ファイルが利用できない環境で代替表示される画像
webkit-playsinline：iOS 9までのSafari用インライン再生指定
playsinline：iOS 10以降のSafari用インライン再生指定
muted：音声をミュートさせる
autoplay：動画を自動再生させる
loop：動画をループさせる
controls：コントロールバーを表示する
-->
        <source src="@/assets/image/back-video.mp4" type="video/mp4" />
        <p>動画を再生できる環境ではありません。</p>
      </video>
      <div class="login-form-wrap">
        <div class="head">
          <img src="@/assets/image/logo.png" alt="" />
        </div>
        <form @submit.prevent="login">
          <div class="form-group">
            <input
              type="text"
              id="email"
              v-model="user.email"
              placeholder="メールアドレス"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              id="password"
              v-model="user.password"
              placeholder="パスワード"
            />
          </div>
          <button type="submit">ログイン</button>
        </form>
        <nuxt-link to="/users/create">新規会員登録はこちら</nuxt-link>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: "not_login",
  middleware: "logined_user",
  props: {
    page: {},
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      activetab: this.page,
    };
  },
  methods: {
    async login() {
      this.$axios.get("/sanctum/csrf-cookie").then((response) => {
        console.log(response);
        this.$axios
          .post("/login", this.user)
          .then((res) => {
            this.$store.dispatch("auth/loginAuthUser");
            console.log(res.data);
            this.$router.go();
          })
          .catch((err) => {
            console.log(err);
          });
        this.toggleLoading(true);
        setTimeout(() => {
          this.toggleLoading(false);
        }, 3000);
      });
    },
    toggleLoading(loading) {
      this.$nuxt.$emit("toggleLoading", loading);
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  height: 100vh;
  background: url("@/assets/image/login-bg.jpg");
}

video{
  position: fixed;
  height: 100%;
  z-index: -1;
}

.login-form-wrap {
  box-shadow: 1px 2px rgba(128, 128, 128, 0.425);
  width: 50%;
  max-width: 600px;
  margin: 0 auto;
  padding: 8.5vh 30px;
  border: 1px solid rgb(243, 243, 243);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  .head {
    text-align: center;
    img {
      display: inline-block;
      margin: 0 0 30px 0;
    }
  }
  .form-group {
    margin: 10px 0;
    text-align: left;
    label {
      display: block;
    }
    input {
      display: block;
      width: 100%;
      margin: 0 0 15px 0;
      padding: 10px 5px;
      border-bottom: 1px solid rgb(218, 218, 218);
      &:focus {
        outline: none;
      }
    }
  }
  button {
    display: inline-block;
    margin: 20px 0 0 0;
    padding: 10px 50px;
    border-radius: 3px;
    background: rgb(78, 137, 219);
    color: white;
    font-weight: bold;
  }
  a,
  a:link,
  a:visited,
  a:active {
    display: inline-block;
    margin: 20px 0 0 0;
    color: #333;
    font-size: 0.7em;
    text-decoration: underline;
  }
}
</style>