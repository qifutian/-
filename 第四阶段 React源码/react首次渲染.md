全局暴露render方法

react的jsx第一次渲染

在js中调用

1. 将jsx和dom的根节点传入render方法中
2. render根据传入的元素调用diff方法中
3. diff方法先判断是不是老节点，判断老节点依据是否含有_virtualDOM，
   根据不是老节点判断type类型调用createDOMElement创建对应的真实dom，
   第一次传入的话调用mountElement方法，mountElement使用isFunction方法区分渲染的是组件还是节点，
   组件调用mountComponent方法，节点调用mountNativeElement方法
4. 在createDOMElement方法中先循环加递归的方式将所有子节点添加到根节点的子节点数组中，
   判断传入的type是文本类型还是元素节点，调用对应的方法，在递归创建子节点，
   并且将child是布尔值或null处理，将其转换为textContent属性，
   最后将其转为virtual DOM return掉
5. 回到diff方法向下执行，如果是组件，调用diffComponent方法，
   如果是文本节点或者元素节点，为其更新内容或是元素的属性，
6. 并在updateNodeElement方法处理属性时候，如果是特殊值on，addeventlisten添加方法，如果是value，checked等特殊处理
   其余的使用setAttribute方法添加属性
7. 在mountComponent中进行处理类组件和函数组件的细化，判断原型上是否有render方法，render方法是类组件，没有是函数组件
   函数组件设置type是virtual DOM传入的props，类组件设置type的props和调用render方法
   如果渲染的组件又返回了函数，再次调用mountComponent，
   如果不是函数，就调用mountNativeElement，说明已经可以开始渲染了，获取到组件的实例对象，类组件的话调用setDom方法将dom对象存到类组件的实例对象
   如果是类组件，调用componentDidMount方法初次渲染



