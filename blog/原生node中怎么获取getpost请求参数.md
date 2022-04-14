一、原生node中怎么获取get/post请求参数
处理get请求参数，使用node自带的核心模块----url模块

url.parse();方法将一个完整的URL地址，分为很多部分，常用的有：host、port、pathname、path、query。
第一个参数是地址，
第二个参数默认是false，设置为ture后，将字符串格式转换为对象格式。字符串（“a=1&b=2”）转换为了对象格式（{a: 1,b: 2}）。

var url = require("url");
//req.url='/users?a=1&b=2'
var urlObj = url.parse("/users?a=1&b=2" ,true);
console.log(urlObj );//{a:1,b:2}

处理post请求参数
要想获得post参数对象，需要用到第三方包querystring

req.body = querystring.parse(str); // querystring.parse是将字符串转成对象{a:1,b:2}

二、express框架中获取请求的参数方法
获取get请求的参数值（req.query）
由nodejs默认提供，无需载入中间件，
此方法多适用于GET请求，解析GET请求中的参数
包含在路由中每个查询字符串参数属性的对象，如果没有则为{}

//访问127.0.0.1/user?name=zd&age=18
console.log(req.query);//{name:zs,age:18}

获取url路径（req.params）

nodejs默认提供，无需载入其他中间件

req.params包含路由参数（在URL的路径部分），而req.query包含URL的查询参数（在URL的？后的参数）。

app.get("/user/:id", function (req, res) {
	//访问127.0.0.1/user/3
  console.log(req.params);//{id:3}
});

获取post请求的参数值(req.body)
req.body不是nodejs默认提供的，需要载入中间件body-parser中间件才可以使用req.body。
express已集成了body-parser，可以直接引入,如果没有请自行下载引入

demo：

const express = require("express");
const app = express();
//const crypto = require("crypto");//加解密
//const hash = crypto.createHash("md5");
const bodyParser = require("body-parser");//body参数解析

app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json
// app.use(bodyParser()); //此方法废弃，由上面两个替代

app.get("/", function (req, res) {
  console.log(req.query);
  res.send("helloworld");
});

app.get("/user/:id", function (req, res) {
  console.log(req.params);//{id:xx}
  res.send("helloworld");
});

app.post("/user", function (req, res) {
  console.log(req.body);
  // 处理逻辑。。。查询sql
  res.send({ name: "yang", age: 18 });
});

app.listen(80, function () {
  console.log("express is running");
});

一般情况下，以下几个重要的模块是需要与 express 框架一起安装的：

body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。

cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。

multer - node.js 中间件，用于处理 enctype=“multipart/form-data”（设置表单的MIME编码）的表单数据。
