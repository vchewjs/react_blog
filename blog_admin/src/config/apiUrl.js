let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin:ipUrl+'checkLogin', //home文章列表
    outLogin:ipUrl+'outLogin',//退出登录
    getTypeInfo:ipUrl+'getTypeInfo',//获取文章类别
    addArticle:ipUrl+'addArticle',//保存文章
    updateArticle:ipUrl+'updateArticle',//修改文章
    getArticleList:ipUrl + 'getArticleList' ,  //  文章列表
    delArticle:ipUrl + 'delArticle/' ,  //  删除文章
    getArticleById:ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
    updateIsTop:ipUrl + 'updateIsTop' ,  //  修改文章是否置顶
}

export default servicePath