<template>
  <div>
    <main class="two-columns-main">
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
              :class="
                category.category_color[0]
                  ? category.category_color[0].color_name
                  : category.default_color_name
              "
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
  middleware: "not_logined_user",
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
  width: 100%;
  .main-contents {
    width: calc(100% - 200px);
    display: flex;
    flex-wrap: wrap;
    @include mq(lg) {
      width: 100% !important;
    }
  }

  .category-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .category {
    width: calc(20% - 12px);
    margin: 0 15px 15px 0;
    padding: 20px;
    box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.3);
    border: 1px solid $BORDER_GRAY01;
    transition-duration: 0.2s;
    &:last-of-type{
      margin-right: 0;
    }
    &:active {
      opacity: 0.6;
    }

    @include mq(lg) {
      width: 45%;
    }

    @include mq(md) {
      width: 100%;
    }

    h3 {
      margin-bottom: 20px;
    }

    .memo {
      width: 100%;
      margin: 0 15px 15px 0;
      padding: 20px;
      border: 1px solid $BORDER_GRAY01;
      background: white;
      &:active {
        opacity: 0.6;
      }
    }
  }
}
</style>
