<template>
  <div>
    <main>
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
  display: flex;
  justify-content: space-between;
  width: 1250px;
  margin: 50px auto 0 auto;
  .main-contents {
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
  }
}
</style>
