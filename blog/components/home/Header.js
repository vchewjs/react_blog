import React,{useState,useEffect} from 'react';
import headerCss from  './Header.module.css';
import { Row,Col,Menu,Icon } from 'antd'
// import  * as Icon from '@ant-design/icons';
import IconDom from '@ant-design/icons';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../../config/apiUrl'
import { HomeOutlined,MessageOutlined,PieChartOutlined,BugOutlined,YoutubeOutlined } from "@ant-design/icons"
const Header=()=>{
    const [navArray,setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then((res) => {
                console.log("======>", res.data);
                return res.data.data
              });
              setNavArray(result);
        } 
        fetchData()
    },[])

    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else {
            Router.push('/list?id='+e.key)
        }
    }

    return (
        <div className={headerCss.header}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={11}>
                    <span className={headerCss.headerLoge}>Apilnvoker</span>
                    <span className={headerCss.headerTxt}>专注前端开发，其实还是个小菜鸟。</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={9}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                        <HomeOutlined />
                            首 页
                        </Menu.Item>
                        {navArray.map((item)=>{
                            let arr = []
                            if(item.Id==1){
                                arr[item.Id] = <YoutubeOutlined />
                            }else if(item.Id==2){
                                arr[item.Id] = <MessageOutlined />
                            }else if(item.Id==3){
                                arr[item.Id] = <PieChartOutlined />
                            }else {
                                arr[item.Id] = <BugOutlined />
                            }
                            return <Menu.Item key={item.Id}>
                                {/* {
                                    React.createElement(IconDom['PlayCircleOutlined'],{
                                        style:{ fontSize: '16px', color: '#08c' }
                                      })
                                } */}
                                {arr[item.Id]}
                                {item.typeName}
                            </Menu.Item>
                        })}
                        {/* <Menu.Item key="video">
                        <PlayCircleOutlined />
                            视 频
                        </Menu.Item>
                        <Menu.Item key="life">
                        <MessageOutlined />
                            生 活
                        </Menu.Item> */}
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header