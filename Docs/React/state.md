---
title: '👉 A7 组件状态与生命周期'
excerpt: 'React 类型定义中，类组件是泛型实现，其中 P、S、SS 参数对应的是 Props, State 和 getSnapshotBeforeUpdate 方法相关的 SnapShot。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T15:44:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

## State & Lifecycle 组件状态与生命周期
- [State & 生命周期](https://react.docschina.org/docs/state-and-lifecycle.html)
- [React源码分析3 — React生命周期详解](https://zhuanlan.zhihu.com/p/25882388)
- [React Lifecycle Diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- React Component https://react.docschina.org/docs/react-component.html
- Update on Async Rendering https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
- React.Component 文档较少使用的几个生命周期方法 http://www.ptbird.cn/react-component-rarely-lifecycle-methods.html
- You Probably Don't Need Derived State https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
- React PureComponent 及浅比较详解 https://juejin.cn/post/6844903784104067086
- Fetch API https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API

前面解析了 PureComponent 和 Component 类组件的主要差异在 shouldComponentUpdate 方法的实现逻辑上不一样，Component 的实现只是简单返回 true。而 PureComponent 的实现对 props、state 进行浅比较 shallow comparison，如果组件的 props 和 state 都没发生改变就不执行渲染，包括 componentWillUpdate 和 componentDidUpdate 函数都不执行。这样过滤了不必要行为来提高性能，但该组件也具有一定的缺陷，因为它只能进行一层浅比较。简单来说，它只比较 props 和 state 的内存地址，如果内存地址相同，就返回 false 不执行重绘。

理解组件生命周期函数，才能正确管理组件内部的状态数据。实际生产开发更多是使用其内部定义的基本生命周期函数，包括构造函数，componentDidMount 和 componentWillUnmount 生命周期函数。

在旧版本 React 中，无状态组件不支持 ref，因为在 React 调用到无状态组件的方法之前，是没有一个实例化的过程的，因此也就没有所谓的 ref。无状态组件就剩了一个 render 方法，因此也就没有没法实现组件的生命周期方法。

但是 React 16 发布引入了 Hooks API，其中有 useState 和 useReducer 等，这使得函数组件也能封装成有状态组件，所以有状态组件或无状态组件的概念越来越弱化了。而 React 新引入的 Hooks API 使用函数式编程越来越便利。，如 React.memo() 可以实现类似 PureComponent 的函数式组件，函数式组件 FunctionComponent 对象的实现就是基于 props 属性的，但是和类组件的功能越来越相似。


关于 setState() 你应该了解不要直接修改 State，而是应该使用 setState()。

	// Wrong
	this.state.comment = 'Hello';

	// Correct
	this.setState({comment: 'Hello'});

状态数据是 Immutable Data，一旦创建就不能再被更改的数据，对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 Persistent Data Structure 持久化数据结构，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing 结构共享，即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

React 管理组件属性数据也会使用 Immutable Data，如下面的示例，如果直接将 css 样式变量绑定到组件属性将使 css 封装成只读数据： 

	let css = {
	    display: 'block',
	    background: 'yellow',
	}

	const UseLayoutEffect: React.FC<any> = ({children}) => {
	    const box = useRef<HTMLDivElement>(null);
	    useLayoutEffect(() => {
	        let div = box.current!;
	        console.log('useLayoutEffect');
	        animate(box.current!.style, 'marginLeft', div.offsetLeft, 100, 'px');
	    }, []);
	    // css will be immutatble if bind to div.style directly.
	    css.background = 'yellow';
	    return (
	    <div id="useLayout" style={{...css, background: 'yellow'}} ref={box}>{children} </div>
	    );
	};


构造函数是唯一可以给 this.state 赋值的地方。出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。 State 的更新可能是异步的，this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：

	// Wrong
	this.setState({
	  counter: this.state.counter + this.props.increment,
	});

要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

	// Correct
	this.setState((state, props) => ({
	  counter: state.counter + props.increment
	}));

上面使用了箭头函数，不过使用普通的函数也同样可以：

	// Correct
	this.setState(function(state, props) {
	  return {
	    counter: state.counter + props.increment
	  };
	});

State 的更新会被合并，当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。

例如，你的 state 包含几个独立的变量：

	  constructor(props) {
	    super(props);
	    this.state = {
	      posts: [],
	      comments: []
	    };
	  }

然后你可以分别调用 setState() 来单独地更新它们：

	  componentDidMount() {
	    fetchPosts().then(response => {
	      this.setState({
	        posts: response.posts
	      });
	    });

	    fetchComments().then(response => {
	      this.setState({
	        comments: response.comments
	      });
	    });
	  }


### ☛ LifeCycle 函数

整个 React 生命周期分 3 个阶段：创建、更新、卸载，每个阶段有对应的工作和方法。


	------------------------ Mounting ----------------  Updating ------------------- Unmounting --
	                            |                                                         |
	“Render phase”          constructor()   New props   setState()  forceUpdate()         |
	Pure and has no             |               |           |             |               |
	side effects.           ===============getDerivedStateFromProps==============         |
	May be paused,              |                     |                                   |
	aborted orrestarted         |             shouldComponentUpdate                       |
	by React.                   |                     |                                   |
	                        =======================render========================         |
	----------------------------|------------------------------|--------------------------|-------
	                            |                              |                          |
	“Pre-commit phase”          |                     getSnapshotBeforeUpdate             |
	Can read the DOM.           |                              |                          |
	                        ===============React updates ­D­O­M and refs============         |
	----------------------------|------------------------------|--------------------------|--------
	                            |                              |                          |
	“Commit phase”          componentDidMount        componentDidUpdate        componentWillUnmount
	
	Can work with DOM, run side effects, schedule updates.
	-----------------------------------------------------------------------------------------------


	生命周期函数								调用次数					能否使用setSate()
	constructor(props)						1(实例化时调用)			  ✗
	getDefaultProps()						1(creatClass()初始化)	  ✗
	getInitialState()						1(creatClass()初始化)	  ✗
	componentWillMount()					1(组件加载前)			✓
	getDerivedStateFromProps				>=1						  ✗
	render()								>=1(组件渲染时)			  ✗
	componentDidMount()						1(组件加载时)			✓
	componentWillReceiveProps(nextProps)	>=0(props数据更新)		✓
	shouldComponentUpdate(nextProps)		>=0						  ✗
	componentWillUpdate(nextProps)			>=0						  ✗
	getSnapshotBeforeUpdate					>=0						  ✗
	componentDidUpdate(nextProps)			>=0						  ✗
	componentWillUnmount()					1						  ✗

React 定义的生命周期接口主要由 ComponentLifecycle 和 NewLifecycle、 DeprecatedLifecycle 两个基础接口组件，后两者分别表示新 API 和旧 API 集合，ComponentLifecycle 定义最基本的生命周期 API，这些代码组织方式都在明确告知开发者该如何去用好它们：

    interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
    }

    interface NewLifecycle<P, S, SS> {
        getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;
        componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
    }

    interface StaticLifecycle<P, S> {
        getDerivedStateFromProps?: GetDerivedStateFromProps<P, S>;
        getDerivedStateFromError?: GetDerivedStateFromError<P, S>;
    }

    type GetDerivedStateFromProps<P, S> =
        (nextProps: Readonly<P>, prevState: S) => Partial<S> | null;
    type GetDerivedStateFromError<P, S> =
        (error: any) => Partial<S> | null;

    interface DeprecatedLifecycle<P, S> {
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    }


这些内容在 ReactDom 的 TypeScript 类型声明文件中有明确的说明，使用带有 UNSAFE 前缀的函数表示开发者明白做什么，React 不会在控制台中给提示信息。如果在 VSCode 或 Sublime 等编辑器中安装好 TypeScript 支持插件，在编写这样方法时会将注解的内容提示出来：

	@types\react-dom\node_modules\@types\react\index.d.ts

像 componentWillMount 或者 componentWillReceiveProps 这些过时 API 建议使用 getSnapshotBeforeUpdate 或静态该当 getDerivedStateFromProps 替代。


☛ Lifecycle 第一阶段

这是虚拟 DOM 创建的阶段，会依次执行数个方法，这些方法除了 render 方法，其余基本上在整个生命周期中只调用 1 次，而且一定会调用 1 次：

- **constructor()** 执行组件构造函数，初始化实例对象；
- **getDefaultProps()** 从此方法获取组件默认属性设置，函数没有参数，对 createClass() 创建的组件有效，否则使用 defaultProps 静态成员设置默认属性参数；
- **getInitialState()** 从此方法获取组件的初始状态数据，函数没有参数，对 createClass() 创建的组件有效，否则使用 state 成员设置状态数据；
- **componentWillMount()** 过时 API，可用来修改 state。React 先调用父组件的这个函数，再调用子组件的这个函数；
- **render()** 开始组件渲染函数，返回一个只有一个根节点的虚拟 DOM。该函数中不能同步的修改组件的状态(state)。
- **componentDidMount()** 在 render 渲染之后，通知组件已经加载完成。React 先调用子组件的这个函数，再调用父组件的这个函数。

执行创建阶段的任务后，组件就可以和其他框架交互了，比如设置计时器或者发起网络请求等等耗时的操作都可以在 componentDidMount() 中进行。

DeprecatedLifecycle 接口定义的生命周期函数已经弃用，建议转换到新的 NewLifecycle API。

新 API 的静态函数 getDerivedStateFromProps 会在组件实例化后，渲染之前或者更新渲染之前执行，要求它返回一个对象或来更新 state，或者返回 null 表示新的 props 没有可以可新的状态数据。无论是旧的 componentWillReceiveProps 还是新的 getDerivedStateFromProps，它们都是复杂的函数实现，实际应用中尽量避免使用。

唯一 getDerivedStateFromProps 存在的理解是，组件可以根据组件接收到的属性数据来更新其内部的状态数据，即派生方案 Derived State。不推荐使用派生 state 方案，这会导致代码冗长，并且会使得组件变的难以理解。

注意，前面提到的静态生命周期接口提供了两个函数，一旦在组件中定义了 StaticLifecycle 接口中的任意一个函数，就表示不使用过时的生命周期函数，即 DeprecatedLifecycle 接口的所以函数都不会被调用。一旦使用了 NewLifecycle 接口的函数，就不能使用 UNSAFE 前缀的过时函数。

另外 getSnapshotBeforeUpdate 和 componentDidUpdate 应该一起搭配使用，前者在最近一次的 render 完将要 commit 给 DOM 的时候会调用，这个方法能够使得组件可以在可能更改之前从 DOM 捕获一些信息，比如滚动的位置等等。这个方法返回的任何值，都会传递给 componentDidUpdate，这几个函数的应用可以完全替换掉旧的 componentWillReceiveProps 函数。

	class ScrollingList extends React.Component {
	  constructor(props) {
	    super(props);
	    this.listRef = React.createRef();
	  }

	  getSnapshotBeforeUpdate(prevProps, prevState) {
	    // 捕获滚动的位置，以便后面进行滚动 注意返回的值
	    if (prevProps.list.length < this.props.list.length) {
	      const list = this.listRef.current;
	      return list.scrollHeight - list.scrollTop;
	    }
	    return null;
	  }

	  componentDidUpdate(prevProps, prevState, snapshot) {
	    // 如果有 snapshot 会进行滚动的调整，这样子就不会立即将之前的内容直接弹上去
	    if (snapshot !== null) {
	      const list = this.listRef.current;
	      list.scrollTop = list.scrollHeight - snapshot;
	    }
	  }

	  render() {
	    return (
	      <div ref={this.listRef}>{/* ...contents... */}</div>
	    );
	  }
	}


☛ Lifecycle 第二阶段

此时该组件已经进入了稳定运行阶段，必要时执行组件状态更新流程，这个阶段组件可以处理用户交互，或者接收事件更新界面。

以下方法在整个生命周期中可以执行很多次，也可以一次也不执行：

- **componentWillReceiveProps()** 过时 API，当父容器中对应的参数改变将会调用子组件的该函数。新的 props 将会作为参数传递进来，旧属性可以根据 this.props 来获取。可以在该函数中对 state 作一些处理，并且在该函数中更新 state 不会发生二次渲染；
- **shouldComponentUpdate()** 该函数传递过来两个参数，新的 state 和新的 props，PureComponent 已经实现浅比较，根据比对结果选择更新或者不更新，从而提高效率。
- **componentWillUpdate()** 与 **componentWillMount()** 两个类似的过时 API，都在 render 之前触发，update 方法会接收到新的 props 或者 state，执行时歌词把数据更新到 this.props 和 this.state。
- **componentDidUpdate()** 与 componentDidMount 方法类似，在 render 渲染之后被调用，真实 DOM 生成之后调用该函数。传递过来的参数是之前的 props 和 state。

shouldComponentUpdate 方法只是能够用来优化性能，不能过度依赖它来阻止组件的渲染，因为重写 shouldComponentUpdate 可能会导致 bug，不建议进行深层比较，或者是使用 JSON.stringify，因为效率很低，而且很容易引起性能问题，应该优先使用 PureComponent。需要注意的是，即使 shouldComponent 返回了 false，子组件的状态更新引起的重新渲染是不会受到影响的。


☛ Lifecycle 第三阶段

这就是消亡的阶段，主要进行内存的清理和释放的工作。这个阶段只有一个方法，该方法在整个生命周期内调用且仅调用一次。

	componentWillUnmount()

当组件要被从界面上移除的时候，ReactDOM.unmountComponentAtNode()，就会调用 componentWillUnmount。在这里进行一些相关的销毁操作，比如撤销定时器，事件监听等等。

另外还有两个用于错误处理的函数 componentDidCatch 和 getDerivedStateFromError，React 引入了 Error Boundaries 错误边界的概念，两个方法配合一起使用，以将错误拦截在边界组件上，而不是破坏整个应用。


以下是各个生命周期函数示范：

	import React from 'react';

	interface Props {
	    record?:string[]
	    title?:string
	}
	interface State {
	    record: string[]
	}
	let getTime = ()=>{
	    return new Date().toISOString().substr(11,12)
	}

	export default class LifeCode extends React.Component<Props> {

	    props:Props
	    state:State

	    static record:string[] = []

	    constructor(props: Props){
	        super(props);
	        this.props = props;
	        LifeCode.record.push(getTime()+' Tip: LifeCode constructor');
	        this.state = {record: LifeCode.record};
	    }

	    static getDerivedStateFromProps(props: Props){
	        LifeCode.record.push(getTime()+' Tip: getDerivedStateFromProps');
	        props = {...props, title: 'getDerivedStateFromProps'};
	        return props;
	    }
	    shouldComponentUpdate(nextProps: Props, nextState: State, nextContext: any): boolean {
	        LifeCode.record.push(getTime()+' Tip: shouldComponentUpdate');
	        // check props & state ...
	        return true;
	    }
	    // UNSAFE_componentWillMount(){
	    //   LifeCode.record.push(getTime()+' Tip: componentWillMount');
	    // }
	    // UNSAFE_componentWillUpdate(pp:Props, ps:State){
	    //   LifeCode.record.push(getTime()+' Tip: componentWillUpdate');
	    // }
	    getSnapshotBeforeUpdate(pp:Props, ps:State){
	        LifeCode.record.push(getTime()+' Tip: getSnapshotBeforeUpdate');
	        return {...pp, ...ps}
	    }
	    componentDidMount(){
	        LifeCode.record.push(getTime()+' Tip: componentDidMount');
	    }
	    componentDidUpdate(){
	        LifeCode.record.push(getTime()+' Tip: componentDidUpdate');
	        fetch("https://api.leancloud.cn/1.1/classes/Counter")
	            .then(response => response.json())
	            .then(data => {
	                console.log(data);
	            })
	    }
	    componentWillUnmount(){
	        let msg = getTime()+' Tip: componentWillUnmount';
	        console.log(msg);
	        LifeCode.record.push(msg);
	    }

	    doSetState(ev:React.MouseEvent<HTMLElement, MouseEvent>){
	        LifeCode.record.push(getTime()+' Tip: setState');
	        this.setState({...this.state, title:'setState'});
	    }
	    doForceUpdate(ev:React.MouseEvent<HTMLElement, MouseEvent>){
	        LifeCode.record.push(getTime()+' Tip: forceUpdate');
	        this.forceUpdate();
	    }

	    render(){
	        // readonly props
	        // this.props = this.state;
	        return(
	            <ul>
	            <li>
	                <button onClick={ev => this.doSetState(ev)}>setState</button>
	                <button onClick={ev => this.doForceUpdate(ev)}>forceUpdate</button>
	            </li>
	            {LifeCode.record.map( (it, th) => <li key={th}>{th} - {it}</li>)}
	            </ul>
	        );
	    }
	}


### ☛ shouldComponentUpdate & Object.is

再来看看源代码，shouldComponentUpdate 的内部主要实现在 react-reconciler 模块，主要是 shallowEqual 函数进行比较操作：


	// react-17.0.0\packages\react-reconciler\src\ReactFiberClassComponent.new.js
	function checkShouldComponentUpdate(
	  workInProgress,
	  ctor,
	  oldProps,
	  newProps,
	  oldState,
	  newState,
	  nextContext,
	) {
	  const instance = workInProgress.stateNode;

	  // 执行用户的实现
	  if (typeof instance.shouldComponentUpdate === 'function') {

	    // if (__DEV__) ....
	    const shouldUpdate = instance.shouldComponentUpdate(
	      newProps,
	      newState,
	      nextContext,
	    );

	    // if (__DEV__) ....
	    return shouldUpdate;
	  }

	  // 执行内部的实现
	  if (ctor.prototype && ctor.prototype.isPureReactComponent) {
	    return (
	      !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
	    );
	  }

	  return true;
	}

	// react-17.0.0\packages\shared\shallowEqual.js
	/**
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @flow
	 */

	import is from './objectIs';

	const hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA: mixed, objB: mixed): boolean {
	  if (is(objA, objB)) {
	    return true;
	  }

	  if (
	    typeof objA !== 'object' ||
	    objA === null ||
	    typeof objB !== 'object' ||
	    objB === null
	  ) {
	    return false;
	  }

	  const keysA = Object.keys(objA);
	  const keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  for (let i = 0; i < keysA.length; i++) {
	    if (
	      !hasOwnProperty.call(objB, keysA[i]) ||
	      !is(objA[keysA[i]], objB[keysA[i]])
	    ) {
	      return false;
	    }
	  }

	  return true;
	}

	export default shallowEqual;

其中 Object.is 是同一值比较，这对于 JavaScript 这样的动态语言是个问题，比如 1/0 == 1/-0 或者 NaN == NaN 都返回 false。而 "" == false 或者 "" == [] 比较返回非期望的 true，因为有类型转换。

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x: any, y: any) {
	  return (
	    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
	  );
	}

	const objectIs: (x: any, y: any) => boolean =
	  typeof Object.is === 'function' ? Object.is : is;

	export default objectIs;

Object.is 算法要求符合以下条件：

- both undefined
- both null
- both true or both false
- both strings of the same length with the same characters in the same order
- both the same object (meaning both values reference the same object in memory)
- both numbers and
	- both +0
	- both -0
	- both NaN
	- or both non-zero and both not NaN and both have the same value

MDN 给出一个更容易理解的写法：

	if (!Object.is) {
	  Object.defineProperty(Object, "is", {
	    value: function (x, y) {
	      // SameValue algorithm
	      if (x === y) { // Steps 1-5, 7-10
	        // Steps 6.b-6.e: +0 != -0
	        return x !== 0 || 1 / x === 1 / y;
	      } else {
	        // Step 6.a: NaN == NaN
	        return x !== x && y !== y;
	      }
	    }
	  });
	}

