## 先来看看常见的定位方式

定位方案是控制元素的布局，常见的有三种：

- 普通流（normal flow）
  其实就是元素按照再HTML中的先后位置之上而下布局，在这个过程中，行内元素水平排列，直到当行被沾满然后换行，块级元素则会被渲染为完整的一个新行，除非另外制定，否则所有元素默认都是普通流定位，也可以说，普通六种元素的位置由该元素再HTML文档中的位置决定。
- 浮动（float）
  在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能地向左边或右边偏移，其效果与印刷排版中的文本环绕相似。
- 绝对定位（absolute positioning）
  在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

## BFC概念

在解释 BFC 是什么之前，需要先介绍 Box、Formatting Context的概念。

###### Box: CSS布局的基本单位

Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：

- block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；
- inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；
- run-in box: css3的新属性。https://codepen.io/wenjul/pen/OXReza

###### Formatting context

Formatting context （格式化上下文） 是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

###### BFC 定义

BFC，即Block Formatting Contexts（块级格式化上下文），它属于上述定位方案的普通流。
具有BFC特性的元素可以看做是隔离了的独立容器，容器里面的元素不会再布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。
通俗一点来讲，可以把BFC，理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

###### BFC 布局规则

- 内部的Box会在垂直方向，一个接一个地放置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算

## 触发BFC

只要元素满足下面任一条件即可触发BFC特性：

- body根元素
- 浮动元素：float除none以外的值
- 绝对定位元素：position（absolute、fixed）
- display为inline-block、table-cells、 flex  
- overflow除了visible以外的值（hidden、auto、scroll）

## BFC特性及应用

1. 同一个 BFC 下外边距会发生折叠

```
div{
    width: 100px;
    height: 100px;
    background: pink;
    margin: 100px;
}123456
 <div></div>
 <div></div>12
```

两个如上样式的div。效果如下：

![这里写图片描述](https://img-blog.csdn.net/20180319102034358?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L0FtYmVyV3U=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![这里写图片描述](https://img-blog.csdn.net/20180319102041202?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L0FtYmVyV3U=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

第一个div的下边距和第二个div的上边距发声了重叠，所以两个盒子之间距离只有100px，而不是200px。

这是一种**规范**，**如果想要避免，可以将其放在不同的BFC容器中**。

```
  <style>
        .container {
            overflow: hidden;
        }

        p {
            width: 100px;
            height: 100px;
            background: pink;
            margin: 100px;
        }
    </style>
</head>

<body>
    <div class="container">
        <p></p>
    </div>
    <div class="container">
        <p></p>
    </div>
</body>
1234567891011121314151617181920212223
```

1. BFC可以包含浮动的元素（清除浮动）
   浮动的元素会脱离普通文档流。

![这里写图片描述](https://img-blog.csdn.net/20180319103928513?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L0FtYmVyV3U=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果使触发容器的 BFC，那么容器将会包裹着浮动元素。

```
<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>123
```

![这里写图片描述](https://img-blog.csdn.net/20180319104117510?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L0FtYmVyV3U=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)