<template>
  <div class="articleList">
    <!-- 下拉刷新效果 -->
    <van-pull-refresh v-model="refreshing" :success-text="issuceess" :success-duration="1500" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
        >   
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        />
            <!-- <van-cell v-for="item in list" :key="item.id" :title="item.title" /> -->
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {getArticle} from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
    name: 'ArticleList',
    data() {
        return {
            list: [],
            error: false,//默认为false
            loading: false,//控制加载中loading的状态
            finished: false,//控制数据加载结束的状态
            timestamp: null,//请求下一页数据的时间戳
            refreshing: false,//下拉刷新效果默认为false
            issuceess: '刷新成功'
        }
    },
    components: {
        ArticleItem
    },
    props: {
        channels: {
            type: Object,
            required: true
        }
    },
    methods: {
        async onLoad() {
      // 异步更新数据
            try {
                //1、请求数据
                const {data} = await getArticle({
                    //传参
                    channel_id: this.channels.id,//频道id
                    //timestamp 简单理解就是请求数据的页码
                    // 请求第一页数据，当前最新时间戳
                    //用于请求之后数据的时间戳会在当前请求结果中返回给你
                    timestamp:this.timestamp || Date.now(),
                })
                console.log(data);
                console.log('获取频道列表成功');
                // 2、把请求结果放到list里
                const {results} = data.data
                //...扩展运算符，他会把数组里面每组元素一个一个拿出来
                this.list.push(...results)
                //3、数据加载完成后要把加载状态设置为结束，设置为结束，屏幕滚动时可再次触发load函数
                this.loading = false
                //4、判断数据是否加载完毕
                if(results.length) {
                    //如果还有数据，更新获取下一页数据的时间戳
                    this.timestamp = data.data.pre_timestamp
                } else {
                    //如果没有数据，把finished设置为true
                    this.finished = true
                }
            } catch (err) {
                this.error = true,//显示加载失败信息
                this.loading = false//请求失败关闭加载状态


            }

    },
    //实现下拉刷新效果
    async onRefresh () {
        try {
            //1、请求数据
            const {data} =await getArticle ({
                channel_id: this.channels.id,//频道id
                    //timestamp 简单理解就是请求数据的页码
                    // 请求第一页数据，当前最新时间戳
                    //用于请求之后数据的时间戳会在当前请求结果中返回给你
                timestamp: Date.now(),
            })
            //2、推送数据
            const {results} = data.data
            this.list.unshift(...results)
            //3、关闭下拉loading状态
            this.refreshing = false
            //刷新成功显示成功提示文本
            this.issuceess = `刷新成功，更新${results.length}条数据`


        } catch (err) {
            console.log('请求失败', err);
            this.refreshing = false
            this.issuceess = '刷新失败'

        }
        
        
    }

    }
    
}
</script>

<style lang="less" scoped>
.articleList {
    height: 79vh;//视口高度
    overflow-y: auto;//相当于scroll
}

</style>