<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录">
            <van-icon slot="left" name="cross" @click="$router.back()"/>
        </van-nav-bar>

        <!-- 表单 -->
        <!-- ref="loginForm" 通过 ref 可以获取到 Form 实例并调用实例方法 -->
        <van-form @submit="onSubmit" ref="loginForm">
          
          <van-field
            v-model="user.mobile"
            name="mobile"
            placeholder="请输入手机号"
            :rules="verification.mobile"
            type="number"
            maxlength="11"
          >
          <!-- 插槽 -->
            <i slot="left-icon" class="iconfont icon-shouji"></i>
          </van-field>
          
          <van-field
            v-model="user.code"
            name="验证码"
            placeholder="请输入验证码"
            :rules="verification.code"
            type="number"
            maxlength="6"
          >
          <!-- 插槽 -->
            <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
            <template #button>
              <!-- 倒计时 @finish="isShowTime = false"倒计时结束后再隐藏-->
              <van-count-down 
              :time="1000 * 60" 
              format="ss 秒" 
              v-if="isShowTime"
              @finish="isShowTime = false"
              />
              <!-- @click="sendSzmFn"绑定点击事件发送验证码   native-type="button"避免触发表单提交 -->
              <van-button v-else native-type="button" @click="sendSzmFn" class="send-sms-btn" round size="small" type="default" >发送验证码</van-button>
            </template>
          </van-field>
          <div class="login-btn-wrap">
            <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
          </div>
        </van-form>
    </div>
</template>

<script>
//导入登录请求模块
import { login, sendYzm } from '@/api/user.js'
export default {
    name: 'LodinIndex',
    data() {
      return {
        user: {
          mobile: '',
          code: ''
        },
        verification: {
          mobile: [{
            required: true,
            message: '手机号不能为空',
            
          }, {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }],
          code: [{
            required: true,
            message: '验证码不能为空',
            
          }, {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }]
        },
        isShowTime: false//默认关闭倒计时
      }
    },
    methods: {
      //
      async onSubmit() {
        console.log(111);
        //获取表单数据
        const user = this.user
        //表单验证
        //点击登录后的提示
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true,//禁用背景提示
          duration: 0//持续时间
        })
        //提交表单请求登录
        //请求可能会失败，用try catch来捕捉失败信息
        try {
          const {data} = await login(user)
          //调用mutation中的setUser
          this.$store.commit('setUser', data.data)
          //登录成功的提示
          this.$toast.success('登录成功')
          //登录成功跳转到已登录页面
          this.$router.back()
          
        } catch (err) {
          if(err.response.status === 400) {
            console.log('手机号验证码错误');
            this.$toast.fail('手机号验证码错误')
          } else {
            console.log('登录失败', err);
            this.$toast.fail('登录失败')
          }
          
        }
      },
      async sendSzmFn () {
        //校验手机号是否符合规范
        try {
           //获取表单实例，并调用validate方法，并传值,返回的是一个promise对象
          await this.$refs.loginForm.validate('mobile')
        } catch (err) {
          return console.log('验证失败', err)
        }
        //校验通过，显示倒计时
        this.isShowTime = true
        //发送请求获取验证码
        try {
          await sendYzm(this.user.mobile) 
          this.$toast('发送成功')
        } catch (err) {
          this.isShowTime = false
          if(err.response.status === 429) {
            this.$toast('发送太频繁了，请稍后再试')
          } else {
            this.$toast('发送失败，请稍后重试')
          }
        }
        
      }
    }

}

</script>

<style scoped lang="less" >
  .login-container {
    .iconfont {
      font-size: 37px;
      vertical-align: middle;
    }
    .send-sms-btn {
      background-color: #ededed;
      color: #666;
      width: 156px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
    }
    .login-btn-wrap {
      padding: 53px 28px;
    }
      .login-btn {
        background-color: rgb(109,180,251);
        border: none;

      }
  }

//     .send-sms-btn {
//       width: 152px;
//       height: 46px;
//       line-height: 46px;
//       background-color: #ededed;
//       font-size: 20px;
//       color: #666;
//     }
//     .login-btn-wrap {
//       padding: 53px 33px;
//       .login-btn {
//         background-color: #6db4fb;
//         border: none;
//       }
//     }
// }

</style>