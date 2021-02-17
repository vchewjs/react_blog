import React,{useState} from "react"
import Head from 'next/head'
import LinkDom from 'next/link'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { List,Row,Col } from 'antd'
import { CalendarOutlined,FolderOutlined,FireOutlined } from "@ant-design/icons"
import Header from "../components/home/Header"
import AuthorDom from "../components/home/Author"
import Advert from "../components/home/Advert"
import Footer from "../components/home/Footer"
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import servicePath from '../config/apiUrl'

const Home = (list) =>{
  const [ mylist , setMylist ] = useState(list.data)
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
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <Row className={styles.contentMain} type="flex" justify="center">
          <Col className={styles.contentLeft} xs={24} sm={24} md={16} lg={18} xl={15}>
            <List
              header={<div className={styles.listHeader}>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={
                item =>(
                  <List.Item>
                    <div className={styles.listTitle}>
                      <LinkDom  href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                      </LinkDom>
                      </div>
                    <div className={styles.listIcon}>
                      <span><CalendarOutlined />{item.addTime}</span>
                      <span><FolderOutlined />{item.typeName}</span>
                      <span><FireOutlined />{item.view_count}人</span>
                    </div>
                <div className={styles.listContext} 
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                ></div>
                  </List.Item>
                )
              }
            ></List>
          </Col>
          <Col className={styles.contentRight} xs={0} sm={0} md={7} lg={5} xl={5}>
            <AuthorDom />
            <Advert />
          </Col>
        </Row>
        <Footer />
      </div>
      
    </div>
  )
}
Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        console.log('======>',res.data)
        resolve(res.data)
      }
    )
  })
  return await promise
}
export default Home
