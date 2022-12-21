<template>
  <div class="user-profile">
    <van-nav-bar 
    title="个人信息" 
    left-arrow
    class="page-nav-bar"
    @click-left="$router.back()"
    ></van-nav-bar>
     <!-- 选择文件 -->
    <input type="file" hidden ref="file" @change="onFileChange">

    <van-cell title="头像" is-link>
        <van-image
            round
            class="avatar"
            fit="cover"
            :src="user.photo"
            @click="$refs.file.click()"
            
        />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="updateName = true"></van-cell>
    <van-cell title="性别" :value="user.gender === 0? '男':'女'" is-link @click="updateGenderShow = true"></van-cell>
    <van-cell title="生日" :value="user.birthday" is-link @click="updateBirthdayShow = true"></van-cell>


    <!-- 编辑头像 -->
    <van-popup 
    v-model="updatePhotoShow" 
    position="bottom" 
    style="height: 100%">
        <updatePhoto 
        @close="updatePhotoShow = false"
        v-model="user.photo"
        v-if="updatePhotoShow"
        :img="img"
        @update-photo="user.photo = $event"
        />
    </van-popup>


    <!-- 编辑昵称 -->
    <van-popup 
    v-model="updateName" 
    position="bottom" 
    style="height: 100%">
        <updateName 
        @close="updateName = false"
        v-model="user.name"
        v-if="updateName"
        />
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup
    v-model="updateGenderShow"
    position="bottom" 

    >
    <updateGender 
    @close="updateGenderShow = false"
    v-model="user.gender"
    v-if="updateGenderShow"
    />
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup
    v-model="updateBirthdayShow"
    position="bottom" 
    >
    <UpdateBirthday 
    @close="updateBirthdayShow = false"
    v-model="user.birthday"
    v-if="updateBirthdayShow"
    />
    </van-popup>


  </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import updateName from './components/update_name.vue'
import updateGender from './components/update_gender.vue'
import UpdateBirthday from './components/update_birthday.vue'
import updatePhoto from './components/update_photo.vue'
export default {
    name: 'UserProfile',
    components: {
        updateName,
        updateGender,
        UpdateBirthday,
        updatePhoto
        
    },
    data () {
        return {
            user: {},
            updateName: false,
            updateGenderShow: false,
            updateBirthdayShow: false,
            updatePhotoShow: false,
            img: null
        }
    },
    created () {
        this.loadUserProfile()
    },
    methods: {
        async loadUserProfile () {
            try {
                const {data} = await getUserProfile ()
                console.log(data);
                this.user = data.data
            } catch (err) {
                this.$toast.fail('请求失败，请重试')
            }
        },
        onFileChange () {
            //获取文件对象
            const file = this.$refs.file.files[0]
            //基于文章对象获取blob数据
            this.img = window.URL.createObjectURL(file)
            this.updatePhotoShow = true
            //file-input如果选了同一文件不会触发change事件
            // 解决办法就是每次使用完毕，就把它地value清空
            this.$refs.file.value = ''
        }
    }

}
</script>

<style lang="less" scoped>
.user-profile {
    .avatar {
        width: 60px;
        height: 60px;
    }
    .van-popup {
        background-color: #f5f7f9;
    }
}

</style>