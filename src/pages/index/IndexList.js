/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd'

import '../../assets/css/index.css';
import 'antd/dist/antd.css';
import NavTitle from "../../components/index/NavTitle";
/* eslint-enable no-unused-vars */

class IndexList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            numberDetail: [],
            searchValue: '',
            // antd-标题
            antdTitle: [],
            // antd-内容
            antdData: []
        }
    }

    componentDidMount(){
        // 方法1： fetch 拿到数据（为什么拿不到，会自动跳到登录页面？）
        // try{
        //     let res = await fetch('/public/numberList.txt');
        //     console.log(res);
        //     let resData =await res.json();
        //     this.setState({
        //         numberDetail: resData
        //     })
        // }catch (err) {
        //     console.log(err)
        // }


        // 方法2： redux 拿到数据
        // 拿到的是对象，转成数组
        let propsArr = Object.values(this.props);

        // antd-title: thead
        let antdTitleTemp = [
            {
                title: '手机号',
                dataIndex: 'tel',
                key: 'tel',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '省份',
                dataIndex: 'province',
                key: 'province',
            },
            {
                title: '城市',
                dataIndex: 'city',
                key: 'city',
            },
            {
                title: '区号',
                dataIndex: 'areacode',
                key: 'areacode',
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => (
                    <Button type = "primary" onClick={this.delete.bind(this, record.tel)}>删除</Button>
                )
            },
        ];

        // antd-data: tbody
        let antdDataTamp = [];
        propsArr.map((item) => {
            let obj = {};
            obj['key'] = item.tel;
            obj['tel'] = item.tel;
            obj['name'] = item.name;
            obj['province'] = item.province;
            obj['city'] = item.city;
            obj['areacode'] = item.areacode;
            antdDataTamp.push(obj);
        })

        

        // 渲染数据
        this.setState({
            // 标题
            antdTitle: antdTitleTemp,

            // 内容
            antdData: antdDataTamp

        })


    }

    delete(tel){
        // console.log(tel);
        let res = this.state.antdData.filter((item) => (
            item.tel !== tel
        ));
        this.setState({
            antdData: res
        })
    }

    search(val){
        // 初始化：所有都显示
        this.state.numberDetail.map((item) => {
            item.show = true
        });

        // 如果搜索字段为空，显示全部
        if(val.match(/^\s*$/)){
            this.setState({
                numberDetail: this.state.numberDetail
            });
            return false;
        }

        // 如果不为空，判断每一行
        this.state.numberDetail.map((item) => {
            // item是一个Json，把Json的所有value取出来
            let temp = Object.values(item).join('');
            // 如果整个item里没有找到字符串val,则此item不显示
            if(temp.indexOf(val) === -1){
                item.show = false
            }
        })

        this.setState({
            numberDetail: this.state.numberDetail
        })
    }


    render(){
        return(
            <div className="number-list">
                {/* 标题区域 */}
                <div className="title">
                    <NavTitle title="号码详情"/>
                </div>
                
                {/* 搜索区域 */}
                <div className="search">
                    <div className="searchInput">
                        <input type="text" onChange={(e) => (this.setState({searchValue: e.target.value}))}/>
                    </div>
                    <div className="searchButton">
                        <input type="button" value="搜索" onClick={this.search.bind(this, this.state.searchValue)}/>
                    </div>
                </div>

                {/* 数据区域 */}
                <div className="detailTable">
                    <Table 
                        columns = {this.state.antdTitle} 
                        dataSource = {this.state.antdData}
                        pagination = {{
                            pageSize: 5
                        }}
                    />
                
                </div>
            </div>


        )
    }
}

export default connect((state, props) => (Object.assign({}, state, props)),{}) (IndexList);