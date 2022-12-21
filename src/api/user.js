import request from "@/utils/request";
//封装登录请求模块
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
//封装验证码请求模块
export const sendYzm = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,
    })
}

//封装用户信息请求模块
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user`
    })
}

//获取所有频道列表
export const getChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels',
    })
}

//关注用户
export const actionFollow = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}

//取消关注用户
export const deleteFollow = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`,
    })
}
//获取用户资料
export const getUserProfile = target => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile',
    })
}

//更新用户资料
export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}
//更新用户头像
export const updateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}
