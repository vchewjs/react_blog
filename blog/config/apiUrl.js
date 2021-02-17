let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList:ipUrl+'getArticleList', //home文章列表
    getArticleById:ipUrl+'getArticleById',  //文章详情getTypeInfo
    getTypeInfo:ipUrl+'getTypeInfo',  //导航列表
    getListById:ipUrl+'getListById',//类别获取文章列表
}

export default servicePath