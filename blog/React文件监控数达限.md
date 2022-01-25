# Ubuntu Error: ENOSPC:System limit for number of file watchers reached



## 在使用Ubuntu进行开发时，会遇到这个错误！

### 今天使用的时候

![2018-11-20 15-06-17 的屏幕截图.png](https://upload-images.jianshu.io/upload_images/7983800-acf22fdb10159d12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个错误的意思时系统对文件监控的数量已经到达限制数量了！！

造成的结果： 执行的命令失败！或抛出警告（比如执行 react-native start 或者打开 vsocde）

解决方法：

修改系统监控文件数量

Ubuntu

```
sudo gedit /etc/sysctl.conf
1
```

添加一行在最下面

```
fs.inotify.max_user_watches=524288
1
```

然后保存退出！

执行

```
sudo sysctl -p
1
```

然后就解决了！