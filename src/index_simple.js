import React from './react';
import ReactDOM from './react-dom';

const style = { border: '3px solid red', margin: '5px'};
const element = (
  <div id="A1" style={style}>
    <div id="B1" style={style}>
      <div id="C1" style={style}></div>
      <div id="C2" style={style}></div>
    </div>
    <div id="B2" style={style}></div>
  </div>
)

ReactDOM.render(
  element,
  document.getElementById('root')
);