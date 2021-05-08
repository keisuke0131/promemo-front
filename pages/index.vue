<template>
<div>
  <Header />
  <main>
    <aside>
      <ul>
        <li class="active"><a href="">みんなのメモ</a></li>
        <li><a href="">自分のメモ</a></li>
        <li><a href="">いいねした</a></li>
      </ul>
    </aside>
    <div class="main-contents">
      <div class="memo">
        <h3>タイトル</h3>
        <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
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
  margin: 50px auto 0 auto;
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
}
</style>
