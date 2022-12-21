<template>
  <div class="home-container">
    <!-- fixed固定定位 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
      class="searchBtn"
      slot="title"
      size="small"
      type="info"
      icon="search"
      round
      to="/search"
      >搜索</van-button>
    </van-nav-bar>


    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab 
        v-for="obj in getChannelsAll" :key="obj.id"
        :title="obj.name">
        <!-- 文章列表 -->
        <articleList :channels="obj"></articleList>
      </van-tab>
      
      <!-- 占位符 -->
      <div slot="nav-right" class="placeholder"></div>
      <!-- 汉堡按钮，绑定点击事件 -->
      <div slot="nav-right" class="tab-right" @click="show = true">
        <i class='iconfont icon-gengduo'></i>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <!-- 弹出层内容 -->
    <ChannelEdit :myChannels="getChannelsAll" :active="active" @upActive="upActive"></ChannelEdit>
    </van-popup>

  </div>
</template>

<script>
//导入封装的请求模块
import {getChannels} from '@/api/user.js'
import { mapState } from 'vuex'
//导入文章列表模块
import articleList from './components/article_list.vue'
//导入弹出层模块
import ChannelEdit from './components/channel-edit.vue'
import { getItem } from '@/store/storage'
export default {
    name: 'home',
    data() {
      return {
        active: 0,
        getChannelsAll: [],
        show: false//弹出层默认不显示
      }
    },
    components: {
      articleList,
      ChannelEdit
    },
    computed: {
      ...mapState(['user'])

    },
    created () {
        this.channelsFn ()
    },
    methods: {
      async channelsFn () {
        try {
          let getChannelsAll = []
          //判断是否登录
          if(this.user) {
            //已登录，请求获取用户频道列表
            const {data} =await getChannels()
            getChannelsAll = data.data.channels
          } else {
            //未登录，判断本地是否有数据
            const localChannels = getItem('ADDCHANNEL')
            if(localChannels) {
              //如果本地有数据，直接拿来用
              getChannelsAll = localChannels
            } else {
              //如果没有，请求获取默认频道列表
              const {data} =await getChannels()
              getChannelsAll = data.data.channels
            }
          }
          this.getChannelsAll = getChannelsAll
          // console.log(typeof  this.getChannelsAll);

        } catch (err) {
          console.log('获取数据失败', err);

        }
        
      },
      //子级点击频道可跳转到父级相应频道
      upActive(index, show = true) {
        this.active = index
        this.show = show//关闭弹出层

      }
    } 
}
</script>

<style lang="less" scoped>
  .home-container {
    padding-top: 179px;
    padding-bottom: 98px;
    /deep/.van-nav-bar__title {
      max-width: unset;//取消最大宽度设置
    }
    .searchBtn {
      width: 555px;
      height: 64px;
      font-size: 28px;
      background-color: rgb(91,171,251);
      border: none;
    }
    .van-icon {
      font-size: 32px;
    }
    
    /deep/.channel-tabs {
      .van-tabs__wrap {
        position: fixed;
        top: 92px;
        left: 0;
        right: 0;
        z-index: 1;
        height: 82px;
      }
      .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: rgb(51,51,51);
    }
    .van-tabs__line {
      padding-bottom: 0;
    }
    .van-tabs__line {
      margin-bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: rgb(50,150,250);
    }
    .placeholder {
        flex-shrink: 0;//不参与剩余空间计算
        width: 66px;
        height: 82px;
      }
    .tab-right {
      position: fixed;//固定
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.icon {
        font-size: 33px;
        color: rgb(51,51,51);
      }
      
      &:before {
        position: absolute;
        left: 0;//固定到最左边
        content: '';
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    }
    
  }

</style>