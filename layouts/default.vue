<template>
  <v-app>
    <div v-if="loading" id="loading">
      <v-progress-circular indeterminate />
    </div>
    <v-main>
      <Header />  
      <Nuxt />
    </v-main>
  </v-app>
</template>


<script>
import Header from "@/components/Header.vue";

export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
          integrity:
            "sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p",
          crossorigin: "anonymous",
        },
      ],
    };
  },
  data: () => ({
    loading: false
  }),
  created () {
    this.$nuxt.$on('toggleLoading', (loading) => {
      this.loading = loading
    })
  },
  components: {
    Header,
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Z Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.v-main__wrap {
  /* background: rgba(212, 235, 253, 0.171); */
}

#loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background: rgba(#000, 0.5);
}
</style>
