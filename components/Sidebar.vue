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
        <nuxt-link to="/good">いいねした</nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
    }
  },
  data() {
    return {
      activetab: this.page,
    };
  }
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