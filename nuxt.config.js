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

  plugins: ["~/plugins/axios"],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv"],

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
