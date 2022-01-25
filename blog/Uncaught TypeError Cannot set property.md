# Uncaught TypeError: Cannot set property 

这个问题不是CSS的问题，而是一个纯javascript的问题。

如果大家使用的是JQuery,有$这个符号，可以看看下面这些文字，如果没有，直接跳过即可。

这是看一个大佬的博客，学习到的，这里附上链接：
https://www.cnblogs.com/Renyi-Fan/p/9013126.html

> 在 prototype 和DWR 的JS 类库里也有这个符号，
> 在这两个类库里的这个符号是代表 document.getElementById()这个函数。
> 为了达到document.getElementById() 这个函数的效果，JQuery 也试用了 $() 这个符号。

也就是说：
**$("#myId")就是原生JS里面的document.getElementById(“myId”)**

类似这样子的改变，还有以下常见方式：

```
　   $("div p"); // (1)

     $("div.container"); // (2) 　　

     $("div #msg"); // (3) 　　

     $("table a",context); // (4)
1234567
```

- 第一行代码得到所有标签下的P元素。

- 第二行代码得到class 为container的元素。

- 第三行代码得到标签下面id为msg的元素。

- 第四行代码得到context为上下文的table里面所有的连接元素。

  *jquery就是通过这样的方式来找到Dom对象里面的元素。跟CSS的选择器相类似*

下来看看这个问题：

## Uncaught TypeError: Cannot set property ‘display’ of undefined

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190306115615572.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjYzNjU1Mg==,size_16,color_FFFFFF,t_70)
首先，css写得没错，问题出在Javascript当中的 getElementsByClassName(“xxx”)，

**这个方法得到的是一个由class="xxx"的所有元素组成的集合，而不是单个元素；**

集合是没有display属性的，集合中的元素才有display属性。当你试图做 集合.style.display的时候，自然会报错。

所以你这个问题的解决方案应该是：遍历集合中所有的元素，然后给每个元素都加上display="none"的属性。示例代码如下：

```
	        var divset=document.getElementsByClassName("el-upload-list");
        	for (var i = 0; i<divset.length;i++) {
        		   divset[i].style.display="block";
        		 };
1234
```

修改之后成功。

------

END

good lunck to you