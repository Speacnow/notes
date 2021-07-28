**弊端:**

- Expires返回的是服务器的时间，但判断的时候用的却是客户端的时间，这就导致Expires很被动，因为用户有可能改变客户端的时间，导致缓存时间判断出错，这也是引入Cache-Control:max-age指令的原因之一。

#### cache-control: max-age

为了解决expires存在的问题，Http1.1版本中提出了cache-control:max-age，该字段与expires的缓存思路相同，都是设置了一个过期时间，不同的是max-age设置的是**相对缓存时间开始往后的多少秒，因此不再受日期不准确情况的影响。**

**优先级:**
在优先级上:`max-<font color='cornflowerblue'>age</>Expires`。当两者同时出现在响应头时,Expires将被max-age覆盖.

**用法:**

```
Cache-control: max-age=666
复制代码
```

<font color='cornflowerblue'>表示资源会在 666 秒后过期，需要再次请求。</font> 

