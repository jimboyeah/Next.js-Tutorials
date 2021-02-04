---
title: '👉 13 预渲染与数据依赖'
excerpt: 'Next.js 应用中的页面就是一个从 .js、jsx、.ts、.tsx 文件导出的 React 组件，这些文件存放在顶层的 pages 目录下，每个页面都使用文件名作为路由 route，即路由是基于目录结构生成的。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T11:22:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 Pre-rendering and Data Fetching

- https://nextjs.org/learn/basics/data-fetching
- https://nextjs.org/docs/basic-features/data-fetching
- https://github.com/vercel/next.js/tree/canary/examples
- https://nextjs.org/docs/basic-features/pages
- https://www.nextjs.cn/learn/basics/dynamic-routes/implement-getstaticpaths
- https://www.nextjs.cn/learn/basics/dynamic-routes/implement-getstaticprops

前面的内部中，只涉及了文件系统的数据，即所有呈现的内容都来自文件系统。实际应用中，很少见，除了纯静态站点 Static Page，或者像 HCMS - Headless Content Management System 这种将数据库存到其它位置的无头内容管理系统。

传统的 CMS 结合了内容和渲染部分，而 Headless CMS 内容优先，将渲染功能剥离，即称之无头。HCMS 的目的是将逻辑与内容分离，从而实现简单的变更管理，并在许多组件中分解复杂的应用程序，每个组件都有其单一的责任。朝着这个方向前进，HCMS 可以取代实际上你正在调用的后端，并节省了许多创建 CRUD 数据库操作的有用工作。剥离后端服务后，HCMS 也表现得比 Wordpress 更加安全。

HCMS 诞生于创建多组件应用程序，这可以快速更改表示逻辑和设计，这是一个很大的改进，当您在现代网站或应用程序上工作时，由于业务需求，可能需要每年更换一次 UI。

作为服务端渲染，数据获取和页面渲染是分不开的，页面获取数据的方式决定了该如何进行渲染。

这部分学习内容：

- Next.js 预渲染特性 pre-rendering；
- 两种预渲染方式 Static Generation & Server-side Rendering。
- Static Generation 即 SSG 又分数据依赖方式和无数据依赖方式。
- 如何使用导出 `getStaticProps()` 函数来获取外部数据。

以下是 Vercel next.js 示范项目中提供的涉及数据获取的静态生成例子：

- cms-wordpress   --> WordPress Example
- blog-starter    --> Blog Starter using markdown files
- cms-datocms     --> DatoCMS Example
- cms-takeshape   --> TakeShape Example
- cms-sanity      --> Sanity Example
- cms-prismic     --> Prismic Example
- cms-contentful  --> Contentful Example
- cms-strapi      --> Strapi Example
- cms-agilitycms  --> Agility CMS Example
- cms-cosmic      --> Cosmic Example
- cms-buttercms   --> ButterCMS Example
- cms-storyblok   --> Storyblok Example
- cms-graphcms    --> GraphCMS Example
- cms-kontent     --> Kontent Example

在页面部分的文档也讲到，除了 CSR - Client-side Rendering，Next.js 还具有两种形式的预渲染： 

- SSG - Static Site Generation，在构建时静态生成生成，并在每次页面请求时重用。
- SSR - Server-Side Rendering，在每次请求时进行服务器端渲染。

对于页面需要获取外部数据的静态预渲染又分为以下两种情况：

- 页面内容取决于外部数据，使用 `getStaticProps`。
- 页面路径取决于外部数据，使用 `getStaticPaths`，通常还要同时使用 `getStaticProps`。

有三个函数相关的：

- `getStaticProps` (Static Generation): Fetch data at build time.
- `getStaticPaths` (Static Generation): Specify dynamic routes to pre-render pages based on data.
- `getServerSideProps` (Server-side Rendering): Fetch data on each request.

使用 TypeScript 可以看到三个函数的原型定义：

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

不一定要在服务器端生成页面时使用数据，对于有频繁的数据交互的页面，可以将数据获取的行为放在客户端进行：

- 首先，直接呈现无数据的页面，但是页面的部分可以重新静态生成，只要显示数据加载中的提示状态。
- 然后，从客户端获取数据，得到数据后再显示，这在用户仪表盘页面 User Dashboard 是常见的做法，因为这是私有页面，也不需要 SEO。


Next.js 背后的团队创建了一个 React Hook 来做这个数据获取的功能，叫做 SWR，它处理了客户端数据获取的缓存、重新验证、焦点追踪、刷新等。

```ts
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```


## getStaticPaths 静态化路径生成函数
- https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
- https://nextjs.org/docs/advanced-features/i18n-routing

示范实现导出 `getStaticPaths()` 函数：

```ts
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } } // See the "paths" section below
    ],
    fallback: true or false // See the "fallback" section below
  };
}
```

为何将函数 `getStaticPaths()` 取名静态化路径生成函数？主要是因为它的返回值就是用来匹配页面路由路径的，只有命名返回值的路由才是有效的页面路径。

这个函数基本没有什么输入数据，除区域信息，在没有设置的情况下得到的输入就是 `{ locales: null, defaultLocale: null }`。 

期待返回的对象类型 { paths: [], fallback: boolean }，fallback 表示回退处理方式。

fallback 总结起来：

- `{ fallback: false }` 不降级，路由未命中时静态页面路径时，直接返回 404 路由；
- `{ fallback: true }` 降级，路由未命中静态页面路径时，先返回降级页面，此时页面 props 为空，生成 HTML 和一份 JSON 供 CSR 客户端渲染使用，完成之后浏览器拿到数据在客户端填上 props，渲染出完整页面。
- `{ fallback: 'blocking' }` 不降级，并且要求用户请求一直等到新页面静态生成结束，就是 SSR，渲染过程是阻塞的，只是完成之后会保留结果 HTML。当用户首次请求页面时，最好能够阻止预渲染。在初始渲染完成之后，再将该页面重复用于响应后续请求。

其中 `{ fallback: false }` 等告诉 Next.js 对所有 `getStaticPaths()` 未返回的 paths 即未匹配的页面返回 404 路由。如果有少量路径要预渲染，可以这样做，因为少量页面都可以在构建时静态生成。对于不经常添加新页面，它也很有用。但是，向数据源中添加了更多项并需要渲染新页面时，则需要再次运行构建。


这个 `getStaticPaths()` 函数返回的 paths 是非常重要的参数，它决定了哪些路径要进行静态渲染。

根据页面路由的配置四种不同形式，常规路由，和三种动态路由形式 `[slug]` 和 `[...slug]` 还有 `[[...slug]]`，返回值的格式也不同。

对于 `pages/posts/[id].js` 最基本的这种动态路由，`getStaticPaths()` 返回的 paths 应该类型如下：

    let paths = [
        {params:{ dynamic: 'dynamic' }},
        {params:{ dynamic: 'pass' }},
        {params:{ dynamic: 'sideway' }},
        {params:{ dynamic: 'more' }},
    ]
    return { paths, fallback: false }

根据这个返回值，Nexxt.js 知道要静态渲染的文件是 `posts/1` 和 `posts/2`，返回空数组就表示没有要渲染的页面同。


对于多参数的这种路由 `pages/posts/[postId]/[commentId]`，则相应地在 `params` 参数中包含 postId 和 commentId 两个字段。

对于 catch-all 形式的路由，比如 `pages/[...slug]`，那么 `params` 参数中应该包含一个 slug 数组。 比如 `{slug:['foo', 'bar']}`，然后 Next.js 会生成静态页面 `/foo/bar`。

示范如何给 `[...catchall]` 路由返回路径信息：

    let paths = [
        {params:{ catchall: ['Catch', 'All'] }},
        {params:{ catchall: ['pass'] }},
        {params:{ catchall: ['sideway'] }},
        {params:{ catchall: ['more'] }},
    ]
    return { paths, fallback: false }


最后一种是 optional catch-all，是可选形式的 catch-all，可以在 `params` 设置 null, [], undefined 或者 false 都可以，表示匹配路由文件所在的一级目录，这就是可选的灵活性。 例如设置 `{ params: {slug: false} }` 那么，对于 `/pages/[[...slug]]` 路由 Next.js 会为其静态生成 `/` 索引页面。


如果返回包含 `{ fallback: true }` 则改变 `getStaticProps()` 函数的行为：

- 原本由 `getStaticPaths()` 返回的路径将在生成时由 `getStaticProps()` 渲染。
- 构建时未生成的路径不会返回 404 页面。相反，Next..js 将在第一次请求这样的路径时提供 fallback 版本的页面。
- 在后台，将静态生成请求的路径 HTML 和 JSON，这包括运行 `getStaticProps()`。
- 完成后，浏览器将接收生成路径的 JSON 用于自动呈现带有所需 props 数据的页面。从用户的角度来看，页面将从备用页面切换到完整页面。
- 同时，Next.js 将此路径添加到预渲染页面的列表中，对后续请求同一路径时将再次生成页面，就像构建时预呈现的其他页面一样。

注意，Next.js 使用 next export 执行静态 HTML 导出时不支持 fallback 为 true。

还有一个场景需要使用 fallback: true，那就是对于超大生成量的站点，如果要一次性生成所有的页面，似乎是永远也不可能完成的，那么这时就需要告诉 Next.js 可以在后续请求时再执行生成，结合 `getStaticProps()` 返回值 revalidate。

对于 fallback 版本页面，有两个特点：

- 页面的 props 参数为空。
- 使用 Router 对象可以检测是否处于 fallback 页面状态，`router.isFallback` 返回 true 表示是回退版本页面。

参考示范：

```ts
// pages/posts/[id].js
import { useRouter } from 'next/router'

function Post({ post }) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return {
    props: { post },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  }
}

export default Post
```

如果是 `{fallback is 'blocking'}` 阻塞方式，访问未在 `getStaticPaths()` 函数返的回路径将进入阻塞，等待 HTML 生成，这种方式与 SSR 相同。生成后缓存以供将来的请求使用，因此每个路径只发生一次，过程如下：

- `getStaticPaths()` 函数返的回路径会在构建过程中由 `getStaticProps()` 渲染为 HTML。
- 构建时未生成的路径不会返回 404 页面，相反，Next.js 将在第一次请求时执行 SSR 返回生成的 HTML。
- 完成后，浏览器将接收为路由路径生成的 HTML，从用户的角度来看，它将从浏览器正在请求页面的状态，过渡到已经加载整个页面的状态。没有加载/回退状态的闪烁。
- 同时，Next.js 将此路径添加到预呈现页面的列表中。对同一路径的后续请求将用生成的页面提供服务，就像构建时预呈现的其他页面一样。
- `{fallback is 'blocking'}` 方式在默认情况下不会更新生成的页面，要更新生成的页面，请结合使用增量静态重新生成。




## getStaticProps 静态化数据生成函数
- https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
- https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
- https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly
- https://next-code-elimination.now.sh/

注意，`getStaticProps()` 是只在服务器端执行的函数，可以导入顶级作用域中的模块，在 `getStaticProps()` 中使用的导入模块将不会绑定到客户端。

这意味着可以直接在 `getStaticProps()` 编写服务器端代码，这包括从文件系统或数据库读取，反过来说，这就是在组件中写服务器端代码的地方，你不能直接在页面脚本的其它地方使用服务端专用的 API。

如果在客户端执行服务端的功能代码，比如 Node 的 FileSystem API 这就会导致应用运行出错。即错误地将服务器端的代码打包到了客户端，典型的错误提示如下：

	Uncaught TypeError: fs__WEBPACK_IMPORTED_MODULE_1___default.a.readdirSync is not a function


参考 `getStaticProps()` 函数原型：

```ts
export async function getStaticProps(context) {
  const postData = getPostData(context.params.id)
  return {
    props: {
      postData
    }
  }
}
```

`getStaticProps()` 函数的返回值应该包含当前页面组件需要的输入参数对象：

- **props** - 唯一必需的，包含的组件参数对象，会传递到后面要渲染的组件上，是一个可以串行化的对象，因为即使在服务器端生成，最终还是需要发往客户端重现。
- **revalidate** - 可选，指定在一定秒数后可以再重新生成，与 `{fallback: true}` 完美结合。因为可以指定一个更新时间周期，Next.js 会在这段时间后尝试更新静态生成。参考增量静态生成 Incremental Static Regeneration。
- **notFound** - 可选，boolean 值指定是否要返回一个 404 状态页面，此时不需要 `{fallback: false}`。
- **redirect** - 可选，允许重定向到内部或外部资源，设置值类似 `{ destination: string, permanent: boolean }`，除了使用 `permanent` 属性表示页面地址迁移，还可以使用 `statusCode` 替代它，但不能同时使用。

`getStaticProps()` 函数的输入参数是一个上下文对象，context 包含以下内容：

- **params** 包含动态路由参数信息，比如页面 `[id].js` 会收到类似 `{ id: ... }` 这样的路由参数，应该结合 `getStaticPaths()` 考虑。
- **preview** 指示是否处于 Preview Mode 预览模式。
- **previewData** 包含 `setPreviewData()` 函数设置的预览模式状态数据。
- **locale** 包含当前区域信息，如果是启用状态。
- **locales** 包含所有支持的区域信息，如果是启用状态。
- **defaultLocale** 包含配置的默认区域信息，如果是启用状态。


使用示范，根据数据决定是否要重定向：

```ts
export async function getStaticProps(context) {
  const res = await fetch(`https://...`)
  const data = await res.json()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}
```

使用示范，根据数据决定是否反回 404 页面：

```ts
export async function getStaticProps(context) {
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}
```

以下情况是使用 getStaticProps 的最佳场景：

- 页面所需的数据在用户请求之前的构建过程就可用。
- 数据来自 Headless CMS 系统。
- 数据可以公开缓存，不对特定于用户。
- 页面必须预先呈现，用于 SEO，并且速度非常快，getStaticProps 生成 HTML 和 JSON 文件都可以由 CDN 缓存以提高性能。


以处理 md 文档为为例，组件在静态化生成时基本的工作流程如下：

- 开始静态化生成，读取要处理的页面组件文件列表，并生成路由信息，根据路由确定页面是否依赖数据进行渲染；
- Next.js 通过组件名称 `pages/tutorial/[slug].tsx` 知道使用了动态路由，并且导出的构造期要执行的数据获取 API；
- 在执行页面组件的渲染前，调用 `getStaticPaths()` 获取路由参数的具体值列表，这个列表相对应多个页面，具体是一个 md 文件对应一个页面；
- 路由数据列表的数据逐个发送到 `getStaticProps()` 以获取页面组件渲染时依赖的数据，具体将 md 文件的内容加载进来；
- 接着，将上一步得到的数据传入组件的渲染函数进行静态生成；

综合来说就是三个步骤：

- `getStaticPaths()` 导出函数解决的是，确定页面文件与动态路由的映射关系，即路径依赖，通过此函数就可以确定要渲染的页面数量。这一个函数确定的路由映射相当于根据用户请求页面的这样一个动作，根本上就是路径数据。
- 然后，将路径数据传入 `getStaticProps()` 导出函数以获取相应的数据，它解决的是页面对数据的依赖。
- 页面组件根据数据确定渲染逻辑，完成最后的静态生成。

在开发过程中，使用了开发服务，是进行动态的服务端渲染，所以以上二个函数不需要执行，也不接收只在请求时才有效的数据。在未来的版本中，getStaticProps 会在每次请求时运行。

而对于服务端渲染，`getServerSideProps()` 导出函数每一次请求页面时都会执行，并将获取到的数据返回给页面的渲染函数，或者类组件的构造函数。

在静态渲染的过程中，有一个比较隐晦点，就是路由与 Linkg 组件的搭配上，使用不同的路由方式，Link 设置有差别。动态路由有三种基本形式，`[slug]` 和 `[...slug]` 还有 `[[...slug]]`，而且可以用在目录命名上。在静态生成时。这部分的数据是通过  `getStaticPaths()` 函数产生的，而不是客户端通过 Link 组件产生的，这就要求生成数据需要与 Link 组件设置的保持一致，非则就不能正常工作。

    <Link
      href={{
        pathname: '/blog/[slug]',
        query: { slug: 'my-post' },
      }}
    >
      <a>Blog Post</a>
    </Link>


使用 `getStaticProps()` 并不意味失去动态内容特性，通过增量静态重新生成 Incremental Static Regeneration，可以实现流量进入时在后台执行重新生成。

受 stale-while-revalidate 启发，参考 RFC5861 文档，HTTP Cache-Control Extensions for Stale Content 无状态内容缓存扩展。后台重新生成可以确保为客户流量提供不中断的服务，总是从静态存储提供，而最新生成的页面会在完成时推送。revalidate 和 fallback: true 可以很好地搭配实现，按需要更新内容。

可伸缩的静态内容，不同于传统 SSR，增量静态重新生成的好处还包括：

- 没有延时峰值，页面持续快速提供服务。
- 页面从不离线，即使后台的重新生成失败，旧最近一次更新也处于正常服务。
- 低数据库和后端负载，页面最多并发执行一次重新计算。


```ts
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}

export default Blog
```

执行数据请求时，还可能会用到 `__dirname`, `__filename`, `process.cwd()` 等 Node 变量或路径信息，当前目录 CWD 总是指向 Next.js 执行的目录。



## getServerSideProps 服务端渲染函数
- https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
- https://nodejs.org/api/http.html#http_class_http_incomingmessage
- https://nodejs.org/api/http.html#http_class_http_serverresponse

在页面中导出 `getServerSideProps()` 异步函数和导出 `getStaticProps()` 函数非常类似，都是获取页面渲染需要的数据。

它们的差别是，前者在每次请求都会执行，而后者只在构建时才会执行。

```ts
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
```

所有 context 参数包含 `getStaticProps()` 函数输入参数 context 所有内容，同时还有增加部分：

- **req** 来自客户端的 HTTP IncomingMessage；
- **res** 来自服务端的 HTTP response；
- **query** 来自客户端的查询字符串；
- **resolvedUrl** 规范化处理后的请求 URL，过滤了客户端 `_next/data` 转换前缀，同时包含原始请求值。


包含 `getStaticProps()` 函数输入参数 context 部分：

- **params** 包含动态路由参数信息，比如页面 `[id].js` 会收到类似 `{ id: ... }` 这样的路由参数，应该结合 `getStaticPaths()` 考虑。
- **preview** 指示是否处于 Preview Mode 预览模式。
- **previewData** 包含 `setPreviewData()` 函数设置的预览模式状态数据。
- **locale** 包含当前区域信息，如果是启用状态。
- **locales** 包含所有支持的区域信息，如果是启用状态。
- **defaultLocale** 包含配置的默认区域信息，如果是启用状态。


`getServerSideProps()` 函数应该返回的对象包含的值也类似，少了 `revalidate`，也没有 `fallback`：


- **props** - 唯一必需的，包含的组件参数对象，会传递到后面要渲染的组件上，是一个可以串行化的对象。
- **notFound** - 可选，boolean 值指定是否要返回一个 404 状态页面。
- **redirect** - 可选，允许重定向到内部或外部资源，设置值类似 `{ destination: string, permanent: boolean }`，除了使用 `permanent` 属性表示页面地址迁移，还可以使用 `statusCode` 替代它，但不能同时使用。


示范 `notFound` 使用：

```ts
export async function getServerSideProps(context) {
  const res = await fetch(`https://...`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}
```


示范 `redirect` 使用：

```ts
export async function getServerSideProps(context) {
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}
```
