### 什么是hook
```
Hook增强了函数组件的功能，也是一直单向数据流

```
### 支持情况
```
React 16.8
  - React Server Render
RN 0.59
```
### Function Component和Class Component
**Class component 劣势**
+ 状态逻辑难复用：在组件之间复用状态逻辑很难，可能要用到 render props （渲染属性）或者 HOC（高阶组件），但无论是渲染属性，还是高阶组件，都会在原先的组件外包裹一层父容器（一般都是 div 元素），导致层级冗余趋向复杂难以维护;
+ 在生命周期函数中混杂不相干的逻辑（如：在 componentDidMount 中注册事件以及其他的逻辑，在 componentWillUnmount 中卸载事件，这样分散不集中的写法，很容易写出 bug ）类组件中到处都是对状态的访问和处理，导致组件难以拆分成更小的组件;
+ this指向问题：父组件给子组件传递函数时，必须绑定this。

> 在16.8之前react的函数式组件十分羸弱，基本只能作用于纯展示组件，主要因为缺少state和生命周期。

**hooks优势**
+ 能优化类组件的三大问题
+ 能在无需修改组件结构的情况下复用状态逻辑（自定义 Hooks ）
+ 能将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）
+ 副作用的关注点分离：副作用指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。以往这些副作用都是写在类组件生命周期函数中的。而 useEffect 在全部渲染完毕后才会执行，useLayoutEffect 会在浏览器 layout 之后，painting 之前执行。

**Hooks实现原理**
+ 在上面fiber结构分析可以看出现在的Class component的state和props是记录在fiber上的,在fiber更新后才会更新到component的this.state和props里面，而并不是class component自己调理的过程。这也给了实现hooks的方便，因为hooks是放在function component里面的，他没有自己的this，但我们本身记录state和props就不是放在class component this上面，而是在fiber上面，所以我们有能力记录状态之后，也有能力让function  component更新过程当中拿到更新之后的state。