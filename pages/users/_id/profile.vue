<template>
  <div>
    <main>
      <div class="profile-wrap">
        <h1>プロフィール編集</h1>
        <div v-if="$store.state.auth.auth_user">
          <div class="profile-form-group">
            <span class="profile-label"
              >ユーザー名
              <nuxt-link
                :to="
                  '/users/' + $store.state.auth.auth_user.id + '/profiles/name'
                "
                >変更する</nuxt-link
              >
            </span>
            <span>{{ $store.state.auth.auth_user.name }}</span>
          </div>
          <div class="profile-form-group">
            <span class="profile-label"
              >メールアドレス
              <nuxt-link
                :to="
                  '/users/' + $store.state.auth.auth_user.id + '/profiles/email'
                "
                >変更する</nuxt-link
              >
            </span>
            <span>{{ $store.state.auth.auth_user.email }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  middleware: "not_logined_user",
  async asyncData({ $axios, params }) {},
  data() {},
};
</script>

<style lang="scss" scoped>
main {
  width: 90%;
  max-width: 600px;
  margin: 40px auto;
  h1 {
    margin: 0 0 20px 0;
    color: #618be7;
  }
  .profile-label {
    display: block;
    font-weight: bold;
    margin: 2px 0;
  }

  .profile-wrap {
    margin: 0 auto;
    padding: 5px 10px;

    .profile-form-group {
      margin-bottom: 20px;

      a {
        color: $GRAY01;
        font-size: 14px;
      }
    }
  }
}
</style>
