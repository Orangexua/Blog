# 什么是GIT？



Git是分布式版本控制系统，和其他版本控制系统的主要差别在于Git 只关心文件数据的整体是否发生变化，而大多数其他系统则只关心文件内容的具体差异。Git 并不保存这些前后变化的差异数据。Git 更像是把变化的文件作快照后，记录在一个微型的文件系统中。每次提交更新时，它会纵览一遍所有文件的指纹信息并对文件作快照，然后保存一个指向这次快照的索引。

基本的 Git 工作流程如下：

- 在工作目录中修改某些文件。
- 对修改后的文件进行快照，然后保存到暂存区域
- 提交更新，将保存在暂存区域的文件快照永久转储到 Git 目录中。

# 需要学习的内容

你需要学习以下内容

| 本次学习的内容 |                 |
| :------------- | --------------- |
| 1              | Git的相关术语   |
| 2              | 使用Git基本命令 |
| 4              | Git命令实战     |



# Git的相关术语

| 术语&相关解释                                                |                                                              |
| :----------------------------------------------------------- | ------------------------------------------------------------ |
| 工作原理![img](http://wiki.baidu.com/download/attachments/1151992525/image2020-8-26_15-52-14.png?version=1&modificationDate=1598855135000&api=v2) |                                                              |
| 1                                                            | **工作区（workspace）**程序员进行开发改动的地方，是你当前看到的，也是最新的。平常我们开发就是拷贝远程仓库中的一个分支，基于该分支进行开发。在开发过程中就是对工作区的操作。 |
| 2                                                            | **暂存区(index)*****\*:\****.git目录下的index文件, 暂存区会记录 git add 添加文件的相关信息(文件名、大小、timestamp…)，不保存文件实体, 通过id指向每个文件实体。可以使用 git status 查看暂存区的状态。暂存区标记了你当前工作区中，哪些内容是被git管理的。当你完成某个需求或功能后需要提交到远程仓库，那么第一步就是通过 git add 先提交到暂存区，被git管理。 |
| 3                                                            | **本地仓库(repository)：**保存了对象被提交 过的各个版本，比起工作区和暂存区的内容，它要更旧一些。git commit 后同步index的目录树到本地仓库，方便从下一步通过 git push 同步本地仓库与远程仓库的同步。** ** |
| 4                                                            | **远程仓库(remote)：**远程仓库的内容可能被分布在多个地点的处于协作关系的本地仓库修改，因此它可能与本地仓库同步，也可能不同步，但是它的内容是最旧的。 |



# Git的基本命令

| 基本命令&解释 |                                                              |
| :------------ | ------------------------------------------------------------ |
| 1             | git常用命令速查表 ![img](http://wiki.baidu.com/download/attachments/1151992525/Git%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4%E9%80%9F%E6%9F%A5%E8%A1%A8.png?version=4&modificationDate=1637758331000&api=v2) |




Git命令实战

前置任务



在实战之前需要完成【101】本地准备工作，在个人开发机或者本地电脑中拉取 “/baidu/qualifiedcoder/<你的邮箱前缀>” 代码

| 实战命令和操作 |                                                              |
| :------------- | ------------------------------------------------------------ |
| 1              | 先切入路径为/baidu/qualifiedcoder/<你的邮箱前缀>执行下面命令，创建一个readme.txt文件`echo -e "Git is a version control system.\nGit is free software." >> readme.txt `创建效果 ![img](http://wiki.baidu.com/download/attachments/1151992525/image2020-8-26_17-47-44.png?version=1&modificationDate=1598855136000&api=v2) |
| 2              | **将文件保存到暂存区**`git add readme.txt `                  |
| 3              | **将暂存区的更改提交到本地版本库**`git commit -m "wrote a readme file.txt" ` |
| 4              | **查看创建的提交的更改信息，通过使用 git log 命令查询**`git log ` |
| 5              | **版本之间的diff**查看简单的diff结果，可以加上–stat参数，执行命令如下：`git diff --stat `比较上次提交commit和上上次提交的差别时，执行如下命令：`git diff HEAD^ HEAD `如：![img](http://wiki.baidu.com/download/attachments/1151992525/image2020-8-26_19-48-35.png?version=1&modificationDate=1598855136000&api=v2) 比较两个历史版本之间的差异时，命令如下：`git diff SHA1 SHA2 `如：![img](http://wiki.baidu.com/download/attachments/1151992525/image2020-8-26_19-51-30.png?version=1&modificationDate=1598855136000&api=v2) |
| 6              | **回滚**** ****步骤1：修改readme.txt文件，并提交修改**(1) 首先，修改readme.txt文件，并提交修改：a. 先执行命令下面命令`cat > readme.txt << __ENDL` `Git is a distributed version control system.` `Git is free software.` `__ENDL`b. 提交修改`git add readme.txt   git commit -m "add distributed"   ` (2) 再次，修改readme.txt文件，并提交修改：a. 先执行命令下面命令`cat > readme.txt << __ENDL` `Git is a distributed version control system.` `Git is free software distributed under the GPL.` `__ENDL`b. 提交修改`git add readme.txt   git commit -m "append GPL"   `**步骤2: 使用git log命令查看版本历史**版本1：wrote a readme file`Git is a version control system.` `Git is free software.`版本2：add distributed`Git is a distributed version control system.` `Git is free software.`版本3：append GPL`Git is a distributed version control system.` `Git is free software distributed under the GPL.`![img](http://wiki.baidu.com/download/attachments/1151992525/image2020-8-26_20-10-14.png?version=1&modificationDate=1598855137000&api=v2)步骤3：使用git reset命令，将当前版本readme.txt回退到上一个版本add distributed`git reset --hard HEAD^ `![img](http://wiki.baidu.com/download/attachments/1151992525/image2020-8-26_20-20-48.png?version=1&modificationDate=1598855137000&api=v2) 步骤4：完成回滚 回滚后的readme.txt内容如下`Git is a distributed version control system.` `Git is free software.`步骤5：还可以继续回退到上一个版本wrote a readme file 步骤6：如果现在想回到append GPL版本时，需要先找到append GPL的commit id，通过指定回到未来的某个版本来返回`MacintoshdeMacBook-Pro:chenshanshan05 chenshanshan05$ git reset --hard 1881c567d59519c2f03eec52874af8f7f6ea3f0b   `HEAD is now at 1881c56 append GPL注：版本号无需写全，只有前7-8位就可以，Git会自动找到步骤7：如果不记得commit id，也可以找到回滚前的分支`MacintoshdeMacBook-Pro:chenshanshan05 chenshanshan05$ git reflog   `1881c56 (HEAD -> master) HEAD@{0}: reset: moving to 1881c567d59519c2f03eec52874af8f7f6ea3f0b 15c9abd HEAD@{1}: reset: moving to HEAD^ 1881c56 (HEAD -> master) HEAD@{2}: commit: append GPL 15c9abd HEAD@{3}: commit: add distributed 1ae15ad HEAD@{4}: commit: wrote a readme file.txt 3a6fb97 HEAD@{5}: checkout: moving from 1.0 to master c41bba4 (1.0) HEAD@{6}: commit (merge): fix conflicts 134803b (origin/1.0) HEAD@{7}: checkout: moving from master to 1.0 3a6fb97 HEAD@{8}: checkout: moving from 1.0 to master 134803b (origin/1.0) HEAD@{9}: checkout: moving from master to 1.0 3a6fb97 HEAD@{10}: commit: coding specification 96c6eac HEAD@{11}: commit: coding specification 8054057 (origin/master, origin/HEAD) HEAD@{12}: clone: from [ssh://chenshanshan05@icode.baidu.com:8235/baidu/qualifiedcoder/chenshanshan05](ssh://chenshanshan05@icode.baidu.com:8235/baidu/qualifiedcoder/chenshanshan05)从以上内容可知append GPL的commit id是1881c56，现在，你又可以回到回滚前的版本啦！ |
| 8              | **创建与合并本地分支**** ****步骤1：创建`dev`分支，然后切换到`dev`分支**** **`MacintoshdeMacBook-Pro:chenshanshan05 chenshanshan05$ git checkout -b dev `注：`git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：`git branch dev git checkout dev `使用git branch命令查看当前分支，`git branch`命令会列出所有分支，`当前分支前面会标一个`*`号`：`MacintoshdeMacBook-Pro:chenshanshan05 chenshanshan05$ git branch * dev  master`**步骤2：在`dev`分支上正常提交，比如对`readme.txt`做个修改，加上一行，并提交：**新加一句"`Creating a ``new` `branch is quick.`"修改readme.txt文件，并提交修改：a. 先执行命令下面命令`cat > readme.txt << __ENDL` `Creating a ``new``branch is quick.` `__ENDL`b. 再次提交修改`git add readme.txt git commit readme.txt -m "add creating branch" `**步骤3：`dev`分支的工作完成，使用git checkout master 切换回`master分支（类似，若切换到1.0分支，则使用命令 git checkout 1.0）：`**`MacintoshdeMacBook-Pro:chenshanshan05 chenshanshan05$ git checkout master   `Switched to branch 'master' Your branch is ahead of 'origin/master' by 5 commits. (use "git push" to publish your local commits)`MacintoshdeMacBook-Pro:chenshanshan05 chenshanshan05$ git branch  1.0  dev * master`**步骤4：切换回`master`分支后，再查看一个`readme.txt`文件，刚才添加的内容不见了，因为那个提交是在`dev`分支上，而`master`分支此刻的提交点并没有变:****步骤5：使用**git merge dev 命令**将`dev`分支的修改内容合并到`master`分支上：**`MacintoshdeMacBook-Pro:chenshanshan05 chenshanshan05$ git merge dev `Updating 1881c56..1f3e892 Fast-forward readme.txt | 1 + 1 file changed, 1 insertion(+)**步骤6：合并完成后，删除`dev`分支**`MacintoshdeMacBook-Pro:chenshanshan05 chenshanshan05$ git branch -d dev `**步骤7：查看是否删除成功**`MacintoshdeMacBook-Pro:chenshanshan05 chenshanshan05$ git branch 1.0 * master` |