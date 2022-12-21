<template>
  <van-button
    v-if="is_followed"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
    >已关注</van-button>
    <van-button
     v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
    >关注</van-button>
</template>

<script>
import {actionFollow, deleteFollow} from '@/api/user'
export default {
    name: 'FollowUser',
    data () {
        return {
            loading: false,//默认关闭loading状态
        }
    },
    model: {
        prop: 'is_followed',//默认是value
        event: 'update_is_followed'//默认是input
    },
    props: {
        is_followed: {
            type: Boolean,
            required: true
        },
        userId: {
            type: [Number, String, Object],
            required: true
        }
    },

    methods: {
        async onFollow () {
            this.loading = true//展示按钮的loading状态
            try {
                if(this.is_followed) {
                //已关注，取消关注
                await deleteFollow(this.userId)
                } else {
                //未关注
                await actionFollow(this.userId)
                }
                //子组件不能改this.is_followed
                // this.is_followed = !this.is_followed
                this.$emit('update_is_followed', !this.is_followed)
                this.loading = false//关闭按钮的loading状态
            } catch (err) {
                let message = '操作失败，请重试'
                if(err.response && err.response.status === 400) {
                message = '你不能关注你自己'
                }
                this.$toast(message)
                this.loading = false
            }

        }
    }

}
</script>

<style>

</style>