/* global $ */

/* eslint no-console: 0 */

/* eslint-disable */  // 片段、文件

alert('foo');

/* eslint-enable */

/* eslint-disable */  // 所有规则规则
/* eslint-disable no-alert */  // 指定规则


// eslint-disable-line 该行禁止所有规则
// eslint-disable-line no-alert, quotes, semi 该行禁止特定规程

// "off" 或 0 - 关闭规则
// "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
// "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

const OPEN_ALL = 1000;
module.exports = {
    getExpData: function (data) {
        return $.ajax({
            type: 'POST',
            url: '/g/growth/expedit.node?actype=get',
            data: data,
            dataFilter: function (result) {
                result = JSON.parse(result);
                if (result.code == 0) {
                    var expVo = result.data;
                    expVo.experimentFunnels = expVo.experimentFunnels || [];
                    expVo.groups = expVo.groups || [];
                    // 判断步骤
                    if (!expVo.id) {
                        expVo.step = 1;
                    } else if (!expVo.experimentFunnels || !expVo.experimentFunnels.length) {
                        expVo.step = 2;
                    } else if (!expVo.groups || !expVo.groups.length) {
                        expVo.step = 3;
                    } else if (!expVo.beginTime) {
                        expVo.step = 4;
                    } else {
                        expVo.step = OPEN_ALL;
                    }
                }
                return JSON.stringify(result);
            }
        });
    },
    saveExpData: function (data) {
        console.log('实验数据');

        console.log(data);
        return $.ajax({
            type: 'POST',
            url: '/g/growth/expedit.node?actype=edit',
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8'
        });
    },
    publishExp: function (data) {
        console.log('发布实验');
        console.log(data);
        return $.ajax({
            type: 'POST',
            url: '/g/growth/expedit.node?actype=publish',
            data: data
        });
    },
    deleteExp: function (data) {
        console.log('删除实验');
        console.log(data);
        return $.ajax({
            type: 'POST',
            url: '/g/growth/expedit.node?actype=delete',
            data: data
        });
    }
};