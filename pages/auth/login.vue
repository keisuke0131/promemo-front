<template>
  <div>
    <main>
      <div class="login-form-wrap">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">メールアドレス</label>
            <input type="text" id="email" v-model="user.email" />
          </div>
          <div class="form-group">
            <label for="password">パスワード</label>
            <input type="password" id="password" v-model="user.password" />
          </div>
          <button type="submit">ログイン</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
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
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form-wrap {
  box-shadow: 5px 5px 25px -10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 480px;
  margin: 0 auto;
  padding: 20px 15px;
  border: 1px solid rgb(243, 243, 243);

  .form-group {
    margin: 10px 0;

    label {
      display: block;
    }

    input {
      border: 1px solid rgb(218, 218, 218);
      display: block;
      width: 100%;
      padding: 3px 5px;

      &:focus {
        outline: none;
      }
    }
  }
  button {
      color: white;
      font-weight: bold;
      background-color:rgb(184, 214, 255);
      border-radius: 3px;
      padding: 0 10px;
    }
}
</style>