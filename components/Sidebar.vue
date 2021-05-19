<template>
  <aside>
    <ul>
      <li
        v-on:click="activetab = '1'"
        v-bind:class="[activetab === '1' ? 'active' : '']"
      >
        <nuxt-link to="/">みんなのメモ</nuxt-link>
      </li>
      <li
        v-on:click="activetab = '2'"
        v-bind:class="[activetab === '2' ? 'active' : '']"
      >
        <nuxt-link to="/mypage">自分のメモ</nuxt-link>
      </li>
      <li
        v-on:click="activetab = '3'"
        v-bind:class="[activetab === '3' ? 'active' : '']"
      >
        <nuxt-link to="/good">{{ data }}</nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    page: {
      type: String,
    },
  },
  data() {
    return {
      data: "",
      activetab: this.page,
    };
  },
  // mounted() {
  //   axios
  //     .get("http://localhost:8000/api")
  //     .then((response) => {
  //       this.data = response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.data = "ERROR";
  //     });
  // },
  async asyncData({ $axios }) {
    // 取得先のURL
    const url = "http://localhost:8000/api";
    // リクエスト（Get）
    const data = await $axios.$get(url);
    // 配列で返ってくるのでJSONにして返却
    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
aside {
  width: 200px;
  ul {
    li {
      line-height: 2em;
      font-size: 1.25em;
      a {
        color: #222;
      }
    }
    .active {
      font-weight: bold;
      a {
        color: #007bff;
      }
    }
  }
}
</style>