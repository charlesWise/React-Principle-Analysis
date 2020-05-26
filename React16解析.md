### createRef
```
class App extends React.Component {
  constructor() {
    this.ref = React.createRef()
  }

  render() {
    return <div ref={this.ref} />
    // or
    return <div ref={(node) => this.funRef = node} />
  }
}
```
### Component & PureComponent
```
if (ctor.prototype && ctor.prototype.isPureReactComponent) {
  return (
    !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
  );
}
```
- 检查组件是否需要更新的一个判断，ctor就是你声明的继承自Component or PureComponent的类，他会判断你是否继承自PureComponent，如果是的话就shallowEqual比较state和props
- React中对比一个ClassComponent是否需要更新，只有两个地方：一是看有没有shouldComponentUpdate方法，二就是这里的PureComponent判断
### createContext
- 官方确定17版本将16以前context方案移除
```
const { Provider, Consumer } = React.createContext('defaultValue')

const ProviderComp = (props) => (
  <Provider value={'realValue'}>
    {props.children}
  </Provider>
)

const ConsumerComp = () => (
  <Consumer>
    {(value) => <p>{value}</p>}
  </Consumber>
)
```
### forwardRef
- 用来解决HOC组件传递ref的问题，可以简单理解就是给我们的组件在外部包了一层组件，然后通过...props的方式把外部的props传入到实际组件
```
const TargetComponent = React.forwardRef((props, ref) => (
  <TargetComponent ref={ref} />
))
```
### Fragment StrictMode unstable_AsyncMode unstable_Profiler
- React的组件，其实可以理解为占位符都是Symbol，如StrictMode会让他们的子节点对应的Fiber的mode都变成和他们一样的mode
### createElement & cloneElement & createFactory & isValidElement
- createFactory是用来创建专门用来创建某一类ReactElement的工厂，其实就是绑定了第一个参数的createElement
```
export function createFactory(type) {
  const factory = createElement.bind(null, type);
  factory.type = type;
  return factory;
}
```
- isValidElement验证是否是一个ReactElement
