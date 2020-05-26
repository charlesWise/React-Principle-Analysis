export function setProps(dom, oldProps, newProps) {
  for (const key in oldProps) {
    
  }
  for (const key in newProps) {
    if (key !== 'children') {
      setProp(dom, key, newProps[key]);
    }
  }
}

function setProp(dom, key, value) {
  if (/^on/.test(key)) { // 事件
    dom[key.toLowerCase()] = value;
  } else if (key === 'style') {
    if (value) {
      for (const styleName in value) {
        dom.style[styleName] = value[styleName];
      }
    }
  } else {
    dom.setAttribute(key, value);
  }
}