<template>
    <div class="cart">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" @click='decreaseCart' v-show="food.count > 0">
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart (event) {
                if (this.food.count) {
                    this.food.count++
                } else {
                    Vue.set(this.food, 'count', 1)
                }
                this.$emit('add', event.target)
            },
            decreaseCart () {
                if (this.food.count && this.food.count > 0) {
                    this.food.count--
                } else {
                    this.food.count = 0
                }
            }
        },
        mounted () {}
    }
</script>

<style lang="stylus">
    .cart
        font-size 0
        .cart-decrease
            display inline-block
            padding 6px
            opacity 1
            transform translate3d(0, 0, 0)
            font-size 24px
            line-height 24px
            color rgb(0, 160, 220)
            transition all 0.4s linear
            &.move-enter-active, &.move-leave-active
                transition all 0.4s linear
            &.move-enter, &.move-leave-to
                opacity 0
                transform translate3d(24px,0,0) rotate(180deg)
        .cart-count
            display inline-block
            vertical-align top
            width 12px
            padding-top 6px
            text-align center
            font-size 10px
            color rgb(147, 153, 159)
            line-height 24px
        .cart-add
            display inline-block
            padding 6px
            font-size 24px
            line-height 24px
            color rgb(0, 160, 220)
</style>
