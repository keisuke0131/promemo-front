<template>
  <div class="color-setting-group">
    <span>{{ categoryProp.name }}</span>
    <div class="pallet-parent">
      <template v-if="categoryProp.category_color[0]">
        <div
          @click="togglePallet"
          class="color-box"
          :class="categoryProp.category_color[0].color_name"
        ></div>
      </template>

      <template v-else>
        <div
          @click="togglePallet"
          class="color-box"
          :class="categoryProp.default_color_name"
        ></div>
      </template>

      <div class="color-pallet" v-if="isOpenPallet">
        <span
          @click="changeCategorColor($event, categoryProp.id)"
          class="red1"
        ></span>
        <span
          @click="changeCategorColor($event, categoryProp.id)"
          class="orange1"
        ></span>
        <span
          @click="changeCategorColor($event, categoryProp.id)"
          class="orange2"
        ></span>
        <span
          @click="changeCategorColor($event, categoryProp.id)"
          class="blue1"
        ></span>
        <span
          @click="changeCategorColor($event, categoryProp.id)"
          class="yellow1"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    categoryProp: Object,
  },

  data() {
    return {
      isOpenPallet: false,
    };
  },

  methods: {
    togglePallet() {
      this.isOpenPallet = !this.isOpenPallet;
    },
    changeCategorColor(event, categoryId) {
      this.$emit("changeCategorColorEmit", event, categoryId);
      this.togglePallet();
    },
  },
};
</script>

<style lang="scss" scoped>
.color-setting-group {
  display: flex;
  align-items: center;
  span {
    width: 200px;
  }
}

.color-box {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
.pallet-parent {
  position: relative;

  .color-pallet {
    position: absolute;
    top: 20px;
    right: -20px;
    width: 200px;
    height: 200px;
    display: flex;

    span {
      width: 20px;
      height: 20px;
      display: block;
      cursor: pointer;
    }
  }
}
</style>