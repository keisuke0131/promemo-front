<template>
  <v-layout column justify-center>
    <v-card v-if="Posts">
      <v-card-title>
        投稿一覧
        <v-spacer />
        <v-text-field
          v-model="searchText"
          append-icon="mdi-magnify"
          label="検索"
          sigle-line
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="Posts"
        :items-per-page="5"
        :search="searchText"
        sort-by="id"
        :sort-desc="true"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog v-model="isShowDialog" max-width="500px">
            <!-- 追加 -->
            <template v-slot:activator>
              <v-btn fab dark color="blue" class="mb-2" @click="onClickAddBtn">
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="dialogPost.user"
                        label="投稿者"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="dialogPost.title"
                        label="タイトル"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="dialogPost.content"
                        label="コンテンツ"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="closeDialog">閉じる</v-btn>
                <v-btn
                  v-if="isPersistedPost"
                  class="primary"
                  @click="onClickUpdateBtn"
                  >更新する</v-btn
                >
                <v-btn v-else class="primary" @click="onClickCreateBtn"
                  >追加する</v-btn
                >
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.edit-action`]="{ item }">
          <v-icon small @click="onClickEditIcon(item)"> mdi-pencil </v-icon>
        </template>
        <template v-slot:[`item.delete-action`]="{ item }">
          <v-icon small @click="onClickDeleteIcon(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  middleware: "not_logined_user",
  layout: "admin",
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
.mb-2{
    margin: 15px;
}
</style>