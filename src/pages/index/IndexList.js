import React from 'react';
import '../../assets/css/index.css';
import {connect} from 'react-redux'
import NavTitle from "../../components/index/NavTitle";

class IndexList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            numberDetail: [],
            searchValue: ''
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


        // 方法3： redux 拿到数据
        // 拿到的是对象，转成数组
        let propsArr = Object.values(this.props);
        this.setState({
            numberDetail: propsArr
        })
    }

    delete(tel){
        let res = this.state.numberDetail.filter((item) => (
            item.tel !== tel
        ));
        this.setState({
            numberDetail: res
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
                <div className="title">
                    <NavTitle title="号码详情"/>
                </div>

                <div className="search">
                    <div className="searchInput">
                        <input type="text" onChange={(e) => (this.setState({searchValue: e.target.value}))}/>
                    </div>
                    <div className="searchButton">
                        <input type="button" value="搜索" onClick={this.search.bind(this, this.state.searchValue)}/>
                    </div>
                </div>

                <div className="detailTable">
                    <table>
                        <thead>
                            <tr>
                                <th>号码</th>
                                <th>姓名</th>
                                <th>省份</th>
                                <th>城市</th>
                                <th>区号</th>
                                <th>操作</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.numberDetail.map(item => (
                                item.show?
                                    <tr key={item.tel}>
                                        <td key={item.tel + item.tel} >{item.tel}</td>
                                        <td key={item.tel + item.name}>{item.name}</td>
                                        <td key={item.tel + item.province + item.areacode}>{item.province}</td>
                                        <td key={item.tel + item.city}>{item.city}</td>
                                        <td key={item.tel + item.areacode}>{item.areacode}</td>
                                        <td key={item.tel}><button onClick={this.delete.bind(this, item.tel)}>删除</button></td>
                                    </tr>:
                                    null
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default connect((state, props) => (Object.assign({}, state, props)),{}) (IndexList);