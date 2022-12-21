<template>
  <div class="search-history">
    <van-cell title="历史记录">
        <div v-if="deleteShow">
            <span @click="$emit('alldelete', [])">全部删除</span>
            &nbsp;&nbsp;
            <span>完成</span>
        </div>
        
        <van-icon name="delete" v-else @click="deleteShow = true"></van-icon>
    </van-cell>
    <van-cell :title="item" v-for="(item, index) in SearchHistories" :key="index" @click="deleteItem(item, index)">
        <van-icon name="close" v-show="deleteShow" ></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
    name: 'SearchHistory',
    data () {
        return {
            deleteShow: false
        }
    },
    props: {
        SearchHistories: {
            type: Array,
            required: true
        }
    },
    methods: {
        deleteItem(item, index) {
            if(this.deleteShow) {
                //删除状态
                this.SearchHistories.splice(index, 1)
            } else {
                //可进入搜索状态
                this.$emit('search', item)
            }

        }
    }

}
</script>

<style lang="less" scoped>

</style>