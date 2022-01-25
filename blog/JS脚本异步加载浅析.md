# JS脚本异步加载浅析

#### 前言：

在梳理知识点的时候，发现作为浏览器渲染中的机制之一——异步加载机制，当用户访问站点，需要下载各种资源，例如JS脚本，CSS，图片，iframe等，它是实现现代网站进行加载页面时一种必不可少的手段。查资料加上老师拓展课程均对于异步加载机制还有很多方法可以说，故抽出来单独进行一个知识点的梳理。

------

> 了解js脚本异步加载前，我们有必要先了解一下浏览器在页面样式和js的作用下出现的两种页面常见场景：白屏和fouc（无样式内容闪烁）。

# 一、白屏和FOUC

### 1、即指影响浏览器页面加载顺序的两种场景

-白屏：特指一种场景，打开页面是一片白色，突然页面出现，样式正确。那么一片白色的时间，则称之为白屏。 -FOUC (Flash of UnstyledContent)：无样式内容闪烁，网速情况差，打开页面时仍有样式，之后样式时有时无，甚至一开始并无出现样式，突然样式恢复。（常出现在firefox浏览器）

此类现象，在不同浏览器进行的资源加载和页面渲染时，所采用的不同的处理方式，并不是bug。

### 2、写一个server，验证白屏和fouc效果

在样式文件index.html中

```
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>fouc & 白屏</title>

 <!--在下面模拟一个延时装置-->  
     <link rel="stylesheet" href="b.css?t=10"> //设置这个工具，当请求该文件时，服务器会延迟请求10s再去加载这个资源，以此可以模拟一个网速特别慢的情况
     <link rel="stylesheet" href="a.css?t=3"> 
  
</head>
<body>

  <p>hello</p>
  
  <p>饥人谷</p>
<!--   <script src="A.js?t=5"></script> 
  -->
  <img src="https://user-gold-cdn.xitu.io/2018/8/15/1653c442f35af77c?w=211&h=200&f=png&s=8004" alt="">

<!--   <link rel="stylesheet" href="c.css?t=6">  -->
 
<!--   <script src="http://a.jrg.com:8080/B.js?t=4" ></script>  
  <script src="http://b.jrg.com:8080/A.js?t=8" ></script>   -->
  
</body>
</html>
复制代码
```

（1）关于白屏，需要注意的是，浏览器对于样式和js的处理，即CSS 和 JS 放置顺序。推荐：将样式放在`<head>`里面,将JS放在`<body>`内部下方。

如上面代码所示，html页面里引入了两个css：`a.css`和`b.css`。`b.css`引用了`c.ss`（`@import"./c.css?t=5";`）`b.css`中加入了一个10s的延时文件（`<link rel="stylesheet"href="b.css?t=10">`），加载这个10s的css样式文件，浏览器是如何完成加载工作，有两种方式：

**第1种：** html解析完成，此时10s延时的css文件先不管，先展示`<body>`里所展示的内容，等css文件全加载后再去计算样式，再去重新渲染一次

**第2种：** 即使html的dom树已经解析、渲染都完成，对未加载完成的样式都必须等待，即css样式要全部加载、获取，img资源加载完成，此时底部JS立刻执行，才一次性展示出页面。例子中展示这种方法，即为白屏很久的原因。

（2）不同浏览器的不同处理机制所出现的场景不同

A、**白屏场景（常出现在chrome）：** 打开一个国外网站，使用国外服务器，嵌在css的字体使用的是谷歌字体，运行特别慢，等了好久突然出现页面样式效果。这是因为页面需要等待css样式加载所有完成，甚至出现404加载失败，最后才展示出页面。那么那段加载时间，等待了几秒左右的白色一片的页面，就是白屏

B、**Fouc场景（常出现在Firefox）：** 一开始的时候，先让你看见样式，如字的小号样式，样式加载完后看到所规定字号的大字。对用户来说，同样的样式，突然从小变大，则这个场景就是Fouc（无样式内容闪烁）。

**总结：** 不管是css样式，还是js文件，只要加长延时，都会造成白屏

（3）CSS 和 JS 最佳放置顺序

- 使用 link 标签将样式表放在顶部
- 将JS放在底部

（3.1）场景：假设JS文件页面顶部：

- JS脚本会阻塞后面内容的呈现
- JS脚本会阻塞其后组件（如图片）的下载
- JS加载时间过长，css需等待，则会出现一段时间白屏

**场景说明：** 引入一个JS文件在顶部，设置一个延时时间。

**加载顺序：** css—js—img—全部获取到展现页面效果

此时，img和css加载时会并发加载，即如一个域名下同时加载两个文件（并发是有限度的），加载在顶部的js时，会禁用并发img和css，并阻止其他内容下载和渲染。

js并不影响css加载，但是会影响css样式的一个计算。当js加载时，css已经获取到（不过此时页面还是一片空白），直到js获取立即执行后，图片立刻出现，页面才展示效果。所以js文件放入页面顶部`<head>`里，也会导致白屏现象出现

（3.2）JS加载特点总结

A、优先加载js文件，加载后js立刻去执行，展示页面（CSS样式则是全部加载完，然后一次性展示出页面）

**注：** css放前面，优先加载；若放后面，其他资源则会阻碍css加载，那么时机就太晚。

B、由于渲染线程和js脚本线程是互斥的，白屏是渲染进程被阻塞的原因，当碰到script标签的时候，会先执行js脚本，然后再渲染。

- （放顶部时）JS加载时机过晚导致一系列问题，脚本会阻塞后面内容的呈现、脚本会阻塞其后组件的下载（主要指img资源下载）、白屏等。
- （放底部）则可以先让其他先加载完成，JS立刻执行的特点可以“扫尾”最后的页面效果

C、JS脚本操作页面上的html+css元素，（放顶部时）JS先执行，元素都未加载到（即不存在），未出现在文档流中【加载，这里指资源加载和资源是否出现在文档流中】，所以也不能操作相应JS功能，此时后台将会报错。

D、（放顶部时）其他JS若作为一种框架语言，则能提前形成一个初步的框架有效构成页面结构。

# 二、JS脚本的异步加载

### 1、一个问题？

即一个放在的js文件，如下： `<script src="script.js"></script>`

原本放在顶部的这个js文件，会提前加载，如何使它在顶部仍然稍后加载呢？

### 2、解决方法： `async`和`defer`

（1）作用： 没有 `defer` 或`async`，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该`<script>`标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。也就是说，使用`defer`或`async`后能够改变这种加载、执行的时机。

常应用在引用了广告和统计的页面中，不会影响、堵塞，更不会影响到到页面其他元素

（2）`async` HTML5里为`script`标签里新增了async属性，用于异步加载脚本： 不保证顺序（独立的个体）

```
<script async src="script.js"></script>
/*或*/
<script type="text/javascript" src="alert.js" async="async"></script>
复制代码
```

浏览器解析到HTML里的该行script标签，发现指定为`async`，会异步下载解析执行脚本（即加载后续文档元素的过程将和script.js的加载并行进行）。

页面的DOM结构里假设`<script>`在img之前，如果你的浏览器支持`async`的话，就会异步加载脚本。此时DOM里已经有img了，所以脚本里能顺利取到img的src并弹框。

（3）`defer` `<script>`标签里可以设置`defer`，表示延迟加载脚本：脚本先不执行，延迟到文档解析和显示后执行，有顺序

```
<script defer src="script.js"></script>
/*或*/
<script type="text/javascript" src="alert.js" defer="defer"></script>
复制代码
```

浏览器解析到HTML里该`行<script>`标签，发现指定为`defer`，会暂缓下载解析执行脚本，等到页面文档解析并加载执行完毕后，才会加载该脚本（更精确地说，是在DOM树构建完成后，在`DOMContentLoaded`事件触发前，加载`defer`的脚本）。

页面的DOM结构里假设script在img图片之前，如果你的浏览器支持defer的话，就会延迟到页面加载完后才下载脚本。此时DOM里已经有img元素了，所以脚本里能顺利取到img的src并弹框。

**总结：** JS实质采用一种可以更自由地选择加载时机和任何位置，让处于顶部的js文件能够像在底部时，在页面必要元素加载完成时进行“异步”加载。

# 三、同步与异步

- 同步：等待结果
- 异步：不等待结果

注意，异步常常伴随回调一起出现，但是异步不是回调，回调也不一定是异步。

```
// 同步的 sleep
function sleep(seconds){
    var start = new Date()
    while(new Date() - start < seconds * 1000){
    }
    return
}
console.log(1)   
sleep(3)        //3秒内要不断重复做一些无意义的工作才能保证js运行按顺序
console.log('wake up')
console.log(2)

//执行结果的顺序是：打印1——停3s——醒来——打印2，但事实上js环境内，停3s不可能不做事情
复制代码
```



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="600" height="176"></svg>)



```
同步的 sleep
//异步的 sleep
function sleep(seconds, fn){
    setTimeout(fn, seconds * 1000)
}
console.log(1)
sleep(3, ()=> console.log('wake up'))
console.log(2)
复制代码
```



![异步的 sleep](https://user-gold-cdn.xitu.io/2018/8/17/16546e686286647e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



**画一张同步&异步工作的示意图：**

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546e7766d3fdcd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以看出，用了异步之后，JS 的空闲时间多了许多。



但是注意，在 JS 空闲的这段时间，实际上是浏览器中的计时器在工作（很有可能是每过一段时间检查是否时间到了，具体要看 Chrome 代码）

# 四、遇到异步实例

### 1、前端经常遇到的异步：图片加载是需要时间的

```
document.getElementsByTagNames('img')[0].width // 宽度为 0
console.log('done')
复制代码
```

刚开始是直接获取宽度

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
    <img src="https://user-gold-cdn.xitu.io/2018/8/17/16546d713fd568f0?w=1200&h=799&f=jpeg&s=121670" alt="">
</body>
</html>

var w = document.getElementsByTagNames('img')[0].width
console.log(w)
复制代码
```

先画一个示意图：

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546e840725a8e9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

由此可知，js在img网络请求还没执行完的时候紧随执行，可知为异步



```
//先获取网络请求前img信息，为空对象
var img = document.getElementsByTagName('img')[0]
复制代码
```

img等待网络请求完成后，获取完整图片信息后，便会触发一个onload事件：

```
//等待完成之后执行的内容：img如果加载成功，就会触发一个onload的事件，获取它的宽度并打印出宽度
img.onload = function(){
     var w =img.width
     console.log(w)
}
复制代码
```

✨完整代码：

```
var img = document.getElementsByTagName('img')[0]

//异步不等继续执行，异步回调函数：等待到网络请求完成后触发onload事件
img.onload = function(){
      var w =img.width
      console.log(w)
}
console.log(img.width)
/*或*/
document.getElementsByTagNames('img')[0].onload = function(){
    console.log(this.width) // 宽度不为 0
    console.log('real done')
}
console.log('done')
复制代码
```

**总结：** 异步想拿到一个结果，常采用监听一个事件，然后告知（这个事件的完成时间不确定，不可预测），那就可以挂一个函数在onload上，等你请求完成，调用一下onload事件，此为回调函数。

### 2、面试题中的异步

```
let liList = document.querySelectorAll('li')
for(var i=0; i<liList.length; i++){
    liList[i].onclick = function(){
        console.log(i)
    }
}
//获取dom结构的所有li元素，获取li的长度去遍历，每一个点击后都能打印出东西
复制代码
```

把 var i 改成 let 就可以破解：[zhuanlan.zhihu.com/p/28140450](https://zhuanlan.zhihu.com/p/28140450)

先让我运行上面的js代码：

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546e981be1c89a?imageslim)

这里，js代码运行，还要注意一个技巧：变量提升，即



```
var i = 0
```

【关键点】变量提升为：

```
var i
i =0
复制代码
```

那么，代码如下：

```
let liList = document.querySelectorAll('li')
var i   //i是贯穿6次循环的一个变量（没有多个）
for(i=0; i<liList.length; i++){
    liList[i].onclick = function(){
        console.log(i)
    }
}
复制代码
```

画一个时序图：

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546f0573aaf21f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



可以看出，js执行代码时，当i=5，`i++`结果为6的时候，并不小于`liList.length`，那么就跳出该循环，最后输出结果：i=6。js代码执行完，用户开始操作他的鼠标，假设等待3ms后，执行`click li`，当你最先click的时候（i=0，`liList[0]`，此时js已经执行完代码，输出i = 6 ），而不是在绑定事件的时候打印出几，就是几。

在这里，我们有必要知道，异步函数以下绑定事件为：

```
XXXX.onclick function(){
        console.log(i)
    }
复制代码
```

浏览器并未等该异步执行，直接进入for循环，直接将i=6输出，然后第一个`click`才出现，浏览器不会等click出现才去打印`i` 值 如何解决？——使用let

**假设你已经知道let（不懂看这篇文章）：** [方应杭：我用了两个月的时间才理解let](https://zhuanlan.zhihu.com/p/28140450)

将代码var i改为let：

```
let liList = document.querySelectorAll('li')
for(let i=0; i<liList.length; i++){
    liList[i].onclick = function(){
        console.log(i)
    }
}
复制代码
```

运行如下：

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546f289493be04?imageslim)

为何let能一一打印出结果呢？即let不会被提升到外面，let作用域即处于for循环函数里，即每一次循环，liList[i]都有一个新的 i 值。let会在每一次进入循环时，产生一个分身i1-i6.



画一个运行图：【缺】

### 3、AJAX 中的异步（必须）

```
//同步的Ajax
let request = $.ajax({
  url: '.',   //1、获取当前 url
  async: false
})//2、此时，该函数会等待请求完成才执行下一步
console.log(request.responseText)//打印出这个请求的响应文本，即当前html页面

//responseText:响应文本
复制代码
```

相当于同步，js在该函数中什么都没做，但就是停了几十ms，如同一个呆滞的人白白浪费了一段空闲时间。

而Ajax的异步如何做？——`async:true`

```
$.ajax({
    url: '.',
    async: true,
    success: function(responseText){
        console.log(responseText)
    }//表示：如果请求返回回来，麻烦调用以下success这个函数，然后把得出的结果打印出来
})
console.log('请求发送完毕')
复制代码
```

在控制台上，模拟一个网速很慢的操作：Network——slow 3G，如图：

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546f4b926589c4?imageslim)

首先ajax函数会发一个请求，继续执行第二句console.log，这就是ajax中的异步。在这里，先不管ajax里的请求成功或失败，直接执行第二句代码。不等，即为异步；而等则是一定要拿到结果才进行下一步。时间不到，异步绝对拿不到结果。



画一下图：

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546f4e64453513?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果我们把它改为同步：`async:false`，并模拟一个很慢的网速：Network——add，参数设置如下：

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546f555087e792?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

同步之后，代码运行演示如下：

![img](https://user-gold-cdn.xitu.io/2018/8/17/16546f581579b9a4?imageslim)



# 五、异步的形式

从上面的例子中：可以通过绑定onload事件获取宽度大小，或者ajax中的success函数。一般，有两种方式拿到异步结果

### 1、傻逼方法：轮询

### 2、正规方法：回调

回调的形式

- Node.js 的 error-first 形式

```
fs.readFile('./1.txt', (error, content)=>{
    if(error){
         // 失败
     }else{
         // 成功
     }
 })
复制代码
```

-jQuery 的 success / error 形式

```
$.ajax({
     url:'/xxx',
     success:()=>{},
     error: ()=>{}
 })
复制代码
```

-jQuery 的 done / fail / always 形式

```
$.ajax({
     url:'/xxx',
 }).done( ()=>{} ).fail( ()=>{} ).always( ()=> {})
复制代码
```

- Prosmise 的 then 形式

```
$.ajax({
     url:'/xxx',
 }).then( ()=>{}, ()=>{} ).then( ()=>{})
复制代码
```

# 六、如何处理异常？

- 如何使用多个 success 函数？
- 在有多个成功回调的情况下，如何处理异常？

**自己返回 Promise**

```
function ajax(){
    return new Promise((resolve, reject)=>{
        做事
        如果成功就调用 resolve
        如果失败就调用 reject
    })
}

var promise = ajax()
promise.then(successFn, errorFn)
复制代码
```

- Promise 深入阅读：
- Promise/A+ 规范：

**async / await**

```
function buyFruit(){
    return new Promise((resolve, reject)=>{
        做事
        如果成功就调用 resolve
        如果失败就调用 reject
    })
}
var promise = await ajax()
复制代码
async functon fn(){
    var result = await buyFruit()
    return result
}
var r = await fn()
console.log(r)
```