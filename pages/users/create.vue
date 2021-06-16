<template>
  <div>
    <main>
      <div class="post-form-wrap">
        <div v-if="!isPreview" class="post-form">
          <form @submit.prevent="createPost">
            <h1>Sign Up</h1>
            <div class="form-group">
              <input type="text" placeholder="name" />
            </div>
            <div class="form-group">
              <input type="text" placeholder="email" />
            </div>
            <div class="form-group">
              <input type="password" placeholder="password" />
            </div>
            <div class="form-group">
              <input type="password" placeholder="password_confirm" />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div v-else class="post-preview">
          <h2>{{ post.title }}</h2>
          <div v-html="compiledMarkdown"></div>
        </div>
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
      post: {
        title: null,
        content: null,
      },
      isPreview: false,
    };
  },
  computed: {
    compiledMarkdown() {
      if (this.post.content) {
        return this.$md.render(this.post.content);
      }
    },
  },
  methods: {
    createPost() {
      this.$axios
        .post("api/posts", {
          title: this.post.title,
          content: this.post.content,
        })
        .then((res) => {
          console.log(res.data.post.id);
          this.$router.push({ path: `/posts/${res.data.post.id}/edit` });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    update: function (e) {
      this.input = e.target.value;
    },
    isPreviewUpdate() {
      console.log(this.isPreview);
      this.isPreview = !this.isPreview;
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
</style>