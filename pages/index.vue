<template>
  <div>
    <main class="two-columns-main">
      <Sidebar page="1" />
      <div class="main-contents">
        <MemoItem v-for="post in Posts" :key="post.id" :post="post"></MemoItem>
      </div>
    </main>
  </div>
</template>

<script>
import MemoItem from "../components/MemoItem";
export default {
  middleware: "not_logined_user",
  async fetch({ store }) {
    await store.dispatch("Posts/fetchList");
  },
  comments: {
    MemoItem,
  },
  computed: {
    Posts() {
      return this.$store.getters["Posts/list"];
    },
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
