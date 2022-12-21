<template>
  <div class="search-result">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        @load="onLoad"
        >
        <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search.js'
export default {
    name: 'SearchResult',
    data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
   },
   props: {
    searchtext: {
        type: String,
        required: true
    }
   },
  methods: {
    async onLoad() {
      //1、获取数据
      try {
        const {data} = await getSearchResult({
            page: this.page,//页码
            per_page: this.perPage,//每页大小
            q: this.searchtext//查询关键字
        })

        console.log(data)
        //2、推送数据
        const {results} = data.data
        this.list.push(...results)
        //3、关闭加载状态
        this.loading = false
        //4、判断是否还有数据
        if(results.length) {
            this.page++
        } else {
            this.finished = true
        }


      } catch (err) {
        //展示加载失败的提示状态
        this.error = true
        //加载失败loading关闭
        this.loading = false
        this.$toast('获取数据失败，请稍后重试')
      }

    },
  }

}
</script>

<style lang="less" scoped>

</style>