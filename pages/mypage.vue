<template>
  <div>
    <main>
      <Sidebar page="2" />
      <div class="main-contents">
        <div>
          <Draggable
            @end="updateCategoryOrderNumber"
            class="category-wrap"
            v-model="categories"
          >
            <div
              class="category"
              v-for="(category, categoryIndex) in categories"
              :key="`${category.id}${categoryIndex}`"
            >
              <div>
                <h3>{{ category.name }}</h3>
                <Draggable
                  @end="updateOrderNumber"
                  v-model="category.posts"
                  group="category"
                  :data-category-index="categoryIndex"
                >
                  <div
                    class="memo"
                    v-for="(post, index) in category.posts"
                    :key="`${post.id}${index}${categoryIndex}`"
                  >
                    {{ post.title }}
                  </div>
                </Draggable>
              </div>
            </div>
          </Draggable>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
export default {
  data() {
    return {
      categories: [],
    };
  },
  components: {
    Draggable,
  },
  created() {
    this.$axios.get("api/myMemo").then((res) => {
      this.categories = res.data;
    });
  },
  methods: {
    updateOrderNumber(event) {
      this.$axios
        .post("/api/updateOrderNumber", {
          newIndex: event.newIndex + 1,
          oldIndex: event.oldIndex + 1,
          categoryFromIndex:
            Number(event.from.getAttribute("data-category-index")) + 1,
          categoryToindex:
            Number(event.to.getAttribute("data-category-index")) + 1,
        })
        .then((res) => {})
        .catch((err) => {});
    },

    updateCategoryOrderNumber(event) {
      this.$axios
        .post("/api/updateCategoryOrderNumber", {
          newIndex: event.newIndex + 1,
          oldIndex: event.oldIndex + 1,
          //   categoryFromIndex:
          //     Number(event.from.getAttribute("data-category-index")) + 1,
          //   categoryToindex:
          //     Number(event.to.getAttribute("data-category-index")) + 1,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
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
    width: 1000px;
  }

  .category-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
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
