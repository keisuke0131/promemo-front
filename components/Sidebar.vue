<template>
  <aside>
    <ul>
      <li class="active"><nuxt-link to="/">みんなのメモ</nuxt-link></li>
      <li v-bind:class="{ active: isActive }">><nuxt-link to="/mypage">自分のメモ</nuxt-link></li>
      <li><nuxt-link to="/good">いいねした</nuxt-link></li>
    </ul>
  </aside>
</template>

<script>
export default {};
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