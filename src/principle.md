#### 初步渲染
- ![Image](../images/08.png)

#### workLoop
- Q：workLoop会不会造成死循环？A：不会，浏览器内部每一秒刷新60帧，eventLoop其实也是一种死循环，都在不停16.6ms执行，所以没事
- Q：render阶段是不是把虚拟DOM渲染到真实DOM？A：不是，生成fiber树，收集副作用列表

- ![Image](../images/09.png)
- ![Image](../images/10.png)