<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <div class="title">{{seller.name}}</div>
                <div class="star-wrapper">
                    <star :size="36" :score="seller.score" class="seller-star"/>
                    <span class="rating-count">({{seller.ratingCount}})</span>
                    <span class="sell-count">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                   <li>
                       <h2>起送价</h2>
                       <div class="content">
                           <span class="price">{{seller.minPrice}}</span>元
                       </div>
                   </li>
                   <li>
                       <h2>商家配送</h2>
                       <div class="content">
                           <span class="price">{{seller.deliveryPrice}}</span>元
                       </div>
                   </li>
                   <li>
                       <h2>平均配送时间</h2>
                       <div class="content">
                           <span class="price">{{seller.deliveryTime}}</span>分钟
                       </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <div class="collect-icon">
                        <span class="icon-favorite" :class="{active: this.favorite}"></span>
                    </div>
                    <div class="collect-text">{{favoriteText}}</div>
                </div>
            </div>
            <split />
            <div class="bulletin">
                <h1>公告与活动</h1>
                <p class="text">{{seller.bulletin}}</p>
                <ul v-if="seller.supports" class="supports">
                    <li v-for="(item,index) in seller.supports" :key="index" class="support-item">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split />
            <div class="pcis" v-show="seller.pics && seller.pics.length">
                <h1>商家实景</h1>
                <div class="pics-wrapper" ref="picsWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index" @click="picShow(pic, $event)">
                            <img :src="pic" width="120" height="90" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <split />
            <div class="detail" v-show="seller.infos && seller.infos.length">
                <h1>商家信息</h1>
                <ul>
                    <li class="info-item" v-for="(item,index) in seller.infos" :key="index">
                        <span class="text">{{item}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <transition name="detail">
            <div class="detail-wrapper" v-show="detailShow">
                <div class="max-pic">
                    <img :src="picUrl" width="100%" height="100%" alt="">
                </div>
                <div class="detail-close" @click="hideDeatil">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {saveToLoacl, readFromLoacal} from 'common/js/storage'
    import star from 'components/star/star'
    import split from 'components/split/split'

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                favorite: (() => {
                    return readFromLoacal(this.seller.id, 'favorite', false)
                })(),
                picUrl: '',
                detailShow: false
            }
        },
        watch: {
            seller () {
                this._initScroll()
                this._initPicScroll()
            }
        },
        computed: {
            favoriteText () {
                if (this.favorite) {
                    return '已收藏'
                } else {
                    return '收藏'
                }
            }
        },
        methods: {
            _initScroll () {
                if (!this.sellerScroll) {
                    this.sellerScroll = new BScroll(this.$refs.seller, {
                        click: true
                    })
                } else {
                    this.sellerScroll.refresh()
                }
            },
            _initPicScroll () {
                if (this.seller.pics && this.seller.pics.length) {
                    let imgW = 120
                    let imgM = 6
                    let width = (imgW + imgM) * this.seller.pics.length - imgM
                    this.$refs.picList.style.width = width + 'px'
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picsWrapper, {
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        })
                    } else {
                        this.picScroll.refresh()
                    }
                }
            },
            toggleFavorite () {
                this.favorite = !this.favorite
                saveToLoacl(this.seller.id, 'favorite', this.favorite)
            },
            picShow (pic, event) {
                this.detailShow = true
                this.picUrl = pic
            },
            hideDeatil () {
                this.detailShow = false
                this.picUrl = ''
            }
        },
        components: {
            star,
            split
        },
        mounted () {
            this.$nextTick(() => {
                this._initScroll()
                this._initPicScroll()
            })
        }
    }
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin'
    .seller
        position absolute
        top 174px
        left 0
        bottom 0
        width 100%
        overflow hidden
        .overview
            position relative
            padding 18px
            .title
                margin-bottom 8px
                line-height 14px
                font-size 14px
                color rgb(7, 17, 27)
            .star-wrapper
                padding-bottom 18px
                font-size 0
                border-1px(rgba(7, 17, 27, 0.1))
                .seller-star
                    display inline-block
                    margin-right 8px
                .rating-count, .sell-count
                    display inline-block
                    vertical-align top
                    line-height 18px
                    font-size 10px
                    color rgb(77, 85, 93)
                .rating-count
                    margin-right 12px
            .remark
                display flex
                padding-top 18px
                li
                    flex 1
                    text-align center
                    border-right 1px solid rgba(7,17,27,0.1)
                    &:last-child
                        border-right none
                    h2
                        margin-bottom 4px
                        line-height 10px
                        font-size 10px
                        color rgb(147, 153, 159)
                    .content
                        line-height 24px
                        font-size 10px
                        font-weight 200
                        color rgb(7, 17, 27)
                        span
                            font-size 24px
            .favorite
                position absolute
                right 11px
                top 18px
                width 50px
                text-align center
                .collect-icon
                    margin-bottom 4px
                    line-height 24px
                    font-size 24px
                    color #d4d6d9
                    .active
                        color rgb(240, 20, 20)
                .collect-text
                    line-height 10px
                    font-size 10px
                    color rgb(77, 85, 93)
        .bulletin
            margin 18px 18px 0 18px
            h1
                margin-bottom 8px
                line-height 14px
                font-size 14px
                color rgb(7, 17, 27)
            .text
                margin 0 12px 16px 12px
                line-height 24px
                font-size 12px
                font-weight 200
                color rgb(240, 20, 20)
            .supports
                .support-item
                    padding 16px 12px
                    border-top-1px(rgba(7,17,27,0.1))
                    font-size 0
                    .icon
                        display inline-block
                        margin-right 6px
                        vertical-align top
                        width 16px
                        height 16px
                        background-size 16px 16px
                        background-repeat no-repeat
                        &.decrease
                            bg-image('decrease_4')
                        &.discount
                            bg-image('discount_4')
                        &.guarantee
                            bg-image('guarantee_4')
                        &.invoice
                            bg-image('invoice_4')
                        &.special
                            bg-image('special_4')
                    .text
                        margin 0
                        line-height 16px
                        font-size 12px
                        font-weight 200
                        color rgb(7, 17, 27)
        .pcis
            padding 18px
            h1
                margin-bottom 12px
                line-height 14px
                font-size 14px
                color rgb(7, 17, 27)
            .pics-wrapper
                width 100%
                overflow hidden
                white-space nowrap
                .pic-list
                    height 90px
                    .pic-item
                        display inline-block
                        margin-right 6px
                        width 120px
                        height 90px
                        &:last-child
                            margin-right none
        .detail
            padding 18px
            h1
                margin-bottom 12px
                line-height 14px
                font-size 14px
                color rgb(7, 17, 27)
            .info-item
                padding 16px 12px
                border-top-1px(rgba(7,17,27,0.1))
                font-size 0
                .text
                    margin 0
                    line-height 16px
                    font-size 12px
                    font-weight 200
                    color rgb(7, 17, 27)
        .detail-wrapper
            position fixed
            top 0
            left 0
            width 100%
            height 100%
            z-index 100
            background rgba(7,17,27,0.8)
            opacity 1
            &.detail-enter-active,&.detail-leave-active
                transition all 0.5s
            &.detail-enter, &.detail-leave-active
                opacity 0
                background rgba(7,17,27,0)
            .max-pic
                margin 40% auto
            .detail-close
                position absolute
                left 44%
                bottom 2%
                width 32px
                height 32px
                clear both
                font-size 32px
                color #fff

</style>
