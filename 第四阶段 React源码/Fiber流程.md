Fiber的执行流程


1. jsx调用render方法转换react.createElement方法返回Virtual DOM节点
2. render方法 向任务队列添加任务，就是通过vdom构建Fiber对象，通过createTaskQueue方法添加任务
3. 使用requestIdleCallback()方法在浏览器空闲执行任务，接收performtask参数，也是一个方法
   在performTask方法中调用workLoop方法，是专门调度任务的逻辑
   先判断任务是否存在，判断SubTask是否有值，没有调用getFirstTask()方法进行第一次调度
   任务存在和浏览器的空闲时间都有就进行while循环，调用subTask = executeTask() 


4. 为每一dom对象构建Fiber对象，Fiber构建是从最外层开始构建
   构建完最外层节点，开始构建子节点，构建完子级节点，构建对应的关系
   只有第一个子节点是父节点的子节点，第二个是第一个子级的下一个兄弟节点
   构建完成之后，会去找父级节点的第一个子级节点是否还有子级，如果有进行构建
   构建完成之后，在向下构建子级节点，构建完成之后，在去判断是否还有节点
   没有节点，去找同级的子级，构建完成之后，在向上找，找到同级的节点进行调用
   直到构建完成
   
