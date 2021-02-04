---
title: '👉 08 TypeScript 配置使用'
excerpt: 'Next.js 提供了 TypeScript 集成体验，通过配置 TypeScript，即可以转换 JavaScript 开发环境，以使用 Next.js 的类型规范。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T03:01:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 Next.js with TypeScript

- https://nextjs.org/learn/excel/typescript
- https://nextjs.org/docs/basic-features/typescript
- https://github.com/vercel/next.js/tree/canary/examples/with-typescript
- https://github.com/vercel/next-learn-starter/tree/master/typescript-final

Next.js 提供了 TypeScript 集成体验，通过配置 TypeScript，即可以转换 JavaScript 开发环境，以使用 Next.js 的类型规范。

首先安装 TypeScript 编译器和相关的类型声明模块，Node.js 模块本身已经含有类型声明文件，不用另外安装。

然后一并在工程目录中初始化默认配置文件 `tsconfig.json`，TypeScript strict 模式默认是没有开启的，建议打开。ts-node 模块可以用来直接运行 ts 脚本：

	npm install -g typescript
	npm install -g ts-node
	tsc --init

	# If you’re using npm
	npm install --save-dev typescript @types/react @types/node

	# If you’re using Yarn
	yarn add --dev typescript @types/react @types/node


编译器会生成 `next-env.d.ts` 这个类型声明模块文件，检查它可以确定 Next.js 类型已经在 TypeScript 编译器中起作用，通常内容是使用三斜杠指令引用其它的类型声明模块：

	/// <reference types="next" />
	/// <reference types="next/types/global" />


然后重启开发服务器，以使用 TypeScript 功能生效。

Next.js Specific Types 提供的类型如下。

Static Generation and Server-side Rendering

```ts
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps: GetStaticProps = async context => {
  // ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}

export const getServerSideProps: GetServerSideProps = async context => {
  // ...
}
```

API Routes

```ts
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // ...
}
```

接下来需要将 JavaScript 工程的脚本文件改成 TypeScript，例如可以将 `pages/_app.js` 转换为 .tsx 扩展名以使用 AppProps 类型：

```ts
import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
```

列如，布局模块可以更新为带 TypeScript 类型语法结构：

```ts
export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
	return (<>...<>)
}
```

转换后的文件可以参考 next-learn-starter 的 typescript-final

使用静态类型语法后，在 VSCode 中会有更多的提示信息，需要认真理解提示的意义。

例如，以下代码中的返回值会给出错误信息：

```ts
export default function App({ Component, pageProps }):AppProps {
  return (
    <><Component {...pageProps} /></>
  )
}
```

乍一看，是正确 tsx 语法，但是，仔细分析一下函数 AppProps 变成了函数的返回值，导致改变了函数签名而引发错误：

	Type 'Element' is not assignable to type 'AppPropsType<Router, {}>'.
	  Property 'pageProps' is missing in type 'Element' but required in type 'AppInitialProps'.ts(2322)
