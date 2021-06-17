<template>
  <div>
    <main>
      <Sidebar page="1" />
      <div class="main-contents">
        <div class="memo">
          <div class="memo-title">
            <h1>{{post.title}}</h1>
            <span>2021/06/01</span>
          </div>
          <div class="memo-user">
            <div v-html="$md.render(post.content)"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios,params }) {
    const { data } = await $axios.get(`/api/posts/${params.id}`);
    return {
      post: data.post,
    };
  },
  data() {
    return {
      post: null,
      parseHtml: null,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: space-between;
  width: 1250px;
  margin: 50px auto 0 auto;
  .main-contents {
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
    .memo {
      width: 100%;
      min-height: calc(100vh - 200px);
      margin: 0 15px 15px 0;
      padding: 20px;
      box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.281);
      .memo-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 30px 0;
        h3 {
          font-size: 2em;
        }
      }
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
}
</style>
