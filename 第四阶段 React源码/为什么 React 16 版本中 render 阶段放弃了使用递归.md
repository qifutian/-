为什么 React 16 版本中 render 阶段放弃了使用递归

旧版 Stack算法的问题：
stack算法是循环加递归的方式，这种对比方式有一个问题，
就是一旦任务开始无法中断，因为递归需要一层层进入，一层层递归。
如果组件特别多，主线程就会长期调用，只有完成更新才能释放，页面卡顿问题，形象体验



Fiber算法

利用浏览器的空闲时间，拒绝长期占用主线程
放弃递归只采用循环，循环可以中断
将任务才分，成为一个个小任务


实现思路
拆分成两部分
1. 构建Fiber  可以中断
2. 提交Commit  不可中断

DOM第一次渲染： jsx语法 > babel转换成createElement方法 > 返回Virtual DOM > 构建Fiber对象 > 找到每一个Virtual对象，为每一个virtual构建Fiber > 构建Fiber对象存到数组中  > 循环Fiber数组，将Fiber对象存储当前的节点类型应用到真实dom中

更新操作渲染： 对比newFiber 与 oldFiber > 对virtual节点构建Fiber对象 > 循环Fiber数组，找到对应的Fiber类型应用到节点上 > 页面更新
