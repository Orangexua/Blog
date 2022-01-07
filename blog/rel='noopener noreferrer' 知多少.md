# rel='noopener noreferrer' 知多少

#### 今天在领完盒饭，吃饭的时候，为了赶进度，不得不一边吃饭，一边敲代码，这时为了一个跳转，就写了一个a标签,结果竟然发现eslint报错了，错误如下：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/7/17152bbbb5741f11~tplv-t2oaga2asx-watermark.awebp)



```
Using target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopener eslint(react/jsx-no-target-blank)
复制代码
```

#### 翻译过来的意思大概是 在没有`rel="noopener noreferrer"`的情况下使用`target="_blank"`是有安全风险的：参见`https://mathiasbynens.github.io/rel-noopener eslint(react/jsx-no-target-blank)`

我就写个`<a>`标签,竟然还有安全风险，**吓得我的小手止不住的颤抖，筷子都拿不稳了**...

**`google`官方原版的解释在这里**：[网站使用 rel="noopener" 打开外部锚](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ftools%2Flighthouse%2Faudits%2Fnoopener)

细细读完，**小手终于渐渐不再颤抖**...

**解释如下**：

1. 当您的页面链接至使用 `target="_blank"` 的另一个页面时，新页面将与您的页面在同一个进程上运行。 如果新页面正在执行开销极大的 `JavaScript`，您的页面性能可能会受影响。
2. `target="_blank"`也是一个安全漏洞。新的页面可以通过`window.opener` 访问您的窗口对象，并且它可以使用 `window.opener.location = newURL`将您的页面导航至不同的网址。

原来，**当你使用`target="_blank"`打开一个新的标签页时，新页面的`window`对象上有一个属性 `opener` ,它指向的是前一个页面的`window`对象，因此，后一个新打开的页面就可以控制前一个页面了，事情就是这么的可怕...**

如上图的a标签`<a href='https://www.xxx.com'>https://www.xxx.com</a>`,如果**打开的页面的域名和当前页面的域名是在同一个域名下**，在打开后的控制台输入`window.opener.alert(1)`,你会惊讶的发现，上一个页面竟然弹出个大大的`1`，自己动手试一下吧！

而在**跳转到另一个域名的页面**的情况下，使用`window.opener.location.replace`方法，我竟然把上一个页面的`url`给改掉了...**吓得我筷子掉到了地上...**

**解决方法**：为了避免上述安全漏洞的发生，我们就需要在a标签上添加`rel="noopener noreferrer"`属性，此时，当你打开新页面后，你会发现`windwo.opener`已经被置为 `null`。就这样，我们就避免了一次安全事故的发生。**终于可以捡起筷子继续吃饭了...**

**注**：`rel=noreferrer` 是为了兼容旧浏览器。