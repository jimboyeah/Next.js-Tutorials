---
title: '👉 02 工程基本结构'
excerpt: '页面结构如下，只是展示了一个静态页面，就是一个导出的渲染函数，另外还使用了 `Head` 组件来生成 HTML 的 head 节点下的元信息标签：'
coverImage: '/20161106s.jpg'
date: '2021-02-03T03:01:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---


# 👉 Next.js 工程基本结构

页面结构如下，只是展示了一个静态页面，就是一个导出的渲染函数，另外还使用了 `Head` 组件来生成 HTML 的 head 节点下的元信息标签：

    export default function Home() {
        return ( JSX... )
    }


    ```ts
    import Head from 'next/head'

    export default function Home() {
    return (
        <div className="container">
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main> ... </main>

        <footer> ...  /footer>

        <style jsx>{`
            @media (max-width: 600px) {
            .grid { width: 100%; flex-direction: column; }
            }
        `}</style>

        <style jsx global>{`
            html,
            body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }
            * {
            box-sizing: border-box;
            }
        `}</style>
        </div>
    )
    }
    ```

生成的配置 .next\server\pages-manifest.json 自动包含了路由和页面的映射关系：

    ```json
    {
        "/_app": "pages/_app.js",
        "/_error": "pages/_error.js",
        "/_document": "pages/_document.js",
        "/": "pages/index.js"
    }
    ```

所以，将 pages 作为页面组件的根目录，Next.js 自动处理路由映射，需要什么页面就添加什么脚本文件，这就很像在其它语言开发 Web 应用，只不过这是使用的是 JSX 和 React Components。

尝试创建一个 /posts/first-post.js 作为 post 页面，导出一个默认函数作为模块的渲染函数，然后通过 /posts/first-post 地址查看。当然，也可以创建其它名字的页面脚本，只要导出渲染函数即可以，以下这个示范如何使用反引号来避免 pre 标签显示的代码被处理：

    ```ts
    export default function FirstPost(){
        return (
        <>
        <pre className="card">
    {`
    PS > npm run build

    > learn-starter@0.1.0 build C:\coding\md-code\react-nextjs-blog
    > next build

    info  - Creating an optimized production build
    info  - Compiled successfully
    info  - Collecting page data
    info  - Generating static pages (3/3)
    info  - Finalizing page optimization

    Page                                                           Size     First Load JS
    ┌ ○ /                                                          7.34 kB        70.5 kB
    ├ ○ /404                                                       3.46 kB        66.6 kB
    └ ○ /posts/first-post                                          310 B          63.5 kB
    + First Load JS shared by all                                  63.2 kB
    ├ chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.783b05.js  13.3 kB
    ├ chunks/framework.e2fe4a.js                                 41.8 kB
    ├ chunks/main.f685e0.js                                      6.37 kB
    ├ chunks/pages/_app.7d2df5.js                                1.01 kB
    └ chunks/webpack.50bee0.js                                   751 B

    λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
    ○  (Static)  automatically rendered as static HTML (uses no initial props)
    ●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
    (ISR)     incremental static regeneration (uses revalidate in getStaticProps)

    PS >`}
        </pre>
        <style>{`
            body {background: darkblue; }
            pre {color: cornsilk; white-space: break-spaces;}
        `}</style>
        </>
        )
    }
    ```

或者使用 React 的 `dangerouslySetInnerHTML` 属性来设置 innerHTML：

	<div dangerouslySetInnerHTML={{__html:`${md}`}}></div>
