const empNameList = [
    '高天云',
    '顾赢花',
    '陈虹',
    '闫凯',
    '钱尧彦',
    '金慧',
    '鄢钰新',
    '郭林',
    '郭双江',
    '邱虹',
    '连家裕',
    '赵旖旎',
    '谢周周',
    '袁园',
    '蔡卫东',
    '苏欣弦',
    '舒钺杉',
    '翟星星',
    '程嘉根',
    '田艳',
    '王峰',
    '王佳婧',
    '汪铭慧',
    '欧阳强强',
    '杨雪薇',
    '李培倩',
    '朱燕',
    '曹建华',
    '方腾',
    '徐德钱',
    '张骥彦',
    '张玉琴',
    '张灏泳',
    '张梦琪',
    '张怡臻',
    '张俊杰',
    '张亚倩',
    '姜莉薇',
    '姚铖',
    '姚炅',
    '姚杰',
    '周凡婷',
    '卢丹',
    '刘欣',
    '刘悦',
    '冯智勇',
    '何昱均',
    '乐君礽',
    'Will',
    'Steven'
];

// 待抽奖员工名单
let empList = []
empNameList.forEach(empName => {
    let emp = {}
    emp.name = empName
    empList.push(emp)
})
localStorage.setItem('employeeList', JSON.stringify(empList));
