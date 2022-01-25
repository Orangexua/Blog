## 虚拟DOM ： 实现DOM高效更新

![image-20210118094651533](/home/mi/.config/Typora/typora-user-images/image-20210118094651533.png)

![image-20210118094952386](/home/mi/.config/Typora/typora-user-images/image-20210118094952386.png)



![image-20210118095925669](/home/mi/.config/Typora/typora-user-images/image-20210118095925669.png)
DOM：浏览器中，提供的概念；有JS 对象，表示页面上的元素，并提供操作元素的API

虚拟DOM：是框架中的概念；是开发框架的程序员，手动用JS 对象来模拟DOM元素的 嵌套关系；

​	本质：用JS对象，来模拟DOM元素和嵌套关系；

​	目的：就是为了实现页面元素的高效更新

## Diff算法

#### tree diff:

​	![image-20210118100632038](/home/mi/.config/Typora/typora-user-images/image-20210118100632038.png)

![image-20210118100651801](/home/mi/.config/Typora/typora-user-images/image-20210118100651801.png)

#### component diff

![image-20210118101650236](/home/mi/.config/Typora/typora-user-images/image-20210118101650236.png)

![image-20210118101703647](/home/mi/.config/Typora/typora-user-images/image-20210118101703647.png)

#### element diff![image-20210118101713789](/home/mi/.config/Typora/typora-user-images/image-20210118101713789.png)



