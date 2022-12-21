<template>
  <div class="reply-container">
    <van-nav-bar
        :title="comment.reply_count > 0?`${comment.reply_count}条回复`: '暂无回复'"
    >
        <van-icon 
        slot="left" 
        name="cross"
        @click="$emit('close')"
        ></van-icon>
    </van-nav-bar>
    <div class="list-wrap">
            <!-- 当前评论项 -->
        <commentItem :comment="comment"/>
        <!-- 当前评论项 -->

        <!-- 评论回复列表 -->
        <van-cell title="全部回复"/>

        <commentList :list="commentList" :source="comment.com_id" type="c"/>
        <!-- 评论回复列表 -->
    </div>
    

    <!-- 回复评论并发布 -->
    <div class="reply-wrap">
        <van-button class="reply-btn" round size="small" @click="isPostShow = true">写评论</van-button>
    </div>
   <!-- 评论弹出层 -->
   <van-popup v-model="isPostShow" position="bottom">
      <commentPost
        :target="comment.com_id"
        @post-success="onPostSuccess"
      />
    </van-popup>



  </div>
</template>

<script>
import commentItem from './comment-item.vue'
import commentList from './commentList.vue'
import commentPost from './comment-post.vue';
export default {
    name: 'CommentReply',
    components: {
        commentItem,
        commentList,
        commentPost
    },
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            isPostShow: false,
            commentList: []
        }
    },
    methods: {
        onPostSuccess (data) {
            console.log('1111', data);
            //更新数据
            this.comment.reply_count++
            //关闭弹出框.
            this.isPostShow = false
            //推送到评论列表
            this.commentList.unshift(data.new_obj)

        }
    }

}
</script>

<style lang="less" scoped>
.list-wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
}
.reply-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    .reply-btn {
        width: 60%;
        
    }
}
</style>