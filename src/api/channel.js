import request from "@/utils/request";
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })

}
//添加频道到服务器
export const getRecommed = (channel) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels:[channel]
        }
    })
}

//删除频道
export const deleteChannel  = (channelID) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelID}`
    })

}