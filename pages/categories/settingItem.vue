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

      <div v-if="isOpenPallet">
        <div @click="togglePallet" class="pallet-bg"></div>
        <div class="color-pallet">
          <div class="pallet-content">
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="red1"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="red2"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="red3"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="pink1"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="pink2"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="pink3"
            ></span>

            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="purple1"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="purple2"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="purple3"
            ></span>

            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="blue1"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="blue2"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="blue3"
            ></span>

            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="skyBlue1"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="skyBlue2"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="skyBlue3"
            ></span>

            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="green1"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="green2"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="green3"
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
              class="orange3"
            ></span>


            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="yellow1"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="yellow2"
            ></span>
            <span
              @click="changeCategorColor($event, categoryProp.id)"
              class="yellow3"
            ></span>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "not_logined_user",
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
    width: 250px;
    height: 250px;
    z-index: 9999;

    span {
      width: 25px;
      height: 25px;
      display: block;
      cursor: pointer;
    }
  }

  .pallet-content {
    display: flex;
    flex-wrap: wrap;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    z-index: 9999;
  }

  .pallet-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
}
</style>