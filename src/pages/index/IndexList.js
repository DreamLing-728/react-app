/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input, Space } from 'antd';
import { Resizable } from 'react-resizable';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import '../../assets/css/index.css';
import 'antd/dist/antd.css';
import NavTitle from "../../components/index/NavTitle";
import Column from 'antd/lib/table/Column';
/* eslint-enable no-unused-vars */

const { Search } = Input;

class IndexList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            // antd-标题
            antdTitle: [],
            // antd-内容
            antdData: [],
            searchText: '',
            searchedColumn: ''
        }
    }

    

    componentDidMount(){
        // redux 拿到数据
        // 拿到的是对象，转成数组
        let propsArr = Object.values(this.props);

        // antd-title: 初始化thead
        let antdTitleInit = [
            {
                title: '手机号',
                dataIndex: 'tel',
                key: 'tel',
                align: 'center',
                canSearch: true,
                ...this.getColumnSearchProps('tel'),
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                canSearch: true,
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '省份',
                dataIndex: 'province',
                key: 'province',
                align: 'center',
                canSearch: false,
                ...this.getColumnSearchProps('province')
            },
            {
                title: '城市',
                dataIndex: 'city',
                key: 'city',
                align: 'center',
                canSearch: true,
                ...this.getColumnSearchProps('city')
            },
            {
                title: '区号',
                dataIndex: 'areacode',
                key: 'areacode',
                align: 'center',
                canSearch: false,
                ...this.getColumnSearchProps('areacode'),
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (record) => (
                    <Button type = "primary" onClick={this.delete.bind(this, record.tel)}>删除</Button>
                    // <Button type = "primary" onClick={this.delete(record.tel)}>删除</Button>
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
            antdTitle: antdTitleInit,

            // 内容
            antdData: antdDataTamp,
        })

        // 搜索功能
        
    }

    delete(tel){
        let res = this.state.antdData.filter((item) => (
            item.tel !== tel
        ));
        this.setState({
            antdData: res
        })
    }

    // 会报错：Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    // delete = (tel) => {
    //     // console.log(tel);
    //     let res = this.state.antdData.filter((item) => (
    //         item.tel !== tel
    //     ));
    //     this.setState({
    //         antdData: res
    //     })
    // }

    // 传统搜索
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

    // antd 搜索
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
              <Input
                ref={node => {
                  this.searchInput = node;
                }}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                  Reset
                </Button>
              </Space>
            </div>
          ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        )
    })

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
        });
    }

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    // 搜索输入框
    onBlur = () => {
        const { value, onBlur, onChange } = this.props;
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
          valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
        if (onBlur) {
          onBlur();
        }
    };

    onChange = e => {
        const { value } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
          this.props.onChange(value);
        }
    };
    

    render(){
        return(
            <div className="number-list">
                {/* 标题区域 */}
                <div className="title">
                    <NavTitle title="号码详情"/>
                </div>
                
                {/* 搜索区域 */}
                <div className="search">
                    <div className="search-inputs">
                        {this.state.antdTitle.filter(item => (item.canSearch === true)).map(item => (
                            <div key={item.key} className="search-input">
                                <Space>
                                    <lable>{item.title}</lable>
                                    <Input
                                        {...this.props}
                                        onChange={this.onChange}
                                        onBlur={this.onBlur}
                                        placeholder={`input a ${item.key}`}
                                        maxLength={25}
                                    />
                                </Space>
                            </div>
                        ))}
                    </div>
                    
                    <div className="search-button">
                        <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                        <Button type="text" size="middle">重置</Button>
                    </div>
                    
                    
                </div>

                {/* 数据区域 */}
                <div className="detailTable">
                    <Table 
                        id = "roleTable"
                        className = "relatedPartyMaint"
                        columns = {this.state.antdTitle} 
                        dataSource = {this.state.antdData}
                        pagination = {{
                            total:this.state.antdData.length,
                            showTotal: total => `共${total}条记录`,
                            position: ['bottomCenter'],
                            showSizeChanger: true,
                            showQuickJumper: true,
                            defaultPageSize: 7
                        }}
                    />
                </div>
            </div>


        )
    }
}

export default connect((state, props) => (Object.assign({}, state, props)),{}) (IndexList);