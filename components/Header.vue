<template>
  <header>
    <div class="header-logo">
      <a href=""><img src="@/assets/image/logo.png" alt="" /></a>
    </div>
    <a href="{" class="btn btn-sm btn-primary mr-1"
      >登録する</a
    >
    <a href="" class="btn btn-sm btn-success mr-5"
      >ログイン</a
    >
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  position: relative;
  height: 60px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
  background: rgb(239, 251, 255);
  text-align: center;
  .header-logo {
    display: inline-block;
    margin: auto;
    img {
      width: 150px;
    }
  }
  .memo-btn {
    display: inline-block;
    position: absolute;
    right: 20px;
    padding: 5px 15px;
    background: rgb(117, 189, 218);
    color: #fff;
    font-size: 0.85em;
  }
}
</style>