---
title: '👉 12 页面组件渲染'
excerpt: 'Next.js 应用中的页面就是一个从 .js、jsx、.ts、.tsx 文件导出的 React 组件，这些文件存放在顶层的 pages 目录下，每个页面都使用文件名作为路由 route，即路由是基于目录结构生成的。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T11:20:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 Pages 页面

- https://www.nextjs.cn/docs/basic-features/pages
- https://github.com/vercel/next.js/tree/canary/examples/
- https://www.nextjs.cn/learn/basics/dynamic-routes/implement-getstaticpaths
- https://www.nextjs.cn/learn/basics/dynamic-routes/implement-getstaticprops


Next.js 应用中的页面就是一个从 .js、jsx、.ts、.tsx 文件导出的 React 组件，这些文件存放在顶层的 pages 目录下，每个页面都使用文件名作为路由 route，即路由是基于目录结构生成的。

Next.js 支持具有动态路由的页面，具有动态路由的页面。例如，如果你创建了一个命名为 pages/posts/[id].js 的文件，那么就可以通过 posts/1、posts/2 等类似的 URL 地址进行访问，访问时会将参数动态传入。

Next.js 默认预渲染每个页面，Pre-rendering，这意味着会预先为每个页面生成相应的 HTML 文件，而不是由客户端 JavaScript 来完成。预渲染可以带来更好的性能和 SEO 效果。

每个生成的 HTML 文件都与该页面所需的最少 JavaScript 代码相关联。当浏览器加载一个页面时，其代码将运行并使页面完全具有交互性，此过程称为水化 Hydration。

Next.js 具有两种形式的预渲染： 

- Static Generation，在构建时静态生成生成，并在每次页面请求时重用。
- Server-Side Rendering，在每次请求时进行服务器端渲染。

这两种方式的不同之处在于为页面生成 HTML 页面时机的选择上，重要的是 Next.js 允许你为每个页面选择预渲染的方式。可以创建一个混合渲染的 Next.js 应用程序，对大多数页面使用静态生成，同时对其它页面使用服务器端渲染。

页面需要获取外部数据的静态预渲染又分为以下两种情况：

- 页面依赖内容数据，使用 `getStaticProps`。
- 页面依赖路径数据，使用 `getStaticPaths`，通常还要同时使用 `getStaticProps`。

这里，需要区分一下页面这个概念，尽管，页面也是组件，但是这个组件作为页面来使用用。在请求时先加载是页面，然后再由页面加载其它组件，而对于其它组件来说，以上这些数据获取方法并不可用，即使将其文件放到 pages 目录下也一样。

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


出于性能考虑，相对服务器端渲染，我们更推荐使用静态生成。 CDN 可以在没有额外配置的情况下缓存静态生成的页面以提高性能。但是，在某些情况下，服务器端渲染可能是唯一的选择。

你还可以将客户端渲染与静态生成或服务器端渲染一起使用。这意味着页面的某些部分可以完全由客户端 JavaScript 呈现。

使用静态生成，执行 next build 生成页面对应的 HTML 文件。这意味着在生产环境中，运行 next build 时将生成该页面对应的 HTML 文件。然后，此 HTML 文件将在每个页面请求时被重用，还可以被 CDN 缓存。

Next.js 可以静态生成带有或不带有数据的页面。

预渲染时不需要获取任何外部数据这种情况下，Next.js 只需在构建时为每个页面生成一个 HTML 文件即可。


场景一、页面内容依赖于数据的静态渲染

假定博客页面可能需要从 CMS 内容管理系统中获取文章列表，以下 `Blog` 组件在获取数据前不会进行渲染。

```jsx
// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export default Blog
```

要在预渲染时获取此数据，Next.js 允许在 `Blog` 组件文件中导出异步的 `getStaticProps()` 函数。该函数在构建时被调用，允许你在预渲染时将获取的数据，返回的值将作为传递给页面的参数。


```jsx
// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

场景二、页面路径依赖于数据。

如前面介绍，Next.js 允许你创建具有动态路由的页面。例如，一个名为 `pages/posts/[id].js` 的文件用以展示以 id 标识的单篇博客文章。当 URL 指向 posts/1 路径时将展示 id=1 的博客文章。这种情况就路径依赖于数据，在构建时 id 所对应的内容时需要从外部获取。

为了解决这个问题，Next.js 允许在动态页面文件里导出 `getStaticPaths()` 异步函数。该函数在构建时被调用，其返回值指定要预渲染的路径。

```jsx
// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => `/posts/${post.id}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
```


同样在 `pages/posts/[id].js` 页面中还需要导出 `getStaticProps()` 以便可以获取 id 所对应的博客文章的数据并进行预渲染：

```jsx
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}
```

建议尽可能使用静态生成，不论带有或不带数据，因为所有页面都可以只构建一次并托管到 CDN 上，这比让服务器根据每个页面请求来渲染页面快得多。

还可以对多种类型的页面使用静态生成，包括：

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation



另一方面，如果你无法在用户请求之前预渲染页面，则静态生成不是一个好主意。这也许是因为页面需要显示频繁更新的数据，并且页面内容会随着每个请求而变化。

在这种情况下，您可以执行以下任一操作：

- 将静态生成与客户端渲染一起使用，跳过页面某些部分的预渲染，然后使用客户端 JavaScript 来填充它们。有关此方法的信息，请查看获取数据部分文档。
- 使用服务器端渲染，Next.js 针对每个页面的请求进行预渲染。由于 CDN 无法缓存该页面，因此速度会较慢，但是预渲染的页面将始终是最新的。

服务器端渲染也被称为 SSR 或动态渲染，如果页面使用的是服务器端渲染，则会在每次页面请求时重新生成页面的 HTML。需要在页面文件中导出 `getServerSideProps()` 异步函数，服务器将在每次页面请求时调用此函数。

例如，假设你的某个页面需要预渲染频繁更新的数据，比如从外部 API 获取。你就可以编写 getServerSideProps 获取该数据并将其传递给 Page。

示范如下：

```jsx
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://github.com/manifest.json`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}
```

如你所见，`getServerSideProps` 类似于 `getStaticProps`，但两者的区别在于前者在每次页面请求时都会运行，而在构建时不运行。

总结 Next.js 的两种预渲染形式：

- 静态生成 HTML 是在构建时生成的，并重用于每个页面请求。静态生成的页面只需导出页面组件或 `getStaticProps` 函数，如果需要还可以导出 `getStaticPaths` 函数。对于可以在用户请求之前预先渲染的页面来说，这非常有用，你也可以将其与客户端渲染一起使用以便引入其他数据。

- 服务器端渲染 HTML 是在每个页面请求时生成的。要使用服务器端渲染，请导出 `getServerSideProps` 函数。由于服务器端渲染会导致性能比静态生成慢，因此仅在绝对必要时才使用此功能。
