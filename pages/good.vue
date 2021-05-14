<template>
  <div>
    <Header />
    <main>
      <Sidebar page="3"/>
      <div class="main-contents">
        <div class="memo" v-for="n of 12" :key="n">
          <nuxt-link to="/">
            <h3>いいねした</h3>
            <p>
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </p>
          </nuxt-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
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
