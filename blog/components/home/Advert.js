import React from 'react';
import AdvertCss from  './Advert.module.css';
import { Row,Col,Menu,Avatar,Divider } from 'antd'
import { QqOutlined,WechatOutlined,GithubOutlined } from "@ant-design/icons"
const Advert=()=>(
    <div className={AdvertCss.AdvertBox}>
       <div><img width="100%" src="https://newimg.jspang.com/kaikeba20201120.png"></img></div>
       <div><img width="100%" src="https://newimg.jspang.com/kaikeba20201120.png"></img></div>
       <div><img width="100%" src="https://newimg.jspang.com/kaikeba20201120.png"></img></div>
       <div><img width="100%" src="https://blogimages.jspang.com/WechatIMG12.jpeg"></img></div>
    </div>
)
export default Advert