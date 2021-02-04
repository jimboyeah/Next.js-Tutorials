---
title: '👉 A4 换一种组件创建方式'
excerpt: '最简单的组件创建就是在 render() 函数中传入的 HTML 标签，实际上 React 将所字符串、数值、包含字符串或数值的数组都看作是组件，返回这些内容的函数也是组件。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T15:44:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# Without JSX then createClass() 组件创建方式
- https://reactjs.org/docs/react-without-es6.html
- https://reactjs.org/docs/react-without-jsx.html
- https://babeljs.io/repl/

最简单的组件创建就是在 render() 函数中传入的 HTML 标签：

```js
render() {
    return (<div className="demo">暂无数据</div>);
}
```

实际上 React 将所字符串、数值、包含字符串或数值的数组都看作是组件，返回这些内容的函数也是组件。

```js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

除了通过扩展 React.Component 或 PureComponent 的方式，另一创建类组件的方法是通过 React.createClass() 函数：

```tsx
class Hello extends React.Component {
	render() {
		return <div>Hello {this.props.toWhat}</div>;
	}
}

ReactDOM.render(
	<Hello toWhat="World" />,
	document.getElementById('root')
);
```

以上代码经过编译后，得到不含 JSX 的代码:

```ts
class Hello extends React.Component {
	render() {
		return React.createElement('div', null, `Hello ${this.props.toWhat}`);
	}
}

ReactDOM.render(
	React.createElement(Hello, {toWhat: 'World'}, null),
	document.getElementById('root')
);
```

createClass() 这种方法是 JSX 语法经过 Babel 编译后使用的，可以在线尝试 Babel REPL。

- React.createClass() 方法用于生成一个组件类；
- 所有组件类都必须有自己的 render 方法，用于输出组件；
- 假如生成一个组件类 Hello，模板插入`<Hello />`时，会自动生成组件类 Hello 的一个实例
- 组件类的第一个字母必须大写，否则会报错，比如 Hello，不能写成 hello，避免解析成 html 标签
- 组件类里面只能包含一个顶层标签，否则会报错，多个组件可以使用数组包装；
- 组件类对应的标签的用法和 HTML 标签的用法完全一致，可以加入任意的属性；
- 给组件标签添加属性时，需要注意两个地方，就是把 class 属性写成 className，for 属性写成 htmlFor，这是因为 class 和 for 是保留字；

createClass 本质上是一个工厂函数，extends 的方式更加接近最新的 ES6 规范的写法，两种方式在语法上的差别主要体现在方法的定义和静态属性的声明上。

React.createClass 和 extends Component 的区别主要在于：

- 语法区别，扩展类组件在 constructor 构造器来构造默认的属性和状态。
- propType 和 getDefaultProps
- 状态数据对象的处理
- this 绑定
- Mixins 混入

函数方式 React.createClass 创建组件通过 propTypes 属性对象和 getDefaultProps() 方法来设置和获取组件传入参数：

```js
import React from 'react';

const Contacts = React.createClass({  
  propTypes: {
    name: React.PropTypes.string
  },
  getDefaultProps() {
    return {

    };
  },
  render() {
    return (
      <div></div>
    );
  }
});

export default Contacts;  
```

扩展 React.Component 通过设置两个属性 propTypes 和 defaultProps

```ts
import React form 'react';
class TodoItem extends React.Component{
    static propTypes = { // as static property
        name: React.PropTypes.string
    };
    static defaultProps = { // as static property
        name: ''
    };
    constructor(props){
        super(props)
    }
    render(){
        return <div></div>
    }
}
```

React.createClass 通过 getInitialState() 方法返回一个包含初始值的对象

	import React from 'react';
	let TodoItem = React.createClass({
	    // return an object
	    getInitialState(){ 
	        return {
	            isEditing: false
	        }
	    }
	    render(){
	        return <div></div>
	    }
	})

React.Component：通过 constructor 设置初始状态

	import React from 'react';
	class TodoItem extends React.Component{
	    constructor(props){
	        super(props);
	        this.state = { // define this.state in constructor
	            isEditing: false
	        } 
	    }
	    render(){
	        return <div></div>
	    }
	}

为事件绑定处理函数时，根据绑定方式不同，处理函数的 this 是有区别的。

通常的绑定方法有三种：

- Bind methods in the constructor.
- Use arrow functions, e.g. onClick={(e) => this.handleClick(e)}.
- Keep using createReactClass.

在 constructor 中来改变 this.handleClick 执行的上下文，这应该是相对上面一种来说更好的办法，万一我们需要改变语法结构，这种方式完全不需要去改动 JSX 的部分：

	import React from 'react';

	class Contacts extends React.Component {  
	  constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	  }
	  handleClick() {
	    console.log(this); // React Component instance
	  }
	  render() {
	    return (
	      <div onClick={this.handleClick}></div>
	    );
	  }
	}

	export default Contacts;  

React.createClass 会正确绑定 this 引用到组件。 

	import React from 'react';

	const Contacts = React.createClass({  
	  handleClick() {
	    console.log(this); // React Component instance
	  },
	  render() {
	    return (
	      <div onClick={this.handleClick}></div>//会切换到正确的this上下文
	    );
	  }
	});

	export default Contacts;  

如果扩展 React.Component，由于使用了 ES6，这里会有些微不同，属性并不会自动绑定到 React 类的实例上。

	import React from 'react';
	class TodoItem extends React.Component{
	    constructor(props){
	        super(props);
	    }
	    handleClick(){
	        console.log(this); // null
	    }
	    handleFocus(){  // manually bind this
	        console.log(this); // React Component Instance
	    }
	    // WARNING: this syntax is experimental!
	    // Using an arrow here binds the method:
	    handleBlur: () => {  // use arrow function
	        console.log(this); // React Component Instance
	    }
	    render(){
	        return <input onClick={this.handleClick} 
	                      onFocus={this.handleFocus.bind(this)}  
	                      onBlur={this.handleBlur}/>
	    }
	}

Mixins

使用 React.createClass 的话，我们可以在创建组件时添加一个叫做 mixins 的属性，并将可供混合的类的集合以数组的形式赋给 mixins 参数。如果我们使用 ES6 的方式来创建组件，那么 React mixins 的特性将不能被使用了。

	import React from 'react';
	let MyMixin = {
	    doSomething(){}
	}
	let TodoItem = React.createClass({
	    mixins: [MyMixin], // add mixin
	    render(){
	        return <div></div>
	    }
	})
