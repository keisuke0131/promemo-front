<template>
  <div>
    <main>
      <Sidebar page="1" />
      <div class="main-contents">
        <div class="memo" v-for="(post, index) in Posts" :key="index">
            <nuxt-link :to="'/posts/' + post.id +'/show'">
              <h3>{{ post.title }}</h3>
              <p>
                {{ post.content }}
              </p>
            </nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    const Posts = await store.dispatch("Posts/fetchList");
    store.commit("Posts/setList", Posts);
  },
  data() {
    return {
      dialogPost: {},
      isShowDialog: false,
      searchText: "",
    };
  },
  computed: {
    Posts() {
      return this.$store.getters["Posts/list"];
    },
    formTitle() {
      return this.isPersistedPost ? "管理者編集" : "管理者追加";
    },
    headers() {
      return [
        { text: "ID", value: "id" },
        { text: "投稿者", value: "user" },
        { text: "名前", value: "title" },
        { text: "コンテンツ", value: "content" },
        { text: "", value: "edit-action" },
        { text: "", value: "delete-action" },
      ];
    },
    isPersistedPost() {
      return !!this.dialogPost.id;
    },
  },
  methods: {
    closeDialog() {
      this.isShowDialog = false;
      setTimeout(() => {
        this.dialogPost = {};
      }, 1000);
    },
    //追加
    onClickAddBtn() {
      this.dialogPost = {};
      this.isShowDialog = true;
    },
    onClickEditIcon(Post) {
      this.dialogPost = Object.assign({}, Post);
      this.isShowDialog = true;
    },
    async onClickCreateBtn() {
      await this.$store.dispatch("Posts/create", this.dialogPost);
      this.closeDialog();
    },
    async onClickDeleteIcon(Post) {
      await this.$store.dispatch("Posts/delete", Post);
    },
    async onClickUpdateBtn() {
      await this.$store.dispatch("Posts/update", this.dialogPost);
      this.closeDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: space-between;
  width: 1250px;
  margin: 100px auto 0 auto;
  .main-contents {
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
    .memo {
      width: calc(25% - 11.25px);
      margin: 0 15px 15px 0;
      padding: 20px;
      box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.281);
      &:nth-of-type(4n) {
        margin: 0 0 15px 0;
      }
    }
  }
}
</style>
