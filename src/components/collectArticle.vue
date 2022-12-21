<template>
  <van-button
    :icon="is_collected? 'star':'star-o'"
    :class="{collected: is_collected}"
    @click="onCollect"
    :loading="loading"
    />
</template>

<script>
import {addCollect, deleteCollect} from '@/api/article.js'
export default {
    name: 'CollectArticle',
    data () {
        return {
            loading: false,//默认关闭loading状态

        }
    },
    model: {
        prop: 'is_collected',
        event: 'update_is_collected'
    },
    props: {
        is_collected: {
            type: Boolean,
            required: true
        },
        collectId: {
            type: [Number, String, Object],
            required: true
        }
    },
    methods: {
        async onCollect () {
            this.loading = true//点击时开启loading状态
            try {
                if(this.is_collected) {
                    //已收藏，取消收藏
                    await deleteCollect (this.collectId)
                    // this.is_collected = false
                } else {
                    //未收藏，添加收藏
                    await addCollect (this.collectId)
                    // this.is_collected = true

                }
                //更新视图
                this.$emit('update_is_collected', !this.is_collected)
                this.$toast.success(!this.is_collected? '收藏成功': '取消收藏')

            } catch (err) {
                this.$toast.fail('操作失败，请重试')

            }
            this.loading = false//无论请求结果如何，都关闭loading状态
        }
    }

}
</script>

<style lang="less" scoped>

.collected {
    
    .van-icon {
        color: #ffa500;
        z-index: 1;
    }
}
</style>