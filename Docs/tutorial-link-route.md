---
title: '👉 04 路由相关组件 Link & Route'
excerpt: '对于平衡这种怪异的结构，Link 组件提供了客户端页面导航的功能，而且是不用刷新页面。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T03:01:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 Next Link as Route 

- https://nextjs.org/docs/api-reference/next/link
- https://nextjs.org/docs/api-reference/next/router
- https://nextjs.org/docs/routing/introduction
- https://nodejs.org/api/url.html#url_url_strings_and_url_objects


这样做法写的代码确实有点怪异：

    ```ts
    import Link from 'next/link'

    export default function FirstPost() {
    return (
        <>
        <h1>First Post</h1>
        <h2>
            <Link href="/">
            <a>Back to home</a>
            </Link>
        </h2>
        </>
    )
    }
    ```

对于平衡这种怪异的结构，Link 组件提供了客户端页面导航的功能，而且是不用刷新页面。

客户端导航 Client-side navigation 意味着页面转换是由 JavaScript 完成的，而 a 链接标签则是浏览器完成的，所以从时间效率上 Link 更表现更好。

可以用浏览器开发工具给页面 html 节点设置一个背景色来验证这过种，因为 body 节点会被脚本处理掉。如果发生浏览器发生页面切换，则背景色会重置，如果保留就说明客户端导航工作了。

所以 Link 就相当于路由组件在工作。

如果要链接到外部站点，使用 a 标签，另外 Link 组件不使用 className 属性。


在代码分割或暂存上的工作，Next.js 自动做好了，每个页面在请求时，只会加载需要的页面，这确保了首次加载的速度，即有好几百个页面要展示。

独立加载也表示页面模块是隔离的，如果一个页面异常，其它页面还可以正常展示。并且，在发布运行的版本中，Link 组件在呈现后，会自行在后台预加载页面，这是非常好的特性，页面可能在你还没有请求时就已经提前准备好了。

Link 组件原型定义参考：

    ```ts
    /// <reference types="node" />
    import React from 'react';
    import { UrlObject } from 'url';
    declare type Url = string | UrlObject;
    export declare type LinkProps = {
        href: Url;
        as?: Url;
        replace?: boolean;
        scroll?: boolean;
        shallow?: boolean;
        passHref?: boolean;
        prefetch?: boolean;
        locale?: string | false;
    };
    declare function Link(props: React.PropsWithChildren<LinkProps>): React.DetailedReactHTMLElement<{
        onMouseEnter?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
        onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
        href?: string | undefined;
        ref?: any;
    }, HTMLElement>;
    export default Link;
    ```



Link 组件使用以下属性：

- `href` - 组件路径或 URL 地址，这是唯一必需属性；
- `as` - 装饰参数，显示在浏览器地址栏中路径，在 Next.js 9.5.3 之前用作动态路由；
- `passHref` - 如果需要使用组件封装 a 标签，请指定此属性，默认为 false；
- `prefetch` - 预存取页面默认 true 启用，任何 Link 都会后台加载在页面视图范围的目标页面。使用静态生成的页面将预加载带数据的 JSON 文件以加快页面切换。
- `replace` - 是否要替换浏览器的 history 记录，默认是 false 即增加一条历史记录；
- `scroll` - 指示在导航后是否滚动页面到顶端，默认 true；
- `shallow` - 是否在不运行 `getStaticProps`、`getServerSideProps` 或者 `getInitialProps` 的情况下更新当前页路径，默认为 false。
- `locale` - 本地化会自动处理好，仍然可以通过此属性提供另外的本地化值，当 href 指向失败时，禁止默认包含本地化的行为。The active locale is automatically prepended. locale allows for providing a different locale. When false href has to include the locale as the default behavior is disabled.



对于使用动态片段的路由，除了捕捉所以路由没什么特别可以做的，自从 Next.js 9.5.3 以来，使用插件 interpolation 或 URL Object 来生成链接非常便利。

比如 `pages/blog/[slug].js` 这条动态路由会匹配以下链接：


    ```ts
    import Link from 'next/link'

    function Posts({ posts }) {
    return (
        <ul>
        {posts.map((post) => (
            <li key={post.id}>
            <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                <a>{post.title}</a>
            </Link>
            </li>
        ))}
        </ul>
    )
    }

    export default Posts
    ```



示范使用类组件封装 a 标签：

    ```ts
    import Link from 'next/link'
    import styled from 'styled-components'

    // This creates a custom component that wraps an <a> tag
    const RedLink = styled.a`
    color: red;
    `

    function NavLink({ href, name }) {
    // Must add passHref to Link
    return (
        <Link href={href} passHref>
        <RedLink>{name}</RedLink>
        </Link>
    )
    }

    export default NavLink
    ```


函数组件封装 a 标签还需要加封 `forwardRef` 进行引用转发：

    ```js
    import Link from 'next/link'

    // `onClick`, `href`, and `ref` need to be passed to the DOM element
    // for proper handling
    const MyButton = React.forwardRef(({ onClick, href }, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
        Click Me
        </a>
    )
    })

    function Home() {
    return (
        <Link href="/about" passHref>
        <MyButton />
        </Link>
    )
    }

    export default Home
    ```



    ```ts
    import Link from 'next/link'

    function Home() {
    return (
        <ul>
        <li>
            <Link
            href={{
                pathname: '/about',
                query: { name: 'test' },
            }}
            >
            <a>About us</a>
            </Link>
        </li>
        <li>
            <Link
            href={{
                pathname: '/blog/[slug]',
                query: { slug: 'my-post' },
            }}
            >
            <a>Blog Post</a>
            </Link>
        </li>
        </ul>
    )
    }

    export default Home
    ```

上一例示范使用 Node URL 对象作为 href 参数：

- 预计定义路由: /about?name=test
- 另一条是动态路由: /blog/my-post

可以参考 Node.js 的 URL 模块文档。

其它属性使用示范：

    ```html
    <Link href="/about" replace>
    <a>About us</a>
    </Link>

    <Link href="/?counter=10" scroll={false}>
    <a>Disables scrolling to the top</a>
    </Link>

    ```
