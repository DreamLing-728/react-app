/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import '@css/index.less';
import IndexHome from "./IndexHome";
import IndexList from "./IndexList";
import TopBanner from "../../components/index/TopBanner";
/* eslint-enable no-unused-vars */

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nav: [],
            collapsed: false
        }
    }


    componentDidMount() {
        // 导航菜单复用少，其实好像没必要存到变量里？
        this.setState({
            nav: [
                {
                    id: 0,
                    value: "首页",
                    path: "home"
                },
                {
                    id: 1,
                    value: "列表",
                    path: "list"
                },
                {
                    id: 2,
                    value: "菜单",
                    children: [
                        {
                            id: 21,
                            value: "子菜单1"
                        },
                        {
                            id: 22,
                            value: "子菜单2"
                        }
                    ]
                }
            ]

        })
    }

    goDetail(url) {
        this.props.history.replace(url);
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        // console.log('in index',this.props)
        return (
            <div className="index">
                <Layout style={{ minHeight: '100vh' }}>
                    {/* 左侧 */}
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" >号码管理系统</div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined />} onClick={this.goDetail.bind(this, "/index/home")}>
                                首页
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={this.goDetail.bind(this, "/index/list")}>
                                列表
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="菜单">
                                <Menu.Item key="3">子菜单1</Menu.Item>
                                <Menu.Item key="4">子菜单2</Menu.Item>
                            </SubMenu>

                            {/* {this.state.nav.map( item => (
                                item.children
                                ?
                                    <SubMenu key={item.id} icon={DesktopOutlined} title={item.value}>
                                        这里报错，好奇怪，还是没解决啊啊啊！！！
                                        {item.children.map( item1 => {
                                           <Menu.Item key={item1.id}> {item1.value} </Menu.Item>
                                        })}
                                    </SubMenu>
                                : 
                                    <Menu.Item key={item.id}> {item.value} </Menu.Item>
                            ))} */}
                        </Menu>
                    </Sider>
                    {/* 右侧 */}
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '0 0' }}>
                            <div className="site-layout-background" style={{ padding: 0, minHeight: 360 }}>
                                <Redirect from="/index" to="/index/home" />
                                <Route path={`/index/home`} render={() => (
                                    <IndexHome />
                                )} ></Route>
                                <Route path="/index/list" render={() => (
                                    <IndexList />
                                )} ></Route>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Design ©2020 Created by cml</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default connect((state, props) => (Object.assign({}, state, props)), {})(Index);