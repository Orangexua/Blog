# JSON 和 XML区别

### 1.什么是JSON？

json: javascript Object Noation(javascript 对象表示法)

JSON 是存储和交换文本信息方法，类似于XML，但JSON 比XML更小，更快，更易解析。

### 2.什么是XML？

XML 指可扩展标记语言（e**X**tensible **M**arkup **L**anguage）。

XML 被设计用来传输和存储数据。

XML 很重要，也很容易学习。

JSON 和 XML 都用于接收 web 服务端的数据。

JSON 和 XML在写法上有所不同，如下所示：

## JSON 实例

{    "sites": [    { "name":"菜鸟教程" , "url":"www.runoob.com" },     { "name":"google" , "url":"www.google.com" },     { "name":"微博" , "url":"www.weibo.com" }    ] }

## XML 实例

<sites>   <site>     <name>菜鸟教程</name> <url>www.runoob.com</url>   </site>   <site>     <name>google</name> <url>www.google.com</url>   </site>   <site>     <name>微博</name> <url>www.weibo.com</url>   </site> </sites>

JSON 与 XML 的相同之处：

- JSON 和 XML 数据都是 "自我描述" ，都易于理解。
- JSON 和 XML 数据都是有层次的结构
- JSON 和 XML 数据可以被大多数编程语言使用
- 

JSON 与 XML 的不同之处：

- JSON 不需要结束标签
- JSON 更加简短
- JSON 读写速度更快
- JSON 可以使用数组

> **最大的不同是**：XML 需要使用 XML 解析器来解析，JSON 可以使用标准的 JavaScript 函数来解析。
>
> - [JSON.parse()](https://www.runoob.com/js/javascript-json-parse.html): 将一个 JSON 字符串转换为 JavaScript 对象。
> - [JSON.stringify()](https://www.runoob.com/js/javascript-json-stringify.html): 于将 JavaScript 值转换为 JSON 字符串。

------

## 为什么 JSON 比 XML 更好？

XML 比 JSON 更难解析。

JSON 可以直接使用现有的 JavaScript 对象解析。

针对 AJAX 应用，JSON 比 XML 数据加载更快，而且更简单：

使用 XML

- 获取 XML 文档
- 使用 XML DOM 迭代循环文档
- 接数据解析出来复制给变量

使用 JSON

- 获取 JSON 字符串
- JSON.Parse 解析 JSON 字符串

------

## 相关文章

- JavaScript JSON: https://www.runoob.com/js/js-json.html
- XML DOM 教程: https://www.runoob.com/dom/dom-tutorial.html