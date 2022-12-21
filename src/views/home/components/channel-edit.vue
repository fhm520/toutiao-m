<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
        <div slot="title" class="channel-text">我的频道</div>
        <van-button 
            type="danger" 
            plain 
            round 
            size="mini" 
            class="edit-btn" 
            @click="isedit = !isedit">{{isedit? '完成': '编辑'}}
        </van-button>
    </van-cell>
    <van-grid  class="my-grid ">
        <van-grid-item 
        v-for="(channel, index) in myChannels" :key="index"  
        class="grid-item"
        >
            <span 
            slot="text" 
            class="text"
            :class="{active: index === active}"
            @click="editChange(channel, index)"
            >{{channel.name}}
            </span>
            <!-- includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。 -->
            <van-icon 
                slot="icon" 
                name="clear" 
                v-show="isedit && !fiexChannel.includes(channel.id)">
            </van-icon>
        </van-grid-item>
    </van-grid>
    <!-- 我的频道  -->

    <!-- 频道推荐 -->
    <van-cell :border="false">
        <div slot="title" class="channel-text">频道推荐</div>
    </van-cell>
    <van-grid  class="recommed-grid">
        <van-grid-item 
        v-for="(channel, index) in recommendChannels" :key="index"  
        class="text grid-item"
        icon="plus"
        :text="channel.name"
        @click="addChannel(channel)"
        />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
//导入state的辅助函数,拿到state里面的状态
import { mapState } from 'vuex'
import {getAllChannels, getRecommed, deleteChannel} from '@/api/channel.js'
import { setItem } from '@/store/storage'
export default {
    name:'ChannelEdit',
    data () {
        return {
            Allchannels: [],
            isedit: false,
            fiexChannel: [0]//固定频道，不允许删除

        }
    },
    props: {
        myChannels: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    
    created () {
        this.getAllChannels ()

    },
    methods: {
        async getAllChannels () {
            try {
                const {data} = await getAllChannels()
                console.log(data);
                this.Allchannels = data.data.channels

            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        //数据持久化处理
        async addChannel(channel) {
            this.myChannels.push(channel)
            //判断用户是否登录
            if(this.user) {
            //已登录，把添加频道存储到服务器
               try {
                    await getRecommed({
                        id: channel.id,
                        seq: this.myChannels.length//seq为序号
                    })
               } catch (err) {
                console.log('添加频道失败', err);
               } 
            } else {
                setItem('ADDCHANNEL', this.myChannels)
                //未登录，把添加的频道存储到本地
            }
            
            
        },
        async editChange(channel, index) {
            if(this.isedit) {
                //不能删第一个频道
                if(this.fiexChannel.includes(channel.id)) {
                    return
                }
                if(index <= this.active) {
                    this.$emit('upActive', this.active - 1, true)
                }
                //处于编辑状态
                //splice() 方法用于添加或删除数组中的元素。参数1：从哪里开始删，参数2：删几个，参数3：添加的元素
                //注意：这种方法会改变原始数组
                this.myChannels.splice(index, 1)

                // //删除频道
                if(this.user) {
                    //如果登录，
                    try {
                        await deleteChannel(channel.id)
                    } catch (err) {
                        console.log('删除失败', err);
                    }
                } else {
                    //如果未登录存储到本地
                    setItem('ADDCHANNEL', this.myChannels)

                }

            } else {
                //不处于编辑状态，切换频道
                //自动触发父级函数，参数一父级自定义事件名，参数二值
                this.$emit('upActive', index, false)
            }

            
        }
    },
    //推荐频道 = 所有频道 - 我的频道
    //计算属性会观测内部依赖数据的变化，如果依赖数据发生变化，则计算属性会重新执行
    computed: {
        recommendChannels () {
            //filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
            return this.Allchannels.filter(channel => {
                return !this.myChannels.find(myChannel => {
                    return myChannel.id === channel.id
                })
            })
        },
        ...mapState(['user'])
        

    },


}
</script>

<style lang="less" scoped>
    .channel-edit {
        padding: 85px 0;
        .channel-text {
            font-size: 32px;
            color: rgb(51,51,51);
        }
        .edit-btn {
            width: 104px;
            height: 48px;
            font-size: 26px;
            color: #f85959;
            border: 1px solid #f85959;
        }
        .van-grid {
           padding-left: 23px; 
        }
        /deep/.recommed-grid {
            margin-top: 48px;
            .grid-item {
                .van-grid-item__content {
                    flex-direction: row;
                    .van-icon-plus {
                        font-size: 24px;
                        margin-right: 6px;
                    }
                    .van-grid-item__text {
                            margin-top: unset;
                    }
                    
                }

            }
        }
        .my-grid {
            margin-top: 35px;
            margin-bottom: 75px;
        }
        /deep/.grid-item {
            width: 160px;
            height: 86px;
            margin-bottom: 23px;
            .van-grid-item__content {
                background-color: rgb(244, 245, 246);
                margin-right: 23px;
                white-space: nowrap;//文字不折行
                .van-icon-clear {
                    position: absolute;
                    right: -15px;
                    top: -15px;
                    font-size: 30px;
                    color: #cacaca;
                    z-index: 2;
                }
                .text{
                    font-size: 28px;
                    color: rgb(34,34,34);
                    margin-top: unset;
                }
                .active {
                    color: red;
                }

            }
            .van-grid-item__icon-wrapper {
                position: unset;
            }

        }
        
        
    }

</style>