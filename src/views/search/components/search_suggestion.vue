<template>
  <div class="search-suggestion">
    <van-cell
        v-for="(text, index) in suggestions" :key="index" 
        icon="search"
        @click="$emit('search', text)"
    >
    <!-- 双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html -->
    <div slot="title" v-html="highlight(text)"></div>
</van-cell>
  </div>
</template>

<script>
import {getSuggestions} from '@/api/search.js'
//导入防抖函数
import {debounce} from 'lodash'
export default {
    name: 'SearchSuggestion',
    data() {
        return {
            suggestions: '',
            htmlStr: 'Hello <span style="color: red">World</span>'
        }
    },
    props: {
        searchtext: {
            type: String,
            required: true
        }
    },
    //监听搜索框里值的变化
    watch: {
        //监听对象
        searchtext: {
            //当searchtext发生变化的时候，会触发handler函数
            //value为变化的值
            //debounce函数，参数1：函数；参数2：延迟时间；返回值：防抖之后的函数
            handler: debounce(function (value) {
                this.loadgetSuggestions(value)
            }, 500),
            // handler(value) {
            //     this.loadgetSuggestions(value)
            // },
            immediate: true//侦听开始后被立即调用
        }

    },
    methods: {
        async loadgetSuggestions (q) {
            try {
                const {data} = await getSuggestions (q)
                this.suggestions = data.data.options
            } catch (err) {
                this.$toast('获取数据失败，请稍后重试', err)
            }
            
            
        },
        highlight (text) {
            if(text) {
                const htmlStr = `<span class="active">${this.searchtext}</span>`
                //如果需要根据数据变量动态的创建正则表达式，则手动new regexp
                //参数1：匹配模式字符串，它会根据这个字符串创建正则对象
                //参数2：匹配模式，要写到字符串中
                const reg = new RegExp(this.searchtext, 'gi')
                return text.replace(reg, htmlStr)
            }
            return text

        }
    },
    

}
</script>

<style lang="less" scoped>
.search-suggestion {
    /deep/.active {
        color: rgb(50,150,250);
    }
}

</style>