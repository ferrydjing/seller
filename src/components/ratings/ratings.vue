<template>
    <div class="ratings" ref='ratings'>
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <h2 class="score-info">综合评分</h2>
                    <h3 class="rank-rate">高于周边商家{{seller.rankRate}}%</h3>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="star-desc">服务态度</span>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.serviceScore" />
                        </div>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="star-desc">商品评价</span>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.foodScore" />
                        </div>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="delivery-desc">送达时间</span>
                        <span class="delivery-info">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split />
            <div class="rating-select-wrapper">
                <ratingselect
                    :ratings="ratings"
                    :selectType="selectType"
                    :onlyContent="onlyContent"
                    @changeSelectType="changeSelectType"
                    @changeOnlyContent="changeOnlyContent"
                />
            </div>
            <div class="rating-list" v-show="ratings.length">
                <ul>
                    <li class="rating-item" v-for="(rating,index) in ratings" :key="index" v-show="ratingShow(rating.rateType, rating.text)">
                        <div class="user-wrapper">
                            <img :src="rating.avatar" width="28" height="28" alt="">
                        </div>
                        <div class="rating-content">
                            <div class="title">{{rating.username}}</div>
                            <div class="rating-score-wrapper">
                                <star :size="24" :score="rating.score" class="rating-star" />
                                <span>{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <div class="rating-text">{{rating.text}}</div>
                            <div class="rating-recommend-wrapper" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <div class="rating-recommend" v-for="(recommend,idx) in rating.recommend" :key="idx">{{recommend}}</div>
                            </div>
                            <div class="rating-time">{{rating.rateTime | formatData}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import DateFormat from 'common/js/date'
    import star from 'components/star/star'
    import split from 'components/split/split'
    import ratingselect from 'components/ratingselect/ratingselect'

    const ALL = 2
    const ERR_OK = 0
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                selectType: ALL,
                onlyContent: false,
                ratings: []
            }
        },
        methods: {
           changeSelectType (type) {
               this.selectType = type
               this.$nextTick(() => {
                    this.ratingScroll.refresh()
                })
           },
           changeOnlyContent (val) {
               this.onlyContent = val
               this.$nextTick(() => {
                    this.ratingScroll.refresh()
                })
           },
           ratingShow (type, text) {
                if (this.selectType === ALL) {
                   return true
                }
                if (this.onlyContent && text === '') {
                    return false
                } else {
                    return type === this.selectType
                }
           }
        },
        filters: {
            formatData (time) {
                let date = new Date(time)

                return DateFormat(date, 'yyyy-MM-dd hh:mm')
            }
        },
        components: {
            star,
            split,
            ratingselect
        },
        mounted () {
            this.axios.get('/api/ratings').then((res) => {
                let data = res.data
                if (data.errno === ERR_OK) {
                    this.ratings = data.data
                    this.$nextTick(() => {
                        if (!this.ratingScroll) {
                            this.ratingScroll = new BScroll(this.$refs.ratings, {
                                click: true
                            })
                        }
                    })
                }
            })
        }
    }
</script>

<style lang="stylus">
    .ratings
        position absolute
        top 174px
        left 0
        bottom 0
        width 100%
        overflow hidden
        .overview
            display flex
            padding 18px 0
            .overview-left
                flex 0 0 137px
                padding 6px 0
                text-align center
                border-right 1px solid rgba(7,17,27,0.1)
                .score
                    margin-bottom 6px
                    line-height 28px
                    font-size 24px
                    color rgb(255, 152, 0)
                .score-info
                    margin-bottom 8px
                    line-height 12px
                    font-size 12px
                    color rgb(7,17,27)
                .rank-rate
                    line-height 10px
                    font-size 10px
                    color rgb(7,17,27)
            .overview-right
                flex 1
                padding-left 24px
                .score-wrapper
                    margin-bottom 8px
                    font-size 0
                    color rgb(7,17,27)
                    .star-desc
                        display inline-block
                        margin-right 12px
                        line-height 18px
                        vertical-align top
                        font-size 12px
                    .star-wrapper
                        display inline-block
                    .score
                        display inline-block
                        line-height 18px
                        vertical-align top
                        font-size 10px
                        color rgb(255,153,0)
                .delivery-wrapper
                    line-height 18px
                    font-size 0
                    color rgb(7,17,27)
                    .delivery-desc
                        display inline-block
                        margin-right 12px
                        vertical-align top
                        font-size 12px
                    .delivery-info
                        font-size 12px
                        color rgb(147,153,159)
        .rating-list
            .rating-item
                display flex
                margin 0 18px
                padding 18px 0
                .user-wrapper
                    flex 0 0 28px
                    margin-right 12px
                    width 28px
                    img
                        border-radius 50%
                .rating-content
                    position relative
                    flex 1
                    .title
                        margin-bottom 4px
                        line-height 12px
                        font-size 10px
                        color rgb(7, 17, 27)
                    .rating-score-wrapper
                        margin-bottom 6px
                        font-size 0
                        .rating-star
                            display inline-block
                            margin-right 6px
                        span
                            line-height 12px
                            font-size 10px
                            color rgb(147, 153, 159)
                    .rating-text
                        margin-bottom 8px
                        line-height 18px
                        font-size 12px
                        color rgb(7, 17, 27)
                    .rating-recommend-wrapper
                        line-height 16px
                        font-size 0
                        .icon-thumb_up
                            display inline-block
                            margin 0 8px 4px 0
                            font-size 9px
                            color rgb(0, 160, 220)
                        .rating-recommend
                            display inline-block
                            margin 0 8px 4px 0
                            padding 0 6px
                            border 1px solid rgba(7, 17, 27, 0.1)
                            font-size 9px
                            color rgb(147, 153, 159)
                    .rating-time
                        position absolute
                        right 0
                        top 0
                        font-size 10px
                        color rgb(147, 153, 159)
</style>
