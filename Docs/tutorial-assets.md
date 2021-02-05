---
title: '👉 05 静态资源管理'
excerpt: 'Next.js 提供静态文件服务，如图像文件等，存放于根目录下的 public 顶级目录中，这里的文件可以像 pages 目录中的文件一样使用应用的 root 来引用。'
coverImage: '/20161106s.jpg'
date: '2021-02-02T19:01:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 Assets & Metadata & CSS

- https://nextjs.org/docs/basic-features/built-in-css-support
- https://nextjs.org/learn/basics/assets-metadata-css
- https://nextjs.org/docs/basic-features/static-file-serving
- https://nextjs.org/docs/api-reference/next/head
- https://github.com/vercel/next.js/tree/canary/examples/with-styled-components
- https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss
- https://github.com/vercel/next.js/tree/canary/examples/with-emotion

这节学习如何管理静态资源：

- How to add static files (images, etc) to Next.js.
- How to customize what goes inside the <head> for each page.
- How to create a reusable React component which is styled using CSS Modules.
- How to add global CSS in pages/_app.js.
- Some useful tips for styling in Next.js.

如果，没有完成前面的工作，可以直接复制现有的示范工程继续。

    npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/assets-metadata-css-starter"

Next.js 提供静态文件服务，如图像文件等，存放于根目录下的 public 顶级目录中，这里的文件可以像 pages 目录中的文件一样使用应用的 root 来引用。 

比如 `pages/index.js` 页面的 footer 需要使用一张静态图片就可以这样引用：

    <img src="/vercel.svg" alt="Vercel Logo" className="logo" />

这个 logo 图像在 public 目录中，通过 root 根目录引用它。

同时 public 目录也可以用来存放用于搜索引擎的指引文件 robots.txt，或 Google Site Verification，或者任意的静态资源。

Metadata 就是在 HTML 页面 head 区域的内容，如页面标题 title 等，可以使用 `Head` 组件渲染。

    ```jsx
    import Head from 'next/head'
    /*...*/

    <>
    <Head>
        <title>First Post</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <h1>First Post</h1>
    </>
    ```

注意前面的示范代码中，已经在 DOM 嵌入了样式，使用 styled-jsx 模块提供的写法：

    <style scoped>{` styles... `}</style>
    <style scoped global>{` styles... `}</style>

添加作用域 scroped 后，当前模块中的元素应用样式时会添加后续来避免全局污染，使用 global 和不使用作用域同样效果。

Next.js 内建了 CSS 和 Sass 支持，可以导入 .css 和 .scss 样式文件，还有 styled-jsx 用来编写 CSS-in-JS 样式脚本，当然可以使用其它的样式模块，如 styled-components 或 emotion 这些库，还可以使用像 Tailwind CSS 这样一些流行的样式库。

    ```ts
    import styled from 'styled-components'

    const Title = styled.h1`
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary};
    `

    export default function Home() {
    return <Title>My page</Title>
    }
    ```

样式处理的主要工作之一就是页面布局处理，可以缩写一些专用于此目的的组件 Layout Component，并存放于顶层的 components 目录下。

然后在页面脚本模块中引入使用：

    ```ts
    import Head from 'next/head'
    import Link from 'next/link'
    import Layout from '../../components/layout'

    export default function FirstPost() {
    return (
        <Layout>
        <Head>
            <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <h2>
            <Link href="/">
            <a>Back to home</a>
            </Link>
        </h2>
        </Layout>
    )
    }
    ```

通过 CSS Modules 可以将样式仅用于当前组件，而不会污染其它不相关的组件结构。

创建一个样式模块文件 `components/layout.module.css`，注意这种固定格式的后缀名是样式模块的规则要求：

    ```css
    .container {
    max-width: 36rem;
    padding: 0 1rem;
    margin: 3rem auto 6rem;
    }
    ```

将样式应用于组件 `components/layout.js`，直接将样式对象导出的类名赋给组件的 className 属性即可:

    ```ts
    import styles from './layout.module.css'

    export default function Layout({ children }) {
    return <div className={styles.container}>{children}</div>
    }
    ```

样式模块 CSS Modules 所做的事件就是自动生成唯一的样式选择器，以避免与其它模块的样式有冲突。并且，Next.js 提供的代码分割功能也一样工作于 CSS Modules。这保证了页面总是持有最少的样式，页面模块的打包也更小。CSS Modules 从 JavaScript 代码打包过程中提取出样式定义，并在构造过程中生成 .css 文件以供 Next.js 动态加载。

前面已经提到过 global 用于定义样式，但是它也仅在组件加载时生效，要定义全站通用的样式，就需要对总入口组件，即 `pages/_app.js` 进行修改。

可以选择将全局样式表存放于任意目录，但是在顶层 styles 目录是个不错的主意，编写 `styles/global.css`：

    ```css
    html,
    body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
        Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.6;
    font-size: 18px;
    }

    * {
    box-sizing: border-box;
    }

    a {
    color: #0070f3;
    text-decoration: none;
    }

    a:hover {
    text-decoration: underline;
    }

    img {
    max-width: 100%;
    display: block;
    }
    ```

然后将其导入 `pages/_app.js` 即可，如果是首次添加这个文件，请重启开发服务器以生效：

    ```ts
    import '../styles/global.css'

    export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
    }
    ```
