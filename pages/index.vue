<template>
  <div>
    <Header />
    <main>
      <Sidebar page="1" />
      <div class="main-contents">
        <div class="memo" v-for="(post, index) in posts" :key="index">
            <a :href="'post.url'" target="_blank" rel="noopener noreferrer">
              <h3>{{ post.title }}</h3>
              <p>
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
              </p>
            </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    // 取得先のURL
    const url = "https://qiita.com/api/v2/items";
    // リクエスト（Get）
    const response = await $axios.$get(url);
    // 配列で返ってくるのでJSONにして返却
    return {
      posts: response,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: space-between;
  width: 1250px;
  margin: 100px auto 0 auto;
  .main-contents {
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
    .memo {
      width: calc(25% - 11.25px);
      margin: 0 15px 15px 0;
      padding: 20px;
      box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.281);
      &:nth-of-type(4n) {
        margin: 0 0 15px 0;
      }
    }
  }
}
</style>
