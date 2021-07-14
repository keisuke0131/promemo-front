<template>
  <aside>
    <ul>
      <li
        @click="activetab = '1'"
        :class="[activetab === '1' ? 'active' : '']"
      >
        <nuxt-link class="BlueAnimText" to="/">みんなのメモ</nuxt-link>
      </li>
      <li
        @click="activetab = '2'"
        :class="[activetab === '2' ? 'active' : '']"
      >
        <nuxt-link class="BlueAnimText" to="/mypage">カテゴリ</nuxt-link>
      </li>
      <li
        @click="activetab = '3'"
        :class="[activetab === '3' ? 'active' : '']"
      >
        <nuxt-link to="/good" class="BlueAnimText">お気に入り</nuxt-link>
      </li>
      <li
        @click="activetab = '4'"
        :class="[activetab === '4' ? 'active' : '']"
      >
        <nuxt-link to="/draft" class="BlueAnimText">下書き</nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
    },
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
  width: 180px;
  margin:0 20px 0 0;
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