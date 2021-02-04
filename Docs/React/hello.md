---
title: '👉 A1 Hello React'
excerpt: 'React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T15:44:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# React readme 前端框架
- [React JS](https://reactjs.org/)
- [React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
- [React-Devtools](https://github.com/facebook/react-devtools)
- Create a New React App https://reactjs.org/docs/create-a-new-react-app.html

React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。

由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。

这个项目本身也越滚越大，从最早的UI引擎变成了一整套前后端通吃的 Web App 解决方案。衍生的 React Native 项目，目标更是宏伟，希望用写 Web App 的方式去写 Native App。如果能够实现，整个互联网行业都会被颠覆，因为同一组人只需要写一次 UI ，就能同时运行在服务器、浏览器和手机（参见《也许，DOM 不是答案》）。

最好的入手工具就是 create-react-app，作为 Facebook 官方的脚手架是相当好用的，设计原理是将配置好的如 Webpack，Babel，ESLint，合并到 react-scripts 这 npm 包中，用户就可以开箱即用，react-scripts 就是 create-react-app 脚手架的核心配置代码。

不使用脚手架工具的情况下创建的应用是使用 npm 安装依赖的，并通过修改 webpack.config.js 进行项目配置的，搭建好环境后在 src 目录下编写源代码。而 create-react-app 就是自动构建，在 package.json 中只有 react-scripts 作为依赖，把原先的配置内容转移到 reacr-scripts 模块中，它已经搭配好了项目所有需要的配置项， 下支持：

- React, JSX, ES6, and Flow syntax support.
- Language extras beyond ES6 like the object spread operator.
- Import CSS and image files directly from JavaScript.
- Autoprefixed CSS, so you don’t need -webkit or other prefixes.
- A build script to bundle JS, CSS, and images for production, with sourcemaps.
- A dev server that lints for common errors.

从 React，ES6，Babel, Webpack 编辑到打包等都做好了，模塊包内提供了兩套模板，一套是 JS 版，另一套是 TypeScript 版的 template-typescript。

个人极力推荐 TypeScript，静态类型真的有点难入手，上手就有点香。


# ⚑ Hello Demo
- [React CDN 引入](https://www.runoob.com/react/react-install.html)
- [Babel-Sublime](https://github.com/babel/babel-sublime)
- [Sublime Babel for VSCode](https://marketplace.visualstudio.com/items?itemName=joshpeng.sublime-babel-vscode)
- [Hello World in React](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

没有配置好 Node.js、VSCode、Sublime 开发工具，可以在 CodePen 平台上直接运行 React 代码。这个 Demo 只展示 ReactDOM 基础部分的使用，在生产开发中习惯上使用组件化开发，即 `ReactDOM.render()` 结合组件 `React.Component`一起使用，这就涉及组件的生命周期函数，放后面介绍。

在网页上使用 React 开发，最简单的方法是直接引用 Staticfile CDN 的 React CDN 库：

	<script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"></script>
	<script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"></script>
	<script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>

官方提供的 CDN 地址：

	<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
	<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
	<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

    <script src="https://cdn.staticfile.org/react/16.4.0/umd/react.production.min.js"> </script>
    <script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.production.min.js"> </script>

注意: 在浏览器中使用 Babel 来编译 JSX 效率是非常低的。生产环境中不建议使用 development 后缀版本。

引入的三个库

`react.min.js` - React 的核心库，包含 `React.Component` 组件架构实现
`react-dom.min.js` - 提供与 `ReactDOM` 相关的功能
`babel.min.js` - Babel 可以将 ES6 代码转编译为 ES5 代码，这样我们就能在目前不支持 ES6 浏览器上执行 React 代码。Babel 内嵌了对 JSX 的支持。

Sublime Text 开发环境可以安装 [Babel-Sublime] 插件，让源码的语法渲染上升到一个全新的水平。或者 [Sublime Babel for VSCode]。

以下是一个用于体验的 React 页面程序，生产开发环境中是结合 Node.js 平台操作的，利用 npm 来管理软件工程以及安装工程依赖的类库。

	<!DOCTYPE html>
	<html>
	    <head>
	        <meta charset="utf-8"/>
	        <title>
	            Hello React!
	        </title>
	        <script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"></script>
	        <script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"></script>
	        <script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
	    </head>
	    <body>
	        <div id="example"> </div>
	        <script type="text/babel">
	            ReactDOM.render(
				    <h1>Hello, world!</h1>,
				    document.getElementById('example')
				);
	        </script>
	    </body>
	</html>

Node.js 是现代前端开发平台，下载安装后，就可以使用 node.exe 来运行或调试脚本，主要还是使用 npm 命令来管理工程。在国内，可以使用阿里的模块服务器，以免下载模块受阻。

	$ npm install -g cnpm --registry=https://registry.npm.taobao.org
	$ npm config set registry https://registry.npm.taobao.org

这样就可以使用 cnpm 命令来安装模块了：

	$ cnpm install [name]

使用 create-react-app 快速构建 React 开发环境，这是来自于 Facebook 官方的脚手架模块，通过该命令我们无需配置就能快速构建 React 开发环境，自动创建的项目基于 Webpack + ES6。执行以下命令创建项目：

	$ cnpm install -g create-react-app
	$ create-react-app my-app
	$ cd my-app/
	$ npm start

在浏览器中打开体验

	http://localhost:3000/
