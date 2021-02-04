---
title: '👉 A5 触发更新渲染'
excerpt: '出于性能考虑，Render() 函数是有条件触发的，对于类组件，这个过程还涉及组件生命周期的细节。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T15:44:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

## Rendering 触发更新渲染
- React v16.6.0: lazy, memo and contextType https://reactjs.org/blog/2018/10/23/react-v-16-6.html
- Hooks FAQ: How do I implement shouldComponentUpdate? https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate
- Dive into React codebase: Handling state changes https://reactkungfu.com/2016/03/dive-into-react-codebase-handling-state-changes/
- Optimizing Performance https://reactjs.org/docs/optimizing-performance.html

前面解析了 React 的渲染基本流程，这里将重点放在渲染控制上。React 渲染就是执行元素的渲染函数的过程，对于类组件，就是 render() 成员函数，对于函数式组件就是它本身，对于 HTML 元素则直接解析成虚拟节点再构造成真实的 DOM 节点。

但是出于性能考虑，Render() 函数是有条件触发的，对于类组件，这个过程还涉及组件生命周期的细节：

+ 首次渲染 Initial Render，即元素第一次被呈现在页面时触发；
+ 调用 this.setState() 更新组件状态，不会立即触发，React 会优化在适当时机执行；
+ 更新父组件状态时，通常会修改子组件的 props 属性来传递数据，使得子组件状态被动更新；
+ 如果父组件触发了 render(), 基本上子组件也会相应触发 render()；
+ 调用组件的 this.forceUpdate() 或 forcereload() 进行强制渲染；
+ 调用 ReactDOM.unmountComponentAtNode() 销毁组件再重新渲染；

渲染时机的控制是很大的一个知识点，涉及到性能优化的方方面面，特别是越大的工程，优化需求越迫切。这需要熟练地使用 React 的各种调优技术。

React 组件大概分为三种类型：

- HTML 标签组件，正确来讲是 Element；
- StatelessComponent 无状态组件，或称为函数式组件，包括高阶函数组件 HOC - High Order Components；
- React.Component 和 PureComponent 两种有状态的类组件，它们包含完整的组件生命周期函数；


比如，一定要使用类组件时，可以考虑使用 PureComponent 类组件替代 Component 类组件，两者表现基本都一样。只是在 shouldComponentUpdate 方法的实现逻辑上不一样，Component 的实现只是简单返回 true。而 PureComponent 的实现对 props、state 进行浅比较 shallow comparison，如果组件的 props 和 state 都没发生改变就不执行渲染，包括 componentWillUpdate 和 componentDidUpdate 函数都不执行。这样过滤了不必要行为来提高性能，但该组件也具有一定的缺陷，因为它只能进行一层浅比较。简单来说，它只比较 props 和 state 的内存地址，如果内存地址相同，就返回 false 不执行重绘。

React 定义了生命周期的接口 ComponentLifecycle，所有相关的生命周期函数都是接口给定的，这部分专门在组件的状态与生命周期中解析。

参考 ReactBaseClasses 源代码：

	// react-17.0.0\packages\react\src\ReactBaseClasses.js
	/**
	 * Convenience component with default shallow equality check for sCU.
	 */
	function PureComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  // If a component has string refs, we will assign a different object later.
	  this.refs = emptyObject;
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
	pureComponentPrototype.constructor = PureComponent;
	// Avoid an extra prototype jump for these methods.
	Object.assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = true;

	export {Component, PureComponent};



如果使用函数式组件，从本质上来说，无状态组件就是一个 render 纯函数，可以搭配 Hooks API 使用。

- ✅ React.memo() 缓存函数式组件增强性能，这是一个高阶函数组件；
- ✅ React.useMemo() 对函数式组件启用缓存增强性能，这是 React 提供的一个 Hooks API；
- ✅ React.lazy() 使用 <Suspense /> 进行代码拆分和懒加载，参考 Code-Splitting 文档；
- ✅ 类组件能通过 shouldComponentUpdate 依据 props 和 state 决定是否执行 render。
- ✅ 函数式组件通过 React 16.6.0 提供的 React.memo() 高阶组件封装获得依据 props 决定是否执行 render 的能力。

其中 memo() 和 lazy()，React 16.6.0 发布更新了两个新的重要功能，此外还引入其它多个 Hooks API。旧版本 React 中，因为函数式组件没有状态管理，不适用 setState 方式更新组件状态，而新版本引入了 useState() 使用函数式组件也能像类组件一样使用状态管理函数。

当工程规模、依赖组件达到一定量之后，打包后的文件也会随之增大而使得页面不能一次过加载所有内容，在浏览某个页面的时候也并不需要一次性加载所有内容，只需要当前页面的资源即可，此时可以参考本文档实现静态资源的切割及按需加载。

以下示范 React.lazy() 的使用：

	import React, {lazy, Suspense} from 'react';
	const OtherComponent = lazy(() => import('./OtherComponent'));

	function MyComponent() {
	  return (
	    <Suspense fallback={<div>Loading...</div>}>
	      <OtherComponent />
	    </Suspense>
	  );
	}

函数原型参考：

    function lazy<T extends ComponentType<any>>(
        factory: () => Promise<{ default: T }>
    ): LazyExoticComponent<T>;


React.memo() 和 PureComponent 很相似，它帮助我们控制何时重新渲染组件。

	class Child extends React.PureComponent {
	    render(){
	        return (
	            <div>I am update at {Date.now()/1000}</div>
	        )
	    }
	}

	const MyFC = React.memo(function MyFC(props) {
	    return (
	        <div>I am update at {Date.now()/1000}, only if props change</div>
	    )
	});

注意，React.memo() 是高阶函数组件 HOC，经过它封闭的函数组件还是函数组件，但组件仅在它的 props 发生改变的时候进行重新渲染。通常来说，在组件树中 React 组件，只要有变化就会走一遍渲染流程。但是通过 PureComponent 和 React.memo()，我们控制组件的渲染流程。

React.memo() 接受第一个参数为纯函数的组件，第二个参数传入一个比较函数，用于对比 props 控制是否刷新，与 shouldComponentUpdate() 功能类似，所以 React.memo 可以看作是 PureComponent 一样的组件。React.memo() 封装函数式组件，被封装的组件依旧保持原有的函数特性，这就是高阶函数 HOC 的意义。

React.memo() 和 useMemo 命名上很相似，功能上很是相似的，都是提供组件缓存功能。但是，可以给 memo() 的第二个参数传入一个状态比较函数，判断相同就不重新渲染，而 useMemo() 本身有比较函数，只需传入依赖的状态数据列表，是一个数组。

	const Button = React.memo((props) => {
	  // your component
	});

	function Parent({ a, b }) {
	  // Only re-rendered if `a` changes:
	  const child1 = useMemo(() => <Child1 a={a} />, [a]);
	  // Only re-rendered if `b` changes:
	  const child2 = useMemo(() => <Child2 b={b} />, [b]);
	  return (
	    <>
	      {child1}
	      {child2}
	    </>
	  )
	}

参考 React.memo 原型：

	export function memo<Props>(
	  type: React$ElementType,
	  compare?: (oldProps: Props, newProps: Props) => boolean,
	)

上线体验 https://codepen.io/jeango/full/XWjLaLO
