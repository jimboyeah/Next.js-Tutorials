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

路由和页面生成，还有数据获取是整体，整体的学习目标：

- 通过使用 `getStaticPaths()`该当和动态路由进行静态生成。
- 实现 `getStaticProps()` 函数以获取数据生成页面时依赖的数据。
- 使用 `remark` 模块实现 markdown 文档解析。
- 链接到动态路由的页面。

前面解析过，Next.js 的路由是基于文件路径的生成的，即页面文件具有什么样的路径信息就生成什么样的路由。

Next.js 支持具有动态路由的页面，具有动态路由的页面。例如，如果你创建了一个命名为 pages/posts/[id].js 的文件，那么就可以通过 posts/1、posts/2 等类似的 URL 地址进行访问，访问时会将参数动态传入。

动态路由 Dynamic Routes，当页面文件名或目录名中用方括号命名，如 `pages/[postType]/[pid].js` 这种页面文件命名就是动态路由，这表示给生成的路由设置了参数。


考虑以下这个命名为 `pages/post/[pid].js` 的页面，由这个页面文件生成的路由就是 `post/[pid]`，它就可以匹配到类似 `/post/1` 或者 `/post/abc` 这样 URL：

```tsx
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Post

```

在设置 Link 组件属性时，href 属性一般也包含 [pid] 这个符号，还要完整包含目录路径结构的其它部分。但是，使用 as 属性也可以替代 href。

参考 dynamic-routing 示范工程的 `\pages\post\[id]\index.js`，注意 as 是作地址栏显示的，这个值也就是在客户端的状态，它会回传到服务器以匹配页面文件：

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


因为 Link 组件可以使用 Node URL 对象，所以它又可以按以下方式给 href 属性传入一个对象结构：

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
