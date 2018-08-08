// 引入所需插件
var express = require('express');
var request = require('request');
var app = express();

// 处理跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

// 目标地址
let proxyUrl = 'https://h5.ele.me'

// 处理所有请求
app.use('/', (req, res) => {
    // 拼接接口
    let url = proxyUrl + req.url;
    // 配置信息
    let obj = {
        url: url,
        headers: {
            // Referer: 'https://m.douban.com/'
        }
    }
    // 用request 模块发送请求
    request(obj, (err, response, body) => {
        // 将获取的数据返回
        res.send(body)
    })
})

app.listen(3000, () => {
    console.log('3000 running ... ')
});