# [Mac安装使用nvm---解决安装443问题【没有废话-清爽版】](https://segmentfault.com/a/1190000037474308)

[![img](https://avatar-static.segmentfault.com/232/786/2327862321-59c4ba6ac7b18_huge128)**songxianling1992**](https://segmentfault.com/u/songxianling1992)发布于 2020-10-14

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000037474308&referer=https%3A%2F%2Fwww.google.com.hk%2F&cb=7d8dca9e5f)

#### 背景

实际工作中要用到nvm来管理node包；直接按照其他帖子的教程进行安装；过程中都会出现443超时的问题`fatal: unable to access 'https://github.com/creationix/nvm.git/': Failed to connect to github.com port 443: Operation timed out`；这也是一个老生常谈的问题了；mac使用curl安装其他的包也有可能会出现这个问题；尝试了**设置代理**、**下载bash运行**、**clone包**都没有解决这个问题[头大]；最后的最后借用之前安装`iterm2`的插件的文件解决方式安装成功了nvm；所以整理下来供需要的小伙伴使用

![安装提示443](https://segmentfault.com/img/bVcHoGI)

#### 实现

##### 1、安装之前卸载已有的node和node模块（清理环境）

```awk
npm ls -g --depth=0                             # 查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
sudo rm -rf /usr/local/lib/node_modules         # 删除全局 node_modules 目录
sudo rm /usr/local/bin/node                     # 删除 node
cd  /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm       #删除全局 node 模块注册的软链
```

此时查看`node -v`可以发现已经没有该模块了

![卸载node模块](https://segmentfault.com/img/bVcHoIn)

##### 2、安装nvm（最重要的地方）

使用`gitee镜像`安装nvm到本地

```awk
git clone https://gitee.com/mirrors/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags` # 可以看到地址是gitee的地址
```

![安装nvm](https://segmentfault.com/img/bVcHoJT)
提示成功安装了nvm并带有版本号

##### 3、配置nvm环境变量

经过了**第二步**nvm还暂时不能使用；当终端关闭之后再打开将nvm失效；nvm仍然不可用；需要添加nvm环境变量；进入`.bash_profile`文件设置环境变量；如果没有这个文件；则需要创建文件[创建 .bash_profile 文件](https://segmentfault.com/a/1190000037474433)

```bash
vi ~/.bash_profile #进入（i编辑 esc退出 :wq保存）
复制下面的两行粘贴并且保存
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
保存退出后执行生效命令
source ~/.bash_profile
```

![nvm环境变量](https://segmentfault.com/img/bVcHoOD)
![nvm环境变量生效](https://segmentfault.com/img/bVcHoOW)
如果你使用的是`zsh`环境的话（我和大多数小伙伴一样用的也是zsh）还需要单独设置 `.zshrc`文件；

```jboss-cli
# zshrc文件内
...
source ~/.bash_profile # 找地方放置
保存退出后执行生效命令
source ~/.zshrc
...
```

![zshrc配置](https://segmentfault.com/img/bVcHoPa)

##### 4、查看安装

经过了**第三步**；这个时候不管是新开命令行窗口还是当前；都可以查看nvm的安装情况了！ `cmmand -v nvm`
![查看安装情况](https://segmentfault.com/img/bVcHoPW)
已经成功安装了[欢呼声～]

##### 5、使用nvm安装node

> 小插曲：如果用的是mac M1 芯片的电脑；需要先在终端 `arch -x86_64 zsh` 切换切换环境；之后再安装低于node15的版本才可以；因为目前只能安装最新的node版本；详情[mac M1 芯片安装低版本node](https://segmentfault.com/a/1190000039005726)

咱们先安装一个低版本的node`nvm install v8.8.0`；然后再安装一个高版本的`nvm install v12.18.3`
![安装node8](https://segmentfault.com/img/bVcHoQL)
![node12](https://segmentfault.com/img/bVcHoQM)
安装成功并且提示对应的npm版本（这里有个小插曲就是第六步）
使用`nvm ls`查看安装的node环境
![nvmls查看安装](https://segmentfault.com/img/bVcHoRa)
发现先安装的8.8.0是默认的node版本环境（新开一个命令行窗口也就是这个8）；后安装的12.18.3的当前正在使用的node版本；在当前可以使用`nvm use x.x.x`来切换版本
![切换node版本](https://segmentfault.com/img/bVcHoRv)
可以看到箭头所指；当前是使用的8.8.0版本

##### 6、重新安装cnpm

因为咱们之前在**第一步**卸载了`node`的所有模块；这时候`cnpm`也随之丢了；国内还是经常用到这个代理了；咱们再重新安装上
`npm install -g cnpm --registry=https://registry.npm.taobao.org`
![安装cnpm](https://segmentfault.com/img/bVcHoSJ)

##### 7、同步其他node模块下的安装环境

当我们使用`node8.8.0`安装完成一个包之后；如果切换到`其他node版本`发现安装的包没有同步
![nvm同步](https://segmentfault.com/img/bVcHoTm)
咱们先卸载调后安装的node版本；然后再重新使用`nvm install v12.18.3 --reinstall-packages-from=8.8.0`安装；已达到同步的效果；***此处版本号根据自己的实际安装node版本情况修改调整\*** `nvm install vxx.xx.xx --reinstall-packages-from=x.x.x`
![nvm7-2](https://segmentfault.com/img/bVcHoUp)
![nvm7-3](https://segmentfault.com/img/bVcHoUE)
![nvm7-4](https://segmentfault.com/img/bVcHoUU)
好了～两个人都可以正常同步使用了