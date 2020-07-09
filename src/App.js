import React from 'react';
import UseStateHook from './hooks/useStateHook';
import UseEffectHook from './hooks/useEffectHook';
import UseRefHook from './hooks/useRefHook';
import UseContextHook from './hooks/useContextHook';
import UseMemoHook from './hooks/useMemoHook';
import UseCallbackHook from './hooks/useCallbackHook';

const App = () => {
  return (
    <div className="App">
      <UseStateHook />
      <UseEffectHook />
      <UseRefHook />
      <UseContextHook />
      <UseMemoHook />
      <UseCallbackHook />
    </div>
  )
}

export default App;


// class App extends React.Component {
//   componentDidMount() {
//     console.log(this, this._reactInternalFiber)
//   }
//   render () {
//     return (
//       <div className="App">
//         <UseStateHook />
//       </div>
//     )
//   }
// }