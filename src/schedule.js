import { TAG_ROOT, ELEMENT_TEXT, TAG_TEXT, TAG_HOST, PLACEMENT } from './constants';
import { setProps } from './utils';

/**
 * 从根节点开始渲染和调度
 * 每次首次渲染和setState渲染都会有两个阶段：
 * diff阶段即render阶段：对比新旧的虚拟DOM，进行增量、更新、创建；
 * 第一次渲染老的vnode是没有就是'render阶段'：
 * 1、可能比较花时间每次都是从根节点开始，所以我们需要对任务进行拆分；
 * 2、拆分维度就是虚拟DOM节点，一个虚拟DOM节点对应一个任务；
 * 3、开始渲染之后启用浏览器分配时间片（每个时间片是16.6ms），分配给你任务就执行任务，然后就是看看有没有时间了，没有时间了就把这个任务的执行权返回给浏览器如果有时间进行下一个任务；
 * 4、此阶段可以暂停
 * render阶段成果是effect list副作用列表（知道那些节点更新、删除、增加）
 * render阶段有两个任务：根据虚拟DOM生成fiber树；收集effectlist
 * 'commit'提交阶段：进行DOM更新创建阶段（会创建DOM生成DOM），此阶段不能暂停，一气呵成。
 */
let nextUnitOfWork = null; // 下一个工作单元，一旦有值了就立马就去执行workLoop，每个时间片就至少执行一次
let workInProgressRoot = null; // RootFiber应用的根 需要一个指针指向根fiber
/**
 * nextUnitOfWork会在随时变化，workInProgressRoot固定可以保存一直找到根
 * @param {*} rootFiber 
 */
export function scheduleRoot(rootFiber) {
  // { tag: TAG_ROOT, stateNode: container, props: { children: [element] } }
  nextUnitOfWork = rootFiber;
  workInProgressRoot = rootFiber;
}
/**
 * 循环执行工作 nextUnitOfWork
 */
function workLoop(deadline) {
  let shouldYield = false; // 是否要让出时间片，默认false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1; // 自定义 执行完一个任务后，如果小于1ms了，就没有时间了就让出时间片
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    console.log('render阶段结束');
    commitRoot();
  }
  // 如果让出时间片（到期了）还有任务没有完成，就需要请求浏览器再次调度
  requestIdleCallback(workLoop, { timeout: 500 }); 
}
function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect;
  while (currentFiber) {
    // console.log(currentFiber)
    commitWork(currentFiber);
    currentFiber = currentFiber.nextEffect;
  }
  workInProgressRoot = null;
}
function commitWork(currentFiber) {
  if (!currentFiber) return;
  let returnFiber = currentFiber.return;
  let returnDOM = returnFiber.stateNode;
  if (currentFiber.effectTag === PLACEMENT) {
    if (returnDOM && currentFiber.stateNode) {
      returnDOM.appendChild(currentFiber.stateNode);
    }
  }
  currentFiber.effectTag = null;
}
function performUnitOfWork(currentFiber) {
  beginWork(currentFiber);
  if (currentFiber.child) { 
    return currentFiber.child;
  }
  while (currentFiber) {
    completeUnitOfWork(currentFiber); // 没有儿子让自己完成
    if (currentFiber.sibling) { // 看看有没有弟弟
      return currentFiber.sibling; // 有返回
    }
    currentFiber = currentFiber.return; // 否则找父亲然后父亲完成
  }
}
/**
 * 在完成的时候要收集有副作用的fiber，然后组成effect list
 * 每个fiber有两个属性 firstEffect指向第一个有副作用的子fiber lastEffect指向最后一个有副作用的fiber
 * 中间的用nextEffect做成一个单链表 firstEffect
 */
function completeUnitOfWork(currentFiber) {
  // 把自己儿子的effect链挂到父亲身上
  let returnFiber = currentFiber.return;
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect;
    }
    if (currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
      }
      returnFiber.lastEffect = currentFiber.lastEffect;
    }
    // 把自己挂到父亲身上
    const effectTag = currentFiber.effectTag;
    if (effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber;
      } else {
        returnFiber.firstEffect = currentFiber;
      }
      returnFiber.lastEffect = currentFiber;
    }
  }
}
/**
 * beginWork开始收下线的钱
 * completeUnitOfWork把下线的钱收完了+自己的钱
 * 1、创建真实DOM元素
 * 2、创建子fiber
 */
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber);
  } else if (currentFiber.tag === ELEMENT_TEXT) { // A1 
    updateHostText(currentFiber);
  } else if (currentFiber.tag === TAG_HOST) { // div
    updateHost(currentFiber);
  }
}
function updateHost(currentFiber) {
  if (!currentFiber.stateNode) { // 没有创建DOM节点
    currentFiber.stateNode = createDOM(currentFiber);
  }
  const newChildren = currentFiber.props.children;
  reconcileChildren(currentFiber, newChildren);
}
function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) { // 如果fiber没有创建DOM节点
    currentFiber.stateNode = createDOM(currentFiber);
  }
}
function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.text);
  } else if (currentFiber.tag === TAG_HOST) { // div
    let stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props); // 更新属性
    return stateNode;
  }
}
function updateDOM(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps);
}
function updateHostRoot(currentFiber) {
  // 先处理自己，如果是一个原生节点创建真实DOM；创建子fiber
  let newChildren = currentFiber.props.children; // [element=<div id="A1" ...]
  // 创建子tag 调和子节点
  reconcileChildren(currentFiber, newChildren);
}
function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0; // 新子节点的索引
  let prevSibling; // 上一个新的子fiber
  // 遍历我们的子虚拟DOM元素数组，为每个虚拟DOM元素创建子Fiber
  while (newChildIndex < newChildren.length) {
    let newChild = newChildren[newChildIndex]; // 取出虚拟DOM节点
    let tag;
    if (newChild.type === ELEMENT_TEXT) { // 文本 如：A1 B1 ...
      tag = TAG_TEXT;
    } else if (typeof newChild.type === 'string') { // 元素DOM节点 div ...
      tag = TAG_HOST;
    }
    // beginWork把虚拟DOM转化fiber  completeUnitOfWork的时候收集effect
    let newFiber = {
      tag,
      type: newChild.type, // div
      props: newChild.props,
      stateNode: null, // div还没有创建DOM元素
      return: currentFiber, // 父Fiber
      effectTag: PLACEMENT, // 副作用标识 render我们要会收集副作用 增加 删除 更新
      nextEffect: null // effect list也是单链表，完成顺序是一样的，但是节点只放那些出钱的人的fiber节点，不出钱绕过去
    }
    if (newFiber) {
      if (newChildIndex === 0) { // 说明是第一个儿子
        currentFiber.child = newFiber;
      } else {
        prevSibling.sibling = newFiber;
      }
      prevSibling = newFiber;
    }
    newChildIndex++;
  }
}
/**
 * 浏览器的调度，react告诉浏览器现在有任务在你闲的时候，每个时间片16.6，如果浏览器执行浏览器主任务花6ms剩下的就是空闲时间
 * 这里有个复杂概念，有个优先级的概念expirationTime，优先级调度
 * 告诉浏览器在你空闲的时候调workLoop，但是如果已经超过了500ms你还没有调，这种情况不管浏览器是否有时间就必须得调
 */
requestIdleCallback(workLoop, { timeout: 500 });