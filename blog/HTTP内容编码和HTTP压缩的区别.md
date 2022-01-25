# HTTP内容编码和HTTP压缩的区别

HTTP压缩，在HTTP协议中，其实是内容编码的一种。

在http协议中，可以对内容（也就是body部分）进行编码， 可以采用gzip这样的编码。 从而达到压缩的目的。 也可以使用其他的编码把内容搅乱或加密，以此来防止未授权的第三方看到文档的内容。

所以我们说HTTP压缩，其实就是HTTP内容编码的一种。 所以大家不要把HTTP压缩和HTTP内容编码两个概念混淆了。

 

# HTTP压缩的过程

\1. 浏览器发送Http request 给Web服务器, request 中有Accept-Encoding: gzip, deflate。 (告诉服务器， 浏览器支持gzip压缩)

\2. Web服务器接到request后， 生成原始的Response, 其中有原始的Content-Type和Content-Length。

\3. Web服务器通过Gzip，来对Response进行编码， 编码后header中有Content-Type和Content-Length(压缩后的大小)， 并且增加了Content-Encoding:gzip. 然后把Response发送给浏览器。

\4. 浏览器接到Response后，根据Content-Encoding:gzip来对Response 进行解码。 获取到原始response后， 然后显示出网页。