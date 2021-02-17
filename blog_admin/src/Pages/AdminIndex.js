import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb,Row,Col,Button } from "antd";
import {
  DesktopOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  SnippetsOutlined,
  FormOutlined,
  UnorderedListOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import axios from "axios";
import servicePath from "../config/apiUrl";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };
  const handleClickArticle = e=>{
    console.log(props)
    if(e.key=='addArticle'){
      props.history.push('/index/add')
    }else{
      props.history.push('/index/list')
    }

  }
  const outLoginId = ()=>{
      axios(servicePath.outLogin, { withCredentials: true }).then(
          res=>{
              if(res.data.code==200&&res.data.message=='退出登录成功'){
                  props.history.push('/')
              }
          }
      )
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">Apilnvoker</div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key="2" icon={<FormOutlined />}>
            添加文章
          </Menu.Item>
          <SubMenu key="sub1" icon={<SnippetsOutlined />} onClick={handleClickArticle} title="文章管理">
            <Menu.Item key="addArticle" icon={<FormOutlined />}>添加文章</Menu.Item>
            <Menu.Item key="articleList" icon={<UnorderedListOutlined />}>文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<CommentOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
                <Col span={16}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: onCollapse,
            })}</Col>
                <Col span={8} style={{textAlign:'right'}}><Button type="link" onClick={outLoginId} style={{marginRight:"10px"}}>退出登录</Button></Col>

            </Row>
        
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background site-layout-height"
            style={{ padding: 18 }}
          >
            <div>
              <Route key="index" path="/index/" exact component={AddArticle} />
              <Route key="add" path="/index/add/" exact component={AddArticle} />
              <Route key="addId" path="/index/add/:id" exact component={AddArticle} />
              <Route key="list" path="/index/list" component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright @ 2020-2021 94nu.com All Rights Reserved.版权所有
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
// class SiderDemo extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   render() {
//     const { collapsed } = this.state;

//   }
// }

// ReactDOM.render(<SiderDemo />, mountNode);
