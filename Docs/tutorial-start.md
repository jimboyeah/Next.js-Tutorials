---
title: '👉 01 Next.js SSR 服务端渲染!'
excerpt: '直接使用 next.js 提供的 create-next-app 初始化一个 SSR 项目。'
coverImage: '/20161106s.jpg'
date: '2021-02-02T19:01:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 SSR with Next.js!

- https://nextjs.org/learn/basics/create-nextjs-app
- https://www.npmjs.com/package/sharp
- https://www.npmjs.com/package/styled-jsx
- https://nextjs.org/learn/excel/typescript
- https://github.com/reactjs/server-components-demo
- https://reactrouter.com/web/guides/server-rendering


首先，搞清楚什么是 SSR 这个概念，SSR - Server Side Rendering 服务端渲染，指页面的渲染和生成是在服务端完成的，并将渲染好的页面返回客户端。这不是一个什么新技术，早期的 Web 应用都是 SSR，像 PHP 的服务端脚本，执行模板中的代码，然后拼接成一个 HTML 页面返回给客户端。

而现代的 SSR 是基于组件化这个潮流之上的，与传统的做法大不相同，首先需要使用一个基于组件化开发的前端框架，如 React、Angular、Vue 等，然后再利用特定的 API 在服务端运行以生成具有同样交互能力的应用。

这里主要涉及到一个问题：具有交互能力的组件在服务器端渲染生成 HTML 后再返回给客户端，并且具有同样的交互能力。这个过程就像是对一个生命进行脱水保鲜，再运输到目的地，再 `hydrate()` 浸水复活的。

基本流程：

- 服务器渲染组件，并将组件生成的 HTML 发往浏览器；
- 在浏览的交互中，请求新的地址发回服务器；
- 服务器通过会话、路由配置解析相应的组件，重新执行第一步流程。

在后端调用 renderToString() 的方法，把整个页面渲染成字符串。然后前端调用 hydrate() 方法，把后端传递的字符串和自己的实例混合起来，保留 HTML 并附上事件监听，并复原交互功能。这个过程就像有脱水保持活性，转移到客户端后再注水复活。这就是 Next.js 实现 SSR 的主要方法，也就是后端会渲染 HTML, 前端添加监听。前端也会渲染一次，以确保前后端渲染结果一致。如果结果不一致，控制台会报错提醒我们。

在组件化的技术潮流下，服务端渲染焕发新的生机，和旧式的 JSP、PHP 等有着巨大差别。

理论上，SSR 或传统的服务端渲染最大的瓶颈就是服务端的性能，而数据库则是所有能力的瓶颈，但是服务端渲染的优势也明显：

- 首屏加载快，相比SPA单页应用还要有优势。
- SEO 优化 利于爬虫，爬取数据。

如果用户规模大，SPA 作为一个大型分布式系统，充分利用用户的设备去运行 App 的运算，SSR 则是把这些工作包揽到自己的服务器上。所以对于需要大量计算，如图表特别多，而且用户量巨大的页面，并不太适合，应该适当将运算能力分散到客户端去完成。但 SSR 作为静态内容的展示，还是非常适合的，能满足大部分的内容展示页面，或商业站点。

使用 SSR 使项目复杂度增加，需要前端团队有较高的技术素养。为了同构，要处处兼容 Node.js 的执行环境，不能有浏览器相关的原生代码在服务端执行，前端代码使用的 window 在 node 环境是不存在的，所以要对客户端进行 mock window，获取其中最重要的是 cookie，userAgent，location 等属性数据。
使用 ReactDOMServer 进行服务器端渲染示范可以参考 server-components-demo。

React ReactDOMServer 模块提供的 SSR API 有两个：

- `renderToString()` 方法渲染的时候带有 data-reactid 属性，在浏览器访问页面的时候能识别到 HTML 的内容，不会执行 `createElement` 二次创建 DOM。
- `renderToStaticMarkup()` 则没有 data-reactid 属性，页面看上去干净点。在浏览器访问页面的时候不能识别到 HTML 内容，会执行 `createElement` 方法重新创建 DOM。
- `renderToNodeStream()` 支持直接渲染到节点流，渲染到流可以减少内容第一个字节 TTFB 的时间，在文档的下一部分生成之前，将文档的开头至结尾发送到浏览器。 当内容从服务器流式传输时，浏览器将开始解析 HTML 文档。速度是 `renderToString` 的三倍左右，官方是这么说。
- `renderToStaticNodeStream()` 很像前面一个 API，只是没有额外的 DOM 属性，可以节省数据。React 内部使用，如`data-reactroot`，在只生成静态页面时非常有用。返回数据和`renderToStaticMarkup`是一样的，如果需要交互就不能使用此方法，而应该在服务端使用`renderToNodeStream`，在客户端使用`ReactDOM.hydrate()`。


特色功能：

- 简化的部署流程，直接使用 Vercel 服务自动部署代码仓库。
- 混合 SSG 和 SSR 模式，在一个项目中同时支持构建时预渲染页面（SSG）和请求时渲染页面（SSR）。
- 增量静态生成，在构建之后以增量的方式添加并更新静态预渲染的页面。
- 支持 TypeScript，自动配置并编译 TypeScript。
- 快速刷新，快速、可靠的实时编辑体验，已在 Facebook 级别的应用上规模上得到验证。
- 基于文件系统的路由，每个 pages 目录下的组件都是一条路由。
- API 路由，创建 API 端点（可选）以提供后端功能。
- 内置支持 CSS，使用 CSS 模块创建组件级的样式。内置对 Sass 的支持。
- 采用由 Google Chrome 小组创建的、并经过优化的打包和拆分算法。

开发环境下执行以下命令就是最简单的部署：

	yarn build
	yarn start -p 80

用官方文档的说法就是三步走 DPS - Develop, Preview, Ship：

- Develop: 开发 Next.js 应用，并因为采用 React Fast Refresh 技术，可以保持开发服务器处于运行状态。
- Preview: 预览，每次提交代码到 GitHub / GitLab / BitBucket 等，Vercel 自动创建新的部署和新的 URL。
- Ship: 发行，准备到这一步，可以合并代码分支到默认分支，如 main 由 Vercel 自动创建产品部署；

在 DPS 工作流程下，可以预览部署，每次创建的部署都有唯一的 URL 可以进行访问。

直接使用 next.js 提供的 create-next-app 初始化一个 SSR 项目。

	 npm install -g -f create-next-app
	 npx create-next-app react-nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
	 cd react-nextjs-blog
	 npm install
	 npm run dev

安装成功后就可以运行开发服务器，默认监听本地 3000 端口，可以使用 -p 参数指定端口，另外建议使用 Windows Terminal 控制台工具。

	>npx next dev -h

      Description
        Starts the application in development mode (hot-code reloading, error
        reporting, etc)

      Usage
        $ next dev <dir> -p <port number>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
        --port, -p      A port number on which to start the application
        --hostname, -H  Hostname on which to start the application (default: 0.0.0.0)
        --help, -h      Displays this message

示范项目配置文件 package.json 如下，主要依赖有 next, react 和 react-dom 三个：

```json
{
  "name": "learn-starter",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^10.0.0",
    "react": "17.0.1",
    "react-dom": "17.0.1"
  }
}
```

但背后依赖的模块非常多，其中 Sharp 模块作为图形处理加速模块，支持各种 Web 图形文件处理，如 JPEG, PNG, WebP 或 AVIF，使用到 C# 和 C++，需要相应的编译工具。它依赖了 libvips 和其它众多基础的 C++ 类库，对调整大图像文件的大小通常比使用 ImageMagick 或 GraphicsMagick 快 4-5 倍。颜色空间、嵌入的 ICC 配置文件和 alpha 透明通道都得到了正确的处理，Lanczos 重采样确保了质量不会因速度而牺牲。除了调整图像大小外，还可以进行旋转、提取、合成和 gamma 校正等操作。

大多数现代 macOS、Windows 和 Linux 系统 Node.js v10+ 不需要任何额外的安装或运行时依赖项，依赖此库的应用非常多，周下载量百万级别。

新建立的示范工程结构极简单，只有 page/index.js 一个默认页面脚本，和 public 目录两个静态资源文件，服务器程序什么配置好直接使用。

另外，Next.js 提供的 Vercel 平台可以很方便地布署项目，除了支持自家的框架，还支持其它多种流行的框架。只需将代码仓库导入，即可以完成编译和部署。默认使用 main 或者 master 分支，可以在托管项目中 Production Branch 进行设置。

只是作为免费服务，就别希望性能太高了，而且还不像 github.io 限制一个仓库，还绑定用户名。

例如之前的 github.io 静态站点，重新布署在 Vercel，还有本教程相关的示例：

- https://jimboyeah-github-io.vercel.app/ 
- https://next-js-tutorials.vercel.app/

