第一步、node、cnpm、vue-cli的安装可以参考[windows下Vue环境搭建](https://blog.csdn.net/weixin_41246577/article/details/79839291)

第二步、项目成功跑起来之后，我们将代码提交到码云：

  ①打开vscode，文件->打开文件夹，选择我们第一步创建好的项目（第一步中的first-project项目）

  ②在码云上新建一个空的项目把 使用Readme文件初始化这个项目的勾取消掉

  ③在vscode中Ctrl+~   (~在tab键上面)打开cmd，已经cd到根目录

  ④运行git init ： 建一个裸仓库

  ⑤git remote add origin 远程仓库地址 ：将本地的仓库和远程仓库关联

  ⑥git pull origin master :将远程仓库的东西拉下来，与本地仓库合并（如果你1中没有取消勾选，会拉取失败，删除掉码云上的README.md再运行⑥）

  ⑦在vscode界面左边第三个图标源代码管理->暂存所有更改->填写消息->Ctrl+Enter->推送到远程仓库地址

-----再记录一下怎么从码云上克隆项目到本地，并且进行修改和提交

  ①Ctrl+~ 打开cmd

 

  ②cd d:/test

  ③git clone 远程仓库地址

  ④vscode打开并修改代码，再重复⑦操作