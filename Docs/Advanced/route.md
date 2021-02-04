---
title: '👉 11 路由配置'
excerpt: '路由和页面生成，还有数据获取是整体，整体的学习目标：
- 通过使用 `getStaticPaths()`该当和动态路由进行静态生成。
- 实现 `getStaticProps()` 函数以获取数据生成页面时依赖的数据。
- 使用 `remark` 模块实现 markdown 文档解析。
- 链接到动态路由的页面。
'
coverImage: '/20161106s.jpg'
date: '2021-02-03T11:20:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 Route 路由配置

- https://nextjs.org/docs/routing/dynamic-routes
- https://nextjs.org/docs/api-routes/introduction
- https://github.com/vercel/next.js/tree/canary/examples/dynamic-routing
- https://www.nextjs.cn/learn/basics/dynamic-routes/implement-getstaticpaths
- https://www.nextjs.cn/learn/basics/dynamic-routes/implement-getstaticprops
- https://www.nextjs.cn/learn/basics/dynamic-routes/render-markdown
- https://nextjs.org/docs/advanced-features/automatic-static-optimization
- https://www.nextjs.cn/docs/advanced-features/i18n-routing

路由和页面生成，还有数据获取是整体，整体的学习目标：

- 了解路由的四种基本形式，常规路由，和三种动态路由形式 `[slug]` 和 `[...slug]` 还有 `[[...slug]]`。
- 通过使用 `getStaticPaths()`该当和动态路由进行静态生成。
- 实现 `getStaticProps()` 函数以获取数据生成页面时依赖的数据。
- 使用 `remark` 模块实现 markdown 文档解析。
- 链接到动态路由的页面。

前面解析过，Next.js 的路由是基于文件路径的生成的，一个普通的文件路径信息就是一条路由，即页面文件具有什么样的路径信息就生成什么样的路由。

Next.js 支持具有动态路由的页面，具有动态路由的页面路径中使用方括号。例如，如果你创建了一个命名为 `pages/posts/[id].js` 的页面文件，那么就可以通过 `posts/1`、`posts/2` 等类似的 URL 地址进行访问，访问时会将参数传入并且由 Router 对象解析出来。

动态路由 Dynamic Routes，当页面文件名或目录名中用方括号命名，就是动态路由，这表示给生成的路由设置了参数。

以下示范，如何在请求页面时使用 Router 对象获取 URL 传递的数据：

```tsx
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Post: {id}</p>
}

export default Post
```

在设置 Link 组件属性时，href 属性一般也包含 [id] 这个符号，还要完整包含目录路径结构的其它部分。在 Next.js 10 新特性中，使用 as 属性是一个可选项，也可以用来覆盖 href 属性。注意，as 属性比 href 属性更优先，这个值也就是在客户端的状态，它会回传到服务器以匹配页面文件

参考 dynamic-routing 示范工程的 `\pages\post\[id]\index.js`：

```jsx
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../../../components/header'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Header />
      <h1>Post: {id}</h1>
      <ul>
        <li>
          <Link href="/post/[id]/[comment]" as={`/post/${id}/first-comment`}>
            <a>First comment</a>
          </Link>
        </li>
        <li>
          <Link href="/post/[id]/[comment]" as={`/post/${id}/second-comment`}>
            <a>Second comment</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Post
```

Dynamic route segments，要使用页面文件路径匹配上动态路由片段，可以在目录、文件名字上使用方括号，参考以下文件名与生成的路由对应关系：

- pages/blog/[slug].js         ---> /blog/:slug          --> (/blog/hello-world)
- pages/[username]/settings.js ---> /:username/settings  --> (/foo/settings)
- pages/post/[...all].js       ---> /post/*              --> (/post/2020/id/title)

注意事项，当多个路由匹配时，预定义路由优先，即非动态路由比动态路由优先匹配执行，按以下优先顺序执行匹配：

- Predefined Routes 
- Dynamic Routes
- Catch-all Routes
- Optional Catch-all Routes

在同一级目录，Catch-all Routes 和 Optional Catch-all Routes 不能同时设置。

例如：

pages/post/create.js     --> 匹配 /post/create
pages/post/[pid].js      --> 匹配 /post/1, /post/ab, /post/cd ... 但是不能匹配 /post/create
pages/post/[...slug].js  --> 匹配 /post/1/2, /post/a/b/c ... 但不能匹配 /post/create, /post/abc
pages/post/[[...opt]].js --> 匹配前面几种情况之外的路由，还可以匹配 /post

那些由 Automatic Static Optimization 自动静态优化过的页面会在不依赖路由参数的情况下水合 Hydrated，即 query 是 {} 空对象，没有数据。然后服务端会触发一个更新，让应用提供 query 数据。

自动静态优化是通过检测页面是否有导出 `getServerSideProps()` 或 `getInitialProps()` 函数决定是否进行优化的。

使用动态路由就需要实现 `getStaticPaths()` 函数，以返回有效路由匹配列表。因为具体要实现什么路由路径的页面只有给出定义，Next.js 才知道哪么路径的页面是有效的。只有命中列表的才算是有效页面路径，Next.js 才会去执行页面生成。如果，想对没有命中的路由路径进行其它处理，那么就需要使用 `getStaticPaths()` 函数反的参数来设置，其中的 `fallback` 参数是设置如何处理未命中路由的，参考 `getStaticPaths()` 静态化路径生成函数。 

如果不为动态路由实现 `getServerSideProps()` 或 `getInitialProps()` 函数，则它们表现和一般的预定义路由没有什么不同。并且请求页面时，也收不到参数的，这是因为这种情况下 Next.js 使用的是静态构建模式。

作为测试，可以准备以下这组 Link 组件，分别用于不同路由规则的测试：

	🚩<Link href="/route/normal"><a>Normal Link</a></Link>
	🚩<Link href="/route/normal" as="/route/normal?more=yes"><a>Normal As</a></Link>

	🚩<Link href="/route/dynamic"><a>Dynamic Link</a></Link>
	🚩<Link href="/route/dynamic" as="/route/more?more=yes"><a>Dynamic More</a></Link>

	🚩<Link href="/route/catch/all"><a>Catch All</a></Link>
	🚩<Link href="/route/catch/GitHub?more=yes"><a>Catch GitHub</a></Link>


另外准备几个页面，命名以使用不同的路由规则，这里以 `/route/[[...catchopt]].tsx` 作为示范：

```ts
import Layout from '../../components/layout'
import {useRouter} from 'next/router'

export default function Catchopt(props:any){
    const Router = useRouter()
    let json = JSON.stringify(Router.query);
    let fallback = Router.isFallback && "FALLBACK";
    console.log(`-----------------[[...catchopt]].tsx`, fallback, props, Router);
    return (
    <Layout>
    <h3 className="card">Optional Catch-all Routes Test</h3>
    {Router.isFallback?(
        <h1 className="card">Router.isFallback</h1>
    ):(
        <pre className="card">{json}</pre>
    )}
    </Layout>
    )
}

export async function getStaticProps(context: any) {
    console.log("+++++++++++++++Optional Catch-all getStaticProps", context);
    return {
        props: {
            data: JSON.stringify(context)
        }
    }
}

export async function getStaticPaths(context:any) {
    console.log("+++++++++++++++Optional Catch-all getStaticPaths", context);
    const res = await fetch(`https://github.com/manifest.json`)
    const data = await res.json()
    let locale = context.locale ?? 'zh-CN';
    let paths = [
        {params:{ locale, catchopt: ['catch', 'all'] }},
        {params:{ locale, catchopt: ['catch', data.name] }},
        {params:{ locale, catchopt: false }}, 
    ]
    return { paths, fallback: false }
}
```

这种 Optional Catch-all 路由是可选形式的 Catch-all，可以在 `params` 设置 null, [], undefined 或者 false 都可以，表示匹配路由文件所在的一级目录，这就是可选的灵活性。就这里，`/route/[[...catchopt]].tsx` 页面而言，设置为 null 匹配的是 `/route` 这个路径的页面，对应生成的文件就是 `/route.html`。

从构建过程中输出的目录结构也可以看到，各个路由路径对应的输出：

	Page                                                           Size     First Load JS
	┌ ● /                                                          2.29 kB        73.7 kB
	├   /_app                                                      0 B            63.6 kB
	├ ○ /404                                                       3.46 kB          67 kB
	├ ○ /authors/me                                                2.86 kB        66.4 kB
	├ ○ /posts/build                                               981 B          72.4 kB
	├ ● /posts/posts                                               1.92 kB        65.5 kB
	├ λ /posts/tutorial-assets                                     3.66 kB        82.9 kB
	├ ● /route/[[...catchopt]]                                     458 B          68.4 kB
	├   ├ /en/route/catch/all
	├   ├ /en/route/catch/GitHub
	├   └ /en/route
	├ ● /route/[dynamic]                                           411 B          68.3 kB
	├   ├ /en/route/dynamic
	├   ├ /en/route/pass
	├   ├ /en/route/sideway
	├   └ /en/route/more
	├ ○ /route/normal                                              404 B          68.3 kB
	└ ● /tutorial/[...slug]                                        685 B          79.9 kB
	    ├ /zh-CN/tutorial/tutorial-typescript
	    ├ /zh-CN/tutorial/tutorial-styling
	    ├ /zh-CN/tutorial/tutorial-start
	    └ [+5 more paths]


在导出 `getStaticProps()` 和 `getStaticPaths()` 函数时，就是在向 Next.js 表明，页面需要使用动态的数据，渲染生成时需要执行它们，参考输出信息：

	+++++++++++++++Optional Catch-all getStaticPaths { locales: null, defaultLocale: null }
	+++++++++++++++Optional Catch-all getStaticProps {
	  params: { catchopt: [ 'catch', 'GitHub' ] },
	  locales: undefined,
	  locale: undefined,
	  defaultLocale: undefined
	}
	-----------------[[...catchopt]].tsx false { data: '{"params":{"catchopt":["catch","GitHub"]}}' } ServerRouter {
	  route: '/route/[[...catchopt]]',
	  pathname: '/route/[[...catchopt]]',
	  query: { catchopt: [ 'catch', 'GitHub' ] },
	  asPath: '/route/catch/GitHub',
	  basePath: '',
	  events: undefined,
	  isFallback: false,
	  locale: undefined,
	  isReady: false,
	  locales: undefined,
	  defaultLocale: undefined,
	  domainLocales: undefined
	}

不难发现，`getStaticProps()`  函数返回的 props 就是组件的输入参数。而它的输入的 context 中的 **params** 包含动态路由参数信息，比如页面 `[id].js` 会收到类似 `{ id: ... }` 这样的路由参数，应该结合 `getStaticPaths()` 考虑。

可以尝试注解掉 `getStaticProps()` 和 `getStaticPaths()`，比较一下组件在执行时获取到的参数，会发现原本来自客户端的查询字符串没有了。

如果要在项目中使用本地化信息，请在配置文件中设置：

```js
// 👉 /next.config.js 配置脚本
module.exports = {
  i18n: {
    locales: [ 'en', 'zh-CN' ],
    defaultLocale: 'en',
  },
}
```

这样，运行后可以从 `getStaticProps()` 和 `getStaticPaths()` 函数的传入参数中获取：

	{ locales: [ 'en', 'zh-CN' ], locale: 'zh-CN', defaultLocale: 'en' }

其中 locale 是通过浏览器标头检查出来的，而且只在首页中执行检查，假设浏览发送了以下标头内容：

	Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,pt;q=0.7,zh-TW;q=0.6,ja;q=0.5


设置本地化信息后，路由路径会自动处理，添加区域前缀。但是对于动态路由，需要相应调整，否则匹配不正确。


Link 组件可以使用 Node URL 对象，所以它又可以按以下方式给 href 属性传入一个对象结构：

```jsx
import Link from 'next/link'

export default function BlogLink() {
  return (
    <Link
      href={{
        pathname: '/blog/[post]/[comment]',
        query: { post: 'post-1', comment: 'comment-1' },
      }}
    >
      <a>Valid link</a>
    </Link>
  )
}
```

动态路由的使用一般就是表示要使用动态数据，只要导出数据获取 API，就会在构建期的数据获取行为。除非使用浅路由，Shallow Routing 它可以导致不执行本应在构建期的执行的 `getServerSideProps`, `getStaticProps`, `getInitialProps` 等数据获取方法。


Dynamic Routes 还可以扩展捕获所有路径，在方括号中使用三个省略点就可以，如`pages/post/[...slug].js` 就可以匹配 `/post/a`, `/post/a/b`, `/post/a/b/c` 等等。

可选扩展方式使用双重方括号，匹配范围多一层，如 `pages/post/[[...slug]].js` 还可以多匹配 `/post` 这一情况。

而 Linkg 属性相应设置的 query 对象如下：

	{ } // GET `/post` (empty object)
	{ "slug": ["a"] } // `GET /post/a` (single-element array)
	{ "slug": ["a", "b"] } // `GET /post/a/b` (multi-element array)


启用浅路由只需要设置路由选项的 shallow 为 true：

```ts
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Current URL is '/'
function Page() {
  const router = useRouter()

  useEffect(() => {
    // Always do navigations after the first render
    router.push('/?counter=10', undefined, { shallow: true })
  }, [])

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])
}

export default Page
```

当 URL 更新时，如 `/?counter=10` 页面并不会替代，只有路由状态改变才会，可以通过类组件的 `componentDidUpdate()` 生命周期函数来观察：

```js
componentDidUpdate(prevProps) {
  const { pathname, query } = this.props.router
  // verify props have changed to avoid an infinite loop
  if (query.counter !== prevProps.router.query.counter) {
    // fetch data based on the new query
  }
}
```

通常 `next/link` 已经满足大部分的路由需求，但还是有时候要在客户端进行导航，这时可以使用 Router 对象：

```ts
import { useRouter } from 'next/router'

function ReadMore() {
  const router = useRouter()

  return (
    <span onClick={() => router.push('/about')}>Click here to read more</span>
  )
}

export default ReadMore
```

