<template>
  <div class="search-index">
    <form class="search-form" action="/">
      <van-search
        v-model="searchtext"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="rgb(50,150,250)"
        @focus="showSearchResult = false"
      />
</form>
    <SearchResult v-if="showSearchResult" :searchtext="searchtext"></SearchResult>
    <SearchSuggestion v-else-if="searchtext" :searchtext="searchtext" @search="onSearch"></SearchSuggestion>
    <SearchHistory v-else :SearchHistories="SearchHistories" @search="onSearch" @alldelete="SearchHistories = []"></SearchHistory>
    
  </div> 
</template>

<script>
import SearchHistory from './components/search_history.vue'
import SearchResult from './components/search_result.vue'
import SearchSuggestion from './components/search_suggestion.vue'
import { setItem, getItem } from '@/store/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      searchtext: '',
      showSearchResult: false,
      SearchHistories: getItem('TOUTIAO_HISTORIES') || []
    }
  },
  methods: {
    onSearch(val) {
      //更新值
      this.searchtext = val
      //存储搜索历史,不能有重复的历史记录
      const index = this.SearchHistories.indexOf(val)
      if(index !== -1) {
        this.SearchHistories.splice(index, 1)
      }
      //最新的永远在最前面
      this.SearchHistories.unshift(val)

      //展示搜索结果
      this.showSearchResult = true
    },
    onCancel() {
      // 点击取消回到原来的页面
      this.$router.back()
    },
    
  },
  watch: {
    //存储到本地
      SearchHistories (val) {
        setItem('TOUTIAO_HISTORIES', val)
      }
    }

}
</script>

<style lang="less" scoped>
.search-index {
  padding-top: 108px;
  .van-search__action {
  color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

}



</style>