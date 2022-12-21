<template>
  <div class="update-photo">
    <img class="img" :src="img" alt="" ref="img">

    <div class="toolbar">
        <div class="cancel" @click="$emit('close')">取消</div>
        <div class="confirm" @click="onconfirm">完成</div>
    </div>


  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import {updateUserPhoto} from '@/api/user.js'
export default {

    name: 'UpdatePhoto',
    data () {
        return {
            cropper: null,
        }
    },
    props: {
        img: {
                type: [String, Object],
                required: true
            }

    },
    
    mounted () {
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true
        })
    },
    methods: {
        //基于服务端地裁切用getData方法
        //基于客户端地裁切用以下方法
        onconfirm () {
            this.cropper.getCroppedCanvas().toBlob( blob => {
                this.updateUserPhoto (blob)
                
            })
        },
        async updateUserPhoto (blob) {
           
                this.$toast.loading({
                message: '保存中...',
                forbidClick: true,//禁止背景点击，
                duration: 0//持续展示
                })
                try {
                        //如果接口要求content-type是multipart/form-data
                    const formData = new FormData()
                    formData.append('photo', blob)
                    const {data} = await updateUserPhoto (formData)
                    console.log(data)
                    //关闭弹出层
                    this.$emit('close')

                    //更新视图
                    this.$emit('update-photo', data.data.photo)

                    this.$toast.success('修改成功')
                } catch (err) {
                    this.$toast.fail('获取失败，请重试')
                }
        }
    },


}
</script>

<style lang="less" scoped>
.update-photo {
    background-color: #000;
    height: 100%;
    .toolbar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        .cancel, .confirm {
            width: 90px;
            height: 90px;
            color: #fff;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

        }
    }
    .img {
        max-width: 100%;
    }
}

</style>