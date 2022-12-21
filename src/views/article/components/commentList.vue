<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    >
    <commentItem 
    v-for="(item, index) in list" :key="index" 
    :comment="item"
    @reply-click="$emit('reply-click', $event)"
    />
</van-list>
</template>

<script>
import commentItem from './comment-item.vue'
import {getComments} from '@/api/comment.js'
export default {
    data() {
        return {
            // list: [],
            loading: false,
            finished: false,
            offset: null,
            limit: 10,
            error: false
        }
    },
    components: {
        commentItem,
    },
    props: {
        source: {
                type: [Number, String, Object],
                required: true
        },
        list: {
            type: Array,
            default: () => []//默认值
        },
        type: {
            type: String,
            //自定义prop数据验证
            validator(value) {
                return ['a', 'c'].includes(value)
            },
            default: 'a'
        }
    },
  created () {
    //一打开页面，就渲染
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const {data} = await getComments({
            type: this.type,
            source: this.source.toString(),
            offset: this.offset,
            limit: this.limit,
        })
        console.log(data);
        const {results} = data.data
        this.list.push(...results)
        //把文章评论数量传递到父组件
        this.$emit('onload-count', data.data)
        this.loading = false
        if(results.length) {
            this.offset = data.data.last_id
        } else {
            this.finished = true
        }
      } catch (err) {
        // this.$toast.fail('操作失败，请重试')
        this.error = true
        this.loading = false
      }
        
    }
  }

}
</script>

<style>

</style>