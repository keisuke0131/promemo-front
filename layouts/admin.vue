<template>
  <v-app>
    <!-- サイドバー部分  -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- ヘッダー部分 -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <!-- コンテンツ部分 -->
    <v-main>
      <v-container fluid pa-10>
        <nuxt />
      </v-container>
    </v-main>
    <!-- フッター部分 -->
    <v-footer :fixed="fixed" app>
      <span>© {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-account",
          title: "管理者一覧",
          to: "/admin",
        },
        {
          icon: "mdi-account",
          title: "ユーザ一覧",
          to: "/",
        },
        {
          icon: "mdi-account",
          title: "投稿一覧",
          to: "/posts",
        },
      ],
      miniVariant: false,
      title: "promemo 管理画面",
    };
  },
};
</script>