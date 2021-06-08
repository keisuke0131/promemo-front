<template>
  <div>
    <main>
      <div class="post-form-wrap">
        <div v-if="!isPreview" class="post-form">
          <form @submit.prevent="createPost">
            <div class="form-group">
              <label for="">タイトル</label>
              <input type="text" v-model="post.title" />
            </div>
            <div class="form-group">
              <textarea
                name=""
                id=""
                cols="30"
                rows="15"
                v-model="post.content"
                @input="update"
              ></textarea>
            </div>
            <button
              type="submit"
              v-shortkey.once="['ctrl', 's']"
              @shortkey="createPost"
            >
              送信
            </button>
          </form>
        </div>
        <div v-else class="post-preview">
          <h2>{{ post.title }}</h2>
          <div v-html="compiledMarkdown"></div>
        </div>

        <button
          class="preview-icon"
          @click="isPreviewUpdate"
          v-shortkey="['ctrl', 'z']"
          @shortkey="isPreviewUpdate"
        >
          <i class="fas fa-video" :class="{ 'icon-active': isPreview }"></i>
        </button>
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
          console.log(res);
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
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  padding: 0 20px;

  .preview-icon {
    position: absolute;
    top: 0;
    right: -50px;
    z-index: 9999px;
    color: white;
    width: 50px;
    height: 50px;
    background-color: rgb(196, 215, 255);
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    .icon-active {
      color: rgb(121, 163, 255);
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
  box-shadow: 5px 5px 25px -10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 20px 15px;
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