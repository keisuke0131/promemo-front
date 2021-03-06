import axios from "axios";
require("dotenv").config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "promemo-front",
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: [
    "~/assets/style/style.css",
    {
      src: '~/node_modules/highlight.js/styles/tomorrow-night-bright.css',
      lang: 'css'
    },
  ],

  plugins: [
    "~/plugins/axios",
    "~/plugins/vue-shortkey.client.js",
    "~/plugins/loadUser.js",
    "~/plugins/vee-validate.js",
    "~/plugins/vue-highlightjs",
    // "~/plugins/vue-js-toggle-button.js",
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/moment'
  ],

  modules: ["@nuxtjs/axios", '@nuxtjs/style-resources', "@nuxtjs/dotenv", "@nuxtjs/markdownit"],

  styleResources: {
    scss: [
      '@/assets/scss/_mixin.scss',
      '@/assets/scss/_variable.scss',
      '@/assets/scss/_color.scss',
    ]
  },
  moment: {
    // ここにオプションが記述できる
    locales: ['ja']
  },

  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true,  // 言語に依存しないきれいな 置換 + 引用符 を有効にする
    use: [
      "markdown-it-anchor",
      [
        "markdown-it-table-of-contents",
        {
          includeLevel: [1, 2], // 目次で生成する<h>タグ
        },
      ],
    ]
  },

  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
  },

  build: {
    extend(config, ctx) {
      const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
      config.plugins.push(new HardSourceWebpackPlugin())
    },
    babel: {
      presets({ isServer }, [preset, options]) {
        options.loose = true;
      }
    },
    transpile: ["vee-validate/dist/rules"]
  }
};
