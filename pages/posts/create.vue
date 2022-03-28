<template>
  <div class="wrap">
    <main>
      <h1>新規投稿画面</h1>
      <div class="post-form-wrap">
        <div v-if="!isPreview" class="post-form">
          <form @submit.prevent="createPost">
            <div class="form-group">
              <label for="title">タイトル</label>
              <input
                type="text"
                class="InputField"
                id="title"
                v-model="post.title"
              />
            </div>
            <div class="form-group">
              <label for="category">カテゴリー</label>
              <Multiselect
                id="category"
                v-model="post.categories"
                mode="tags"
                :searchable="true"
                noResultsText="一致する検索結果がありません。"
                :createTag="false"
                :options="categories"
                :max="1"
                valueProp="id"
                trackBy="name"
                label="name"
              />
            </div>

            <div class="form-group">
              <label for="content">本文</label>
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="15"
                v-model="post.content"
                class="InputField"
                @input="update"
              ></textarea>
            </div>
            <div class="button-list">
              <button
                type="submit"
                v-shortkey.once="['ctrl', 's']"
                @shortkey="createPost"
                class="BlueAnimButton"
              >
                送信
              </button>
              <span
                class="draft-btn"
                :class="{ 'draft-btn-active': post.draft }"
                @click="changeDraft"
              >
                下書きモード
              </span>
            </div>
          </form>
        </div>
        <div v-else class="post-preview">
          <h2>{{ post.title }}</h2>
          <div v-html="compiledMarkdown"></div>
        </div>

        <button
          class="preview-icon"
          :class="{ 'icon-active': isPreview }"
          @click="isPreviewUpdate"
          v-shortkey="['ctrl', 'z']"
          @shortkey="isPreviewUpdate"
        >
          <i class="fas fa-video"></i>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import Multiselect from "../../node_modules/@vueform/multiselect/dist/multiselect.vue2.js";

export default {
  middleware: "not_logined_user",
  props: {
    page: {},
  },
  data() {
    return {
      post: {
        title: null,
        content: null,
        draft: null,
        categories: [],
      },
      categories: [],
      isPreview: false,
    };
  },

  async asyncData({ $axios }) {
    let { data } = await $axios("/api/categories");
    return {
      categories: data,
    };
  },

  components: {
    Multiselect,
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
          draft: this.post.draft,
          category: this.post.categories[0],
        })
        .then((res) => {
          console.log(res.data.post.id);
          this.$router.push({ path: `/posts/${res.data.post.id}/edit` });
        })
        .catch((err) => {
          console.log(err);
        });

      this.toggleLoading(true);
      setTimeout(() => {
        this.toggleLoading(false);
      }, 3000);
    },
    update: function (e) {
      this.input = e.target.value;
    },
    isPreviewUpdate() {
      console.log(this.isPreview);
      this.isPreview = !this.isPreview;
    },
    toggleLoading(loading) {
      this.$nuxt.$emit("toggleLoading", loading);
    },
    changeDraft() {
      this.post.draft = !this.post.draft;
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
.wrap {
  background-color: #f6faff;
  padding: 40px 0;
}
main {
  width: 90%;
  max-width: 1000px;
  margin: 0px auto;
  padding: 80px auto;
  h1 {
    color: #618be7;
  }
  .post-form-wrap {
    position: relative;
    margin: 40px auto;
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
    background: white;
    box-shadow: 5px 5px 25px -10px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding: 20px 15px;
    border: 1px solid rgb(243, 243, 243);

    .form-group {
      margin: 10px 0;

      label {
        display: block;
        color: $GRAY01;
        font-weight: bold;
        font-size: 16px;
      }
    }
    button {
      color: white;
      font-weight: bold;
      border-radius: 3px;
      padding: 5px 40px;
    }
  }

  .button-list {
    margin: 15px 0 0 0;
  }

  .draft-btn {
    cursor: pointer;
    margin: 0 0 0 20px;
    padding: 7px 20px;
    border-radius: 3px;
    opacity: 0.35;
    background: #e6b1b1;
    color: #fff;
  }

  .draft-btn-active {
    opacity: 1;
  }
}
</style>