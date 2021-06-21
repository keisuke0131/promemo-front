<template>
  <div>
    <main>
      <Sidebar page="2" />
      <div class="main-contents">
        <div class="category-scroll">
          <div
            class="category"
            v-for="category of categories"
            :key="category.id"
          >
            <div>
              <h3>{{ category.name }}</h3>
              <div class="memo" v-for="post in category.posts" :key="post.id">
                {{ post.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.$axios.get("api/myMemo").then((res) => {
      this.categories = res.data;
    });
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
    width: 1000px;
  }

  .category-scroll {
    width: 100%;
    overflow: scroll;
    display: flex;
  }

  .category {
    width: 300px;
    min-width: 300px;
    margin: 0 15px 15px 0;
    padding: 20px;
    box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.3);
    border: 1px solid $BORDER_GRAY01;

    h3 {
      margin-bottom: 20px;
    }

    .memo {
      width: 100%;
      margin: 0 15px 15px 0;
      padding: 20px;
      border: 1px solid $BORDER_GRAY01;
    }
  }
}
</style>
