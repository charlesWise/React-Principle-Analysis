import { TAG_ROOT } from './constants';
import { scheduleRoot } from './schedule';

/**
 * render是把一个元素渲染到一个容器内部
 * @param {*} element 
 * @param {*} container 
 */
function render(element, container) {
  let rootFiber = {
    tag: TAG_ROOT, // 每个fiber会有一个tag标记，此元素到类型
    stateNode: container, // 一般情况下如果这个元素是一个原生节点到话，stateNode指向真实DOM元素
    // props.children是一个数组，里面放的是React元素，虚拟DOM；后面会根据每个React元素创建对应的Fiber元素
    props: { children: [element] } // 这个fiber到属性对象有个children属性，里面放的是要渲染的元素
  }

  // rootFiber创建之后准备渲染、调度
  scheduleRoot(rootFiber); // 即从根节点开始遍历（A1）渲染
}

const ReactDOM = {
  render
}

export default ReactDOM;

/**
 * reconciler
 * schedule
 */