<template>
  <!-- <div class="article-item">wenzhang</div> -->
    <van-cell class="article-item" :to='`/article/${article.art_id}`'>
                <!-- 文章标题 -->
            <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
            <div slot="label">
                <div v-if="article.cover.type === 3" class="cover-wrap">
                    <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
                        <van-image
                            class="cover-item-img"
                            :src="img"
                            fit="cover"
                        />
                    </div>
            </div>
            
            </div>
            <!-- 底部信息 -->
            <div slot="label" class="labble-info">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}评论</span>
                <span>{{article.pubdate | relativeTime}}</span>
            </div>
            <!-- 右侧图片 -->
            <van-image
            
            class="img-right"
            v-if="article.cover.type === 1"
            width="100"
            height="100"
            slot="default"
            :src="article.cover.images[0]"
            fit="cover"
            />
    </van-cell>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: {
        article: {
            type: Object,
            required: true
        }
    }

}
</script>

<style lang="less" scoped>
.article-item {
    .title {
        font-size: 32px;
        color: rgb(58,58,58);
        // 折行
    }
    .van-cell__title {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .van-cell__value {
        flex: unset;
        width: 232px;
        height: 142px;
        padding-left: 25px;
        
        
    }
    .img-right {
        width: 100%;
        height: 142px;
    }
    .cover-wrap {
        display: flex;
        padding: 30px 0;
        .cover-item {
            flex: 1;
            height: 146px;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .cover-item-img {
                width: 100%;
                height: 146px;
            }

            
        }

    }
    .labble-info span{
        font-size: 23px;
        color: rgb(180,180,180);
        margin-right: 25px;

    }
}
</style>