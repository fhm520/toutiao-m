<template>
  <div class="update-birthday">
    <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
    name: 'UpdateBirthday',
    data () {
        return {
            minDate: new Date(1970, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value),
        }
    },
    props: {
        value: {
            type: String,
            required: true
        }
    },
    methods: {
        async onConfirm () {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,//禁止背景点击，
                duration: 0//持续展示
            })

            try {
                await updateUserProfile({
                    birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
                })
                //更新视图
                this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
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

<style>

</style>