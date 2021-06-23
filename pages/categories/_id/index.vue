<template>
  <div>
    <main>
      <Sidebar page="1" />
      <div class="main-contents">
        <MemoItem v-for="post in posts" :key="post.id" :post="post" ></MemoItem>
      </div>
    </main>
  </div>
</template>

<script>
import MemoItem from "../../../components/MemoItem";
export default {
  middleware: "not_logined_user",

  async asyncData({ $axios,params }) {
    const { data } = await $axios.get(`/api/categories/${params.id}`);
      return {
        posts: data.category.posts
      };
  },
  comments: {
    MemoItem,
  }
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



