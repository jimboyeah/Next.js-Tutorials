---
title: '👉 A3 JSX & Babel 入门'
excerpt: 'JSX 代表 JavaScript + XML，它的意义是实现了 XML 和脚本代码共存，在脚本直接使用 XML 节点来编写程序中的组件，这是非常有趣的技术。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T15:44:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

## JSX & Babel 入门 
- Babel 中文网 - https://www.babeljs.cn/docs/
- Babel is a JavaScript compiler - https://babeljs.io/
- Using Babel https://babeljs.io/setup#installation
- Babel REPL 交互式解释器 https://babeljs.io/repl
- babel REPL Custom Plugin https://codesandbox.io/s/babel-repl-custom-plugin-7s08o
- Babel with Sublime Text - https://github.com/babel/babel-sublime
- Create a New React App https://reactjs.org/docs/create-a-new-react-app.html

JSX 代表 JavaScript + XML，它的意义是实现了 XML 和脚本代码共存，在脚本直接使用 XML 节点来编写程序中的组件，这是非常有趣的技术：

	const element = <h1>Hello, world!</h1>;

通过转译程序，JSX 编写的元素会转译成原生的脚本代码一致实现，JSX 编写了什么样的 Element 元素，转译后就有对应的脚本代码实现，这是解放生产力的一大技术。这样的混合技术使得开发者完全摆脱了旧式字符拼接 DOM 结构的束缚，或者使用 jQuery 来零散地管理 DOM，使用 JSX 可以很方便地直接编写 Elements 供 React 渲染。

JSX 模板语法，可以记住两条规则，花括号 `{...}` 内的是 JavaScript 代码，在箭括号 `<...>` 内的就是标签组件定义。要在标签元素中写代码就需要使用花括号，在代码中可以直接写 XML 标。在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。

除 HTML 标签组件外，其它组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 `div` 标签，而 `<Welcome />` 则代表一个组件，并且需在其作用域内使用。


因为 JSX 转译后就是输出 JavaScript 代码实现，所以可以省略不用 JSX，直接用 React 提供的 DOM 构建方法来写模板，比如一个 JSX 写的一个标题元素的等价 JSX 和 JS 代码：

	// JSX style
	const element = (
	  <h1 className="greeting">
	    Hello, world!
	  </h1>
	);

	// JS style - Babel Translated
	const element = React.createElement(
	  'h1',
	  {className: 'greeting'},
	  'Hello, world!'
	);

以上，只是经过 Babel 的转译得到的结果，可以使用 Babel 将任意符合语法格式的 JSX 代码进行转译，可以在线尝试 Babel REPL - Read Eval Print Loop 交互式解释器。

如原始 JSX 以下这样：

	// JSX - JavaScript + XML
	const element = <h1 abc={efg}>Hello, world!</h1>;

	const Fc = (props) => {
	  return props.children;
	}

	class Cc extends Any.Component {
		bar = 'hello';
		static foo = "Apple"
		constructor(props){
			this.props = props;
		}
		render(){
			return <div>{this.props.children}</div>;
		}
	}

	const elements = (props) => {
		let abc = ["A", 1, <Fc name="xyz"/>, <Cc name="xyz"/>];
		return (
			<>
			{abc.length>2 && <b>multiple</b>}
			<div>{abc.map( (it) => <b>{it}</b>) }</div>
			</>
		);
	}

React.createElement 方法原型参考：

	  export function createElement(tag : any, props ?: any, ...children : any[]) : any

对应 JavaScript - Babel React Preset 的转译结果类似以下，根据不同的配置会有差异：

	"use strict";

	function _defineProperty(obj, key, value) { 
	    if (key in obj) { 
	        Object.defineProperty(obj, key, { 
	            value: value, 
	            enumerable: true, 
	            configurable: true, 
	            writable: true 
	        }); 
	    } else { 
	        obj[key] = value; 
	    } 
	    return obj;
	}

	const element = /*#__PURE__*/React.createElement("h1", {
	  abc: efg
	}, "Hello, world!");

	const Fc = props => {
	  return props.children;
	};


	class Cc extends Any.Component {
	  constructor(props) {
	    this.props = props;
	  }

	  render() {
	    return /*#__PURE__*/React.createElement("div", null, this.props.children);
	  }
	}

	_defineProperty(Cc, "foo", "Apple");


	const elements = props => {
	  let abc = ["A", 1, 
	    /*#__PURE__*/React.createElement(Fc, {name: "xyz"}), 
	    /*#__PURE__*/React.createElement(Cc, {name: "xyz"})];

	  return /*#__PURE__*/React.createElement(
	    React.Fragment, // Tag
	    null,           // Props and children below
	    abc.length > 2 && 
	    /*#__PURE__*/React.createElement("b", null, "multiple"), 
	    /*#__PURE__*/React.createElement("div", null, abc.map(it => /*#__PURE__*/React.createElement("b", null, it))));
	};

可以看到，纯粹的尖括号对应的是 React.Fragment 代表的抽象节点，原先的 JavaScript 还是保留不变，只是嵌入的 XML 标签转换成了 React.createElement 方法创建的对象，这些就是 Babel 做的转译工作。而 createElement 方法接收 tag 参数中，可以接收的类型可以分为三类：

- Plain Text 即字符串或数值这些会原样渲染的内容；
- Function Component 函数组件，将原函数传入；
- Class Component 类组件，将原函数传入，组件的属性传递方式不变；


最早，React 提供了 JSX 的转译程序，但是后来 Babel 在转译方法的贡献做得更强，现在前端开发的转译工作基本由 Babel 来做了。

当然，可以有 JavaScript + XML，也可以 TypeScript + XML，只需要搭配相应的开发环境，将 jsx 文件改成 tsx 文件来做开发，并且后者带来的静态类型检查才是强大的。

要搭建一个现代的前端开发环境配套的工具有很多，比如 Grunt / Gulp / Webpack / Broccoli，都是要解决前端工程化问题。这个主题很大，这里关注基于 Webpack 的 React JSX 开发。现在业界领先的 ES6 编译工具 Babel 随着作者被 Facebook 招入麾下，已经内置了对 JSX 的支持，我们只需要配置 Babel 一个编译工具就可以了，配合 webpack 非常方便，现成的可以直接使用 Create React App 脚手架工具。

Babel 作为一个 JavaScript 转译器，它可以做的工作很多：

- 语法转换，Babel 能够转换 JSX 语法为相应的 JavaScript，让浏览器能运行！
- 类型标注 Type Annotations，支持 Flow 和 TypeScript！
- 因为浏览器进化速度跟不上 JavaScript 速度，可以通过 Browser Polyfill 在目标环境中添加缺失的特性，使用 @babel/polyfill 模块；
- 源码重构 codemods...

但基本的还编译器原理，Babel 的转译过程分为三个阶段：

- 对原代码进行解析 parsing 生成抽象语法树等；
- 根据预置设定进行转译 transforming；
- 最后生成相应代码 generating;

Babel 作为一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中，这解决了一个很大的问题，使得技术更新慢的浏览器也可以用上功能强大、发展更快的脚本技术。


Babel 对不同的功能集合支持会有相应的一个预置模块 preset，安装相应的预置模块来实现不同的功能，最新版 Babel 7 提供了以下几种预置：

- env - 支持 JavaScript 新特性的最小预置 https://www.babeljs.cn/docs/babel-preset-env

		npm install --save-dev @babel/preset-env
		yarn add @babel/preset-env --dev

- flow - 支持 Flow 静态类型检查 https://www.babeljs.cn/docs/babel-preset-flow

		npm install --save-dev @babel/preset-flow

- minify - 最小化打包混淆 https://www.babeljs.cn/docs/babel-preset-minify

		npm install babel-preset-minify --save-dev

- react - 支持 React JSX 语法 https://www.babeljs.cn/docs/babel-preset-react

		npm install --save-dev @babel/preset-react

- stage-0 从 Babel v7 开始，所有针对处于标准提案阶段的功能所编写的预设都已被弃用，env 不支持所有在 stage-x 的 plugin。
- stage-1 Stage 1: proposal
- stage-2 Stage 2: draft
- stage-3 Stage 3: candidate

- typescript - 支持 TypeScript 静态语言 https://babeljs.io/docs/en/babel-preset-typescript

		npm install --save-dev @babel/preset-typescript


Babel 7 的更新：

- Babel 7 的 npm 包正式更名为 @babel/core @babel/cli 等。
- Babel 7 不支持 Node.js 0.10, 0.12, 4 和 5 版本。
- Babel 7 移除了@babel/polyfill 内的 polyfills 支持，现在 @babel/polyfill 几乎只是 core-js v2 的映射。
- babylon 现在被重命名为 @babel/parser
- 去除包名上的年份。
- 将 react 和 flow 预设分离。


为当前 npm 项目安装 Babel CLI：

	npm install --save-dev @babel/core @babel/cli

设置项目脚本命令：

	  {
	    "name": "my-project",
	    "version": "1.0.0",
	+   "scripts": {
	+     "build": "babel src -d lib"
	+   },
	    "devDependencies": {
	      "@babel/cli": "^7.0.0"
	    }
	  }

运行 Babel 转译程序：

	npm run build



Babel 能够通过 React preset 转换 JSX 语法，和 babel-sublime 插件一起使用还可以把语法高亮的功能提升到一个新的水平。使用 Node + Webpack 开发环境，通过以下命令安装此 preset-react 还有 babel-loader：

	npm install --save-dev @babel/preset-react
	npm install --save-dev babel-loader

并将 @babel/preset-react 添加到你的 Babel 配置文件中 .babelrc：
	
	{
	  "presets": ["env", "stage-0", "react"],
	  "plugins": ["transform-runtime"]
	}

添加 babel-loader 配置项：
	
	module: {
	    rules: [
	      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
	    ]
	}

Babel 可以删除类型注释，也就是说支持 Flow 和 TypeScript 这样的类型检查编译工具，查看 Flow preset 或 TypeScript preset 了解如何使用。务必牢记 Babel 不做类型检查，你仍然需要安装 Flow 或 TypeScript 来执行类型检查的工作。

通过以下命令安装 flow preset 或 typescript preset

	npm install --save-dev @babel/preset-flow
	npm install --save-dev @babel/preset-typescript

这两个工具都有相当简单的方法给逐个文件应用：

- Flow: 向文件顶部添加注释 // @flow 来激活 Flow 静态类型检查； 
- TypeScript：将文件扩展名 .js/.jsx 更改为 .ts/.tsx 来激活 TypeScript 静态类型检查；

例子：

	// @flow
	function square(n: number): number {
	  return n * n;
	}

	// typescript
	function Greeter(greeting: string) {
	    this.greeting = greeting;
	}

可以在 HTML 页面中直接引用 Babel CDN 脚本文件支持 JSX 语法，在编写组件的脚本区，只需要使用 `<script type="text/babel" />` 脚本标签即可，这种方法很方便，能快速编写示例直接在浏览器中运行，而不用搭建开发环境。

注意，通过 src 引用外部 jsx 脚本文件時，需要使用 AJAX，即 XMLHttpRequest 加載，需要以 Web 服務方式运行，或者修改浏览器的跨站策略 CORS policy 以放行这种跨站文件文件。

	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title> Demo for React JSX! </title>
			<script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"> </script> 
			<script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"> </script>
			<script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"> </script>
		</head>
		<body>
			<div id="example"> </div>
		</body>
	</html>

	<script>
		// import React from "react";
		// import {Component} from 'react';
		let Component = React.Component;
		const mountNode = document.getElementById('example')
	</script>

	<script type="text/babel">

		let pstyle = { "border": "1px solid #cccccc"};
		let dstyle = { 
			background:"#222222", 
			color: "white", 
			padding: "2px 16px 16px", 
			margin: "20%", 
			textAlign: "center",
			borderRadius: "32px",
		};

		function Demo(props){
			return <div style={dstyle}>{props.children} {props.dt}</div>
		}

		function Wrap(props){
			return <div>
				<Demo {...props} >
					<p style={pstyle}>Hello</p>
				</Demo>
			</div>
		}

		function render(){
			setInterval(evt=>{
				let dt = Date.now();
				let wrap = <Wrap key="d001" dt={dt} />;
				ReactDOM.unmountComponentAtNode(mountNode)
				ReactDOM.render(wrap, mountNode);
			}, 1000);
		}
		render();
		
	</script>

在线运行示例：

- MBA书记 https://scrimba.com/scrim/cbq2yZhV
- 我爱码笔 https://codepen.io/jeango/pen/mdrZRao
- 代码沙盒 https://codesandbox.io/s/patient-cdn-9vw4q?file=/public/index.html
