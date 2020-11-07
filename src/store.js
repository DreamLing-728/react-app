import {createStore} from 'redux';

// 假装获取到了数据
let initData = [
    {
        "tel": "13031442718",
        "name": "张三",
        "province": "北京",
        "city": "北京",
        "areacode": "010",
        "show": true
    },
    {
        "tel": "15036232568",
        "name": "李四",
        "province": "上海",
        "city": "上海",
        "areacode": "021",
        "show": true
    },
    {
        "tel": "17807712987",
        "name": "王五",
        "province": "广东",
        "city": "深圳",
        "areacode": "0755",
        "show": true
    },
    {
        "tel": "13045842718",
        "name": "张三",
        "province": "北京",
        "city": "北京",
        "areacode": "010",
        "show": true
    },
    {
        "tel": "15035223568",
        "name": "李四",
        "province": "上海",
        "city": "上海",
        "areacode": "021",
        "show": true
    },
    {
        "tel": "17802910987",
        "name": "王五",
        "province": "广东",
        "city": "深圳",
        "areacode": "0755",
        "show": true
    },
    {
        "tel": "12034842718",
        "name": "张三",
        "province": "北京",
        "city": "北京",
        "areacode": "010",
        "show": true
    },
    {
        "tel": "15444732568",
        "name": "李四",
        "province": "上海",
        "city": "上海",
        "areacode": "021",
        "show": true
    },
    {
        "tel": "17809988987",
        "name": "王五",
        "province": "广东",
        "city": "深圳",
        "areacode": "0755",
        "show": true
    },
    {
        "tel": "13042342718",
        "name": "张三",
        "province": "北京",
        "city": "北京",
        "areacode": "010",
        "show": true
    },
    {
        "tel": "15978423568",
        "name": "李四",
        "province": "上海",
        "city": "上海",
        "areacode": "021",
        "show": true
    },
    {
        "tel": "17807913787",
        "name": "王五",
        "province": "广东",
        "city": "深圳",
        "areacode": "0755",
        "show": true
    }
]

// 创建reducer
function reducer(state = initData, action) {
    return state;
}

// 创建store
let store = createStore(reducer);

export default store;