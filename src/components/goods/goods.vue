<template>
    <div class="goods">
        <div class="menu-wrapper"></div>
        <div class="foods-wrappr"></div>
    </div>
</template>

<script>
    const ERR_OK = 0
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                goods: []
            }
        },
        mounted () {
            this.axios.get('/api/goods').then((res) => {
                var data = res.data
                if (data.errno === ERR_OK) {
                    this.goods = data.data
                }
            })
        }
    }
</script>

<style lang="stylus">
    .goods
        position absolute
        display flex
        top 174px
        width 100%
        bottom 46px
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background #f3f5f7
        .goods-wrapper
            flex 1
</style>
