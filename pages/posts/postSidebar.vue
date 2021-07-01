<template>
  <aside>
    <div>
        <div class="toc-container-header">Contents</div>
    </div>
  </aside>
</template>


<script>
export default {
  props: {
    page: {
      type: String,
    },
  },
  data() {
    return {
      data: "",
      activetab: this.page,
    };
  },
  async asyncData({ $axios }) {
    // 取得先のURL
    const url = "http://localhost:8000/api";
    // リクエスト（Get）
    const data = await $axios.$get(url);
    // 配列で返ってくるのでJSONにして返却
    return {
      data,
    };
  },
};
</script>