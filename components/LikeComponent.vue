<template>
 <div>
    <button v-if="status == false" type="button" @click.prevent="like_check" class="btn btn-outline-warning">&#9825;</button><a v-if="status == false" href="#">{{count}}</a>
    <button v-else type="button" @click.prevent="like_check" class="btn btn-warning">&#9829;</button><a v-if="status == true" href="#">{{count}}</a>
 </div>
</template>

<script>
export default {
 props: ['post'],
 data() {
   return {
     status: false,
     count: 0,
   }
 },
 created() {
   this.first_check()
 },
 methods: {
   first_check() {
     this.$axios.get(`/api/posts/${this.post.id}/firstcheck`).then((res) => {
       if(res.data[0] == 1) {
         this.status = true
         this.count = res.data[1]
       } else {
         this.status = false
         this.count = res.data[1]
       }
     }).catch(function(err) {
       console.log(err)
     })
   },
   like_check() {
     this.$axios.get(`/api/posts/${this.post.id}/check`).then((res) => {
       if(res.data[0] == 1) {
         this.status = true
         this.count = res.data[1]
       } else {
         this.status = false
         this.count = res.data[1]
       }
     }).catch(function(err) {
       console.log(err)
     })
   },
 }
}
</script>