<template>
  <div class="article-container">
    <!-- 顶部导航 -->
    <van-nav-bar
      class="page-nav-bar"
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 顶部导航 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- 加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>

          <!-- 关注/取消用户 -->
          <!-- $event为事件参数，子组件传的什么就是什么 -->
          <!-- 当我们传递给子组件的数据既要使用还要修改 
                传递：props
                修改：自定义事件
                简写方式：在组建上使用v-model,  value  input
          -->
          <!-- 如果需要修改v-model的规则名称，可以通过子组件的model配置prop、event,修改默认的value和input -->
          <!-- 一个组件上只能使用一次 v-model -->
          <!-- 如果有多个数据需要实现类似于v-model的效果，可使用属性的.sync修饰符 -->
          <followUser 
          class="follow-btn"
          v-model="article.is_followed"
          :userId="article.aut_id"
          @update_is_followed="article.is_followed = $event"
          ></followUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <commentList :source="article.art_id" :list="commentList" @reply-click="onPopup" @onload-count="totalCount = $event.total_count"/>
        <!--  --评论列表>

            <-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="show = true"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :info="totalCount"
            
            color="#777"
          />
          <!-- 收藏 -->
          <collectArticle 
          v-model="article.is_collected"
          :collectId="article.art_id"
          class="btn-item"
          ></collectArticle>
           <!-- 收藏 -->
          <!-- 点赞 -->
          <likedArticle 
          class="btn-item"
          :likedId="article.art_id"
          v-model="article.attitude"
          ></likedArticle>
          <!-- 点赞 -->
         
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论弹出层 -->
        <van-popup v-model="show"  position="bottom">
          <commentPost :target="article.art_id" @post-success="onPostSuccess"/>
        </van-popup>
        <!-- 发布评论弹出层 -->

      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button
          class="retry-btn"
          @click="loadArticle"
        >点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论回复弹出层 -->
    <van-popup v-model="replayshow"  position="bottom" :style="{ height: '100%' }" >
      <!-- v-if="replayshow"随着弹层的关闭而销毁组件 -->
      <commentReply 
      v-if="replayshow"
      :comment="currentComment" 
      @close="replayshow = false"

      />
    </van-popup>
     
  </div>
</template>

<script>
import {getArticleId} from '@/api/article.js'
import { ImagePreview } from 'vant'
import followUser from '@/components/followUser.vue'
import collectArticle from '@/components/collectArticle.vue'
import likedArticle from '@/components/likedArticle.vue'
import commentList from './components/commentList.vue'
import commentPost from './components/comment-post.vue'
import commentReply from './components/comment-reply.vue'

export default {
    name: 'ArticleIndex',
    //给所有的后代组件提供数据
    provide: function () {
      return {
        articleId: this.articleId
      }
    },
    components: {
      followUser,
      collectArticle,
      likedArticle,
      commentList,
      commentPost,
      commentReply,
      
    },
    props: {
      articleId: {
        type: [Number, String, Object],
        required: true
      }
    },
    data () {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的 loading 状态
      errStatus: 0, // 失败的状态码
      following: false,
      totalCount: 0,
      show: false,//弹出层默认不显示
      commentList: [],
      replayshow: false,//回复评论弹出层
      currentComment: {}
      
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      try {
        const {data} = await getArticleId(this.articleId)
        console.log(data);
        this.article = data.data
        //初始化图片点击预览

        setTimeout(() => {
          this.previewImage ()
        }, 0)
      } catch (err) {
        if(err.response && err.response.status === 404) {
          this.errStatus = 404
        }

      }
      //无论成功或者失败都关闭loading
      this.loading = false
    },
    previewImage () {
      //得到所有的img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgUrls = []
      imgs.forEach((img, index) => {
        imgUrls.push(img.src)
        // console.log('地址',imgUrls);
        img.onclick= () => {
          ImagePreview({
            images: [
              imgUrls
            ],
            startPosition: index
          })
        }
      })
      
    },
    onPostSuccess(data) {
      //关闭弹出层
      this.show = false
      //把评论添加到评论列表
      this.commentList.unshift(data.new_obj)
    },
    onPopup (comment) {
      //关闭弹出层
      this.replayshow = true
      this.currentComment = comment

    }
    

  }

}
</script>

<style lang="less" scoped>
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>