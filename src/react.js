import { ELEMENT_TEXT } from './constants';

/**
 * 创建元素方法
 * @param {*} type 元素标签 div span
 * @param {*} config 配置对象 属性key ref
 * @param  {...any} children 这里统一数组
 */
function createElement(type, config, ...children) {
  delete config.__self;
  delete config.__source;
  return {
    type,
    props: {
      ...config,
      children: children.map(child => {
        return typeof child === 'object' ? child : {
          type: ELEMENT_TEXT,
          props: { text: child, children: [] }
        }
      })
    }
  }
}

const React = {
  createElement
}

export default React;