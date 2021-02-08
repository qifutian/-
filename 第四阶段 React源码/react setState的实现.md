react setState的实现

实现类组件的更新

1. 组件进行更新需要调用setState方法
2. 在react中的Component中定义setState方法，接收state作为参数，state就是在调用时候传入的状态
   子类调用setState时候，setState里的this指向子类的实例对象，使用this.state修改的其实是子类的state值
   使用Object.assign方法将传入的state和原有的state进行合并
   合并完state之后，需要更新页面中的状态，使用this.render获取到最新的dom和旧的dom比对，进行渲染
3. Component类中定义 setDOM方法，通过调用setDOM方法，把对应的dom对象传递到Compoent中
   setDom接收 dom参数， this_dom=dom接收到，定义getDOM返回对应的_dom对象
   在使用时候，需要通过组件的实例对象获取setDOM方法

4. 接下来是实现dom节点的对比，找到最小化差异，进行节点更新最小化操作
   Component中在setState调用diff方法，传入virtual dom和container容器和oldDom，实现对比
   对比完成，直接更新到浏览器中，已经实现类组件的更新  