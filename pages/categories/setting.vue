<template>
  <div>
    <main>
      <div class="MaxWidth640">
        <h2>カテゴリーの色の設定</h2>
        <div v-if="$store.state.auth.auth_user">
          <div v-for="category in categories" :key="category.id">
            <setting-item
              @changeCategorColorEmit="changeCategorColor"
              :categoryProp="category"
            ></setting-item>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import settingItem from "../categories/settingItem.vue";

export default {
  async asyncData({ $axios, params }) {
    let categories = null;

    await $axios.get("/api/categories").then((res) => {
      categories = res.data;
    });

    return {
      categories: categories,
    };
  },
  components: {
    settingItem: settingItem,
  },
  data() {},
  methods: {
    changeCategorColor(event, categoryId) {
      console.log(event, categoryId);
      this.$axios
        .post("/api/changeCategorColor", {
          categoryId: categoryId,
          colorName: event.target.className,
        })
        .then((res) => {
          this.categories = res.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 20px;
  color: rgb(173, 173, 173);
  margin-bottom: 20px;
}

.MaxWidth640 {
  padding-right: 2rem;
  padding-left: 2rem;
}
</style>
