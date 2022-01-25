# JS查找字符串中出现次数最多的字符

 更新时间：2016年09月05日 09:12:54  作者：master  

本文给大家带来两种js中查找字符串中出现次数最多的字符，在这两种方法中小编推荐使用第二种，对js查找字符串出现次数的相关知识感兴趣的朋友一起看看吧

在一个字符串中，如 'zhaochucichuzuiduodezifu'，我们要找出出现最多的字符。本文章将详细说明方法思路。

先介绍两个string对象中的两个方法**：indexOf()和charAt()方法
**

indexOf()方法介绍　　返回某个指定的字符串值在字符串中首次出现的位置

![img](https://img.jbzj.com/file_images/article/201609/20169591835133.png?20168591851)

charAt()方法介绍　　返回某个指定位置的字符

![img](https://img.jbzj.com/file_images/article/201609/20169591913803.png?20168591924)

先做一个小测试，找到字符串'woainixiaoli'中的每一个'i'出现的位置。

```
<script>
var arr = 'woainixiaoli';
var index = -1; //定义变量index控制索引值
//当查找不到a，即indexOf()的值为-1时，结束循环
do {
index = arr.indexOf("i", index + 1); //使用第二个参数index+1，控制每一次查找都是从上一次查找到字符a的下一个索引位置开始
if (index != -1) { //可以找到字符i
console.log(index); //输出a的位置
}
} while (index != -1);
</script>
```

以上代码运行后再控制台输出的是

![img](https://img.jbzj.com/file_images/article/201609/201609050915511.png)

进入正题，求字符串'zhaochucichuzuiduodezifu'最多的字符

**方法一：用数组（存在缺点，当出现最多的字符不只一个时，只能找到一个）**

```
<script>
var str = "zhaochucichuzuiduodezifu";
var arr = [];//定义一个新数组
//循环遍历字符串
for (var i = 0, length = str.length; i < length; i++) {
    var index = -1;
    var j = 0;
    //找每一个字符
    do {
        index = str.indexOf(str[i], index + 1);
        if (index != -1) {
        	j++;
    	}
    }while (index != -1);
    arr[j] = str[i]; //把字符串str中的字符赋给数组arr索引为j的数据，当多次循环后，会出现重复赋值的现象，                     //后赋值的会把之前的赋值覆盖掉，但不影响我们找出字符出现最多的那个
}
console.log(arr);
console.log("最多的字符是" + arr[arr.length - 1]);
console.log("次数是" + (arr.length - 1));
</script>
```

以上代码运行后再控制台输出的结果如下图：

![img](https://img.jbzj.com/file_images/article/201609/201609050915512.png)

　　从输出的数组arr中也可以看出，此方法会把次数相同的字符覆盖，只能显示出一个。若有2个字符出现出现相同的最高次数，此方法只能得出一个。基于此，参照下一个用对象来解决的方法。

**方法二：用对象（推荐使用）**

```
<script>
var str = "zhaochucichuzuiduodezifu";
var o = {};
for (var i = 0, length = str.length; i < length; i++) {
    // var char = str[i];
    var char = str.charAt(i);
    if (o[char]) { //char就是对象o的一个属性，o[char]是属性值，o[char]控制出现的次数
        o[char]++; //次数加1
    } else {
        o[char] = 1; //若第一次出现，次数记为1
    }
}
console.log(o); //输出的是完整的对象，记录着每一个字符及其出现的次数
//遍历对象，找到出现次数最多的字符和次数
var max = 0;
var maxChar = null;
for (var key in o) {
    if (max < o[key]) {
        max = o[key]; //max始终储存次数最大的那个
        maxChar = key; //那么对应的字符就是当前的key
    }
}
console.log("最多的字符是" + maxChar);
console.log("出现的次数是" + max);
</script>
```

以上代码运行后再控制台输出的结果如下图：

![img](https://img.jbzj.com/file_images/article/201609/201609050915513.png)

　　此方法解决了方法一的问题，而且每一个字符我们都可以清楚的记录出现的次数，当有两个次数相同的字符时，可以在对象中清楚的看到。

　　不过还是存在不足，不能直接把次数最高的字符同时输出，这还需要加额外的判断条件。完美的代码如下哈O(∩_∩)O

```
<script>
var str = "nininihaoa";
var o = {};
for (var i = 0, length = str.length; i < length; i++) {
    var char = str.charAt(i);
    if (o[char]) {
        o[char]++; //次数加1
    } else {
        o[char] = 1; //若第一次出现，次数记为1
    }
}
console.log(o); //输出的是完整的对象，记录着每一个字符及其出现的次数
//遍历对象，找到出现次数最多的字符的次数
var max = 0;
for (var key in o) {
    if (max < o[key]) {
    	max = o[key]; //max始终储存次数最大的那个
    }
}
for (var key in o) {
    if (o[key] == max) {
        //console.log(key);
        console.log("最多的字符是" + key);
        console.log("出现的次数是" + max);
    }
} 
</script>
```

结果如下：

![img](https://img.jbzj.com/file_images/article/201609/201609050915514.png)