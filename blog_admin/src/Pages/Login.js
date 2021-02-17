import React, { useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Card, Input, Button, Spin,message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../static/css/Login.css";
import servicePath from "../config/apiUrl";
function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const checkLogin = () => {
    setIsLoading(true);
    if(!userName||!password){
        message.error('用户名或密码不能为空')
        setIsLoading(false)
        return false
    }
    let dataProps = {
        userName,
        password
    }
    axios({
        method:'post',
        url:servicePath.checkLogin,
        data:dataProps,
        withCredentials:true
    }).then(
        res=>{
            setIsLoading(false)
            if(res.data.code==200&&res.data.data&&res.data.data.openId){
                localStorage.setItem('openId',res.data.data.openId)
                sessionStorage.setItem('openId',res.data.data.openId)
                props.history.push('/index')
            }else {
                message.error('用户名或密码错误')
            }
        }
    )
  };
  return (
    <div className="loginBody">
      <div className="login-div">
        <Spin tip="Loading..." spinning={isLoading}>
          <Card
            title="Apilnvoker Blog  System"
            bordered={true}
            style={{ width: 400 }}
          >
            <Input
              id="userName"
              size="large"
              placeholder="账号"
              prefix={<UserOutlined />}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <br />
            <br />
            <Input.Password
              id="password"
              size="large"
              placeholder="密码"
              prefix={<LockOutlined />}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <br />
            <Button type="primary" size="large" block onClick={checkLogin}>
              {" "}
              Login in{" "}
            </Button>
          </Card>
        </Spin>
      </div>
    </div>
  );
}
export default Login;
