## MD5（俗称哈希算法和摘要算法 message-digest algorithm）

特点： 压缩性： 任何长度的数据。算出的MD5值长度是固定的

​			容易计算性： 从原数据计算出MD5值容易

​			抗修改性： 只要任何一处发生改变对得到的MD5 的值都有很大的区别

​			强碰撞性： 已知原数据想找到相同的MD5数值基本没有

MD5的作用是让大容量信息在用[数字签名](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/%E6%95%B0%E5%AD%97%E7%AD%BE%E5%90%8D)软件签署私人[密钥](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/%E5%AF%86%E9%92%A5)前被"[压缩](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/%E5%8E%8B%E7%BC%A9/13032501)"成一种保密的格式（就是把一个任意长度的字节串变换成一定长的16进制数字串）。

## session 是基于 cookies 实现的

当我们从客户端访问服务器的时候，服务器端会给我们返回一个sessionId并且服务器端根据信息创建生成一个session存储在本地，通过响应头传递给客户端，客户端接受后会将此信息存储在cookie上，同时记录之歌sessionID属于哪个域名

当客户端再次访问服务端的时候，会自动判断该域名下是否有cookie信息，有的话发送给服务端，服务端会根据cookie提取出sessionID,在根据sessionID找到Session,进行匹配，如果有对应的session则通过，否则中断。

Session 的缺点及解决方案：扩展性不好，Session 面对服务器集群是无法共享 Session 的，所以只能通过↓改善

![img](https://user-gold-cdn.xitu.io/2020/1/8/16f846215818a4e2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

解决方案图文来自[博客](https://juejin.im/post/6844904009061367821)

## Cookie 和 Session 的区别？

1. 安全性。因为 Cookie 可以通过客户端修改，而 Session 只能在服务端设置，所以安全性比 Cookie 高，一般会用于验证用户登录状态

2. 适用性。Cookie 只能存储字符串数据，而 Session 可以存储任意类型数据

3. 有效期。Cookie 可以设置任意时间有效，而 Session 一般失效时间短

4. 继承性。一般客户端设置 Cookie,如果要用于验证就需要服务端创建 Session

   







