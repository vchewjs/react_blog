import React from 'react';
import authorCss from  './Author.module.css';
import { Row,Col,Menu,Avatar,Divider } from 'antd'
import { QqOutlined,WechatOutlined,GithubOutlined } from "@ant-design/icons"
const AuthorDom=()=>(
    <div className={authorCss.authorBox}>
        <div><Avatar size={100} src="http://thirdqq.qlogo.cn/g?b=sdk&k=Ieb623sKyYM9JsTzcsRPMA&s=100&t=1560422080?rand=1613298087"></Avatar></div>
        <div className={authorCss.authorName}>Apilnvoker</div>
        <div className={authorCss.introduction}>因为美好的东西都是免费的，比如水、阳光和空气，所以本站视频全部免费。
            <Divider>社交账号</Divider>
            <div> 
                <Avatar size={28} icon={<GithubOutlined />} className={authorCss.account}></Avatar>
                <Avatar size={28} icon={<QqOutlined />} className={authorCss.account}></Avatar>
                <Avatar size={28} icon={<WechatOutlined />} className={authorCss.account}></Avatar>
            </div>
        </div>

    </div>
)
export default AuthorDom