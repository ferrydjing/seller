<template>
    <div class="header">
        <div class="content_wrap">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64" alt="">
            </div>
        </div>
        <div class="bulletin_wrap"></div>
    </div>
</template>

<script>
export default {
    name: 'v-header',
    props: {
        seller: {
        }
    }
}
</script>

<style lang="stylus">
</style>
