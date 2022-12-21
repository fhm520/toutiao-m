<template>
  <div class="update-name">
    <!-- 头部导航 -->
    <van-nav-bar 
        title="修改昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="updateUserName"
    ></van-nav-bar>


    <div class="filed">
        <van-field
        v-model.trim="localname"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
        />
    </div>
    

    


  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
    name: 'UpdateName',
    data () {
        return {
            localname: this.value,
        }
    },
    props: {
        value: {
            type: String,
            required: true
        }
    },
    methods: {
        async updateUserName () {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,//禁止背景点击，
                duration: 0//持续展示
            })

            try {
                if(!this.localname.length) {
                    this.$toast('昵称不能为空')
                    return
                }
                await updateUserProfile({
                    name: this.localname
                })
                //更新视图
                this.$emit('input', this.localname)
                //关闭弹出
                this.$emit('close')
                //提示成功
                this.$toast.success('修改成功')

            } catch (err) {
                this.$toast.fail('请求失败，请稍后重试')
            }

        }
    }

}
</script>

<style lang="less" scoped>
.update-name {
    .filed {
        padding: 20px;
    }
}

</style>