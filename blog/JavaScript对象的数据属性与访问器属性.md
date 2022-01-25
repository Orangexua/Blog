# JavaScript对象的数据属性与访问器属性

首先介绍了`JavaScript`对象数据属性与访问器属性的相关概念，然后介绍了属性定义与读取的相关方法，最后对`JavaScript`对象数据属性与访问器属性的知识做了一些扩展，并手动实现了一个简单的数据双向绑定实例。

> 文中如果有疏漏错误之处，各位可在文末评论中提出。

### 一. 创建JavaScript对象

创建`JavaScript`对简单的方法有两种：一是直接创建一个`object`实例，然后为他添加属性与方法，二是通过对象字面量语法的方式创建。

#### 1.1 `new object`

```
var person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";
person.sayName = function(){
    alert(this.name);
};
复制代码
```

上述实例创建了一个名为person的实例对象，并为其添加了三个属性(`name`，`age`，`job`)和一个方法(`sayName`)。

#### 1.2 对象字面量

上述示例同样可通过对象字面量的语法实现如下。

```
var person = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName: function() {
        alert(this.name);
    }
};
复制代码
```

### 二. 属性类型

对于`1.1`与`1.2`的创建的每个实例都有自己的属性和方法，这些属性在创建时都带有一些特征值，这些特征值仅供内部使用，在`JavaScript`中不能直接访问他们，按规定这些特征值需要放在两对方括号中，例如`[[Enumerable]]`。

```
ECMAScript`中有两类属性，分别是`数据属性`与`选择器属性
```

#### 1.1 数据属性

数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的 特性。

- `[[Configurable]]`:表示能否通过`delete`删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。
- `[[Enumerable]]`:表示能否通过for-in循环返回属性。
- `[[Writable]]`:表示能否修改属性的值。
- `[[Value]]`:包含这个属性的数据值。

> 通过`new object`或者对象字面量方式创建对象定义的属性，他们的`[[Configurable]]`、`[[Enumerable]]`、`[[Writable]]`特征均为`true`，而`[[Value]]`值被设置为指定的值。

```
var person = {
    name: "Nicholas"
}
复制代码
```

以上代码通过对象字面量的方式定义了一个`person`对象，并为它指定了`name`属性，此时`name`属性的四个特征值，`[[Configurable]]`、`[[Enumerable]]`、`[[Writable]]`特征均为`true`，而`[[Value]]`为`Nicholas`。

要修改属性默认的特性，必须使用Object.defineProperty()方法，可同时修改一个或多个特性值，该方法接收三个参数：

- `object`：属性所在的对象
- `propertyName`:属性的名字
- `descripor`:属性的描述符，必须是`[[Configurable]]`、`[[Enumerable]]`、`[[Writable]]`、`[[Value]]`中的一个或者多个值。

```
var person = {
    name: fanweiren
}; 
Object.defineProperty(person, "name", { 
 writable: false, 
 value: "Nicholas" 
}); 
alert(person.name); //"Nicholas" 
person.name = "Greg"; 
alert(person.name); //"Nicholas"
复制代码
```

以上代码将`name`属性的值设置为设置为`Nicholas`，并将`name`属性的`[[writable]]`特性值设为`false`，表示该属性只可读不可修改。如果尝试为它指定新值，非严格模式下，赋值操作会被忽略，在严格模式下，会抛出错误。

```
var person = {
    name: fanweiren
}; 
Object.defineProperty(person, "name", { 
 configurable: false, 
 value: "Nicholas" 
}); 
alert(person.name); //"Nicholas" 
delete person.name; 
alert(person.name); //"Nicholas"
复制代码
```

把`[[Configurable]]`特性设置为false后，属性`name`既不能从对象中删除，此时调用delete在非严格模式下什么也不会发生，在严格模式下会抛出错误。

> 一旦把`[[Configurable]]`特性设置为false即不可配置后，就不能在变回可配置了。且设置为false后，`[[Enumerable]]`、`[[Writable]]`也都不能修改了。

> 发现一个奇怪的现象，`[[Configurable]]`特性设置为`false`后，如果`[[Writable]]`以前为`true`，则还可以将其修改为`false`，如果`[[Writable]]`以前为`false`，则不可修改。

#### 1.2 访问器属性

访问器属性不包含数据值；它们包含一对儿`getter`和`setter` 函数（不过，这两个函数都不是必需的）。在读取访问器属性时，会调用`getter` 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用 `setter`函数并传入新值，这个函数负责决定如何处理数据。访问器属性有如下 4 个特性。

- `[[Configurable]]`：特性同1.1数据属性的该特征值
- `[[Enumerable]]`：特性同1.1数据属性的该特征值
- `[[Get]]`：在读取属性时调用的函数。默认值为 undefined。
- `[[Set]]`：在写入属性时调用的函数。默认值为 undefined。

访问器属性不能直接定义，必须使用 `Object.defineProperty()`来定义。请看下面的例子。

```
var book = { 
 hideYear: 2004, 
 edition: 1 
}; 
Object.defineProperty(book, "year", { 
 get: function(){ 
 return this.hideYear; 
 }, 
 set: function(newValue){ 
 if (newValue > 2004) { 
 this.hideYear = newValue; 
 this.edition += newValue - 2004; 
 } 
 } 
}); 
book.year = 2005; 
alert(book.edition); //2
复制代码
```

以上代码定义了`hideYear`与`edition`两个数据属性，同时定义了`year`这个访问器属性。`year`访问器属性包含`get`与`set`两个方法，`get`方法返回`hideYear`属性的值，`set`方法通过计算来确定正确的版本。

> get和set可以不同时使用,但在严格模式下只其中一个,会抛出错误

三点总结：

1. 所有直接通过`new object`或者对象字面量为对象添加的属性均为数据属性，访问器属性必须用`Object.defineProperty()`定义。
2. 通过`new object`或者对象字面量为对象添加的属性，其`[[Configurable]]`、`[[Enumerable]]`、`[[Writable]]`属性默认均为`true`，通过`Object.defineProperty()`定义的属性，对于`defineProperty`方法没定义的特征，默认为`false`。

```
// 通过`new object`或者对象字面量为对象添加的属性
var person = {
    name: 'fanweiren'
} // configurable、enumerable、writable均为true

// 通过`Object.defineProperty()`定义的属性
Object.defineProperty(book, "name", {
    value: 'fanweiren'
} // configurable、enumerable、writable均为false

Object.defineProperty(book, "name", {
    configurable： true
    value: 'fanweiren'
}// configurable为true，enumerable、writable为false
复制代码
```

1. 一个属性要么为数据属性，要么为访问器属性，不可能既是数据属性又是访问器属性，即数据描述符与存取描述符不可混用,会抛出错误。

```
var obj = {};
Object.defineProperty(obj, 'a', {
    value: 'a1',
    get: function() {
       return 'a2'
    } // 错误！数据描述符与存取描述符不可混用
});
复制代码
```

1. 访问器属性使用的常见方式，即设置一个值会导致其他属性发生变化，该思想是`vue`双向绑定数据实现的核心内涵。

### 三. 定义多个属性

利用`Object.defineProperty()`定义单个属性。利用`Object.defineProperties()`同时定义多个属性，该方法接收两个参数，具体使用方式见如下代码。

```
var book = {}; 
Object.defineProperties(book, { 
 _year: { 
    value: 2004 
 }, 
 edition: { 
    value: 1 
 }, 
 year: { 
     get: function(){
        return this._year; 
     }, 
     set: function(newValue){ 
        if (newValue > 2004) { 
             this._year = newValue; 
             this.edition += newValue - 2004; 
        } 
    } 
 } 
});
复制代码
```

以上代码为对象`book`定义了三个属性，其中`_year`与`edition`为数据属性，`year`为访问器属性。

### 四. 读取数据的属性

`Object.getOwnPropertyDescriptor()`方法可以取得给定属性的描述符。这个方法返回值是一个对象，如果是访问器属性，这个对象的属性有`configurable`、`enumerable`、`get`和`set`；如果是数据属性，这 个对象的属性有`configurable`、`enumerable`、`writable`和`value`。对于第三部分(定义多个属性)的代码，调用`Object.getOwnPropertyDescriptor()`方法后结果如下：

```
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log(JSON.stringify(descriptor))
//{"value":2004,"writable":false,"enumerable":false,"configurable":false}
alert(typeof descriptor.get);     //"undefined"

var descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(JSON.stringify(descriptor)) // {"enumerable":false,"configurable":false}
alert(typeof descriptor.get); // function
alert(typeof descriptor.set); // function

复制代码
```

### 五 相关扩展

#### 5.1 全局环境中的赋值导致`configurable`默认为false

全局环境下，`a=1`中的`a`相当于`window`的一个属性，而`var a=1`中的`a`相当于定义的一个变量。

```
a = 1; //a是其所在对象的一个属性, configurable与对象字面量定义属性一样，默认为true
复制代码
var a = 1; // 通过var或let初始化的，configurable属性默认为false
复制代码
```

#### 5.2. 利用访问器属性实现简单的数据双向绑定

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<input id="input"/></br>
<button id="btn">点我修改值</button>
<script>
    let inputNode = document.getElementById('input');
    let person = {}
    Object.defineProperty(person, 'name' ,{
        configurable: true,
        get: function () {
            console.log('person.name.get()：'+ inputNode.value)
            return inputNode.value
        },
        set: function (newValue) {
            console.log('person.name.set()：' + newValue)
            inputNode.value = newValue
        }
    })
    inputNode.oninput = function () {
        console.log('inputNode.oninput: ' + inputNode.value)
        person.name = inputNode.value;
    }

    let btn = document.getElementById('btn');
    btn.onclick = function () {
        person.name = Math.random()
    }
</script>
</body>
</html>
复制代码
```

以上代码实现了一个将`input`输入框的数据与`perosn`对象的`name`属性值绑定的实例，`input`输入框内的数据发生改变会同步影响`perosn.name`的值，而对`perosn.name`的任何修改也会同步到`input`输入框内。

> 注意是将`input`与`perosn.name`数据绑定，而不是`input`与`button`绑定，`button`的作用仅仅是改变`perosn.name`的值，方便演示而已。 具体步骤为

1. 首先写一个简单HTML页面，包括一个`input`输入框与一个`button`按钮
2. 为`perosn.name`定义访问器属性的特性，重写`set`与`get`方法，`set`方法会获取`input`输入框的值并返回，而`set`方法会为`input`输入框重新赋值。当`perosn.name`被赋值时，`input`输入框的值会同步变化。
3. 为`input`输入框添加监听方法，`input`输入值发生改变时会被触发，触发此方法时`input`内的值会被赋值给`perosn.name`，导致`perosn.name`同步变化。
4. 为`btn`按钮添加点击的监听方法，主要是为了方便为`perosn.name`赋值，以观察第3步所说的现象。如果要观察第2步的现象，可以按`F12`观察`console`页面的打印数据。

下图为上述代码的示意图。

![img](https://user-gold-cdn.xitu.io/2019/4/23/16a499e7e1964669?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### 六. 总结

本文从对象的创建引出对象数据属性与访问器属性的概念，首先介绍了数据属性与访问器属性的相关知识，然后介绍了属性定义与读取的相关方法。主要结论如下：

1. `javascript`对象的属性分为数据属性与访问器属性两类，通过`new object`与对象字面量定义的属性都为数据属性，访问器属性必须通过`Object.defineProperty()`方法定义。
2. 通过`new object`或者对象字面量为对象添加的属性，其`[[Configurable]]`、`[[Enumerable]]`、`[[Writable]]`属性默认均为`true`，通过`Object.defineProperty()`定义的属性，对于`defineProperty`方法没定义的特征，默认为`false`。
3. 一个属性要么为数据属性，要么为访问器属性，不可能既是数据属性又是访问器属性。
4. 访问器属性使用的常见方式，即设置一个值会导致其他属性发生变化，该思想是vue双向绑定数据实现的核心内涵。
5. `[[Configurable]]`表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性,`[[Enumerable]]`表示能否通过`for-in`循环返回属性。