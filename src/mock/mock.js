import Mock, { Random } from "mockjs";


let numberList = [];
for(let i = 0; i < 10; i ++){
    let numberListObj = {
        'tel': /^[1]\d{10}/, //生成1开头的11位手机号 
        'name': Random.cname(), // 随机生成常见中文名 
        'province': Random.province(), 
        'city': Random.city(), 
        'areacode': /^[0]\d{2,3}/, 
        'show': true,
    }
    numberList.push(numberListObj);
}

Mock.mock('http://localhost:5555/getNumberList', numberList)