<template>
  <div>
    <main>
      <div class="update-form MaxWidth640">
        <form @submit.prevent="updateUserEmail" v-if="user">
          <label>メールアドレス</label>
          <input type="text" v-model="user.email" />
          <nuxt-link
            :to="'/users/' + $store.state.auth.auth_user.id + '/profile'"
            >キャンセル</nuxt-link
          >
          <button type="submit">更新</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  middleware: "not_logined_user",
  data() {
    return {
      user: {
        name: "",
        email: "",
      },
    };
  },
  async beforeCreate() {
    this.user = (await this.$axios.get("/api/user")).data;
  },
  methods: {
    updateUserEmail() {
      this.$axios
        .post("/api/updateUserEmail", {
          email: this.user.email,
        })
        .then((res) => {
          console.log(res);
          this.setEmailToState();
        });
    },
    setEmailToState() {
      // dispatch()でactionsを呼び出す、もしくはcommit()で直接mutationsを呼び出す
      this.$store.commit("auth/setEmail", this.user.email);
    },
  },
};
</script>

<style lang="scss" scoped>
.update-form {
  margin: 30px auto;

  label {
    display: block;
    font-weight: bold;
  }

  input {
    display: block;
    width: 100%;
    border-bottom: 1px solid #000;
    padding: 5px;
    margin: 10px 0;

    &:focus {
      outline: none;
    }
  }

  a {
    border: 1px solid $BUTTON_BORDER_GRAY01;
    background: white;
    padding: 2px 5px;
    font-size: 14px;
    border-radius: 5px;
  }

  button {
    background: $BLUE;
    padding: 1px 20px;
    font-size: 14px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }
}
</style>
