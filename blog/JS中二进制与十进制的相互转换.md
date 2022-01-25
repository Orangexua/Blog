# [JS中二进制与十进制的相互转换](https://www.cnblogs.com/bigsoft-185025529/p/10093112.html)

**十进制转换为二进制：**

```
var num = 100;
console.log(num.toString(2));
```

toString()方法可把一个 Number 对象转换为一个字符串，并返回结果。

**语法**

```
NumberObject.toString(radix);
```

其中，radix为可选。规定表示数字的基数，使 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。但是要注意，如果该参数是 10 以外的其他值，则 ECMAScript 标准允许实现返回任意值。

**返回值**

数字的字符串。例如，当 radix 为 2 时，NumberObject 会被转换为二进制值表示的字符串。

**抛出**

当调用该方法的对象不是 Number 时抛出 TypeError 异常。

**二进制转十进制：**

```
var num = 1100100;
console.log(parseInt(num,2));
```

parseInt() 函数可解析一个字符串，并返回一个整数。

**语法**

```
parseInt(string, radix);
```

其中，string为必需。要被解析的字符串。radix为可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则parseInt() 将返回 NaN。

**返回值**

返回解析后的数字。

**说明**

当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。
举例，如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数。如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。

**提示和注释**

**注释：**只有字符串中的第一个数字会被返回。	
**注释：**开头和结尾的空格是允许的。
提示：如果字符串的第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。

```
parseInt(num,8);   //八进制转十进制
parseInt(num,16);   //十六进制转十进制
parseInt(num).toString(8)  //十进制转八进制
parseInt(num).toString(16)   //十进制转十六进制
parseInt(num,2).toString(8)   //二进制转八进制
parseInt(num,2).toString(16)  //二进制转十六进制
parseInt(num,8).toString(2)   //八进制转二进制
parseInt(num,8).toString(16)  //八进制转十六进制
parseInt(num,16).toString(2)  //十六进制转二进制
parseInt(num,16).toString(8)  //十六进制转八进制
```