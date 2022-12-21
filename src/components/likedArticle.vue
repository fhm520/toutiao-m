<template>
    <van-button 
    :icon="value === 1? 'good-job':'good-job-o'"
    @click="onliked"
    :loading="loading"
    :class="{
        liked: value === 1 
    }"

    />
        
</template>

<script>
import {addLiked, deleteLiked} from '@/api/article.js'
export default {
    name: 'LikedArticle',
    data () {
        return {
            loading: false

        }
    },
    props: {
        likedId: {
            type: [Number, String, Object],
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    },
    methods: {
        async onliked() {
            this.loading = true
            try {
                let status = -1
                if(this.value === 1) {
                    //已点赞，取消点赞
                    console.log(111);
                    await deleteLiked(this.likedId)
                } else {
                    //未点赞，需点赞
                    await addLiked(this.likedId)
                    status = 1
                }
                // 更新视图
                this.$emit('input', status)
                this.$toast.success(status === 1? '点赞成功': '点赞失败')
            } catch (err) {
                this.$toast.fail('操作失败，请重试')
                console.log(err);
            }
            this.loading = false
        }
    }

}
</script>

<style lang="less" scoped>
.liked {
    .van-icon {
        color: rgb(214, 90, 2);
    }

}
</style>