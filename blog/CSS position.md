#### 1，static(默认)

当你没有为一个元素(例如div)指定定位方式时，默认为static，也就是按照文档的流式(flow)定位，将元素放到一个合适的地方。所以在不同的分辨率下，采用流式定位能很好的自适合，取得相对较好的布局效果。

一般来说，我们不需要指明当前元素的定位方式是static——因为这是默认的定位方式。除非你想覆盖从父元素继承来的定位系统。

left,top属性对static没有效果，static是靠margin这些定位的。

#### 2，relative(相对定位)

在static的基础上，如果我想让一个元素在他本来的位置做一些调整(位移)，我们可以将该元素定位设置为relative，同时指定相对位移(利用top,bottom,left,right)。

有一点需要注意的是，相对定位的元素仍然在文档流中，仍然占据着他本来占据的位置空间——虽然他现在已经不在本来的位置了。

 

#### 3，absolute(绝对定位)

如果你想在一个文档(Document)中将一个元素放至指定位置，你可以使用absolute来定位，将该元素的position设置为absolute，同时使用top,bottom,left,right来定位。

如果没有父元素，位置是相对于body来进行的。

绝对定位会使元素从文档流中被删除，结果就是该元素原本占据的空间被其它元素所填充。

 

#### 4，mix relative and absolute(混合相对定位和绝对定位)

如果对一个父元素设置relative，而对它的一个子元素设置absolute，如：

[?](http://www.cnblogs.com/Jerry-Chou/archive/2011/11/02/2233094.html#)

| 1234 | `<``div` `id``=``"parent"` `style``=``"position:relative"``>``  ``<``div` `id``=``"child"` `style``=``"position:absolute"``>``  ``</``div``>``</``div``>` |
| ---- | ------------------------------------------------------------ |
|      |                                                              |



则子元素的绝对定位的参照物为父元素。

 

利用混合定位，我们可以用类似下面的css来实现两列(Two Column)定位

[?](http://www.cnblogs.com/Jerry-Chou/archive/2011/11/02/2233094.html#)

| 123456789101112131415 | `#div-parent {`` ``position``:``relative``;``}``#div-child-``right` `{`` ``position``:``absolute``;`` ``top``:``0``;`` ``right``:``0``;`` ``width``:``200px``;``}``#div-child-``left` `{`` ``position``:``absolute``;`` ``top``:``0``;`` ``left``:``0``;`` ``width``:``200px``;``}` |
| --------------------- | ------------------------------------------------------------ |
|                       |                                                              |



 

#### 5, fixed(固定定位)

我们知道absolute定位的参照物是“上一个定位过的父元素(static不算)”，那么如果我想让一个元素定位的参照物总是整个文档(viewport)，怎么办呢？

答案是使用fixed定位，fixed定位的参照物总是当前的文档。利用fixed定位，我们很容易让一个div定位在浏览器文档的左上，右上等方位。比如你想添加一个信息提示的div，并将该div固定在右上方，你可以使用以下css

[?](http://www.cnblogs.com/Jerry-Chou/archive/2011/11/02/2233094.html#)

| 1    | `.element {` `position``:``fixed``;` `top``:``2%``;` `right``:``2%``;}` |
| ---- | ------------------------------------------------------------ |
|      |                                                              |



 

#### 6,float(浮动)

对于浮动，需要了解的是：

*浮动会将元素从文档流中删除，他的空间会被其它元素补上。

*浮动的参数物是父元素，是在父元素这个容器中飘。

*为了清除浮动造成的对浮动元素之后元素的影响，我们在浮动元素之后加一个div，并将这个div的clear设置为both。

*如果两个元素都设置了浮动，则两个元素并不会重叠，第一个元素占据一定空间，第二个元素紧跟其后。如果不想让第二个元素紧跟其后，可以对第二个浮动的元素使用clear。

 

#### 7，reference

 



| Value    | Description                                                  |
| :------- | :----------------------------------------------------------- |
| static   | Elements renders in order, as they appear in the document flow. This is default. |
| absolute | The element is positioned relative to its first positioned (not static) ancestor element |
| fixed    | The element is positioned relative to the browser window     |
| relative | The element is positioned relative to its normal position, so "left:20" adds 20 pixels to the element's LEFT position |
| inherit  | The value of the position property is inherited from the parent element |





在CSS中，Position 属性经常会用到，主要是绝对定位和相对定位，简单的使用都没有问题，尤其嵌套起来，就会有些混乱，今记录总结一下，防止久而忘之。

### CSS position 属性值：

- absolute：生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
- relative：生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
- fixed：生成绝对定位的元素，相对于浏览器窗口进行定位。
- static：默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
- inherit：规定应该从父元素继承 position 属性的值。

我们最常用的的就是 absolute 和 relative 两种方式，所以主要讨论着两者的区别。

### relative 相对定位

相对定位我们主要是要知道相对于谁来进行偏移的？其实相对定位是相对于元素自己的本身的位置，我们来看一下例子： 

![复制代码](http://common.cnblogs.com/images/copycode.gif)

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <style type="text/css">
        html body
        {
            margin: 0px;
            padding: 0px;
        }
        #parent
        {
            width: 200px;
            height: 200px;
            border: solid 5px black;
            padding: 0px;
            position: relative;
            background-color: green;
            top: 15px;
            left: 15px;
        }
        #sub1
        {
            width: 100px;
            height: 100px;
            background-color: blue;
        }
        #sub2
        {
            width: 100px;
            height: 100px;
            background-color: red;
        }
    </style>
</head>
<body>
    <div id="parent">
        <div id="sub1">
        </div>
        <div id="sub2">
        </div>
    </div>
</body>
</html>
```

![复制代码](http://common.cnblogs.com/images/copycode.gif)

这是一个嵌套的DIV，一个父Div Parent， 包含两个子DIV Sub1 和 Sub2，由于两个子DIV没有设置任何Position属性，它们处于它们应当的位置。默认位置如下图：

![img](http://images.cnitblog.com/blog/403904/201306/24172009-ec64c8d2db9b4fdd96d8fececf25b2f0.x-png)

当我们修改一下Div Sub1 的样式： 

![复制代码](http://common.cnblogs.com/images/copycode.gif)

```
#sub1
{
    width: 100px;
    height: 100px;
    background-color: blue;
    position: relative;
    top: 15px;
    left: 15px;
}
```

![复制代码](http://common.cnblogs.com/images/copycode.gif)

 结果如下图：我们会发现Sub1进行了偏移，并不影响Sub2的位置，同时遮盖住了Sub2，切记偏移并不是相对于 Div Parent的，而是相对于Sub1 原有的位置。

![img](http://images.cnitblog.com/blog/403904/201306/24182029-0b5180cbbd0e4b8c90af7532a36dee1f.x-png)

如果我们把Sub1 的同级Div Sub2 也设置一个相对位置，会产生什么结果？我们来看一下。

![复制代码](http://common.cnblogs.com/images/copycode.gif)

```
#sub2
{
   width: 100px;
   height: 100px;
   background-color: red; 
   position: relative;
   top: 10px;
   left: 10px;                  
}
```

![复制代码](http://common.cnblogs.com/images/copycode.gif)

结果如下图：

![img](http://images.cnitblog.com/blog/403904/201306/24182433-3ebcfa0aa18943dca75c4e970bfed0b6.x-png)

Sub2也根据原有位置进行了偏移，同时遮盖住了Sub1，也不会影响Sub1的位置。相对定位比较容易理解，我们再来看一下绝对定位Absolute。

### absolute 绝对定位

绝对定位在使用当中比较容易出错的，有几个需要注意的地方，将上面的代码还原，我们为Sub1 增加一个绝对定位。

![复制代码](http://common.cnblogs.com/images/copycode.gif)

```
#sub1
{
    width: 100px;
    height: 100px;
    background-color: blue;
    position: absolute;
    top: 15px;
    left: 15px;
}
```

![复制代码](http://common.cnblogs.com/images/copycode.gif)

结果如下：

![img](http://images.cnitblog.com/blog/403904/201306/24190743-dffe8178dd484873992cef4603b6be6c.x-png)

我们发现，由于我们对Sub1进行了绝对定位，Sub1的位置发生了偏移，而同级Div Sub2，则占据了Sub1的位置，并且Sub1遮挡了Sub2.

下面，把Sub2 也增加绝对定位：

![复制代码](http://common.cnblogs.com/images/copycode.gif)

```
#sub2
{
     width: 100px;
     height: 100px;
     background-color: red;    
     position: absolute;
     top: 10px;
     left: 10px;              
}
```

![复制代码](http://common.cnblogs.com/images/copycode.gif)

结果如下：

![img](http://images.cnitblog.com/blog/403904/201306/24191227-7af8feb9527e4b20854340c8411ffcfa.x-png)

我们会发现，Sub2 也进行了偏移，并且遮盖住了Sub1。

这时候，我们会发现问题，两个子Div 都设置了 绝对定位，他们是相对于哪个元素发生了偏移呢？

这分两种情况：

 1、如果Sub1 的父元素或者祖父元素，设置了Position属性，并且属性值为 absolute 或 relative的时候，那么子元素相对于父元素来进行定位。比如我们例子中最外层Div Parent设置了相对定位属性，因此Sub1 和 Sub2 两个Div 就根据 Div Parent 来进行定位。但是根据Parent那个定位点进行定位呢？答案是：如果parent设定了margin，border，padding等属性，那么这个定位点将忽略padding，将会从padding开始的地方(即只从padding的左上角开始)进行定位。

2、如果sub1不存在一个有着position属性的父对象，那么那就会以body为定位对象，按照浏览器的窗口进行定位。

我们将例子中的Parent 的Position 属性删除，再来看一下结果：

![img](http://images.cnitblog.com/blog/403904/201306/24192557-6663d6399fe7429b9d33eca8e3f66342.x-png)

由于两个子div没有找到有Position属性的父元素，则以Body进行定位，由于图片原因，请不要误以为是相对于Parent的。

###  fixed 定位方式

 fixed是一种特殊的absolute，fixed总是以body为定位对象的，按照浏览器的窗口进行定位。我们将代码还原到最初状态，Sub1 增加absolute定位方式，而Sub2 增加fixed定位方式：

![复制代码](http://common.cnblogs.com/images/copycode.gif)

```
#sub1
{
   width: 100px;
   height: 100px;
   background-color: blue;
   position: absolute;
   top: 15px;
   left: 15px;
}
#sub2
{
   width: 100px;
   height: 100px;
   background-color: red;    
   position: fixed;
   top: 5px;
   left: 5px;              
}
```

![复制代码](http://common.cnblogs.com/images/copycode.gif)

结果如下：

![img](http://images.cnitblog.com/blog/403904/201306/24193522-9964ad5e55244d33b33e8df0b39d1606.x-png)

会发现Sub2 始终以body 进行定位，而Sub1由于发现Parent 有position属性relative，则根据父元素进行定位偏移。

注意fixed 在IE 低版本中式不支持的，包括IE6

至于 static 和 inherit 两种定位，项目中很少用到，static 就是Position属性的默认值，一般不设置position属性时，会按照正常的文档流进行排列。这里就不在赘述。