<template>
  <div class="update-gender">
    <van-picker
        title="修改性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        @change="onChange"
        :default-index="value"
    />


  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
    name: 'UpdateGender',
    data() {
        return {
            columns: ['男', '女'],
            localgender: this.value,
        }
    },
    props: {
      value: {
        type: Number,
        required: true
      }  
    },
    methods: {
        async onConfirm() {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,//禁止背景点击，
                duration: 0//持续展示
            })
            try {
                await updateUserProfile({
                    gender: this.localgender
                })
                //更新视图
                this.$emit('input', this.localgender)
                //关闭弹出
                this.$emit('close')
                //提示成功
                this.$toast.success('修改成功')

            } catch (err) {
                this.$toast.fail('请求失败，请稍后重试')
            }
            

        },
        onChange(picker, value, index) {
            this.localgender = index

        },
    }
}
</script>

<style>

</style>