<template>
  <div>
    <main>
      <div class="post-form-wrap">
        <div v-if="!isPreview" class="post-form">
          <form @submit.prevent="createUserLogin">
            <h1>Sign Up</h1>
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
            <button type="submit">送信</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
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
        password: this.user.password
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
    },
    update: function (e) {
      this.input = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-form-wrap {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 20px;
  h1 {
    font-size: 1.75em;
    margin: 0 0 25px 0;
  }
  .preview-icon {
    position: absolute;
    top: 0;
    right: -50px;
    z-index: 9999px;
    color: white;
    width: 50px;
    height: 50px;
    background-color: rgb(196, 215, 255);
    text-align: center;
    border-radius: 50%;
    box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.5),
      0 1px 1px rgba(0, 0, 0, 0.19);
    border-bottom: solid 2px #b5b5b5;
    overflow: hidden;

    &.icon-active {
      color: rgb(128, 168, 255);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5),
        0 2px 2px rgba(0, 0, 0, 0.19);
      border-bottom: none;
    }
  }

  .post-preview {
    box-shadow: 5px 5px 25px -10px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding: 20px 15px;
    border: 1px solid rgb(243, 243, 243);
  }
}
.post-form {
  width: 100%;
  box-shadow: 5px 5px 25px -10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin: 50px 0 0 0;
  padding: 50px;
  border: 1px solid rgb(243, 243, 243);
  .form-group {
    margin: 10px 0;

    label {
      display: block;
      @include mq(sm) {
        color: red;
      }
    }

    input {
      border: 1px solid rgb(218, 218, 218);
      display: block;
      width: 100%;
      margin: 15px 0 0 0;
      padding: 7px;
      &:focus {
        outline: none;
      }
    }

    textarea {
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
    margin: 10px 0 0 0;
    padding: 10px 30px;
    border-radius: 3px;
    background: #88b7fa;
    color: white;
    font-weight: bold;
  }
}

.row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    margin: 10px 0 30px 0;
    padding: 5px;
    border: 1px solid rgb(173, 173, 173);
    font-size: 1.25em;
  }
  .error {
    color: #db0000;
  }
}
</style>