<template>
    <div class="rating-select">
        <div class="select">
            <span class="block all" :class="{'active':selectType === 2}" @click="select(2)">
                {{desc.all}}
                <span class='num'>{{ratings.length}}</span>
            </span>
            <span class="block positive" :class="{'active':selectType === 0}" @click="select(0)">
                {{desc.positive}}
                <span class='num'>{{positives.length}}</span>
            </span>
            <span class="block negative" :class="{'active':selectType === 1}" @click="select(1)">
                {{desc.negative}}
                <span class='num'>{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch" @click="toggleContent">
            <span class="icon-check_circle" :class="{current:onlyContent}"></span><span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0
    const NEGATIVE = 1
    const ALL = 2
    export default {
        props: {
            ratings: {
                type: Array,
                default () {
                    return []
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default () {
                    return {
                        all: '全部',
                        positive: '推荐',
                        negative: '吐槽'
                    }
                }
            }
        },
        computed: {
            positives () {
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE
                })
            },
            negatives () {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE
                })
            }
        },
        methods: {
            select (type) {
                this.$emit('changeSelectType', type)
            },
            toggleContent () {
                this.$emit('changeOnlyContent', !this.onlyContent)
            }
        }
    }
</script>

<style lang="stylus">
    @import '../../common/stylus/mixin'
    .rating-select
        width 100%
        .select
            padding  18px 18px
            font-size 0
            border-1px(rgba(7,17,27,0.1))
            .num
                margin-left 2px
                line-height 16px
                font-size 8px
            .block
                display inline-block
                margin-right 6px
                padding 8px 12px
                line-height 16px
                border-radius 2px
                font-size 12px
                color  rgb(77, 85, 93)
                &:last-child
                    margin-right 0
                &.active
                    color #fff
                    background  rgb(0, 160, 220)
            .all
                background  rgba(0, 160, 220, 0.2)
            .positive
                background  rgba(0, 160, 220, 0.2)
            .negative
                background  rgba(77, 85, 93, 0.2)
                &.active
                    background  rgb(77, 85, 93)
        .switch
            padding 12px 18px
            box-sizing border-box
            border-1px(rgba(7,17,27,0.1))
            color rgb(147, 153, 159)
            line-height 24px
            .icon-check_circle
                display inline-block
                vertical-align top
                margin-right 4px
                font-size 24px
                &.current
                    color #00c850
            .text
                font-size 12px
</style>
