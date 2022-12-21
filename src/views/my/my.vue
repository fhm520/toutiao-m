<template>
    <div class="my-container">
        <!-- 已登录头部 -->
        <div class="header user-info" v-if="user">
            <div class="top">
                <div class="left">
                    <van-image
                        class="image"
                        fit="cover"
                        round
                        :src="userInfo.photo"
                    />
                    <div class="toutiao">{{userInfo.name}}</div>
                </div>
                <div class="right">
                    <van-button round size="mini" to="/user/profile">编辑资料</van-button>
                </div>
            </div>
            <div class="bottom">
                <div class="item">
                    <div class="count">{{userInfo.art_count}}</div>
                    <div class="text">头条</div>
                </div>
                <div class="item">
                    <div class="count">{{userInfo.follow_count	}}</div>
                    <div class="text">关注</div>
                </div>
                <div class="item">
                    <div class="count">{{userInfo.fans_count}}</div>
                    <div class="text">粉丝</div>
                </div>
                <div class="item">
                    <div class="count">{{userInfo.like_count}}</div>
                    <div class="text">获赞</div>
                </div>
            </div>
        </div>

        <!-- 未登录头部 -->
        <div class="header not-login" v-else>
            <!-- 点击跳转到登录页 -->
            <div class="login-btn" @click="$router.push('/login')">
                <img src="~@/assets/mobile.png" alt="" class="mobile">
                <span class="text">登录 / 注册</span>
            </div>
        </div>

        

        <!-- 导航 -->
        <van-grid :column-num="2" class="grid-nav" clickable>
            <van-grid-item>
                <i slot="icon" class="iconfont icon-shoucang"></i>
                <span slot="text" class="text">收藏</span>
            </van-grid-item>
            <van-grid-item>
                <i slot="icon" class="iconfont icon-lishi"></i>
                <span slot="text" class="text">历史</span>
            </van-grid-item>
        </van-grid>

        <van-cell title="消息通知" is-link/>
        <van-cell title="小智同学" is-link/>
        <van-cell title="退出登录" class="logout-cell" v-if="user" @click="outFn" clickable/>
        



    </div>
</template>
  
  <script>
  //导入请求数据模块
  import {getUserInfo} from '@/api/user.js'
  //导入访问state的辅助函数
  import { mapState } from 'vuex'
  export default {
      name: 'my',
      data () {
        return {
            userInfo: {}
        }
      },
      computed: {
        ...mapState(['user'])
      },
      created () {
        if (this.user) {
            this.loadInfo ()
        }
      },
      methods: {
        outFn () {
            //退出提示
            //在组件中需使用this.$dialog来调用弹框组件
            this.$dialog.confirm({
                title: '确定退出吗'
                }).then(() => {
                    // 跳转到未登录页面，
                    //调用mutation里面的方法，传值
                    this.$store.commit('setUser', null)
                }).catch(() => {
                    // on cancel
                })
        },
        async loadInfo () {
            try {
                const {data} = await getUserInfo()
                console.log('获取数据成功');
                this.userInfo = data.data
            } catch (err) {
                console.log('获取数据失败，请稍后重试', err);
                this.$toast('获取数据失败，请稍后重试')
            }
            

        }
      }
  
  }
  </script>
  
  <style lang="less" scoped>
    .my-container {
        .header {
            height: 366px;
            background-image: url(@/assets/banner.png);
            background-size: cover;
        }
        .not-login {
            display: flex;//弹性布局
            justify-content: center;//主轴居中，X
            align-items: center;//侧轴居中
            .login-btn {
                display: flex;
                justify-content: center;//主轴居中，X
                align-items: center;//侧轴居中
                flex-direction: column;//子元素在父元素内纵向排列
                .mobile {
                    width: 132px;
                    height: 132px;
                    margin-bottom: 15px;
                }
                .text {
                    font-size: 28px;
                    color: rgb(255,255,255);
                    
                }

            }

        }
        .user-info {
            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 268px;
                padding: 81px 37px 32px;
                box-sizing: border-box;
                .left {
                    display: flex;
                    align-items: center;//垂直居中
                    .image {
                    width: 132px;
                    height: 132px;
                    border: 4px solid #fff;
                    margin-right: 22px;
                }
                    .toutiao {
                        font-size: 32px;
                        color: rgb(255,255,255);
                    }
                }
                // .right {
                //     width: 116px;
                //     height: 33px;
                //     background-color: #fff;
                //     border-radius: 25px;
                //     font-size: 20px;
                //     color: rgb(102,102,102);
                //     text-align: center;
                // }
            }
            .bottom {
                display: flex;
                color: rgb(255,255,255);
                .item {
                    text-align: center;
                    flex: 1;
                    .count {
                    font-size: 36px;
                    }
                    .text {
                        font-size: 23px;
                    }

                }
                
            }
            
        }
        .grid-nav {
            .iconfont {
                font-size: 45px;
            }
            .icon-shoucang {
                color: rgb(235,82,83);
            }
            .icon-lishi {
                color: rgb(255,157,29);
            }
            .text {
                font-size: 28px;
                color: rgb(51,51,51);
            }
        }
        .logout-cell {
            font-size: 30px;
            color: rgb(216,98,98);
            text-align: center;
            margin-top: 9px;
        }
    }
  
  </style>