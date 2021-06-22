<template>
  <div class="memo-wrap">
    <div class="memo">
      <div class="memo-title-wrap">
        <h3>
          <nuxt-link :to="'/posts/' + post.id + '/show'">{{
            post.title
          }}</nuxt-link>
        </h3>
        <div
          v-if="
            $store.state.auth.auth_user &&
            $store.state.auth.auth_user.id === post.user_id
          "
          class="fa-ellipsis-wrap"
        >
          <i class="fas fa-ellipsis-v" @click="isOpen"></i>
          <div
            class="DropdownOpenBg"
            @click="isOpen"
            v-if="isOpenEllipsis"
          ></div>
          <transition>
            <div class="DropdownList" v-if="isOpenEllipsis">
              <li @click="$router.push({ path: `/posts/${post.id}/edit` })">
                <i class="fas fa-edit"></i> 編集
              </li>
              <li @click="onClickDeleteIcon(post)">
                <i class="fas fa-trash-alt"></i> 削除
              </li>
            </div>
          </transition>
        </div>
      </div>
      <div>
        <span class="category" :class="log('php')">
          <nuxt-link :to="'/'">{{ post.category.name }}</nuxt-link>
        </span>
      </div>
    </div>
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
    log(color) {
      if (color == "php") {
        return "php";
      }
    },
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
.v-leave-active,
.v-enter-active {
  transition: opacity 0.2s;
}

/* 表示アニメーション */
.v-enter,
.v-leave-to {
  opacity: 0;
}

.memo-wrap {
  width: calc(25% - 11.25px);
  padding: 0 5px;
  margin: 0 0px 15px 0;

  @include mq(lg) {
    width: 30%;
  }

  @include mq(md) {
    width: 50%;
  }

  @include mq(sm) {
    width: 100%;
  }

  .memo {
    position: relative;
    padding: 20px;
    box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(240, 240, 240);

    .memo-title-wrap {
      position: relative;
      .fa-ellipsis-wrap {
        position: absolute;
        top: 0px;
        right: 5px;
        i {
          cursor: pointer;
          color: $GRAY01;
        }
      }

      h3 {
        font-size: 16px;
        margin-right: 10px;
      }
    }

    .category {
      display: inline-block;
      margin: 10px 0 0 0;
      padding: 5px 10px;
      box-shadow: 1px 1px #bbb;
      background: #f8f8f8;
      font-size: 0.75em;
    }
  }
}
</style>