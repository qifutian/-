react ref的实现

react中可通过ref获取对应的dom对象

1. 实现思路是在创建节点时判断其 Virtual DOM 对象中是否有 ref 属性，如果有就调用 ref 属性中所存储的方法并且将创建出来的DOM对象作为参数传递给 ref 方法，这样在渲染组件节点的时候就可以拿到元素对象并将元素对象存储为组件属性了。

```react
// createDOMElement.js
if (virtualDOM.props && virtualDOM.props.ref) {
  virtualDOM.props.ref(newElement)
}

```

在类组件的身上也可以添加 ref 属性，目的是获取组件的实例对象，比如下列代码中，在 DemoRef 组件中渲染了 Alert 组件，在 Alert 组件中添加了 ref 属性，目的是在 DemoRef 组件中获取 Alert 组件实例对象。

```react
class DemoRef extends TinyReact.Component {
  handle() {
    let value = this.input.value
    console.log(value)
    console.log(this.alert)
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={this.handle.bind(this)}>按钮</button>
        <Alert ref={alert => (this.alert = alert)} />
      </div>
    )
  }
}
```

实现思路是在 mountComponent 方法中，如果判断了当前处理的是类组件，就通过类组件返回的 Virtual DOM 对象中获取组件实例对象，判断组件实例对象中的 props 属性中是否存在 ref 属性，如果存在就调用 ref 方法并且将组件实例对象传递给 ref 方法。

```react
// mountComponent.js
let component = null
  if (isFunctionalComponent(virtualDOM)) {}
	else {
    // 类组件
    nextVirtualDOM = buildStatefulComponent(virtualDOM)
    // 获取组件实例对象
    component = nextVirtualDOM.component
  }
	// 如果组件实例对象存在的话
	if (component) {
   	// 判断组件实例对象身上是否有 props 属性 props 属性中是否有 ref 属性
    if (component.props && component.props.ref) {
      // 调用 ref 方法并传递组件实例对象
      component.props.ref(component)
    }
  }

```
