#### 组织结构
- 1.shared：React框架的公用及常用方法
- 2.core：包含React的边界错误及测试用例
- 3.addons：包含工具方法的插件
- 4.test：包含一些测试方法
- 5.isomorphic ：包含一系列同构方法
- 6.renderers：React代码的核心部分，包含了React的大部分实现。

#### Renderers：包含两个核心目录：dom目录以及share目录
- 一、dom目录：dom目录包含三个模块：client、server和shared
  1.client：client包含很多的dom操作方法（如findDOMNode、setInnerHTML、setTextContent等）以及事件方法，这些事件方法都是一些非底层的事件方法，例如：事件监听（ReactEventListener）、常用事件方法、以及一些合成事件。
  2.server：主要包含服务器渲染的方法。
  3.shared：包含文本组件（ReactTextComponent）、标签组件（RaectDOMComponent）、DOM属性操作（DOMProperty、DOMPropertyOperations）、CSS属性操作等。

- 二、shared目录：shared目录包含event以及reconciler。
  1.event：event包含一些更为底层的事件方法：事件插件中心、事件注册、事件传播以及一些通用的事件通用方法。React自己自定义了一套通用事件的插件系统，该系统包含事件监听器、事件发射器、事件插件中心、点击事件、进\出事件、简单事件、合成事件以及一些事件方法。
  2.reconciler：称为协调器，最核心的部分，包含React自定义组件的实例、组件的生命周期机制、setState机制、DOM diff算法等重要的特性方法。