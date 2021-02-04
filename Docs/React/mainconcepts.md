---
title: '👉 A2 基本概念'
excerpt: '这部分结合官方文档，讲解 React 最基本的概念，分析和理解 React 基本运行流程和基本内部原理，由浅到深掌握 React 的基本实现。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T15:44:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# ⚑ Main Concepts 基本概念
- React on Github https://github.com/facebook/react/
- React.org on Github https://github.com/reactjs/reactjs.org/
- Flow 静态类型检查器 https://flow.org/en/docs/
- Flow 语法检查器在线 AST 支持 https://flow.org/try/
- Flow with React Components https://flow.org/en/docs/react/components/
- Comparison with Facebook Flow Type System #1265 https://github.com/Microsoft/TypeScript/issues/1265
- Compare with Flow & TypeScript https://robin-front.github.io/2017/06/14/compare-with-Flow-and-TypeScript.html
- React Design Principles https://reactjs.org/docs/design-principles.html

这部分结合官方文档，讲解 React 最基本的概念，分析和理解 React 基本运行流程和基本内部原理，由浅到深掌握 React 的基本实现。

作为一个大型工程，React 也使用了静态类型工具来强化 JavaScript 代码的管理，并且是 facebook 自家出品的 Flow 静态类型检查工具。React 的源码使用用了 Flow 做了静态类型检查，所以了解 Flow 有助于我们阅读源码。

Flow 与 Typescript 不同的是，它可以部分引入，不需要完全重构整个项目，所以对于一个已有一定规模的项目来说，迁移成本更小，也更加可行。除此之外，Flow 可以提供实时增量的反馈，通过运行 Flow server 不需要在每次更改项目的时候完全从头运行类型检查，提高运行效率。可以简单总结为：对于新项目，可以考虑使用 TypeScript 或者 Flow，对于已有一定规模的项目则建议使用 Flow 进行较小成本的逐步迁移来引入类型检查。


## Hello ReactDom.Render()
- React Components, Elements, and Instances https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html

在前面 Hello Demo 的例子中，使用的是最简单的 React 例子，是直接使用 ReactDom.render() 方法渲染一个组件：

    const mountNode = document.getElementById('example')
	ReactDOM.render(
	  <h1>Hello, world!</h1>,
	  mountNode
	);

	// 页面存在一个容器元素 <div id="example"></div>

参考这个方法的原型，在参数提供的 container 指定一个 HTML 节点作为渲染容器，在它里面渲染传入 React 的各种元素 Element，并返回对该组件的引用，或者针对无状态组件返回 null。

	ReactDOM.render(element, container[, callback])

注意 Element 的概念，像 HTML 中的 `<p>` 就是一个 HTMLElement，还有纯字符串也算是一种。而 React 的组件，无论是函数式组件还是类组件，按照这种带有尖括号的写法就是一种 JSX.Element。React 会在内部将它们拆解成为一组数据，用虚拟节点 VirtualNode 的形式进行跟踪维护，对应 ReactNode 对象。

如以下渲染一个 Element 数组：

    ReactDOM.render([<h1>xyz</h1>,"ABC"], mountNode);

在页面容器中出现的渲染结果就是两个对应的 HTML 元素，p 段落元素和纯文本元素 PlainText：

	<div id="example"><h1>xyz</h1>ABC</div>

React 会将传入的 Element 模板会在后续解析成一组数据，并供 React.createElement() 函数调用去构造出相应的 HTML 节点。


参考以下两种完全等效的示例代码，可以看到 createElement 方法使用的参数更接近真实的 HTML 节点：

	// JSX style
	const element = (
	  <h1 className="greeting">
	    Hello, world!
	  </h1>
	);

	// JS style
	const element = React.createElement(
	  'h1',
	  {className: 'greeting'},
	  'Hello, world!'
	);

React.createElement() 生成的的数据对象类似以下简化后的形式，这就是一个虚拟的节点数据：

	// Note: this structure is simplified
	const element = {
	  type: 'h1',
	  props: {
	    className: 'greeting',
	    children: 'Hello, world!'
	  }
	};

再比如，设置样式属性：

	let dstyle = { 
		background:"#222222", 
		color: "white", 
		padding: "2px 16px 16px", 
		margin: "20%", 
		textAlign: "center",
		borderRadius: "32px",
	};
	const element = <h1 className="greeting" style={dstyle} >Hello, world!</h1>;

得到的数据对象就会在 props 中包含相应的样式属性：

	// Note: this structure is simplified
	const element = {
	  type: 'h1',
	  props: {
	    className: 'greeting',
	    children: 'Hello, world!',
	    style: {
	      background: "#222222",
	      borderRadius: "32px",
	      color: "white",
	      margin: "20%",
	      padding: "2px 16px 16px",
	      textAlign: "center",
	    }
	  }
	};

来看看源代码中测试用的声明文件中定义的 render 和 createElement 方法原型：

	// React.d.ts 
	declare module 'react' {
	  export class Component {
	    props: any;
	    state: any;
	    context: any;
	    static name: string;
	    constructor(props?, context?);
	    setState(partial : any, callback ?: any) : void;
	    forceUpdate(callback ?: any) : void;
	  }
	  export let PropTypes : any;
	  export function createElement(tag : any, props ?: any, ...children : any[]) : any
	}

	// ReactDom.d.ts 
	declare module 'react-dom' {
	  export function render(element : any, container : any) : any
	  export function unmountComponentAtNode(container : any) : void
	  export function findDOMNode(instance : any) : any
	}

React 将 HTML 的标签元素、Component 组件和 FunctionComponent 函数式组件等等统一抽象为可以渲染的 UI 元素，这是一个很好的概念。进而根据不同的元素重载出不同 createElement 方法实现对应的构造过程，但是基本还是几个要素：

- 元素出现在页面时的 tag；
- 元素配套的属性值 props；
- 元素的下一级节点 children；

以下是摘自源代码中部分 createElement 重载方法原型：

    // DOM Elements
    // TODO: generalize this to everything in `keyof ReactHTML`, not just "input"
    function createElement<P extends DOMAttributes<T>, T extends Element>(
        type: string,
        props?: ClassAttributes<T> & P | null,
        ...children: ReactNode[]): DOMElement<P, T>;


    // Custom components
    function createElement<P extends {}>(
        type: FunctionComponent<P> | ComponentClass<P> | string,
        props?: Attributes & P | null,
        ...children: ReactNode[]): ReactElement<P>;


可以预计的是，最后还是要通过浏览器的 DOM API 去构造和管理节点的：

	document.createElement('div')

如果要追踪具体实现代码，可以从 React 工程的相应模块中查找，目前的版本是 react-17.0.0：

	// react-17.0.0\packages\react-dom\src\client\ReactDOMLegacy.js

	export function render(
	  element: React$Element<any>,
	  container: Container,
	  callback: ?Function,
	) {
	  invariant(
	    isValidContainer(container),
	    'Target container is not a DOM element.',
	  );
	  if (__DEV__) {
	    const isModernRoot =
	      isContainerMarkedAsRoot(container) &&
	      container._reactRootContainer === undefined;
	    if (isModernRoot) {
	      console.error(
	        'You are calling ReactDOM.render() on a container that was previously ' +
	          'passed to ReactDOM.createRoot(). This is not supported. ' +
	          'Did you mean to call root.render(element)?',
	      );
	    }
	  }
	  return legacyRenderSubtreeIntoContainer(
	    null,
	    element,
	    container,
	    false,
	    callback,
	  );
	}

从字面可以看出 legacyRenderSubtreeIntoContainer 大致意思就是把虚拟节点树 VirtualDOM 渲染到真实的 Web DOM 容器中：

	function legacyRenderSubtreeIntoContainer(
	  parentComponent: ?React$Component<any, any>,
	  children: ReactNodeList,
	  container: Container,
	  forceHydrate: boolean,
	  callback: ?Function,
	) {
	  if (__DEV__) {
	    topLevelUpdateWarnings(container);
	    warnOnInvalidCallback(callback === undefined ? null : callback, 'render');
	  }

	  // TODO: Without `any` type, Flow says "Property cannot be accessed on any
	  // member of intersection type." Whyyyyyy.
	  let root: RootType = (container._reactRootContainer: any);
	  let fiberRoot;
	  if (!root) {
	    // Initial mount
	    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
	      container,
	      forceHydrate,
	    );
	    fiberRoot = root._internalRoot;
	    if (typeof callback === 'function') {
	      const originalCallback = callback;
	      callback = function() {
	        const instance = getPublicRootInstance(fiberRoot);
	        originalCallback.call(instance);
	      };
	    }
	    // Initial mount should not be batched.
	    unbatchedUpdates(() => {
	      updateContainer(children, fiberRoot, parentComponent, callback);
	    });
	  } else {
	    fiberRoot = root._internalRoot;
	    if (typeof callback === 'function') {
	      const originalCallback = callback;
	      callback = function() {
	        const instance = getPublicRootInstance(fiberRoot);
	        originalCallback.call(instance);
	      };
	    }
	    // Update
	    updateContainer(children, fiberRoot, parentComponent, callback);
	  }
	  return getPublicRootInstance(fiberRoot);
	}

再深入追踪 Render 的代码就涉及 React Fiber 部分了，这里的 fiberRoot 就是整个 React 应用的顶级 Fiber 对象，FiberRoot 对象主要用来管理组件树组件的更新进程，同时记录组件树挂载的DOM容器相关信息。
