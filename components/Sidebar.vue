<template>
  <aside>
    <ul>
      <li
        v-on:click="activetab = '1'"
        v-bind:class="[activetab === '1' ? 'active' : '']"
      >
        <nuxt-link class="BlueAnimText" to="/">みんなのメモ</nuxt-link>
      </li>
      <li
        v-on:click="activetab = '2'"
        v-bind:class="[activetab === '2' ? 'active' : '']"
      >
        <nuxt-link class="BlueAnimText" to="/mypage">自分のメモ</nuxt-link>
      </li>
      <li
        v-on:click="activetab = '3'"
        v-bind:class="[activetab === '3' ? 'active' : '']"
      >
        <nuxt-link to="/good" class="BlueAnimText">保存した</nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import axios from "axios";
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
  width: 100px;
  @include mq(lg) {
    width: 100%;
  }
  ul {
    font-size: 16px;
    margin-bottom: 50px;
    @include mq(lg) {
      display: flex;
      font-size: 14px;
    }
    li {
      line-height: 2em;

      @include mq(lg) {
        width: 25%;
      }

      a {
        color: $GRAY01;
        @include mq(lg) {
          padding: 30px 10px;
          border-radius: 10px;
        }
      }
    }
    .active {
      font-weight: bold;
      a {
        color: $BLUE;
        @include mq(lg) {
          background-color: $BLUE;
          color: white;
        }
      }
    }
  }
}
</style>