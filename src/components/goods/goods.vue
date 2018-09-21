<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" @click="selectMenu(index, $event)" class="menu-item" :class="{'current': currentIndex === index}">
                    <span class="text">
                        <span v-if="item.type>=0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="goods-wrapper" ref="goodsWrapper">
            <ul>
                <li class="goods-item food-list-hook" v-for="(good,index) in goods" :key="index">
                    <h1 class="goods-title">{{good.name}}</h1>
                    <ul>
                        <li class="foods-item" v-for="(food,food_idx) in good.foods" :key="food_idx" @click="selectFood(food,$event)">
                            <div class="icon">
                                <img :src="food.icon" alt="" width="57" height="57"/>
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="descrip">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span><span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                            <div class="car-control-wrap" @click.stop.prevent>
                                <car-control @add="foodAdd" :food="food"></car-control>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="foodCart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"/>
        <food :food="selectedFood" ref="foodComponent" @add="foodAdd"/>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import carControl from 'components/car-control/car-control'
    import shopcart from 'components/shopcart/shopcart'
    import food from 'components/food/food'

    const ERR_OK = 0
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                goods: [],
                menuScroll: {
                },
                goodsScroll: {
                },
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            }
        },
        computed: {
            currentIndex () {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height = this.listHeight[i]
                    let height2 = this.listHeight[i + 1]
                    if (height2 && this.scrollY >= height && this.scrollY < height2) {
                        return i
                    }
                }
                return 0
            },
            selectFoods () {
                let foods = []
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            }
        },
        mounted () {
            this.axios.get('/api/goods').then((res) => {
                var data = res.data
                if (data.errno === ERR_OK) {
                    this.goods = data.data
                    this.$nextTick(() => {
                        this._initScroll()
                        this._calculateHeight()
                    })
                }
            })
        },
        methods: {
            _initScroll () {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                })
                this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
                    probeType: 3,
                    click: true
                })

                this.goodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _calculateHeight () {
                let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            },
            selectMenu (index, ev) {
                if (!ev._constructed) {
                    return
                }
                let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
                let el = foodList[index]
                this.goodsScroll.scrollToElement(el, 300)
            },
            _drop (target) {
                this.$nextTick(() => {
                    this.$refs.foodCart.drop(target)
                })
            },
            foodAdd (target) {
                console.log('add emit')
                this._drop(target)
            },
            selectFood (food, event) {
                this.selectedFood = food
                this.$refs.foodComponent.show()
            }
        },
        components: {
            'car-control': carControl,
            shopcart,
            food
        }
    }
</script>

<style lang="stylus">
@import "../../common/stylus/mixin"
    .goods
        position absolute
        display flex
        top 174px
        width 100%
        bottom 46px
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background #f3f5f7
            .menu-item
                display table
                width 56px
                height 54px
                padding 0 12px
                line-height: 14px
                &.current
                    position relative
                    z-index 10
                    background #fff
                    font-size 12px
                    font-weight 700
                    .text
                        border-none()
                .icon
                    display inline-block
                    vertical-align top
                    width 12px
                    height 12px
                    margin-right 2px
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display table-cell
                    vertical-align middle
                    font-size 12px
                    font-weight 200
                    line-height 14px
                    border-1px(rgba(7,17,27,0.1))
        .goods-wrapper
            flex 1
            .goods-item
                .goods-title
                    font-size 12px
                    color rgb(147, 153,159)
                    line-height 26px
                    background #f3f5f7
                    height 26px
                    padding-left 14px
                    border-left 2px solid #d9dde1
                .foods-item
                    position relative
                    display flex
                    margin 18px
                    padding-bottom 18px
                    border-1px(rgba(7,17,27,0.1))
                    &:last-child
                        border-none()
                        margin-bottom 0
                    .icon
                        display inline-block
                        vertical-align top
                        flex 0 0 57px
                        margin-right 10px
                    .content
                        flex 1
                        .name
                            font-size 14px
                            color rgb(7,17,27)
                            line-height 14px
                            margin 2px 0 8px 0px
                        .descrip,.extra
                            font-size 10px
                            color rgb(147,153,159)
                            line-height 10px
                        .descrip
                            margin-bottom 8px
                            line-height 12px
                        .extra
                            .count
                                margin-right 12px
                        .price
                            display inline-block
                            font-weight 700
                            line-height 24px
                            .now
                                margin-right 8px
                                font-size 14px
                                color rgb(240,20,20)
                            .old
                                text-decoration line-through
                                font-weight normal
                                font-size 10px;
                                color rgb(147,153,159)
                    .car-control-wrap
                        position absolute
                        right 0
                        bottom 12px
</style>
