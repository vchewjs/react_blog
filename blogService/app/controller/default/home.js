'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async default() {
    const { ctx } = this;
    ctx.body = '欢迎光临Apilnvoker博客';
  }
  async index() {
    const { ctx } = this;
    ctx.body = "api hi";
  }
  async getArticleList (){
    const {ctx} = this;
    let sql = 'SELECT article.Id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce,'+
                 "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                 'article.view_count as view_count ,'+
                //  'article.introduce_html as introduce_html ,'+
                 'type.typeName as typeName '+
                 'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                 'WHERE article.isTop = 0  AND article.type_id <> 99 '+
                 'ORDER BY article.Id DESC'
    const results = await this.app.mysql.query(sql)
    ctx.body = {data:results,code:200,message:'请求成功'}
  }
  async getArticleById(){
    let id = this.ctx.params.id;
    let sql = 'SELECT article.Id as id ,'+
    'article.title as title ,'+
    'article.introduce as introduce ,'+
    'article.article_content as article_content ,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime ,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.Id='+id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {data:result,code:200,message:'请求成功'}
  }
  async getTypeInfo () {
    const result = await this.app.mysql.select('type');
    this.ctx.body = {data:result,code:200,message:'请求成功'}
  }

  async getListById () {
    let id = this.ctx.params.id
    let sql = 'SELECT article.Id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime ,"+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'WHERE type_id='+id
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data:results,code:200,message:'请求成功'}
  }
}

module.exports = HomeController;
