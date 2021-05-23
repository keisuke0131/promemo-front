<template>
  <v-app>
    <!-- ヘッダー部分 -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <!-- コンテンツ部分 -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- フッター部分 -->
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      fixed: false,
      title: 'Laravel Nuxt Admin'
    }
  }
}
</script>