---
title: '👉 03 自定义页面'
excerpt: '有几个特殊的页面，使用 TypeScript 时对应 ts 或 tsx 扩展名应用入口页面、文档结构定义组件、404 错误页面、其它错误页面'
coverImage: '/20161106s.jpg'
date: '2021-02-03T11:15:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 Custom Pages 自定义页面
- https://nextjs.org/docs/advanced-features/custom-app
- https://nextjs.org/docs/advanced-features/custom-document
- https://nextjs.org/docs/advanced-features/custom-error-page


有几个特殊的页面，使用 TypeScript 时对应 ts 或 tsx 扩展名：

- `pages/_app.js` 应用入口页面。
- `pages/_document.js ` 文档结构定义组件。
- `pages/_404.js ` 404 错误页面。
- `pages/_error.js` 其它错误页面。


可以定制这些特殊页面，如错误页面：

```jsx
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
```

```jsx
import Error from 'next/error'

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const errorCode = res.ok ? false : res.statusCode
  const json = await res.json()

  return {
    props: { errorCode, stars: json.stargazers_count },
  }
}

export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return <div>Next stars: {stars}</div>
}
```


定制 document 页面可以按自己需要定制 HTML 页面中的基本结构，以下是 Next.js 默认的 Document，可以移除 `getInitialProps()` 或 `render()` 函数，如果不需要改变原有结构。但是，`<Html>`, `<Head `/>, `<Main />` 和 `<NextScript />` 是基本要求的节点结构，正常的页面渲染都需要。

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

自定义 `renderPage()` 方法的理解有一个，为了使用封装那些 CSS-in-JS 样式库以在服务端渲染方式下正确工作。

```jsx
import Document from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default MyDocument
```
