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
            <div class="rating-list"></div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
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
                ratings: {}
            }
        },
        methods: {
           changeSelectType (type) {
               this.selectType = type
           },
           changeOnlyContent (val) {
               this.onlyContent = val
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
        width 100%
        top 174px
        left 0
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
                    line-height 18px
                    font-size 0
                    color rgb(7,17,27)
                    .star-desc
                        display inline-block
                        margin-right 12px
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
</style>
