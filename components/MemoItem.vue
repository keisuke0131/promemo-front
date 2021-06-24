<template>
  <div class="memo-wrap">
    <div class="memo">
      <!-- タイトル -->
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
              <li
                @click="$router.push({ path: `/posts/${post.id}/edit` })"
                class="memo-edit-link"
              >
                <i class="fas fa-edit"></i> 編集
              </li>
              <li @click="onClickDeleteIcon(post)" class="memo-delete-link">
                <i class="fas fa-trash-alt"></i> 削除
              </li>
            </div>
          </transition>
        </div>
      </div>
      <!-- 更新日時 -->
      <div class="post-updated-at">
        <i class="fas fa-sync"></i>
        <span>{{ this.$moment(post.updated_at).format("YYYY-MM-DD") }}</span>
      </div>
      <!-- カテゴリー -->
      <div class="category-wrap">
        <nuxt-link
          class="category"
          :class="
            post.category.category_color[0]
              ? post.category.category_color[0].color_name
              : post.category.default_color_name
          "
          :to="'/'"
          >{{ post.category.name }}</nuxt-link
        >
        <i class="far fa-heart"></i>
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
  width: calc(30% - 11.25px);
  padding: 0 10px;
  margin: 0 0px 30px 0;

  @include mq(lg) {
    width: 50%;
  }

  @include mq(md) {
    width: 50%;
  }

  @include mq(sm) {
    width: 100%;
  }

  .memo {
    background: white;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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

    .post-updated-at {
      color: $GRAY01;

      i {
        font-size: 12px;
      }

      span {
        font-size: 14px;
      }
    }

    .category-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0 0 0;

      .category {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 3px;
        box-shadow: 1px 1px #bbb;
        font-size: 0.75em;
        transition-duration: 0.4s;

        &:hover {
          opacity: 0.6;
        }
      }

      i {
        color: rgb(176, 195, 255);
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}
</style>