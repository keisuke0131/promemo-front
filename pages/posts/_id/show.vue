<template>
  <main>
    <!-- タイトルと日付 -->
    <div class="post-title">
      <!-- タイトル -->
      <h1>{{ post.title }}</h1>
      <!-- 日付 -->
      <div class="post-date">
        <div>
          <i class="far fa-calendar-alt"></i>
          <span>{{ this.$moment(post.created_at).format("YYYY.MM.DD") }}</span>
        </div>
        <div>
          <i class="fas fa-sync"></i>
          <span>{{ this.$moment(post.updated_at).format("YYYY.MM.DD") }}</span>
        </div>
      </div>
    </div>
    <!-- メインコンテンツとサイドバー -->
    <div class="main-wrap">
      <div class="main-contents">
        <!-- メモ本文 -->
        <div class="memo BoxShadow">
          <div class="memo-user js-toc-content">
            <div v-html="$md.render(post.content)"></div>
          </div>
        </div>
        <!-- コメント -->
        <div class="comment-box BoxShadow">
          <!-- コメント一覧 -->
          <div>
            <h3>コメント一覧</h3>
            <div class="comment-item"></div>
          </div>
          <!-- コメント入力フォーム -->
          <div class="comment-form">
            <!-- コメントタイトル -->
            <form @submit.prevent="submitComment('comment')">
              <div>
                <input
                  type="text"
                  class="InputField"
                  placeholder="タイトルを入力してください。"
                  v-model="inputComment.title"
                />
              </div>
              <div>
                <!-- コメント本文 -->
                <textarea
                  placeholder="コメント内容を入力してください。"
                  cols="30"
                  rows="10"
                  class="InputField"
                  v-model="inputComment.content"
                ></textarea>
              </div>
              <button class="BlueAnimButton">投稿</button>
            </form>
          </div>
        </div>
      </div>
      <!-- サイドバー -->
      <div class="table-of-contents BoxShadow2">
        <h3>目次</h3>
        <div class="toc-wrap">
          <div class="toc"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import postSidebar from "../postSidebar.vue";
import tocbot from "tocbot";

export default {
  middleware: "not_logined_user",
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/api/posts/${params.id}`);
    return {
      post: data.post,
    };
  },
  components: {
    postSidebar,
  },
  data() {
    return {
      post: {
        comments:[{}]
      },
      inputComment:{
        title:'',
        content:'',
      },
      parseHtml: null,
    };
  },
  mounted() {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".js-toc-content",
      headingSelector: "h1, h2, h3",
      hasInnerContainers: false,
      scrollSmooth: false,
      collapseDepth: 100,
    });
  },
  methods: {
    submitComment(type){
      this.$axios.post('api/comment/store',{
        'postId':this.post.id,
        'title':this.inputComment.title,
        'content':this.inputComment.content,
      }).then((res)=>{
        console.log(res.data.comment)
      }).catch((err)=>{

      });
    }
  },
};
</script>

<style lang="scss" scoped>
main {
  background-color: rgb(246, 250, 255);

  > .post-title {
    padding: 50px 0;
    text-align: center;

    div {
      padding: 0 10px;
    }

    h1 {
      font-size: 22px;
      margin-bottom: 10px;
    }

    .post-date {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $GRAY01;

      i {
        color: $GRAY02;
        margin-right: 5px;
      }
    }
  }

  .main-wrap {
    display: flex;
    justify-content: center;
    margin: 0px auto 0 auto;
  }
  .main-contents {
    width: calc(90% - 350px);
    margin: 0 25px 15px 0;
    .memo {
      background: white;
      min-height: calc(100vh - 200px);
      box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.281);
      padding: 20px;
      margin-bottom: 50px;
      .memo-user {
        margin: 0 0 15px 0;
        p {
          font-size: 1.25em;
        }
      }
      p {
        font-size: 1.4em;
      }
      &:nth-of-type(4n) {
        margin: 0 0 15px 0;
      }
    }

    .comment-box {
      background-color: white;
      padding: 40px 30px;
      margin-bottom: 50px;

      .comment-form {
        input {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        button{
          display: block;
          margin: 20px 0 0 auto;
          font-size: 14px;
          padding: 5px 35px;
        }
      }
    }
  }

  .table-of-contents {
    background: #fff;
    color: $GRAY01;
    width: 350px;
    padding: 20px 10px;
    position: sticky;
    top: 30px;
    max-height: 400px;

    h3 {
      margin-bottom: 15px;
    }

    .toc-wrap {
      height: 300px;
      overflow-y: auto;
    }
  }
}
</style>

<style lang="scss">
@import "tocbot/src/scss/tocbot";
</style>