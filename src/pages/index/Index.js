import React from 'react';
import  {Route, Redirect}  from  'react-router-dom';
import {connect} from 'react-redux'

import '../../assets/css/index.css';
import IndexHome from "./IndexHome";
import IndexList from "./IndexList";
import TopBanner from "../../components/index/TopBanner";

class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            nav : []
        }
    }

    componentDidMount(){
        // 假装获取到了数据
        this.setState({
            nav:[
                {
                    id: 0,
                    value: "首页",
                    path: "home"
                },
                {
                    id: 1,
                    value: "列表",
                    path: "list"
                }
            ]

        })
    }

    goDetail(url){
        this.props.history.replace(url);
    }

    render(){
        // console.log('in index',this.props)
        return(
            <div className="index">

                {/*上边标题栏*/}
                <TopBanner/>

                {/*左边导航栏*/}
                <div className="nav-list">
                    {this.state.nav.map((item) => (
                        <li key={item.id} onClick={this.goDetail.bind(this, `/index/${item.path}`)}>{item.value}</li>
                    ))}
                </div>

                {/*右边详情栏*/}
                <Redirect from="/index" to="/index/home"/>
                <Route path={`/index/home`} render={props => (
                    <IndexHome/>
                )} ></Route>
                <Route path="/index/list" render={props => (
                    <IndexList/>
                )} ></Route>
            </div>
        )
    }
}

export default connect((state, props) => (Object.assign({}, state, props)),{}) (Index);