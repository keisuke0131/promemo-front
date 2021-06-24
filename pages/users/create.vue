<template>
  <div>
    <main>
      <div class="login-form-wrap">
        <div class="head">
          <img src="@/assets/image/logo.png" alt="" />
        </div>
        <form @submit.prevent="createUserLogin">
          <ValidationObserver ref="myform">
            <validation-provider v-slot="{ errors }" rules="required">
              <div class="row">
                <span class="error">{{ errors[0] }}</span>
                <input
                  v-model="user.name"
                  name="name"
                  type="text"
                  placeholder="お名前"
                />
              </div>
            </validation-provider>
            <validation-provider v-slot="{ errors }" rules="email|required">
              <div class="row">
                <span class="error">{{ errors[0] }}</span>
                <input
                  v-model="user.email"
                  name="email"
                  type="text"
                  placeholder="メールアドレス"
                />
              </div>
            </validation-provider>
            <validation-provider v-slot="{ errors }" rules="min:6|required">
              <div class="row">
                <span class="error">{{ errors[0] }}</span>
                <input
                  v-model="user.password"
                  name="password"
                  type="password"
                  placeholder="パスワード"
                />
              </div>
            </validation-provider>
          </ValidationObserver>
          <button type="submit">新規登録</button>
        </form>
        <nuxt-link to="/auth/login">ログインはこちら</nuxt-link>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  middleware: "logined_user",
  layout: "not_login",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async createUserLogin() {
      const login_user = {
        email: this.user.email,
        password: this.user.password,
      };
      await this.$axios
        .post("api/users", this.user)
        .then(async () => {
          await this.$axios.get("/sanctum/csrf-cookie").then((response) => {
            console.log(response);
            this.$axios
              .post("/login", login_user)
              .then((res) => {
                this.$store.dispatch("auth/loginAuthUser");
                console.log(res.data);
                this.$router.push("/");
              })
              .catch((err) => {
                console.log(err.response.data);
              });
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      this.toggleLoading(true);
      setTimeout(() => {
        this.toggleLoading(false)
      }, 3000);
    },
    update: function (e) {
      this.input = e.target.value;
    },
    toggleLoading (loading) {
      this.$nuxt.$emit('toggleLoading', loading)
    }
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  align-items: center;
  height: 100vh;
  background: url("@/assets/image/register-bg.jpg");
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

.row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  .error {
    color: #db0000;
  }
}
</style>