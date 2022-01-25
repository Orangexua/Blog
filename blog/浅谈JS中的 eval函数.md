# 浅谈JS中的 eval函数



\#**1.定义**
eval()是一个函数，有且只有一个参数string，为字符串类型

```
eval(string)
1
```

特点：若string为js代码时，会直接解析执行，若是普通字符串，则返回原字符串。

\#**2.实例**

**2.1参数string为js代码：**

```
eval("var  a =1;var b=4; alert(a+b)");

执行结果是：alert出一个5 
123
```

![这里写图片描述](https://img-blog.csdn.net/20170613112810478?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYmFpZHVfMzcxMDcwMjI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

**执行过程** ：eval将字符作为js进行解析，先进行运算，再alert

```
eval("alert('hello')");

执行结果：alert出hello
123
```

**2.2参数string为普通字符串：**

```
eval("hello");

执行后的结果是：返回字符串hello
123
```

\#**3.有关eval解析json数据**

**错误实例：**

```
var jsonstr = "{name:'test',age:18}";

var jsonobj = eval(jsonstr);//拼接过程
123
```

**错误提示:**

```
SyntaxError: invalid label
1
```

------

**为什么会这样？**

原因在于：eval本身的问题。 由于json是以”{}”的方式来开始以及结束的，在JS中，它会被当成一个语句块来处理，所以必须强制性的将它转换成一种表达式。

加上圆括号的目的是迫使eval函数在处理JavaScript代码的时候强制将括号内的表达式（expression）转化为对象，而不是作为语句 （statement）来执行。举一个例子，例如对象字面量{}，如若不加外层的括号，那么eval会将大括号识别为JavaScript代码块的开始和 结束标记，那么{}将会被认为是执行了一句空语句。所以下面两个执行结果是不同的：

```
alert(eval("{}"); // return undefined
alert(eval("({})");// return object[Object]
12
```

------

**如何解决?**

```
var josnobj = eval("("+jsonstr+")");
1
```

或者这样

```
 eval("var jsonobj = " + jsonstr);
```