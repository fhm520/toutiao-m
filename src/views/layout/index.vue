<template>
  <div class="layout-container">
    <router-view></router-view>
    <!-- 加route:路由模式，可实现跳转 -->
    <van-tabbar class="tabbar"  v-model="active">
        <van-tabbar-item to="/">
            <i slot="icon" class="iconfont icon-shouye"></i>
            <span class="text" >首页</span>
        </van-tabbar-item>
        <van-tabbar-item to="/qa">
            <i slot="icon" class="iconfont icon-wenda"></i>
            <span class="text" >问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="/vedio">
            <i slot="icon" class="iconfont icon-shipin"></i>
            <span class="text" >视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="/my">
            <i slot="icon" class="iconfont icon-wode"></i>
            <span class="text" >{{$store.state.user ? '我的' : '未登录'}}</span>
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    name: 'layout',
    data() {
        return {
            active: 0
        }
    },

}
</script>

<style lang="less" scoped>
    .layout-container {
        .tabbar {
            i.iconfont {
                font-size: 40px;
            }
            .text {
                font-size: 20px;
            }
        }
    }
 

</style>