<template>
  <div>
    <main class="two-columns-main">
      <Sidebar page="4" />
      <div class="main-contents">
        <MemoItem v-for="post in posts" :key="post.id" :post="post"></MemoItem>
      </div>
    </main>
  </div>
</template>

<script>
import MemoItem from "../components/MemoItem";
export default {
  middleware: "not_logined_user",
  data() {
    return {
      posts: "",
    };
  },
  comments: {
    MemoItem,
  },
  async asyncData({ $axios }) {
    const posts = await $axios.$get('/api/draft');
    return {
      posts
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  .main-contents {
    width: calc(100% - 200px);
    display: flex;
    flex-wrap: wrap;
    
    @include mq(lg) {
      width: 100% !important;
    }
  }
}
</style>
