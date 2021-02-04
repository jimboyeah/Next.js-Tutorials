---
title: '👉 01 Next.js SSR 服务端渲染!'
excerpt: '直接使用 next.js 提供的 create-next-app 初始化一个 SSR 项目。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T03:01:07.322Z'
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

