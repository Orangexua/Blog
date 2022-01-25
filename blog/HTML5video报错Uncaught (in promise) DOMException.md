# **HTML5<video>报错Uncaught (in promise) DOMException解决方法[转]**

 

在最新版的Chrome浏览器（以及所有以Chromium为内核的浏览器）中，已不再允许自动播放音频和视频。（Google的某些做法还真是令开发者不爽）。就算你为video或audio标签设置了autoplay属性也一样不能自动播放。



复制内容到剪贴板程序代码

<video src="YOUR_VIDEO_URL" autoplay></video>


如果你用 javascript 代码显式调用play方法：



复制内容到剪贴板程序代码

<video></video><script type="text/javascript">    var vdo = $("video")[0]; //jquery    vdo.src = "YOUR_VIDEO_URL";    vdo.oncanplay = function(){        this.play();    };</script>


你将会在控制台看到如下异常：



引用内容

*Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.*


这是因为，Chrome只允许用户对网页进行主动触发后才可自动播放音频和视频。其实，严格地来说，是Chrome不允许在用户对网页进行触发之前播放音频，而视频其实是不受限制的。但因为视频文件同样包含了音频，所以也一同被禁止了。Chrome这样做的目的是为了防止开发者滥用自动播放功能而对用户产生骚扰。

既然知道了原因，那就开始找解决方法。

比较常规的做法是，为video标签设置muted属性，使它静音，这样视频就能自动播放了，但是没有声音:



复制内容到剪贴板程序代码

<video src="YOUR_VIDEO_URL" autoplay muted></video>


然后待用户在网页上有了任意触发后，再将muted去掉，或者让用户手动去打开音频（腾讯视频就是这样做的）：



复制内容到剪贴板程序代码

document.body.addEventListener('mousedown', function(){
  var vdo = $("video")[0]; //jquery
  vdo.muted = false;
}, false); 




*