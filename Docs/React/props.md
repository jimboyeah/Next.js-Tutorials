---
title: '👉 A6 组件与属性'
excerpt: 'React 类型定义中，类组件是泛型实现，其中 P、S、SS 参数对应的是 Props, State 和 getSnapshotBeforeUpdate 方法相关的 SnapShot。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T15:44:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

## 组件与属性
- React Components, Elements, and Instances https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html

前面已经解析过 React 组件大概分为三种类型：

- HTML 标签，正确来讲是 Element 不是组件，但当作组件来使用也没什么不对；
- FunctionComponent 函数式组件，或称无状态组件，包括高阶函数组件 HOC - High Order Components；
- React.Component 和 PureComponent 两种有状态的类组件，它们包含完整的组件生命周期函数；

使用组件概念的目的就是为了提高软件的复用，如果不能高效得利用组件，那它就是一个失败的组件。

React 类型定义中，类组件是泛型实现，其中 P、S、SS 参数对应的是 Props, State 和 getSnapshotBeforeUpdate 方法相关的 SnapShot：

    class Component<P, S> { ... }

    interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }
    interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {...}


在 React 中，组件一般有两种形式：函数组件和类组件，前者就是一个函数就可以当一个组件。

	// 类组件
	class MyClassComp extends React.Component {
		render () {
			return <div className="my-comp"></div>
		}
	}

	// 函数组件
	const MyPureFuncComp = () => (
		<div className="my-comp"></div>
	)

在 React 系统内，函数即组件！React 要使用函数作为组件的最小单元，函数式组件没有自己的 State ，因为函数式组件其实是一个只实现了 render 函数的组件。


比如，官网文档中的一个评论组件的反面示范：

	function Comment(props) {
	  return (
	    <div className="Comment">
	      <div className="UserInfo">
	        <img
	          className="Avatar"
	          src={props.author.avatarUrl}
	          alt={props.author.name}
	        />
	        <div className="UserInfo-name">
	          {props.author.name}
	        </div>
	      </div>
	      <div className="Comment-text">{props.text}</div>
	      <div className="Comment-date">
	        {formatDate(props.date)}
	      </div>
	    </div>
	  );
	}

对于一个组件来说，结构太复杂了，需要细化组件的功能，尽量功能保持单纯，比如用户信息部分就可以取作为两个组件来实现：

	function Avatar(props) {
	  return (
	    <img className="Avatar"
	      src={props.user.avatarUrl}
	      alt={props.user.name}
	    />
	  );
	}

	function UserInfo(props) {
	  return (
	    <div className="UserInfo">
	      <Avatar user={props.user} />
	      <div className="UserInfo-name">
	        {props.user.name}
	      </div>
	    </div>
	  );
	}

	function Comment(props) {
	  return (
	    <div className="Comment">
	      <UserInfo user={props.author} />
	      <div className="Comment-text">{props.text}</div>
	      <div className="Comment-date">
	        {formatDate(props.date)}
	      </div>
	    </div>
	  );
	}

再组合后，就构成全功能的一个组件，还可以用在其它页面上，这就是组件的复用，这种组件组合的思想是 React 的基本设计理念。


React 提供了函数式组件的内部定义，React 16.7 - React.SFC 是过时 API，最新的是 React.FC，可以替换使用，本质上是 Hooks 函数。请注意 React.SFC 是 React.StatelessComponent 的别名，React.FC 是 React.FunctionComponent 的别名。 

	const example: React.StatelessComponent<IProps> = ({props}) => ();
	const example: React.SFC<IProps> = ({props}) => ();

	const example: React.FunctionComponent<IProps> = ({props}) => ();
	const example: React.FC<IProps> = ({props}) => ();

函数组件也叫无状态组件 StatelessComponent，可以返回除对象类型外的 HTML 标签、字符串、数值等基础类型或类组件，或包含这些类型的数组，都是正确的。无状态组件概念 Stateless Component 除了父组件传入的属性 props，它不应该再依赖其他的任何的全局变量，它不应该维护自己的 state。因此无状态组件加载后不应该再更改其视图，不应该对无状态组件进行重绘。或者说需要重绘的组件就不应该使用无状态组件，而应该使用类组件。

以下类型定义信息来自 @types/react。可以看到 SFC 或 StatelessComponent 即无状态组件已经弃用，改用 FunctionComponent：

    /**
     * @deprecated as of recent React versions, function components can no
     * longer be considered 'stateless'. Please use `FunctionComponent` instead.
     *
     * @see [React Hooks](https://reactjs.org/docs/hooks-intro.html)
     */
    type SFC<P = {}> = FunctionComponent<P>;

    /**
     * @deprecated as of recent React versions, function components can no
     * longer be considered 'stateless'. Please use `FunctionComponent` instead.
     *
     * @see [React Hooks](https://reactjs.org/docs/hooks-intro.html)
     */
    type StatelessComponent<P = {}> = FunctionComponent<P>;

    type FC<P = {}> = FunctionComponent<P>;

    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement | null;
        propTypes?: WeakValidationMap<P>;
        contextTypes?: ValidationMap<any>;
        defaultProps?: Partial<P>;
        displayName?: string;
    }

所有组件都可以接收任意属性数据，通常使用命名为 props 的变量进行传递，需要注意的是，组件属性数据永远是单向流动的，从父组件流向子组件。子组件修改 props 的数据并不会反馈到父组件，这很好理解，就像函数传值调用一样，所以组件对 props 属性的访问是只读的 Read-Only。虽然，JavaScript 这里传递的是对象引用，但是在 React 内部并不难将这个引用的对象做一次完整拷贝，使原来传入的对象引用失去作用，所以在子组件中修改 props 只在子组件中生效。

在项目中会有组件间的数据通讯需要，在这种单向的数据流约束下，有不同情形及相应的处理：

+ 父组件向子组件通信：直接给子组件传递 props；
+ 子组件向父组件通信：将回调函数通过 props 传入子组件；
+ 跨级组件间通信：使用 Context 对象，参考 Hooks API useContext()；
+ 非嵌套组件间通信：使用事件订阅编程模式 EventBus；
+ 使用浏览器提供的 localStorage、sessionStorage 本地存储服务...

浏览器本地存储服务大约有 5MB 容量，示范：

	// 当前会话数据存储服务
	sessionStorage.setItem("lastname", "Smith");
	sessionStorage.getItem("lastname");

	// 本地存储存储服务
	localStorage.setItem("lastname", "Smith");
	localStorage.getItem("lastname");


和组件属性相对的是状态数据，就是称为 state 的状态数据，它需要通过专属的 API 来设置才能触发组件状态的更新。

组件可以选择把它的 state 作为子组件的 props 向下传递到它的子组件中：

	<h2>It is {this.state.date.toLocaleTimeString()}.</h2>

这对于自定义组件同样适用：

	<FormattedDate date={this.state.date} />

FormattedDate 组件会在其 props 中接收参数 date，但是组件本身无法知道它是来自于 Clock 的 state 或 props，还是手动输入的：

	function FormattedDate(props) {
	  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
	}


最简单的子组件向父级传递数据的方法，是在父组件中给子组件属性中设置回调函数，即 React 官方文档中所说的组件状态提升 Lifting State Up。官方提供的例子演示了摄氏度 Celsius 和华氏度 Fahrenheit 换算，子组件通过调用 onTemperatureChange 设置的回调函数向父组件报告输入的温度。

去 CodePen 交互体验 https://codepen.io/gaearon/pen/WZpxpz?editors=0010
