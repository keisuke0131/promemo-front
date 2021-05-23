<template>
  <section>
    <h1 class="display-1 mt-5">管理者ログイン</h1>
    <v-form @submit.prevent="submit">
      <v-text-field label="メールアドレス" v-model="email" />
      <v-text-field type="password" label="パスワード" v-model="password" />
      <v-btn type="submit" class="info">ログイン</v-btn>
    </v-form>
  </section>
</template>

<script>
export default {
  middleware: "logined_admin_user",
  layout: "admin_login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      await this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });
      window.location.href = "/admin";
    //   this.$router.push("/admin");
    },
  },
};
</script>