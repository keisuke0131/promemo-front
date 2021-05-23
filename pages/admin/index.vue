<template>
  <v-layout column justify-center>
    <v-card v-if="adminUsers">
      <v-card-title>
        管理者一覧
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
        :items="adminUsers"
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
                        v-model="dialogAdminUser.email"
                        label="メールアドレス"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="dialogAdminUser.name"
                        label="名前"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        type="password"
                        v-model="dialogAdminUser.password"
                        label="パスワード"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="closeDialog">閉じる</v-btn>
                <v-btn
                  v-if="isPersistedAdminUser"
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
  middleware: "not_logined_admin_user",
  layout: "admin",
  async fetch({ store }) {
    const adminUsers = await store.dispatch("adminUsers/fetchList");
    store.commit("adminUsers/setList", adminUsers);
  },
  data() {
    return {
      dialogAdminUser: {},
      isShowDialog: false,
      searchText: "",
    };
  },
  computed: {
    adminUsers() {
      return this.$store.getters["adminUsers/list"];
    },
    formTitle() {
      return this.isPersistedAdminUser ? "管理者編集" : "管理者追加";
    },
    headers() {
      return [
        { text: "ID", value: "id" },
        { text: "メールアドレス", value: "email" },
        { text: "名前", value: "name" },
        { text: "", value: "edit-action" },
        { text: "", value: "delete-action" },
      ];
    },
    isPersistedAdminUser() {
      return !!this.dialogAdminUser.id;
    },
  },
  methods: {
    closeDialog() {
      this.isShowDialog = false;
      setTimeout(() => {
        this.dialogAdminUser = {};
      }, 1000);
    },
    //追加
    onClickAddBtn() {
      this.dialogAdminUser = {};
      this.isShowDialog = true;
    },
    onClickEditIcon(adminUser) {
      this.dialogAdminUser = Object.assign({}, adminUser);
      this.isShowDialog = true;
    },
    async onClickCreateBtn() {
      await this.$store.dispatch("adminUsers/create", this.dialogAdminUser);
      this.closeDialog();
    },
    async onClickDeleteIcon(adminUser) {
      await this.$store.dispatch("adminUsers/delete", adminUser);
    },
    async onClickUpdateBtn() {
      await this.$store.dispatch("adminUsers/update", this.dialogAdminUser);
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