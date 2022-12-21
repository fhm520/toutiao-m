module.exports = {
  //配置要使用的PostCSS插件
    plugins: {
      //配置使用autoprefixer插件，生成浏览器css样式规则前缀
      //vue/cli内部已经配置了autoprefixer插件，再次配置会产生冲突
      // 'autoprefixer': {
        //配置要兼容的环境信息
      //   browsers: ['Android >= 4.0', 'iOS >= 8']
      // },

      //把px转换成rem
      'postcss-pxtorem': {
        //lib-flexible的rem适配方案：把一行分为10等份，每份宽度占十分之一，如果设计稿的尺寸是基于750来写的，那么基准值就为75
        //vant建议设置为37.5，vant是基于375写的
        //如果vant的样式，就按照37.5来转换，如果是我们自己的样式，一般就按照75来转换。
        //rootvalue支持两种类型：
        // 数字（rootValue: 37.5）；
        // 函数：可动态处理返回，postcss-pxtorem处理每个css文件的时候都会来调用rootvalue函数，他会把被处理的css文件相关信息通过参数传给该函数


        //{file}解构出每一个css文件
        rootValue({file}) {
          //判断文件中是否有vant,如有值为37.5，否则为75
          return file.indexOf('vant') !== -1? 37.5: 75
        },
        propList: ['*'],//转换所有的CSS属性
        //配置不需要转换的样式资源
        exclude: 'github-markdown'
      }
    }
  }