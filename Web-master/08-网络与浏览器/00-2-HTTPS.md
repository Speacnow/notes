# 看完你就知道什么是 HTTPS 了

### 什么是 HTTPS ?

不管是使用手机还是电脑上网，都离不开数据的通讯

现在互联网上传输数据，普遍使用的是超文本传输协议，即 HTTP (HyperText Transfer Protocol)

所以，我们以前在上网的时候，会发现所有的网址都有一个 http:// 前缀：



![HTTP 协议](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/43a93239ccdce06bb8a3.jpg~tplv-t2oaga2asx-watermark.awebp)



简单而言，HTTP 协议定义了一套规范，让客户端或浏览器可以和服务器正常通信，完成数据传输

但是，HTTP 使用明文传输，比如你输入账号/密码提交登录：

![明文传输](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/fb38de17b990eb83a382~tplv-t2oaga2asx-watermark.awebp)



很有可能被中间人窃听，从而造成数据泄露，所以说 HTTP 是不安全的，现代浏览器会在地址栏提示连接不安全：



![火狐浏览器安全提示](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/68608eb6dbad7777b188~tplv-t2oaga2asx-watermark.awebp)



为了解决安全传输的问题，人们发明了 HTTPS，即 HTTP + Secure

### 为什么 HTTPS 是安全的？

只要把传输的数据加密，那么通信就是安全的，前提是除通信双方外，任何第三方无法解密：



![加密传输](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/5b3127ff33817c9631c0~tplv-t2oaga2asx-watermark.awebp)



在上图示例中，通信的数据经过加密，即使被中间人窃听到了，它也无法知道数据内容

![火狐浏览器安全提示](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/47d583f976f9bcb861c3~tplv-t2oaga2asx-watermark.awebp)



### HTTPS 是怎么实现安全通信的？

加密传输确实安全，但是客户端把数据加密后，服务器怎么解密呢？又怎样保证中间人窃听到密文后无法解密呢？

答案是：使用对称加密技术

> 什么是对称加密？ 简单而言，通信双方各有一把相同的钥匙（所谓对称），客户端把数据加密锁起来后，传送给服务器，服务器再用钥匙解密。同理，服务器加密后传输给客户端的数据，客户端也可以用钥匙解密

那么，新的问题又出现了：怎样在通信之前，给双方分配两把一样的钥匙呢？

如果真的只有两个人要通信的话，可以简单的私下见个面分配好，以后要通信的时候用就行。但是，实际通信往往是一个服务器和成千上万的客户端之间，总不能让每个人都和服务器先私下见个面

另外，即使使用了对称加密技术，如果一方保管不善的话，也有可能钥匙被人偷了去复制一个，这样就存在很大的安全隐患，最好是每个客户端每次和服务器通信都用不同的密钥

一个简单的解决方案是：客户端在每次请求通信之前，先和服务器协商，通过某种办法，产生只有双方知道的对称密钥

这个过程就是所谓：密钥交换(Key Exchange)

密钥交换算法有很多种实现，常见的有：

- Deffie-Hellman 密钥交换算法
- RSA 密钥交换算法

本文以较简单的 RSA 密钥交换为例

简单而言，RSA 密钥交换算法需要**客户端向服务器提供一个 Pre-Master-Key**，**然后通信双方再生成 Master-Key，最后根据 Master-Key 产生后续一系列所需要的密钥，包括传输数据的时候使用的对称密钥**

那么，客户端怎么把 Pre-Master-Key 告诉服务器呢？直接明文传输么？

我们之前说过，没加密的通信都会被窃听，是不安全的

似乎进入死循环了：为了加密通信，需要先把 Pre-Master-Key 传送给服务器，但是这个传送又必须要加密

我们引入一种新的加密技术：非对称加密

> 什么是非对称加密？ 简单而言，服务器可以生成一对不同的密钥（所谓非对称），一把私自保存，称为私钥；一把向所有人公开，称为公钥 这对密钥有这样的性质：公钥加密后的数据只有私钥能解密，私钥加密后的数据只有公钥能解密 非对称加密的一种经典实现叫 RSA 算法，这种加密算法最早 1977 年由罗纳德·李维斯特（Ron Rivest）、阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）一起提出的，RSA 就是他们三人姓氏开头字母拼在一起组成的

有了非对称加密的技术后，事情就好办了：

客户端把 Pre-Master-Key 用服务器的公钥加密后，传送给服务器

因为只有服务器才有私钥，所以只有服务器才能解密数据，获取客户端发送来的 Pre-Master-Key

**具体的交互过程：**

1. **客户端向服务器索取公钥 PublicKey；**
2. **服务器将公钥发给客户端（这里没有保密需求，因为公钥是向所有人公开的）；**
3. **客户端使用服务器的公钥 PublicKey 把 Pre-Master-Key 加密成密文，传送给服务器；**
4. **服务器用私钥 PrivateKey 解密密文，获取到客户端发送的 Pre-Master-Key;**

看起来很完美，但是第 `2` 步骤又引发了一个新问题：

由于互联网是公开的，服务器发送给客户端的公钥可能在传送过程中被中间人截获并篡改（所谓中间人攻击 Man-in-the-middle attack，缩写：MITM）



![中间人攻击](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/e9a75262b7f88dc97ff3~tplv-t2oaga2asx-watermark.awebp)



因为中间人也可以生成一对非对称密钥，它会截获服务器发送的公钥，然后把它自己的公钥 MiddleMan-PublicKey 发送给客户端，进行欺骗

可怜我们的客户端，竟然信以为真！然后傻乎乎的把自己的 Pre-Master-Key 用 MiddleMan-PublicKey 加密后，发给中间人

怎么解决这个问题？

**问题等价于：客户端怎么确定收到的公钥，真的就是服务器的公钥？**

想一想你乘高铁、坐飞机的时候，怎么向工作人员证明你是你

答案很简单，到公安局（权威机构 英文名：Authority）出个身份证明（Certificate）

身份证上记载了你的号码、姓名、年龄、照片、住址，还有签发机关、有效期等

**所以，服务器也想办法到权威机构 (Authority) 办一张证书 Certificate，上面记载了服务器的域名、公钥、所属单位，还有签发机关、有效期等**

**当客户端收到服务器发过来的证书后，只要证书不是伪造的，那么上面记载的公钥肯定也就是真的！**

> 证书长啥样？ 点击 IE 浏览器上的小锁就可以查看服务器的证书
>
> ![查看证书](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/b5df44e630ac7249d42c~tplv-t2oaga2asx-watermark.awebp)

**不过，这里又有个新问题：怎么证明证书不是伪造的？**

我们介绍一种防伪手段：签名（Signature）

> 什么是签名？ 我们在生活、工作过程中，经常遇到需要签名的情况：刷信用卡、签合同等，用来证明这是本人的行为。签名之所以可信，是因为理论上每个人的签名都有生理学基础，别人是无法伪造的，就像你的指纹一样

所以，**只要服务器发送的证书上有权威机构 Authority 的签名，就可以确信证书是颁发给服务器的，而不是谁伪造的**

这就相当于，只要你的请假条上有领导的签名，那么 HR 就会确信领导已经审批同意你请假了

**如果说人类签名使用纸笔，那么计算机的数字化签名怎么实现呢？**

**答案是使用非对称加密技术：**

1. **数字证书认证机构（`Certificate Authority`，简称 `CA`）生成*一对公/私钥*；**
2. **服务器将自己的域名、公钥等信息提交给 `CA` 审查；**
3. **`CA` 审查无误，使用*私钥*把*服务器信息的摘要*加密，生成的密文就是所谓签名（Signature）；**
4. **`CA` 把服务器的信息、签名、有效期等信息集合到一张证书上，颁发给服务器；**
5. **客户端收到服务器发送的证书后，使用 `CA` 的公钥解密签名，获得服务器信息的摘要，如果和证书上记录的服务器信息的摘要一致，说明服务器信息是经过 `CA` 认可的**

> 什么是信息摘要？ 简单来说，就是一段任意长的数据，经过信息摘要处理后，可以得到一段固定长度的数据，比如 `32` 字节，只要原始数据有任意变动，生成的信息摘要都不一样

但是，在第`5`步骤又有一个新问题：客户端怎么知道 `CA` 的公钥？

**答案：与生俱来**

世界上的`根 CA` 就那么几家，浏览器或者操作系统在出厂的时候，已经内置了这些机构的自签名证书，上面记录他们的公钥信息，你也可以在需要的时候手动安装 `CA` 证书

以 `Windows` 系统为例：

![系统信任的根证书](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/aedcef00bfc42c041b14~tplv-t2oaga2asx-watermark.awebp)



**至此，HTTPS 通信过程已经很明朗了：**

1. **操作系统/浏览器 自带了 CA 根证书；**
2. **客户端因此可以验证服务器发送的证书真实性，从而获取到服务器的公钥；**
3. **有了服务器的公钥，客户端就可以把 Pre-Master-Key 传送给服务器；**
4. **服务器获取到 Pre-Master-Key 后，通过后续产生的对称密钥，就可以和客户端加密通信了。**

### 总结

本文简述了 HTTPS 通讯过程的基本原理，涉及到了对称加密、非对称加密、信息摘要、签名、密钥交换等技术基础，以及发行机构、数字证书等概念

具体的 HTTPS 实现细节还要复杂得多，这里并没有展开讲，但是并不影响对 HTTPS 不熟悉的读者对原理有基本的认知

### 参考文献

- 传输层安全协议规范 [tools.ietf.org/html/rfc524…](https://link.juejin.cn/?target=https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc5246)
- HTTPS 连接前的几毫秒发生了什么 [www.moserware.com/2009/06/fir…](https://link.juejin.cn/?target=http%3A%2F%2Fwww.moserware.com%2F2009%2F06%2Ffirst-few-milliseconds-of-https.html)
- 查看 Windows 系统根证书 [technet.microsoft.com/zh-cn/libra…](https://link.juejin.cn/?target=https%3A%2F%2Ftechnet.microsoft.com%2Fzh-cn%2Flibrary%2Fcc754841.aspx)

> 还有问题？ 联系作者微博/微信 @Ceelog

