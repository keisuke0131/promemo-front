<template>
  <div>
    <main>
      <h1>投稿編集画面</h1>
      <div class="post-form-wrap">
        <div v-if="!isPreview" class="post-form">
          <form @submit.prevent="updatePost">
            <div class="form-group">
              <label for="">タイトル</label>
              <input type="text" v-model="post.title" />
            </div>

            <div class="form-group">
              <label for="category">カテゴリー</label>
              <Multiselect
                id="category"
                v-model="postCategory"
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
                name=""
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
              @shortkey="updatePost"
              class="BlueAnimButton"
            >
              更新
            </button>

            <span class="draft-btn" :class="{ 'draft-btn-active': post.draft }" @click="changeDraft">  
              下書きモード
            </span>
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
import Multiselect from "../../../node_modules/@vueform/multiselect/dist/multiselect.vue2.js";
export default {
  middleware: "not_logined_user",
  props: {
    page: {},
  },
  async asyncData({ $axios, params }) {
    let { data } = await $axios.get(`/api/posts/${params.id}/edit`);
    let category = await $axios.get("/api/categories");
    return {
      post: data.post,
      postCategory: data.category,
      categories: category.data,
    };
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      post: {
        title: null,
        content: null,
        draft: null,
        categories: [
          {
            id: null,
          },
        ],
      },
      categories: [],
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
    updatePost() {
      this.$axios
        .put(`api/posts/${this.$route.params.id}`, {
          title: this.post.title,
          content: this.post.content,
          draft: this.post.draft,
          categoryId: this.postCategory[0],
        })
        .then((res) => {
          console.log(res.data);
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
    changeDraft(){
      this.post.draft = !this.post.draft;
    }
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>
main {
  width: 90%;
  max-width: 1000px;
  margin: 40px auto;
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

      @include mq(md) {
        position: fixed;
        top: 90%;
        right: 20px !important;
      }

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
        font-weight: bold;
        font-size: 16px;
        color: $GRAY01;
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

  .draft-btn{
    cursor: pointer;
    margin:0 0 0 20px;
    padding: 7px 20px;
    border-radius: 3px;
    opacity:0.35;
    background: #e6b1b1;
    color: #fff;
  }

  .draft-btn-active{
    opacity: 1;
  }
}
</style>