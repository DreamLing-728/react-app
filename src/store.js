/* eslint-disable no-unused-vars */
import { createStore } from 'redux';
import axios from 'axios';
import mock from './mock/mock'
/* eslint-enable no-unused-vars */


// mock获取数据
// async function getNumberList(){
//     try{
//         let res = await axios.get('http://localhost:5555/getNumberList');
        
//         let initData = res.data;
//         console.log('initData',initData);

//         // 创建reducer
//         function reducer(state = initData) {
//             return state;
//         }

//         // 创建store
//         let store = createStore(reducer);  
//         return store;

//     }catch(e){
//         console.log('网络错误');
//     }
// }

// 方法1： export default 放里面： 不行，会报错
// getNumberList().then((store) => {
//     console.log('store', store);
//     export default store; //???
// })

// 方法2：返回getNumberList()： 不行，因为返回的是一个promise对象, 但是我想要的只是里面的object！！！
// console.log('getNumberList', getNumberList())
// export default getNumberList();




// // 固定测试数据：能调通
let initData = [{tel: "10676812184", name: "戴霞", province: "福建省", city: "澳门半岛", areacode: "033", show: true}];

// 创建reducer
function reducer(state = initData) {
    return state;
}
// 创建store
let store = createStore(reducer);  
console.log(store)
export default store;





