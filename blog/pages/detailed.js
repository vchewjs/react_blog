import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";
import detailed from "../styles/Detailed.module.css";
import { Affix, Row, Col, Breadcrumb, Anchor } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
import Header from "../components/home/Header";
import AuthorDom from "../components/home/Author";
import Advert from "../components/home/Advert";
import Footer from "../components/home/Footer";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Tocify from "../components/home/tocify.tsx";
import servicePath from '../config/apiUrl'


const Detailed = (res) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: false,
    tables: true,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
  let html = marked(res.article_content);
  const tocify = new Tocify();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  return (
    <div>
      <Head>
        <title>Detailed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <Row className={styles.contentMain} type="flex" justify="center">
          <Col
            className={styles.contentLeft}
            xs={24}
            sm={24}
            md={16}
            lg={18}
            xl={14}
          >
            <div className={detailed.breadBox}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/">视频列表</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{res.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className={detailed.detailTitle}>{res.title}</div>
            <div className={detailed.detailCenter}>
              <div className={styles.listIcon}>
                <span>
                  <CalendarOutlined />
                  {res.addTime}
                </span>
                <span>
                  <FolderOutlined />
                  {res.typeName}
                </span>
                <span>
                  <FireOutlined />
                  {res.view_count}人
                </span>
              </div>
            </div>
            <div
              className={detailed.detailContent}
              dangerouslySetInnerHTML={{ __html: html }}
            >
              {/* <ReactMarkdown source={res.article_content} escapeHtml={false}></ReactMarkdown> */}
            </div>
          </Col>
          <Col
            className={styles.contentRight}
            xs={0}
            sm={0}
            md={7}
            lg={5}
            xl={4}
          >
            <AuthorDom />
            <Advert />
            <Affix offsetTop={5}>
              <div className={detailed.detailNav}>
                <div className={detailed.navTitle}>文章目录</div>
                <div className="toc-list">
                  {tocify && tocify.render()}
                </div>
                {/* <MarkNav className={detailed.articleMenu} source={markdown}></MarkNav> */}
              </div>
            </Affix>
          </Col>
        </Row>
        <Footer />
      </div>
    </div>
  );
};

Detailed.getInitialProps = async (context) => {
  console.log("ddd", context.query.id);
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById+"/" + id).then((res) => {
      console.log("======>", res.data);
      resolve(res.data.data[0]);
    });
  });
  return await promise;
};

export default Detailed;
