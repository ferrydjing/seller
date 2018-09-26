<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vheader from 'components/v-header/v-header.vue'
  let utils = require('common/js/utils')
  console.log(utils)

  const ERR_OK = 0
  export default {
    name: 'App',
    components: {
      'v-header': vheader
    },
    data () {
      return {seller: {
        id: (() => {
          console.log()
          var obj = utils.urlParse(window.location.search)
          return obj.id
        })()
      }}
    },
    mounted () {
      this.axios.get('/api/seller?id=' + this.seller.id).then((res) => {
        let data = res.data
        if (data.errno === ERR_OK) {
          // this.seller = data.data
          this.seller = Object.assign({}, this.seller, data.data)
        }
      })
    }
  }
</script>

<style lang="stylus">
  @import "common/stylus/mixin"
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color rgb(240, 20, 20)
</style>
