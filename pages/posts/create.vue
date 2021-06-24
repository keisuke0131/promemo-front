<template>
  <div>
    <main>
      <div class="post-form-wrap">
        <div v-if="!isPreview" class="post-form">
          <form @submit.prevent="createPost">
            <div class="form-group">
              <label for="title">タイトル</label>
              <input type="text" id="title" v-model="post.title" />
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
                @input="update"
              ></textarea>
            </div>
            <button
              type="submit"
              v-shortkey.once="['ctrl', 's']"
              @shortkey="createPost"
              class="BlueAnimButton"
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
          category: this.post.categories[0],
        })
        .then((res) => {
          console.log(res.data.post.id);
          this.$router.push({ path: `/posts/${res.data.post.id}/edit` });
        })
        .catch((err) => {
          console.log(err);
        });

      this.toggleLoading(true)
      setTimeout(() => {
        this.toggleLoading(false)
      }, 3000)
    },
    update: function (e) {
      this.input = e.target.value;
    },
    isPreviewUpdate() {
      console.log(this.isPreview);
      this.isPreview = !this.isPreview;
    },
    toggleLoading (loading) {
      this.$nuxt.$emit('toggleLoading', loading)
    }
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

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

    input {
      border: 1px solid $BORDER_GRAY01;
      display: block;
      width: 100%;
      padding: 8px 8px;
      border-radius: 5px;
      color: $INPUT_GRAY_COlOR;

      &:focus {
        outline: none;
        border: 1px solid $BORDER_FOCUS_BLUE;
      }
    }

    textarea {
      border: 1px solid $BORDER_GRAY01;
      display: block;
      color: $INPUT_GRAY_COlOR;
      border-radius: 5px;
      width: 100%;
      padding: 10px 8px;

      &:focus {
        outline: none;
        border: 1px solid $BORDER_FOCUS_BLUE;
      }
    }
  }
  button {
    color: white;
    font-weight: bold;
    border-radius: 3px;
    padding: 5px 40px;
  }
}
</style>