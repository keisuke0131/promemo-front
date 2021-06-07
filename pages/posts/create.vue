<template>
  <div>
    <Header />
    <main>
      <div class="post-form">
        <form @submit.prevent="createPost">
          <div class="form-group">
            <input type="text" v-model="post.title" />
          </div>
          <div class="form-group">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="post.content"
            ></textarea>
          </div>
          <button type="submit">送信</button>
        </form>
        <div v-html="html"></div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    page: {},
  },
  data() {
    return {
      post: {
        title: null,
        content: null,
      },
      activetab: this.page,
    };
  },
  methods: {
    createPost() {
      this.$axios
        .post("api/posts", {
          title: this.post.title,
          content: this.post.content,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-form {
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
    color: white;
    font-weight: bold;
    background-color: rgb(184, 214, 255);
    border-radius: 3px;
    padding: 0 10px;
  }
}
</style>