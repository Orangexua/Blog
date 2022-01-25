# [CSS之浮动布局](https://www.cnblogs.com/psxiao/p/11573156.html)

### css之浮动布局(float,浮动原理,清除/闭合浮动方法)

1.什么是浮动：

   在我们布局的时候用到的一种技术，能够方便我们进行布局，通过让元素浮动，我们可以使元素在水平上左右移动，再通过margin属性调整位置。

2.浮动的原理;

   使当前元素脱离普通流，相当于浮动起来一样，浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动的边缘

3、浮动的生成：

   使用css属性 float：left/right/none左浮动/右浮动/不浮动（默认）

4、浮动的影响：

-  不会影响未浮动的块级元素布局，但会影响内联元素的布局
- 浮动后的元素可以设置宽度和高度，也就是说内联元素浮动后会变成块级元素，但我更倾向内联元素与变成inline-block元素，即同时拥有块级与行内元素的特征
- 因为浮动元素脱离了普通流，会出现一种高度坍塌的现象：原来的父容器高度是当前元素A撑开的，但是当A元素浮动后，脱离普通流浮动起来，那父容器的高度就坍塌（前提是父容器高度小于A元素高度），下面用图来说明一下：

 

![img](https://img2018.cnblogs.com/blog/1670358/201909/1670358-20190923161653372-771862629.png)

 

 ![img](https://img2018.cnblogs.com/blog/1670358/201909/1670358-20190923161738380-2129357367.png)

 

#### 5.清除浮动与闭合浮动:

先说说我个人的理解：我将解释一下我理解的闭合浮动与清除浮动

清除浮动：使用clear元素清除外面浮动，解决外面浮动对自己的影响

闭合浮动：当前块级中，其子元素使用了浮动，会给当前块内部和块外部的布局带来影响，所以当前块中的浮动闭合，能将影响最大化清除。举例子：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<style type="text/css">
.box1{
        width: 200px;
        border: 2px solid #0f0;
        /*overflow: hidden;*/
    }
    .box1 .child-1{
        float: left;
        height: 100px;
        width: 100px;
        background: #fd0;
    }
    .box1 .child-2{
        float: left;
        height: 100px;
        width: 100px;
        background: #fba;
    }
    .box2{
        width: 200px;
        height: 150px;
        border: 2px solid #00f;
        /* clear: both; */
    }
</style>
<body>
    <div class="box1">
        <div class="child-1">child-1</div>
        <div class="child-2">child-2</div>
    </div>
    <div class="box2"></div>
</body>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

图一：

![img](https://img2018.cnblogs.com/blog/1670358/201909/1670358-20190923163449155-928133596.png)

 

 

 图二：

![img](https://img2018.cnblogs.com/blog/1670358/201909/1670358-20190923163519271-957951933.png)

 

 图三：区分清除浮动与闭合浮动（个人理解：在外面解决问题，内部问题未解决） 清除浮动：对box2使用：clear：both

![img](https://img2018.cnblogs.com/blog/1670358/201909/1670358-20190923163700827-782856174.png)

 

 

图四：闭合浮动（在内部解决问题:同时解决外部问题）闭合浮动：对box1使用overflow：hidden（其中一种方式，后面还有更好的方式）

![img](https://img2018.cnblogs.com/blog/1670358/201909/1670358-20190923163847756-1765833113.png)

 

 

6.闭合浮动方法（常见的几个）：

##### 1.通过在浮动元素的末尾添加一个空元素，设置 clear：both属性；

缺点：成本太高，额外添加了一个元素，维护困难

```
<div class="box1">
    <div class="child-1">child-1</div>
    <div class="child-2">child-2</div>
    <div style="clear: both;"></div>
</div>
<div class="box2"></div>
```

##### 2.通过设置父元素overflow或者display：table属性来闭合浮动，给box1添加overflow：hidden

##### 3.使用伪元素：after,下面是代码，给box1添加上clearfloat这class即可

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
/*适配ie6*/
.clearfloat{
zoom:1;
}
.clearfloat:after{
display:block;
height:0;
content:"";
clear:both;
visibility:hidden;
}
```