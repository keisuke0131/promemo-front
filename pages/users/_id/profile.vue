<template>
  <div>
    <main>
      <div class="profile-wrap MaxWidth640">
        <h2>プロフィール</h2>
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
h2 {
  font-size: 20px;
  color: rgb(173, 173, 173);
  margin-bottom: 20px;
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
</style>
