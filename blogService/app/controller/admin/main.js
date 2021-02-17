"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async index() {
    //首页的文章列表数据
    this.ctx.body = "hi api";
  }

  //判断用户名密码是否正确
  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    const sql =
      " SELECT userName FROM admin_user WHERE userName = '" +
      userName +
      "' AND password = '" +
      password +
      "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      //登录成功,进行session缓存
      let openId = new Date().getTime();
      this.ctx.session.openId=openId
      this.ctx.body = {
        data: { openId: openId },
        code: 200,
        message: "登录成功",
      };
    } else {
      this.ctx.body = { data: null,code:200 };
    }
  } 

  //退出登录
  async outLogin(){
    this.ctx.session.openId=null 
    this.ctx.body={data:'退出登录成功',code:200,message:'退出登录成功'}

}

  async getTypeInfo() {
    const resType = await this.app.mysql.select("type");
    this.ctx.body = { data: resType, code: 200, message: "请求成功" };
  }

  async addArticle() {
    let tempArticle = this.ctx.request.body;
    console.log("---", tempArticle);
    const result = await this.app.mysql.insert("article", tempArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      code: 200,
      data: {
        isSuccess: insertSuccess,
        insertId: insertId,
      },
      message: "请求成功",
    };
  }
  async updateArticle() {
    let tempArticle = this.ctx.request.body;
    console.log("---", tempArticle);
    const result = await this.app.mysql.update("article", tempArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      code: 200,
      data: {
        isSuccess: insertSuccess,
        insertId: insertId,
      },
      message: "请求成功",
    };
  }
  //修改文章置顶信息
  async updateIsTop() {
    let tmpArticle = this.ctx.request.body;

    let sql =
      "update  article set isTop = " +
      tmpArticle.isTop +
      " where id = " +
      tmpArticle.id;
    let updateResult = await this.app.mysql.query(sql);
    const updateSuccess = updateResult.affectedRows === 1;
    if (updateSuccess) {
      this.ctx.body = { data: "success" };
    } else {
      this.ctx.body = { data: "error" };
    }
  }

  //获得文章列表
  async getArticleList() {
    let sql =
      "SELECT article.Id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "article.view_count as view_count ," +
      "article.part_count as part_count ," +
      "article.isTop as isTop ," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "ORDER BY article.id DESC ";

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }

  //删除文章
  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete("article", { id: id });
    this.ctx.body = { data: res };
  }

  //根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    let id = this.ctx.params.id;

    let sql =
      "SELECT article.Id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "article.view_count as view_count ," +
      "article.part_count as part_count ," +
      "type.typeName as typeName ," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "WHERE article.Id=" +
      id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
