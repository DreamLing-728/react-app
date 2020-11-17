/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux'
import { Table, Button, Input, Space, Dropdown } from 'antd'
import { Resizable } from 'react-resizable';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column'
import 'antd/dist/antd.css';

import '@css/index.less';
import NavTitle from "@components/index/NavTitle";
import { reject, set } from 'ramda';
/* eslint-enable no-unused-vars */

const { Search } = Input

class IndexList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // antd-标题
            antdTitle: [],
            // antd-内容
            antdData: [],
            filteresCloumn: null,
            filteredInfo: null,
            searchText: '',
            searchedColumn: '',

        }
    }

    // 初始化标题
    componentWillMount() {
        let { sortedInfo, filteredInfo } = this.state;
        console.log('filteredInfo',filteredInfo)
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};



        // antd-title: 初始化thead
        let antdTitleInit = [
            {
                title: '手机号',
                dataIndex: 'tel',
                key: 'tel',
                width: 150,
                align: 'center',
                canSearch: true,
                canDropdown: false,
                // 在标题处搜索
                // ...this.getColumnSearchProps('tel'),
                // 排序
                sorter: (a, b) => a.tel - b.tel,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 150,
                align: 'center',
                canSearch: true,
                canDropdown: false,
                // ...this.getColumnSearchProps('name'),
            },
            {
                title: '省份',
                dataIndex: 'province',
                key: 'province',
                width: 150,
                align: 'center',
                canSearch: true,
                canDropdown: true,
                // 过滤筛选
                // filters: this.filterCloumn('province'),
                filters: this.getCloumnUni('province'),
                // filteredValue: this.state.filteredInfo.province || null,
                onFilter: (value, record) => record.province.includes(value),
                // ...this.getColumnSearchProps('province')
            },
            {
                title: '城市',
                dataIndex: 'city',
                key: 'city',
                width: 150,
                align: 'center',
                canSearch: true,
                canDropdown: true,
                ...this.getColumnSearchProps('city')
            },
            {
                title: '区号',
                dataIndex: 'areacode',
                key: 'areacode',
                width: 150,
                align: 'center',
                canSearch: false,
                canDropdown: false,
                ...this.getColumnSearchProps('areacode'),
                sorter: (a, b) => a.areacode - b.areacode,
                sortDirections: ['descend'],
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (record) => (
                    <Button type = "primary" onClick={this.delete(record.tel)}>删除</Button>
                )
            },
        ]
        let antdTitleTemp = antdTitleInit.map((col, index) => {
            return {
                ...col,
                onHeaderCell: antdTitleInit => ({
                    width: antdTitleInit.width,
                    // 添加可伸缩属性
                    onResize: this.handleResize(index)
                })
            }
        });

        this.setState({
            antdTitle: antdTitleTemp
        })
    }

    componentDidMount() {
        // redux 拿到数据：拿到的是对象，转成数组
        let propsArr = Object.values(this.props);


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
            // 内容
            antdData: antdDataTamp,
        })
    }

    // 1. 删除功能
    // 注意这里不能是 delete = (tel) => {  否则就直接运行了，应该返回一个函数，通过onClick时才调用
     delete = (tel) => () => {
        // console.log(tel);
        let res = this.state.antdData.filter((item) => (
            item.tel !== tel
        ));
        this.setState({
            antdData: res
        })
    }

    // 2. 列宽可调控
    ResizableTitle = (props) => {
        // console.log('props', props);
        const { onResize, width, ...restProps } = props;

        return (
            <Resizable
                width={width}
                height={0}
                handle={
                    <span
                        className="react-resizable-handle"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    />
                }
                onResize={onResize}
                draggableOpts={{ enableUserSelectHack: false }}
            >
                <th {...restProps} />
            </Resizable>
        );
    }
    handleResize = index => (e, { size }) => {
        // console.log('e+size', e, size)
        this.setState(({ antdTitle }) => {
            // console.log('columns',antdTitle);
            const nextColumns = [...antdTitle];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { antdTitle: nextColumns };
        });
    };
    // 控制列宽调控的对象
    components = {
        // 头部
        header: {
            // 每一个单元格属性设置
            cell: this.ResizableTitle,
        },
    };


    // 3.筛选功能(未100%解决)
    getCloumnUni = (cloumnTitle) => {
        let res1 =  [
            { text: '北京', value: '北京' },
            { text: '上海', value: '上海' },
            { text: '广东', value: '广东' },
        ]
        console.log(res1)
        return res1

        this.filterCloumn(cloumnTitle).then((value) => {
            console.log('fulfilled!', value);
            this.setState({
                filteresCloumn: value,
            })
        })
        console.log('filteresCloumn', this.state.filteresCloumn)
        return this.state.filteresCloumn;
    }
    

    filterCloumn = (cloumnTitle) => {
        
        // 这里有问题，为什么异步后就获取不了数据了？？？！！！
        // setTimeout 异步获取数据, 如果不异步, antdData的值为空
        // setTimeout(() => {
            // // console.log('cloumnTitle + data', cloumnTitle, this.state.antdData);
            // // 拿到整列数据，类型是数组
            // let cloumns = this.state.antdData.map((item) => (item.province));
            // // 把数组进行去重(数组 => set => 数组)
            // let cloumnUni = [... new Set(cloumns)];
            // // console.log('cloumns + cloumnUni', cloumns, cloumnUni);
            // let res = [];
            // cloumnUni.forEach((x) => (res.push({text: x, value: x})))
            // console.log(res)
            // return res;
        // })

        return new Promise((resolve, reject) => {
            if(cloumnTitle !== null){
                console.log('cloumnTitle + data', cloumnTitle, this.state.antdData);
                // 拿到整列数据，类型是数组
                let cloumns = this.state.antdData.map((item) => (item.province));
                // 把数组进行去重(数组 => set => 数组)
                let cloumnUni = [... new Set(cloumns)];
                console.log('cloumns + cloumnUni', cloumns, cloumnUni);
                let res = [];
                cloumnUni.forEach((x) => (res.push({text: x, value: x})))
                console.log(res)
                let res1 =  [
                    { text: '北京', value: '北京' },
                    { text: '上海', value: '上海' },
                    { text: '广东', value: '广东' },
                ]
                console.log(res1)
                resolve(res1)
            }})
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    clearAll = () => {
        this.setState({
          filteredInfo: null,
          sortedInfo: null,
        });
      };
    
    
    // 4.搜索
    search(val) {
        // 初始化：所有都显示
        this.state.numberDetail.map((item) => {
            item.show = true
        });

        // 如果搜索字段为空，显示全部
        if (val.match(/^\s*$/)) {
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
            if (temp.indexOf(val) === -1) {
                item.show = false
            }
        })

        this.setState({
            numberDetail: this.state.numberDetail
        })
    }
    // antd 搜索
    getColumnSearchProps = (dataIndex) => ({
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


    render() {
        
        return (
            <div className="number-list">
                {/* 标题区域 */}
                <div className="title">
                    <NavTitle title="号码详情" />
                </div>

                {/* 搜索区域 */}
                <div className="search">
                    <div className="search-inputs">
                        {this.state.antdTitle.filter(item => (item.canSearch === true)).map(item => (
                            <div key={item.key} className="search-input">
                                <Space>
                                    <div>{item.title}</div>
                                    <Input
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
                        <div>
                            <Button type="primary" id="button-search" icon={<SearchOutlined />}>搜索</Button>
                        </div>
                        <div>
                            <Button >重置</Button>
                        </div>
                    </div>
                </div>

                {/* 数据区域 */}
                <div className="detailTable">
                    <Table
                        id="roleTable"
                        className="relatedPartyMaint"
                        // 标题
                        columns={this.state.antdTitle}
                        // 数据
                        dataSource={this.state.antdData}
                        // 边框
                        bordered="true"
                        // 覆盖默认的 table 元素
                        components={this.components}
                        // 分页
                        pagination={{
                            total: this.state.antdData.length,
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

export default connect((state, props) => (Object.assign({}, state, props)), {})(IndexList);