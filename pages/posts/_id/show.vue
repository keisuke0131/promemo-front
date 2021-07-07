<template>
  <main>
    <div class="post-title">
      <h1>{{ post.title }}</h1>
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
    <div class="main-wrap">
      <div class="main-contents">
        <div class="memo BoxShadow2">
          <div class="memo-user js-toc-content">
            <div v-html="$md.render(post.content)"></div>
          </div>
        </div>
      </div>
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
      post: null,
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
};
</script>

<style lang="scss" scoped>
main {
  background-color: rgb(246, 250, 255);

  > .post-title {
    padding: 50px 0;
    text-align: center;

    div{
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
    .memo {
      background: white;
      min-height: calc(100vh - 200px);
      margin: 0 15px 15px 0;
      padding: 20px;
      box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.281);
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
  }

  .table-of-contents {
    background: #fff;
    color: $GRAY01;
    width: 350px;
    padding: 20px 10px;
    border: 1px solid $BORDER_GRAY01;
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