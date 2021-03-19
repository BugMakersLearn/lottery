console.log('## 东仕2021年会抽奖程序 | 操作说明');
console.log('### 1. 设置奖项');
console.log('* 按键盘数字【1】设置为抽取一等奖');
console.log('* 按键盘数字【2】设置为抽取二等奖');
console.log('* 按键盘数字【3】设置为抽取三等奖');
console.log('');
console.log('### 2. 正常抽奖操作');
console.log('* 开始抽奖：按键盘组合键【ctrl】+【Enter】');
console.log('* 停止抽奖：再按一次组合键【ctrl】+【Enter】');
console.log('');
console.log('### 3. 重新抽奖操作');
console.log('* 开始重抽：按键盘组合键【ctrl】+【z】');
console.log('* 停止抽奖：再按一次组合键【ctrl】+【Enter】');
console.log('');
console.log('### 4. 查看中奖名单');
console.log('* 按键盘【空格键】打开中奖名单界面。');

/**
 * 员工列表
 * @type {any | *[]}
 */
let employeeList = JSON.parse(localStorage.getItem('employeeList')) || [];
/**
 * 黑名单列表
 * @type {any | *[]}
 */
let empNameBlackList = JSON.parse(localStorage.getItem('empNameBlackList')) || [];
/**
 * 内定列表
 * @type {any | *[]}
 */
let empWinner = JSON.parse(localStorage.getItem('empWinner')) || [];

/**
 * 已中奖的同事
 * @type {any | {}}
 */
let choosed = JSON.parse(localStorage.getItem('choosed')) || {};

/**
 * 放弃中奖的同事
 * @type {any | {}}
 */
let gaveUpped = JSON.parse(localStorage.getItem('gaveUpped')) || {};

empNameBlackList.forEach(empName => {
    choosed[empName] = 1;
})

/**
 * 速度
 * @returns {number[]}
 */
function speed(){
    return [0.5 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
};

/**
 * 获取 key
 * @param employee
 * @returns {*}
 */
function getKey(employee) {
    return employee.name;
}

/**
 * 员工列表 html 拼装
 * @returns {string}
 */
function createHTML() {
    var html = ['<ul>'];
    employeeList.forEach(function (employee, index) {
        employee.index = index;
        let key = getKey(employee)
        let color = choosed[key] ? 'yellow' : 'white';
        html.push('<li><a href="#" style="color: ' + color + '; font-weight: bold; font-size: 46px;">' + employee.name + '</a></li>');
        // html.push('<li><a href="#" style="color: ' + color + ';">' + item.name + '<img width="40" height="40" alt="' + item.name + '" src="'+item.img+'"/></a></li>');
    });
    html.push('</ul>');
    return html.join('');
};

// 设置 canvas 画布
var canvas = document.createElement('canvas');
canvas.id = 'myCanvas';
canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;
document.getElementById('main').appendChild(canvas);

/**
 * 抽奖
 * @param count 抽几个
 * @returns {Uint8Array}
 */
function lottery(count, level){
    var list = canvas.getElementsByTagName('a');
    var color = 'yellow';
    let winnerList = empWinner[level]

    // 本轮中奖名单
    console.log('level', level)
    var luckyEmpList = employeeList
        .filter(function(emp, index){
            emp.index = index;
            return !choosed[getKey(emp)];                      // 已中奖的不再参与抽奖
        })
        .map(function(emp){
            let score = Math.random();
            if (winnerList.indexOf(emp.name) != -1) {
                score = score / 1000
            }
            let a = Object.assign({
                score: score                           // 设置随机分
            }, emp);
            return a;
        })
        .sort(function(a, b){                       // 根据随机分排序
            return a.score - b.score;
        })
        .slice(0, count)                                        // 抽指定个数
        .map(function(emp){                                       // 处理中奖员工
            choosed[getKey(emp)] = 1;
            list[emp.index].style.color = color;
            return emp;
            // return '<img width="120" height="120" alt="' + m.name + '" src="' + m.img + '"/><br/>' + m.name + '<br/>' + m.phone;
        });

    // 更新中奖名单
    localStorage.setItem('choosed', JSON.stringify(choosed));

    return luckyEmpList;
};
