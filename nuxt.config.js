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

  css: ["@/assets/style/style.css"],

  plugins: ["~/plugins/axios","~/plugins/vue-shortkey.client.js"],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module'
  ],

  modules: ["@nuxtjs/axios",'@nuxtjs/style-resources',"@nuxtjs/dotenv","@nuxtjs/markdownit"],

  styleResources: {
    scss: [
      '@/assets/scss/_mixin.scss',
      '@/assets/scss/_variable.scss',
    ]
  },

  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true,  // 言語に依存しないきれいな 置換 + 引用符 を有効にする
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
    }
  }
};
