var ajax = {
    ADD_CALLLOG: 'fengming-b/ADD/CalllogLoggedService/addCalllog',
    // 话单补录详情接口-编辑时查看详情
    GET_CALLLOG_DETAIL: 'fengming-b/GET/CalllogLoggedService/getCalllogDetail',
    // 电话方案接口
    GET_PHONE_NUMS: 'fengming-b/GET/PhoneSolutionService/getPhoneNums',
    // 话单补录详情接口-提交编辑时调用
    MOD_CALLLOG: 'fengming-b/MOD/CalllogLoggedService/modCalllog'
}
console.log(Object.keys(ajax).reduce((r,k) => [...r,`${k}_success我爱宣楠`,`${k}_request我爱宣楠`,`${k}_failure我爱宣楠`],[]));
