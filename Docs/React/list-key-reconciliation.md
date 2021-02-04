---
title: '👉 A8 列表、键值与协调器'
excerpt: '使用 JavaScript map() 函数可以很方便将数组内容映射到新的内容，通常用它来生成组件或元素列表。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T15:44:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

## Lists, Keys & Reconciliation 列表、键值与协调器
- Recursing On Children https://reactjs.org/docs/reconciliation.html#recursing-on-children

使用 JavaScript map() 函数可以很方便将数组内容映射到新的内容，通常用它来生成组件或元素列表：

	const numbers = [1, 2, 3, 4, 5];
	const listItems = numbers.map((number) =>
	  <li>{number}</li>
	);

	ReactDOM.render(
	  <ul>{listItems}</ul>,
	  document.getElementById('root')
	);

写成组件的形式：

	function NumberList(props) {
	  const numbers = props.numbers;
	  const listItems = numbers.map((number) =>
	    <li>{number}</li>
	  );
	  return (
	    <ul>{listItems}</ul>
	  );
	}

	const numbers = [1, 2, 3, 4, 5];
	ReactDOM.render(
	  <NumberList numbers={numbers} />,
	  document.getElementById('root')
	);

这个 key 通常可以用数据对象的 id，当然不重复的序列号也可以：

	const todoItems = todos.map((todo) =>
	  <li key={todo.id}> {todo.text} </li>
	);

注意，key 要设置在列表产生的位置的条目上，而不单单是列表条目上，参考以下的 key 设置。尽管 Blog 的列表元素 sidebar 和 content 可以同时出现在同一个 ul 列表中，但是在 React 内部它们是通过 map 映射得到的两个不同的列表：

	function Blog(props:{posts: typeof posts}) {
	  const sidebar = (
	    <ul>
	      {props.posts.map((post) =>
	        <li key={post.id}> {post.title} </li>
	        )}
	    </ul>
	  );
	  const content = props.posts.map((post) =>
	    <div key={post.id}>
	        <h3>{post.title}</h3>
	        <p>{post.content}</p>
	    </div>
	  );
	  return (
	    <>
	      {sidebar}
	      {content}
	    </>
	  );
	}

	const posts = [
	  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
	  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
	];

	export default function Posts(props:{posts?:(typeof posts[0])[]}) {
	  if(props.posts){
	    return ( <Blog posts={props.posts} /> );
	  }else{
	    return ( <Blog posts={posts} /> );
	  }
	}

注意 JSX 的纯粹的尖括号对作用和 Vue 的 template 或微信小程序的 block 元素一样，指不需要在 DOM 渲染的节点。

JSX 支持在元素中嵌入脚本表达式：

	function NumberList(props) {
	  const numbers = props.numbers;
	  return (
	    <ul>
	      {numbers.map((number) =>
	        <ListItem key={number.toString()} value={number} />
	      )}
	    </ul>
	  );
	}

生成的这些组件列表在 React 内部的虚拟 DOM 中管理时，为了提高效率，React 会与浏览器的 DOM 节点进行比对，并尽量利用好现有的 DOM 对象，避免重复的销毁和重建，需要指定一个稳定且在同一列表中不重复的 key 值来标记一个节点和组件件的对应关系。

key 值只需要在当前的列表中唯一，不需要在整个应用中唯一，React 内部的 Fiber Reconciler 调和器知道如何高效地处理虚拟 DOM 节点树。协调算法是 React 的一个实现细节，React 可以在每个操作上重新启动整个应用程序，最终结果是相同的。要清楚的是，在这个上下文中重新渲染意味着为所有组件调用 render，并不意味着 React 要将它卸载并重新装载它们，这就是虚拟 DOM 的好处。

在当前的实现中协调算法中，Diffing Algorithm 差异比较算法可以分辨同一个 key 值的不同位置来表示子树在其同级之间位置移动，但无法判断它已移动到其他位置。

该算法不会尝试匹配不同组件类型的子树，如果您看到自己在两种输出非常相似的组件类型之间交替使用，则可能需要将其设置为相同的类型。

设置的 key 值应该是稳定的、可预测的和唯一的。不稳定 key 值，如 Math.random() 将导致不必要地重新创建许多组件实例和 DOM 节点，这会导致性能下降和子组件中的状态丢失。

差异比较算法最基本的比较，就是对组件树根元素的比较。每个组件的 render 返回的组件树都是只有一个根元素的，以数组方式返回的情况也算，就是将数组对象当作根元素。



## Fiber Reconciliation 调和器
- React Fiber Reconciliation https://reactjs.org/docs/reconciliation.html
- React Fiber Architecture https://github.com/acdlite/react-fiber-architecture
- React 源码全方位剖析 http://www.sosout.com/2018/08/12/react-source-analysis.html

React 提供了声明式 API，这样不必考虑每次更新会发生什么，使得编写应用程序变得更加容易，在 React 中如何实现这一点的就是 Fiber Reconciliation 调和器。

前面追踪代码到 ReactDom.render() --> legacyRenderSubtreeIntoContainer() --> getPublicRootInstance()，再深入追踪 Render 的代码就涉及 React Fiber 部分了，可以说这是 React 算法实现的核心部分，其中包含了大量的计算机系统知识，包括主要差别比较算法 diffing。React Firber 并不是所谓的纤程、微线程、协程，而是一种基于浏览器的单线程调度算法。

	import {
	  findHostInstanceWithNoPortals,
	  updateContainer,
	  unbatchedUpdates,
	  getPublicRootInstance,
	  findHostInstance,
	  findHostInstanceWithWarning,
	} from 'react-reconciler/src/ReactFiberReconciler';

由于浏览器渲染引擎是单线程的，在 React15.x 及之前版本，从 setState 开始到渲染完成整个过程是不受控制且连续不中断完成的，由于该过程将会占用整个线程，则其他任务都会被阻塞，如样式计算、界面布局以及许多情况下的绘制等。

如果需要渲染的是一个很大、层级很深的组件，这可能就会使用户感觉明显卡顿，比如更新一个组件需要 1 毫秒，如果有 200 个组件就需要 200 毫秒。在这个更新过程中，浏览器唯一的主线程在专心运行更新操作，无暇去做其他任何事情。用户的 UI 交互，如往一个 input 元素中输入点什么，敲击键盘也不会立即获得响应。

虽然渲染输入按键结果是浏览器主线程的工作，但是浏览器主线程被 React 占用，抽不出空，最后的结果就是用户敲了按键看不到反应，等 React 更新过程结束之后，咔咔咔那些按键一下子出现在 input 元素里了。

旧版本的调和器可以称为栈调和器 Stack Reconciler，主要缺陷就是不能暂停渲染任务，也不能切分任务，更无法有效平衡组件更新渲染与动画相关任务间的执行顺序，即不能划分任务优先级，这样就很有可能导致重要任务卡顿，动画掉帧等问题。

为了解决这个问题，React 团队经过两年多的努力，提出了一个更先进的 Fiber Reconciler 调和器，它允许渲染过程分段完成，而不必一次性完成，在渲染期间可返回到主线程控制执行其他任务。

通过计算部分组件树的变更，并暂停渲染更新，询问主线程是否有更高需求的绘制或者更新任务需要执行，这些高需求的任务完成后再重新渲染。这一切的实现是在代码层引入了一个新的数据结构对象 Fiber，每一个组件实例对应有一个 fiber 实例，此实例负责管理组件实例的更新，渲染任务及与其他 fiber 实例的通信。

纤维调和器 Fiber Reconciler 提供的新功能主要有：

- 一、调度任务 scheduleWork，把可中断的任务拆分成小任务；
- 二、可重用各分阶段任务，对正在做的工作调整优先次序；
- 三、可以在父子组件任务间前进后退切换任务，以支持React执行过程中的布局刷新；
- 四、支持 render 方法返回多个元素；
- 五、对异常边界处理提供了更好的支持；


使用 React 时，在单个时间点可以将 render() 函数视为创建 React 元素树。在下一个状态或道具更新时，render() 函数将返回不同的 React Element Tree。React 在更前 DOM 树前，需要弄清楚如何高效地更新 UI 以匹配最新的 Element Tree。

对于这个算法问题，有一些通用的解决方案，即生成将一棵树转换为另一棵树的最小操作数。然而，现有算法的复杂度为 O(n3)，其中 n 是树中的元素数量。

如果在 React 中使用它，显示 1000 个元素将需要 10 亿次比较，这个时间成本太贵了。相反，React 基于两个假设实现了一个启发式 O(n) 算法：

- 两种不同类型的元素会产生不同的树。
- 开发者可以给组件指定一个键 key 属性提示哪些子元素在不同的渲染中是稳定的。
- 实际上，这些假设对于几乎所有的实际用例都是有效的。


The Diffing Algorithm 差异算法

对两棵树进行比较时，React 首先比较两个根元素，根元素的类型不同行为是不同的。


👉 Root Elements Of Different Types

在根元素不同的情况下，差异比较算法会在组件的根元素改变时重构组件树，所有 HTML 标签元素都会被释放，再重建新的组件树。这会消耗相当的 CPU 时间去清理浏览器 DOM 树上的旧节点，同时，组件实例会收到 componentWillUnmount() 生命周期函数的调用。当新的 DOM 节点插入，组件实例被创建，会收到 UNSAFE_componentWillMount() 的调用，然后是 componentDidMount() 生命周期函数。

比如以下两个节点树就是根元素不同：

	<div>
	  <Counter />
	</div>

	<span>
	  <Counter />
	</span>


👉 DOM Elements Of The Same Type

在相同的 React DOM 元素比较中，会保持基本的节点元素，并且只更新有差异的属性部分，如以下这组差异只会更新样式类：

	<div className="before" title="stuff" />

	<div className="after" title="stuff" />


如果是样式更新也如此处理，只更新不同的 color 值：

	<div style={{color: 'red', fontWeight: 'bold'}} />

	<div style={{color: 'green', fontWeight: 'bold'}} />

处理完一个节点后再递归处理其它子节点。


👉 Component Elements Of The Same Type

对于相同的组件，会保持原有实例，组件状态也一样保持。React 会更新组件属性 props，并调用 UNSAFE_componentWillReceiveProps(), UNSAFE_componentWillUpdate() 和 componentDidUpdate() 这些组件生命周期函数，接着执行 render() ，差异比较算法会将组件的结果递归处理。

DeprecatedLifecycle 接口这些过时的组件生命周期函数应该尽量避免使用：

    interface DeprecatedLifecycle<P, S> {
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    }

通常，React 同时会递归处理列表和子节点，以下这组差异中，会匹配到前两个相同的节点，并将第三个新节点插入：

	<ul>
	  <li>first</li>
	  <li>second</li>
	</ul>

	<ul>
	  <li>first</li>
	  <li>second</li>
	  <li>third</li>
	</ul>

但是，如果新增加的节点出现在前面，性能会更差：

	<ul>
	  <li>Duke</li>
	  <li>Villanova</li>
	</ul>

	<ul>
	  <li>Connecticut</li>
	  <li>Duke</li>
	  <li>Villanova</li>
	</ul>

React 认识不到可以保留这两个原有的节点，而是变更所有节点，这就是为何要给列表设置 key，这可以解决这个问题。

