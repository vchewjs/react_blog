import React,{useState,useEffect} from "react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { List,Row,Col,Breadcrumb } from 'antd'
import { CalendarOutlined,FolderOutlined,FireOutlined } from "@ant-design/icons"
import Header from "../components/home/Header"
import AuthorDom from "../components/home/Author"
import Advert from "../components/home/Advert"
import Footer from "../components/home/Footer"
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

const MyList = (props)=>{
  const [ mylist , setMylist ] = useState(props.data)
  useEffect(()=>{
    setMylist(props.data)
  },)
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
        <title>List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <Row className={styles.contentMain} type="flex" justify="center">
          <Col className={styles.contentLeft} xs={24} sm={24} md={16} lg={18} xl={14}>
              <div className={styles.breadBox}>
                  <Breadcrumb>
                    <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>视频教程</Breadcrumb.Item>
                    </Breadcrumb>
              </div>
            <List
              header={<div className={styles.listHeader}>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={
                item =>(
                  <List.Item>
                    <div className={styles.listTitle}>
                    <Link  href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
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
          <Col className={styles.contentRight} xs={0} sm={0} md={7} lg={5} xl={4}>
            <AuthorDom />
            <Advert />
          </Col>
        </Row>
        <Footer />
      </div>
      
    </div>
  )
}

MyList.getInitialProps = async (context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+'/'+id).then(
      (res)=>resolve(res.data)
    )
  })
  return await promise
}

export default MyList
