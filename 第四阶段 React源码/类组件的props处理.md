类组件的props处理


1. 在处理类组件时候，传递任意属性
2. 根据经验，实例化类组件时候可以通过this.props来拿到传递的属性，例如name是张三，age是20
3. 在使用props属性时候，并没有手动添加props，
   设计思路是
   1.在定义组件时候，由于定义的是一个子类，继承了Tiny.react父类
   2. 可以在子类中，调用父类，在子类中传递props给父类，
   3. 在父类在执行this.props.name = props
   4. 既然子类继承父类，那么父类中有props，子类也就有了props
   5. 所以在子类中可以使用props，需要在子类中定义constructor，接收props，利用super继承
   6. 在TinyReact文件夹下的Component.js中的Component，子类中调用的super，就是父类的constructor
      在父类的constructor中接收props，并设置this.props=props，子类就可以拿到