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

- Next.js’ pre-rendering feature.
- The two forms of pre-rendering: Static Generation and Server-side Rendering.
- Static Generation with data, and without data.
- getStaticProps and how to use it to import external blog data into the index page.
- Some useful information on getStaticProps.

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

在页面部分的文档也讲到，Next.js 具有两种形式的预渲染： 

- Static Generation，在构建时静态生成生成，并在每次页面请求时重用。
- Server-Side Rendering，在每次请求时进行服务器端渲染。

对于页面需要获取外部数据的静态预渲染又分为以下两种情况：

- 页面内容取决于外部数据，使用 `getStaticProps`。
- 页面路径取决于外部数据，使用 `getStaticPaths`，通常还要同时使用 `getStaticProps`。

有三个函数相关的：

- `getStaticProps` (Static Generation): Fetch data at build time.
- `getStaticPaths` (Static Generation): Specify dynamic routes to pre-render pages based on data.
- `getServerSideProps` (Server-side Rendering): Fetch data on each request.

示范实现导出 `getStaticPaths()` 函数：

```ts
export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      }
    }),
    fallback: false,
  }
}

```

期待返回的对象类型 { paths: [], fallback: boolean }。

- paths 数据列表中的每一项都应该是页面对应动态路由中需要的路径查询数据，比如 `pages/posts/[id].js` 路由需要的就是 { params:{id:[....]}。
- fallback: false 默认值，目前忽略它。 

对于这里的示范，返回值应该类似以下这样：

    return { paths: [
        { params: {slug:'tutorial-start'}}
    ], fallback: false };


示范实现导出 `getStaticProps()` 函数 ：

```ts
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
```

返回值应该是当前页面组件需要的输入参数。
