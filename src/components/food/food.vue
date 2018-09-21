<template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="foodSC">
            <div class="foot-content">
                <div class="head">
                    <img :src="food.image" alt="" />
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <div class="basic">
                        <h1 class="name">{{food.name}}</h1>
                        <div class="extra">
                            <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                        </div>
                        <div class="price">
                            <span class="now">￥{{food.price}}</span><span v-if="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                            <div class="cart-control-wrapper">
                                <cartControl :food="food" @add="foodAdd"/>
                            </div>
                            <transition name="fade">
                                <div class="add-cart" @click='add($event)' v-show="!food.count || food.count === 0">加入购物车</div>
                            </transition>
                        </div>
                    </div>
                    <split />
                    <div class="info">
                        <h1 class="info-title">商品介绍</h1>
                        <p class="text">{{food.info}}</p>
                    </div>
                    <split />
                    <div class="rating">
                        <h1 class="title">商品评价</h1>
                        <ratingselect
                            :ratings="food.ratings"
                            :selectType="selectType"
                            :onlyContent="onlyContent"
                            @changeSelectType="changeSelectType"
                            @changeOnlyContent="changeOnlyContent"
                        />
                        <div class="rating-wrapper">
                            <ul v-show="food.ratings && food.ratings.length">
                                <li class="rating-item" v-show="ratingShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index">
                                    <div class="user">
                                        <span class="username">{{rating.username}}</span>
                                        <img :src="rating.avatar" alt="" width="12" height="12" class="avatar" />
                                    </div>
                                    <div class="time">
                                        {{rating.rateTime | formatDate}}
                                    </div>
                                    <p class="text">
                                        <i :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></i>
                                        {{rating.text}}
                                    </p>
                                </li>
                            </ul>
                            <div class="no-ratings" v-show="!food.ratings || food.ratings.length === 0">暂无评论</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    import cartControl from 'components/car-control/car-control'
    import split from 'components/split/split'
    import ratingselect from 'components/ratingselect/ratingselect'
    import DateFormat from 'common/js/date.js'
    // const POSITIVE = 0
    // const NEGATIVE = 1
    const ALL = 2
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data () {
            return {
                showFlag: false,
                selectType: 1,
                onlyContent: false
            }
        },
        methods: {
            show () {
                this.showFlag = true
                this.selectType = ALL
                this.$nextTick(() => {
                    this._initScroll()
                })
            },
            hide () {
                this.showFlag = false
            },
            add (event) {
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1)
                } else {
                    this.food.count++
                }
                console.log(event.target)
                this.$emit('add', event.target)
            },
            foodAdd (event) {
                this.$emit('add', event)
            },
            _initScroll () {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.foodSC, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            },
            changeSelectType (type) {
                this.selectType = type
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            },
            changeOnlyContent (val) {
                this.onlyContent = val
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            },
            ratingShow (type, text) {
                if (this.onlyContent) {
                    if (text === '') {
                        return false
                    }
                }
                if (this.selectType === ALL) {
                    return true
                } else {
                    return type === this.selectType
                }
            }
        },
        filters: {
            formatDate (time) {
                let date = new Date(time)
                return DateFormat(date, 'yyyy-MM-dd hh:mm')
            }
        },
        components: {
            cartControl,
            split,
            ratingselect
        },
        mounted () {
            this._initScroll()
        }
    }
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin'
    .food
        position fixed
        top 0
        left 0
        bottom 48px
        width 100%
        background #fff
        z-index 30
        // transform translate3d(0,0,0)
        &.move-enter-active,&.move-leave-active
            transition all 0.3s linear
        &.move-enter,&.move-leave-active
            transform translate3d(100%,0,0)
        .head
            position relative
            width 100%
            height 0
            padding-top 100%
            img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
            .back
                position absolute
                top 10px
                left 0
                padding 10px
                font-size 20px
                color #fff
        .content
            .basic
                margin 18px
                .name
                    margin-bottom 8px
                    line-height 14px
                    font-size 14px
                    font-weight 700
                    color rgb(7,17,27)
                .extra
                    margin-bottom 18px
                    line-height 10px
                    font-size 10px
                    color rgb(147,153,159)
                    .count
                        margin-right 12px
                .price
                    position relative
                    line-height 24px
                    font-size 14px
                    font-weight 700
                    color rgb(240,20,20)
                    .now
                        margin-right 12px
                    .old
                        text-decoration line-through
                        font-size 10px
                        font-weight normal
                        color rgb(147,153,159)
                    .cart-control-wrapper
                        position absolute
                        top 0
                        right 0px
                        width 84px
                        height 24px
                    .add-cart
                        position absolute
                        right 4px
                        top 6px
                        padding 0 12px
                        border-radius 12px
                        text-align center
                        font-size 10px
                        line-height 24px
                        color #fff
                        background rgb(0,160,220)
                        opacity 1
                        &.fade-enter-active,&.fade-leave-active
                            transition all 0.2s
                        &.fade-enter,&.fade-leave-active
                            opacity 0
                            z-index -1
            .info
                margin 18px
                .info-title
                    margin-bottom 6px
                    font-size 14px
                    line-height 14px
                .text
                    padding 0 8px
                    line-height 24px
                    font-size 12px
                    font-weight 200
                    color rgb(77,85,93)
            .rating
                margin-top 18px
                .title
                    padding 0 0 6px 18px
                    font-size 14px
                    line-height 14px
            .rating-wrapper
                padding 0 18px
                .rating-item
                    position relative
                    padding 16px 0
                    font-size 0
                    color rgb(147,153,159)
                    border-1px(rgba(7,17,27,0.1))
                    .user
                        position absolute
                        right 0
                        top 16px
                        .username
                            display inline-block
                            margin-right 6px
                            vertical-align top
                            line-height 10px
                            font-size 10px
                        .avatar
                            border-radius 50%
                    .time
                        margin-bottom 6px
                        line-height 12px
                        font-size 10px
                    .text
                        line-height 16px
                        font-size 12px
                        color rgb(7,17,27)
                        i
                            margin-right 4px
                            font-size 12px
                            &.icon-thumb_down
                                color rgb(147,153,159)
                            &.icon-thumb_up
                                color rgb(0,160,220)
                .no-ratings
                    padding 16px 0
                    font-size 12px
                    color rgb(147,153,159)
</style>
