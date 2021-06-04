<template>
  <div>
    <Header />
    <main>
      <form @submit.prevent="login">
        <div>
          <label for="email">メールアドレス</label>
          <input type="text" id="email" v-model="user.email" />
        </div>
        <div>
          <label for="password">パスワード</label>
          <input type="password" id="password" v-model="user.password" />
        </div>
        <button type="submit">ログイン</button>
      </form>
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
</style>