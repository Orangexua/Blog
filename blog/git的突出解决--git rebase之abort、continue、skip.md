# [git的突出解决--git rebase之abort、continue、skip](https://www.cnblogs.com/chenjunjie12321/p/6876220.html)

 

**（1）应用实例描述**

假设在github或者gitoschina上建立了一个项目，默认分支为master分支，远程master分支上c.sh文件内容：

 ![img](https://images2015.cnblogs.com/blog/1072097/201705/1072097-20170518230557072-2087356716.png)

开发者A、B分别将项目拷贝到自己本地进行开发

某一天，开发者B提交c.sh，并且提交成功，

 ![img](https://images2015.cnblogs.com/blog/1072097/201705/1072097-20170518230607228-813753957.png)

之后，开发者A在本地代码并没有和远程master分支的代码同步的情况下，对本地的c.sh进行了修改，修改后c.sh内容如下：

 ![img](https://images2015.cnblogs.com/blog/1072097/201705/1072097-20170518230629791-1139533697.png)

 修改后，开发者A准备将代码提交到远程master分支上。

 

**（2）引入问题**

 假设开发者A提交过程如下：

$ git add c.sh

$ git commit -m "XXXX"

如果直接使用$ git push，则会报错：

error: failed to push some refs to 'git@git.oschina.net:XXXX/gitlearning.git'

hint: Updates were rejected because the remote contains work that you do not have locally. This is usually caused by another repository pushing to the same ref. You may want to first integrate the remote changes (e.g., 'git pull ...') before pushing again. See the 'Note about fast-forwards' in 'git push --help' for details.

上述过程的节点走向如下图所示：

 ![img](https://images2015.cnblogs.com/blog/1072097/201705/1072097-20170518230820635-502955409.png)

实际开发过程中考虑其它开发者可能会对c.sh进行修改，因此一般在开发过程中建议使用

 $ git pull --rebase

与远程代码同步，同步过程会检查冲突，

 ![img](https://images2015.cnblogs.com/blog/1072097/201705/1072097-20170518230829713-1961201553.png)

此时，开发者根据 <<<<<<< HEAD，=======，>>>>>>> 便可知冲突的位置。

**注意：**不是出现冲突才使用git pull --rebase，它是一种解决冲突的手段，另外还有merge的方式

 

**（3） 知识点引入**

$ git pull --rebase

git pull的默认行为是git fetch + git merge

git pull --rebase则是git fetch + git rebase.

$ git fetch

从远程获取最新版本到本地，不会自动合并分支

$ git rebase

git rebase，顾名思义，就是重新定义（re）起点（base）的作用，即重新定义分支的版本库状态。本地更新分支节点过程如下图所示。（关于rebase节点知识点可以参考http://blog.csdn.net/hudashi/article/details/7664631/）

![img](https://images2015.cnblogs.com/blog/1072097/201705/1072097-20170518230935416-27345162.png)

$ git pull --rebase

 git pull --rebase执行过程中会将本地当前分支里的每个提交(commit)取消掉，然后把将本地当前分支更新为最新的"origin"分支，该过程本地分支节点更新图如下所示：

 ![img](https://images2015.cnblogs.com/blog/1072097/201705/1072097-20170518230945807-491631367.png)

 

\------------------------------------------------------------------------------------------

 

**（4）回到主题**

**执行完git pull --rebase之后如果有合并冲突，使用以下三种方式处理这些冲突：**

git rebase --abort 会放弃合并，回到rebase操作之前的状态，之前的提交的不会丢弃；

git rebase --skip 则会将引起冲突的commits丢弃掉（慎用！！）；

git rebase --continue 合并冲突，结合"git add 文件"命令一起用与修复冲突，提示开发者，一步一步地有没有解决冲突。（fix conflicts and then run "git rebase --continue"）

 

对上述冲突的处理

1、使用 $git rebase --abort

执行之后，本地内容会回到提交之间的状态，也就是回到以前提交但没有pull是的状态，简单来说就是撤销rebase。

 

2、使用 $git rebase --skip

git rebase --skip 引起冲突的commits会被丢弃，对于本文应用的例子来说开发者A对c.sh文件的commit无效，开发者A自己修改的部分全部无效，因此，在使用skip时请慎重。

执行：$ vim c.sh

查看本地c.sh文件提交内容，展示如下图所示，执行语句之后开发者A的修改无效。

 ![img](https://images2015.cnblogs.com/blog/1072097/201705/1072097-20170518231040307-1759319379.png)

 

3、使用 $git rebase --continue

执行完$git pull --rebase 之后，本地如果产生冲突，手动解决冲突之后，用"git add"命令去更新这些内容的索引(index)，然后只要执行:

$ git rebase --continue 就可以线性的连接本地分支与远程分支，无误之后就回退出，回到主分支上。

注意：一般情况下，修改后检查没问题，使用rebase continue来合并冲突。