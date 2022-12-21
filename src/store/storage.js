//封装本地存储操作模块

//存储数据
export const setItem = (key, value) => {

    // let aaa = 'xx'
    // console.log(typeof aaa); //string

    // let bbb = {name: 'zs'}
    // console.log(typeof bbb);//Object
    // let num = 123
    // console.log(typeof num);//Number
    // let booll = false
    // console.log(typeof booll);//boolean

    //'string' === 'object'
    if(typeof value === 'object') {
        value = JSON.stringify(value)
    }
    // console.log('打印',value);
    window.localStorage.setItem(key, value)
}

//获取数据
export const getItem = (key) => {

  
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}


//删除数据
export const removeItem = key => {
    window.localStorage.removeItem(key)
}