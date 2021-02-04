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
    npm run dev

安装成功后就可以运行开发服务器，默认监听本地 3000 端口，另外建议使用 Windows Terminal 控制台工具。

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
