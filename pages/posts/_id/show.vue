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
          <pre v-highlightjs>
            <div class="memo-user js-toc-content">
              <div v-html="$md.render(post.content)"></div>
            </div>
          </pre>
        </div>
        <!-- コメント -->
        <div class="comment-box BoxShadow">
          <!-- コメント一覧 -->
          <div>
            <h3>コメント一覧</h3>
            <div
              v-for="(comment, commentIndex) in post.comments"
              :key="comment.id"
            >
              <div class="comment-item">
                <div>
                  <p class="comment-title">
                    {{ comment.title }}<span>by {{ comment.user.name }}</span>
                  </p>
                </div>
                <p>{{ comment.content }}</p>
                <div class="reply-btn">
                  <span>{{$moment(comment.created_at).fromNow()}}</span>
                  <a href="#comment-form"
                    @click="clickReplyBtn(comment.user, commentIndex)"
                    class="BlueAnimText"
                  >
                    返信する
                  </a>
                </div>
              </div>

              <!-- リプライ一覧 -->
              <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                <div class="reply-left-content"><i class="fas fa-reply fa-rotate-180"></i></div>
                <div class="reply-right-content">
                  <p class="comment-title">
                    {{ reply.title }}<span>by {{ reply.user.name }}</span>
                  </p>
                  <p>{{ reply.content }}</p>
                  <div class="reply-btn">
                  <span>{{$moment(reply.created_at).fromNow()}}</span>
                  <a href="#comment-form"
                    @click="clickReplyBtn(comment.user, commentIndex)"
                    class="BlueAnimText"
                  >
                    返信する
                  </a>
                </div>
                </div>
              </div>
            </div>
          </div>
          <!-- コメント入力フォーム -->
          <div class="comment-form" id="comment-form">
            <!-- コメントタイトル -->
            <form @submit.prevent="submitCommentform">
              <p class="comment-form-title">
                {{ commentFormTypeJa }}を投稿する
              </p>
              <template v-if="commentFormType === 'reply'">
                <div class="replyToUserWrap">
                  <p>返信先：{{ replyToUserName }}</p>
                  <button @click="clickCloseReplyBtn">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </template>
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
              <button class="BlueAnimButton">コメントを投稿</button>
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
        comments: [
          {
            replies: [{}],
            user: {},
          },
        ],
      },
      inputComment: {
        title: "",
        content: "",
      },
      parseHtml: null,
      replyToUserName: "",
      replyToCommnetIndex: "",
      commentFormType: "comment",
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
  computed: {
    commentFormTypeJa: function () {
      return this.commentFormType === "comment"
        ? "コメント"
        : "コメントへの返信";
    },
  },
  methods: {
    submitCommentform() {
      if (this.commentFormType === "comment") {
        this.submitComment();
      } else {
        this.submitReply();
      }
    },
    submitComment() {
      this.$axios
        .post(`api/comment/store`, {
          postId: this.post.id,
          title: this.inputComment.title,
          content: this.inputComment.content,
        })
        .then((res) => {
          this.post.comments.push(res.data.comment);
          this.inputComment.title = "";
          this.inputComment.content = "";
        })
        .catch((err) => {});
    },
    submitReply() {
      this.$axios
        .post(`api/reply/store`, {
          commentId: this.post.comments[this.replyToCommentIndex].id,
          title: this.inputComment.title,
          content: this.inputComment.content,
        })
        .then((res) => {
          this.post.comments[this.replyToCommentIndex].replies.push(
            res.data.reply
          );
          this.inputComment.title = "";
          this.inputComment.content = "";
        })
        .catch((err) => {});
    },
    clickReplyBtn(user, commentIndex) {
      // this.isShowingReply = true;
      this.commentFormType = "reply";
      this.replyToCommentIndex = commentIndex;
      this.replyToUserName = user.name;
    },
    clickCloseReplyBtn() {
      // this.isShowingReply = false;
      this.commentFormType = "comment";
    },
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
      color: $BLUE;
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

      h3{
        color: $BLUE;
      }

      .comment-item {
        border-bottom: 1px solid $BORDER_GRAY01;
        padding: 1.5rem 0 1rem 0;
      }

      .comment-title {
          font-weight: bold;
          span{
            padding-left: 10px;
            font-size: 13px;
            color: $GRAY01;
          }
        }

        .reply-btn {
          display: flex;
          color: $GRAY01;
          justify-content: space-between;
          font-size: 14px;

          a{
            color: $GRAY01;
          }
        }

      .replyToUserWrap {
        display: flex;
        margin-top: 15px;

        p {
          margin-bottom: 0px;
          margin-right: 10px;
          padding: 1px 5px;
          color: white;
          background: $GRAY02;
          font-size: 15px;
          font-weight: bold;
        }

        button {
          margin: 0px !important;
          padding: 0px !important;
          color: $GRAY01;

          &:hover {
            color: $BLUE;
          }
        }
      }

      .reply-item{
        display: flex;
        padding: 10px;

        .reply-left-content{
          width: 10%;
          text-align: right;
          padding-right: 15px;
          color: $GRAY02;
          font-size: 20px;
        }

        .reply-right-content{
          padding: 10px 0;
          border-bottom: 1px dashed $BORDER_GRAY01;
          width: 90%;
          margin-left: auto;

        }
      }

      .comment-form {
        margin-top: 100px;
        .comment-form-title {
          font-size: 20px;
          font-weight: bold;
          color: $BLUE;
        }

        input {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        a {
          display: block;
          margin: 20px 0 0 auto;
          font-size: 14px;
          padding: 5px 35px;
        }

        .BlueAnimButton {
          margin: 20px 0 0 0;
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
      color: $BLUE;
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