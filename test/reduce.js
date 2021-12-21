const MONITOR_TIME_BUTTON_CONFIG = [
    {
        label: '今天',
        type: 1
    },
    {
        label: '昨天',
        type: 2
    },
    {
        label: '近7天',
        type: 3
    },
    {
        label: '近30天',
        type: 4
    }
];
const changeConfig = (r, i) => {
    if (i.label === '近30天') {
        console.log(i.label)
        i.label = '近一个月';
        console.log(i.label)
    }
    return r;
}
console.log(MONITOR_TIME_BUTTON_CONFIG.reduce(changeConfig,[]));
console.log(MONITOR_TIME_BUTTON_CONFIG);

// const changeConfig = (r, i) => {
            // const params = {
            //     label: i.label
            //     ...
            // };

        //     if (i.label === '近30天') {
        //         i.label = '近一个月'
        //     }
        //     return params;
        // }
        // if (dateConfig) {
        //     MONITOR_TIME_BUTTON_CONFIG.reduce(changeConfig,[]);
        //     const a = TIME_BUTTON_CONFIG.reduce(changeConfig,[]);
        // }