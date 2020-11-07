import React from 'react';
import {connect} from 'react-redux';

import '../../assets/css/login.css';
import '../../components/index/TopBanner'
import TopBanner from "../../components/index/TopBanner";

// 整体组件
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    toLogin(url){
        // 匹配0个或者多个空格
        if(this.state.username.match(/^\s*$/)){
            alert('手机号不能为空');
            return false;
        }
        if(this.state.password.match(/^\s*$/)){
            alert('密码不能为空');
            return false;
        }

        // 密码正确，则登录
        if(this.state.username === "123"  && this.state.password === "123"){
            this.props.history.push(url);
        }else{
            alert('密码错误，重新输入');
        }



    }

    reset(){
        this.setState({
            username: '',
            password: ''
        })
    }

    render(){
        // console.log('in Login', this.props);
        return(
            <div className="login">
                <TopBanner/>

                <div className="login-container">
                    <div>
                        用户登录
                    </div>
                    <div className="inputValue">
                        <label htmlFor="username">账号</label>
                        <input type="text" placeholder="请输入账号(123)" id="username" value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}} />
                    </div>
                    <div className="inputValue">
                        <label htmlFor="password">密码</label>
                        <input type="password" placeholder="请输入密码(123)" id="password" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
                    </div>

                    <div className="actionButton">
                        <div className="loginButton" >
                            <input type="button" className="login" value="登录" onClick={this.toLogin.bind(this, "/index")}/>
                        </div>

                        <div className="loginButton" >
                            <input type="button" className="reset" value="重置" onClick={this.reset.bind(this, "/index")}/>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}


export default connect((state, props) => (Object.assign({}, state, props)),{}) (Login);