<template>
  <div class="memo">
    <div
      class="memo-title-wrap"
      v-if="
        $store.state.auth.auth_user &&
        $store.state.auth.auth_user.id === post.user_id
      "
    >
      <h3>
        <nuxt-link :to="'/posts/' + post.id + '/show'">{{
          post.title
        }}</nuxt-link>
      </h3>
      <div class="fa-ellipsis-wrap">
        <i class="fas fa-ellipsis-v" @click="isOpen"></i>
        <div class="DropdownOpenBg" @click="isOpen" v-if="isOpenEllipsis"></div>
        <div class="DropdownList" v-if="isOpenEllipsis">
          <li @click="$router.push({path:`/posts/${post.id}/edit`})"><i class="fas fa-edit"></i> 編集</li>
          <li @click="onClickDeleteIcon(post)">
            <i class="fas fa-trash-alt"></i> 削除
          </li>
        </div>
      </div>
    </div>
    <p>
      {{ post.content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },

  data() {
    return {
      isOpenEllipsis: false,
    };
  },

  methods: {
    isOpen() {
      this.isOpenEllipsis = !this.isOpenEllipsis;
    },
    async onClickDeleteIcon(post) {
      await this.$store.dispatch("Posts/delete", post);
    },
  },
};
</script>

<style lang="scss" scoped>
.memo {
  width: calc(25% - 11.25px);
  margin: 0 15px 15px 0;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.281);
  &:nth-of-type(4n) {
    margin: 0 0 15px 0;
  }

  .memo-title-wrap {
    position: relative;
    .fa-ellipsis-wrap {
      position: absolute;
      top: 5px;
      right: 5px;
      i {
        cursor: pointer;
      }
    }

    h3 {
      margin-right: 10px;
    }
  }
}
</style>