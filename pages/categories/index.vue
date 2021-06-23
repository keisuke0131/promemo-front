<template>
  <div>
    <main>
      <Sidebar page="1" />
      <div class="main-contents">
        <h1>カテゴリー一覧</h1>
        <div class="category-contents">
          <span v-for="category in Categories" :key="category.id" :category="category">
            {{ category.name }}
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  middleware: "not_logined_user",
  async fetch({ store }) {
    const Categories = await store.dispatch("Categories/fetchList");
    store.commit("Categories/setList", Categories);
  },
  computed: {
    Categories() {
      return this.$store.getters["Categories/list"];
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: space-between;
  width: 1250px;
  margin: 50px auto 0 auto;
  h1{
    margin:0 0 15px 0;
  }
  .main-contents {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 1000px;
    .category-contents{
      display: flex;
      flex-wrap:wrap;
      span{
        display:inline-block;
        margin:0 15px 0 0;
        padding:5px 10px;
        background: #f3f3f3;
        box-shadow:1px 1px #bbb;
      }
    }
  }
}
</style>
