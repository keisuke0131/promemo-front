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
  async fetch({ store }) {
    const Posts = await store.dispatch("Posts/fetchList");
    store.commit("Posts/setList", Posts);
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
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
