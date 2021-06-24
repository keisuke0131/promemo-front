<template>
  <v-app>
    <div v-if="loading" id="loading">
      <v-progress-circular indeterminate />
    </div>
    <v-content> 
      <Nuxt />
    </v-content>
  </v-app> 
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  created () {
    this.$nuxt.$on('toggleLoading', (loading) => {
      this.loading = loading
    })
  },
};
</script>

<style lang="scss" scoped>
#loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background: rgba(#000, 0.75);
}
</style>