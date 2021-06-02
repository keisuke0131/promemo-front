<template>
  <div>
    <Header />
    <main>
      <Sidebar page="1" />
      <div class="main-contents">
        <div class="memo">
          <div class="memo-title">
            <h1>メモタイトル</h1>
            <span>2021/06/01</span>
          </div>
          <div class="memo-user">
            <p>Tomiyoshi Keisuke</p>
          </div>
          <p>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト<br>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
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
      width: 100%;
      margin: 0 15px 15px 0;
      padding: 20px;
      box-shadow: 0 2px 4px 0 rgba(155, 155, 155, 0.281);
      .memo-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: 0 0 5px 0;
        h3 {
          font-size: 2em;
        }
      }
      .memo-user {
        margin: 0 0 15px 0;
        p {
          font-size: 1.25em;
        }
      }
      p {
        font-size: 1.4em;
      }
      &:nth-of-type(4n) {
        margin: 0 0 15px 0;
      }
    }
  }
}
</style>
