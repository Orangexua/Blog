# VUEX概述

1.1组件之间共享数据的方式

​	父子组件传值： V-bind 属性绑定

​	子父组件传值： V-on 事件绑定

​	兄弟组件之间共享数据： EvenLoop ；$on: 接收数据的那个组件；$emit:发送数据的那个组件

1.2 Vuex 是什么？

​	Vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享

1.3 使用Vuex统一管理状态的好处

​	1)能够在Vuex中集中管理共享的数据，方便易于开发和后期维护

​	2）能够高效的实现组件之间的数据共享，提高开发效率

​	3）存储在Vuex中的数据都是响应式的，能够实时保持数据与页面同步

1.4 什么样的数据适合存储在Vuex?

​	一般情况下，只有组件共享的数据，才有必要存储在Vuex 中；对于组件中的私有数据，依旧存储在组件中的data中即可

2.1 核心概念

​	1）state

​			state提供唯一的公共资源，所有共享的数据都要统一放到store的state中进行存储

​					组件访问state 中数据的第一种方式：

```
 this.$store.state.count(全局数据名称)
```

​					组件访问state 中数据的第二种方式： 从Vuex 中按需引入mapstate函数

```
import {mapstate} from "Vuex"
...mapState(['count'])
```

​	

2）Mutation

​			

​	3)   Action

​	4)  Getter

### 引入Vuex（前提是已经用Vue脚手架工具构建好项目）

1、利用npm包管理工具，进行安装 vuex。在控制命令行中输入下边的命令就可以了。

```
    npm install vuex --save
```

要注意的是这里一定要加上 –save，因为你这个包我们在生产环境中是要使用的。

2、新建一个store文件夹（这个不是必须的），并在文件夹下新建store.js文件，文件中引入我们的vue和vuex。

```
    import Vue from 'vue';
    import Vuex from 'vuex';
```

3、使用我们vuex，引入之后用Vue.use进行引用。

```
    Vue.use(Vuex);
```

通过这三步的操作，vuex就算引用成功了，接下来我们就可以尽情的玩耍了。

4、在main.js 中引入新建的store.js文件

```
    import  store  from '@src/store/store'
```

5、再然后 , 在实例化 Vue对象时加入 store 对象 :

```
    new Vue({
      el: '#app',
      router,
      store,//使用store
      template: '<App/>',
      components: { App }
    })
```

### 初出茅庐 来个Demo

1、现在我们store.js文件里增加一个常量对象。store.js文件就是我们在引入vuex时的那个文件。

```
    const state = {
        count:1
    }
```

2、用export default 封装代码，让外部可以引用。

```
    export default new Vuex.Store({
        state
    });
```

3、新建一个vue的模板，位置在components文件夹下，名字叫count.vue。在模板中我们引入我们刚建的store.js文件，并在模板中用{{$store.state.count}}输出count 的值。

```
    <template>
        <div>
            <h2>{{msg}}</h2>
            <hr/>
            <h3>{{$store.state.count}}</h3>
        </div>
    </template>
    <script>
        import store from '@/vuex/store'
        export default{
            data(){
                return{
                    msg:'Hello Vuex',

                }
            },
            store

        }
    </script>
```

4、在store.js文件中加入两个改变state的方法。

```
    const mutations={
        add(state){
            state.count+=1;
        },
        reduce(state){
            state.count-=1;
        }
    }
```

这里的mutations是固定的写法，意思是改变的，所以你先不用着急，只知道我们要改变state的数值的方法，必须写在mutations里就可以了。

5、在count.vue模板中加入两个按钮，并调用mutations中的方法。

```
    <div>
        <button @click="$store.commit('add')">+</button>
        <button @click="$store.commit('reduce')">-</button>
    </div>
```

这样进行预览就可以实现对vuex中的count进行加减了。

### state访问状态对象

> const state ，这个就是我们说的访问状态对象，它就是我们SPA（单页应用程序）中的共享值。

学习状态对象赋值给内部对象，也就是把`store`.js中的值，赋值给我们模板里data中的值。有三种赋值方式

#### 一、 通过computed的计算属性直接赋值

computed属性可以在输出前，对data中的值进行改变，我们就利用这种特性把store.js中的state值赋值给我们模板中的data值。

```
    computed:{
        count(){
            return this.$store.state.count;
        }
    }
```

这里需要注意的是return this.`$store`.state.count这一句，一定要写this，要不你会找不到$store的。这种写法很好理解，但是写起来是比较麻烦的，那我们来看看第二种写法。

#### 二、通过mapState的对象来赋值

我们首先要用import引入mapState。

```
    import {mapState} from 'vuex';

然后还在computed计算属性里写如下代码：
    computed:mapState({
            count:state=>state.count  //理解为传入state对象，修改state.count属性
     })
```

这里我们使用ES6的箭头函数来给count赋值。

#### 三、通过mapState的数组来赋值

```
    computed:mapState(["count"]) //映射this.count 为 store.state.count
```

**可以通过this.count直接拿到count数值。**这个算是最简单的写法了，在实际项目开发当中也经常这样使用。

### Mutations修改状态（$store.commit( )）

Vuex提供了commit方法来修改状态，我们粘贴出Demo示例代码内容，简单回顾一下，我们在button上的修改方法。

```
    <button @click="$store.commit('add')">+</button>
    <button @click="$store.commit('reduce')">-</button>
```

store.js文件：

```
    const mutations={
        add(state){
            state.count+=1;
        },
        reduce(state){
            state.count-=1;
        }
    }
```

传值：这只是一个最简单的修改状态的操作，在实际项目中我们常常需要在修改状态时传值。比如上边的例子，是我们每次只加1，而现在我们要通过所传的值进行相加。其实我们只需要在Mutations里再加上一个参数，并在commit的时候传递就就可以了。我们来看具体代码：

现在store.js文件里给add方法加上一个参数n。

```
    const mutations={
        add(state,n){
            state.count+=n;
        },
        reduce(state){
            state.count-=1;
        }
    }
```

在Count.vue里修改按钮的commit( )方法传递的参数，我们传递10，意思就是每次加10.

```
    <p>
       <button @click="$store.commit('add',10)">+</button>
       <button @click="$store.commit('reduce')">-</button>
    </p>
```

### 模板获取Mutations方法

实际开发中我们也不喜欢看到$store.commit( )这样的方法出现，我们希望跟调用模板里的方法一样调用。 
例如：@click=”reduce” 就和没引用vuex插件一样。要达到这种写法，只需要简单的两步就可以了：

1、在模板count.vue里用import 引入我们的mapMutations：

```
    import {mapMutations} from 'vuex';
```

2、在模板的<\script>标签里添加methods属性，并加入mapMutations

```
methods:{
　 ...mapMutations(['add','reduce']),// 映射 this.add() 为 this.$store.commit('add')
 
　　toSystemSetting () {
  　　if (this.deviceOffLine()) {
   　　 return;
 　　 }
 　　 this.$router.push({name: 'SystemSetting'});
　　}
  }
```

通过上边两部，我们已经可以在模板中直接使用我们的reduce或者add方法了，就像下面这样。

```
    <button @click="reduce">-</button>
```

### getters计算过滤操作

getters从表面是获得的意思，可以把他看作在获取数据之前进行的一种再编辑,相当于对数据的一个过滤和加工。你可以把它看作store.js的计算属性。

#### getters基本用法：

比如我们现在要对store.js文件中的count进行一个计算属性的操作，就是在它输出前，给它加上100.我们首先要在store.js里用const声明我们的getters属性。

```
    const getters = {
        count:function(state){
            return state.count +=100;
        }
    }
```

写好了gettters之后，我们还需要在Vuex.Store()里引入，由于之前我们已经引入了state和mutations，所以引入里有三个引入属性。代码如下，

```
    export default new Vuex.Store({
        state,mutations,getters
    })
```

在store.js里的配置算是完成了，我们需要到模板页对computed进行配置。在vue 的构造器里边只能有一个computed属性，如果你写多个，只有最后一个computed属性可用，所以要对上节课写的computed属性进行一个改造。改造时我们使用ES6中的展开运算符”…”。

```
    computed:{
        ...mapState(["count"]),
        count(){
            return this.$store.getters.count;
        }
    },
```

需要注意的是，你写了这个配置后，在每次count 的值发生变化的时候，都会进行加100的操作。

#### 用mapGetters简化模板写法

我们都知道state和mutations都有map的引用方法把我们模板中的编码进行简化，我们的getters也是有的，我们来看一下代码。

首先用import引入我们的mapGetters

```
    import { mapState,mapMutations,mapGetters } from 'vuex';
```

在computed属性中加入mapGetters

```
    ...mapGetters(["count"])
```

### actions异步修改状态

actions和之前讲的Mutations功能基本一样，不同点是，actions是异步的改变state状态，而Mutations是同步改变状态。至于什么是异步什么是同步这里我就不做太多解释了，如果你不懂自己去百度查一下吧。

#### 在store.js中声明actions

actions是可以调用Mutations里的方法的，我们还是继续在上节课的代码基础上进行学习，在actions里调用add和reduce两个方法。

```
    const actions ={
        addAction(context){
            context.commit('add',10)
        },
        reduceAction({commit}){
            commit('reduce')
        }
    }
```

在actions里写了两个方法addAction和reduceAction，在方法体里，我们都用commit调用了Mutations里边的方法。细心的小伙伴会发现这两个方法传递的参数也不一样。

- context：上下文对象，这里你可以理解称store本身。
- {commit}：直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了。

#### 模板中的使用

我们需要在count.vue模板中编写代码，让actions生效。我们先复制两个以前有的按钮，并改成我们的actions里的方法名，分别是：addAction和reduceAction。

```
    <p>
      <button @click="addAction">+</button>
      <button @click="reduceAction">-</button>
    </p>
```

改造一下我们的methods方法，首先还是用扩展运算符把mapMutations和mapActions加入。

```
    methods:{
        ...mapMutations([  
            'add','reduce'
        ]),
        ...mapActions(['addAction','reduceAction'])
    },
```

你还要记得用import把我们的mapActions引入才可以使用。

#### 增加异步检验

我们现在看的效果和我们用Mutations作的一模一样，肯定有的小伙伴会好奇，那actions有什么用，我们为了演示actions的异步功能，我们增加一个计时器（setTimeOut）延迟执行。在addAction里使用setTimeOut进行延迟执行。

```
    setTimeOut(()=>{context.commit(reduce)},3000);
    console.log('我比reduce提前执行');
```

我们可以看到在控制台先打印出了‘我比reduce提前执行’这句话。

### module模块组

随着项目的复杂性增加，我们共享的状态越来越多，这时候我们就需要把我们状态的各种操作进行一个分组，分组后再进行按组编写。那今天我们就学习一下module：状态管理器的模块组操作。

##### 声明模块组：

在vuex/store.js中声明模块组，我们还是用我们的const常量的方法声明模块组。代码如下:

```
    const moduleA={
        state,mutations,getters,actions
    }
```

声明好后，我们需要修改原来 Vuex.Stroe里的值：

```
    export default new Vuex.Store({
        modules:{a:moduleA}
    })
```

在模板中使用

现在我们要在模板中使用count状态，要用插值的形式写入。

```
    <h3>{{$store.state.a.count}}</h3>
```

如果想用简单的方法引入，还是要在我们的计算属性中`return`我们的状态。写法如下：

```
    computed:{
        count(){
            return this.$store.state.a.count;
        }
    }
```

