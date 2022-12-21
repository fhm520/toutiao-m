import request from "@/utils/request";
export const getArticle = params => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
   
}
export const getArticleId = articleId => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${articleId}`,
    })
   
}

//收藏文章
export const addCollect = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}

//取消收藏
export const deleteCollect = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`
    })
}
//点赞文章
export const addLiked = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data: {
            target
        }
    })
}

//取消点赞
export const deleteLiked = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`
    })
}