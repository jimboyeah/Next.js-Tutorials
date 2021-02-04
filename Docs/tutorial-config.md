---
title: '👉 09 next.config.js 配置脚本'
excerpt: 'Next.js 在顶级目录下提供了 next.config.js 配置脚本，可以随时建立这个配置文件'
coverImage: '/20161106s.jpg'
date: '2021-02-05T02:10:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 next.config.js 配置脚本
- https://nextjs.org/docs/api-reference/next.config.js
- https://en.wikipedia.org/wiki/Content_delivery_network

环境变量配置：

```js
module.exports = {
  env: {
    customKey: 'my-value',
  },
}
```

使用环境变量：

```js
function Page() {
  return <h1>The value of customKey is: {process.env.customKey}</h1>
}

export default Page

```


要将应用配置在子目录中运行，请使用 basePath 指定。

```js
module.exports = {
  basePath: '/docs',
}
```

在使用 `next/link` 和 `next/router` 组件的情况下，`basePath` 设置会自动更新。比如以下例子的 `/about` 会自动更新为`/docs/about`。

```ts
export default function HomePage() {
  return (
    <>
      <Link href="/about">
        <a>About Page</a>
      </Link>
    </>
  )
}
```

但是图片这些就不是了。


为 CDN 配置资源的路径前缀：

```js
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
}
```

Next.js 会自动为 JavaScript 和 CSS 文件的加载使用 `/_next/` 路径前缀，即指向 `.next/static/` 目录下的内容。

配置资源路径前缀并不影响以下路径：

- `/public` 目录，这里的文件如果要配置 CDN 就要自行处理。
- `/_next/data/` 下由 `getServerSideProps()` 请求的页面，因为它们不是静态内容。
- `/_next/data/` 下由 `getStaticProps()` 请求的页面，这些是为主域和增量静态生成使用。


配置构建输出目录：

```js
module.exports = {
  distDir: 'build',
}
```

配置扩展名支持，包括 `next/mdx` 文档增强插件，MDX 让 Markdown 步入组件时代 MDX 是一种书写格式，允许在文档中无缝地插入 JSX 代码。

```js
module.exports = {
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
}
```

配置请请求头处理，支持 i18n 国际化：

```js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },

  async headers() {
    return [
      {
        // does not handle locales automatically since locale: false is set
        source: '/nl/with-locale-manual',
        locale: false,
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
      {
        // this matches '/' since `en` is the defaultLocale
        source: '/en',
        locale: false,
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
      {
        source: '/blog/:post(\\d{1,})',
        headers: [
          {
            key: 'x-post',
            value: ':post',
          },
        ],
      },
    ],
  },
}
```

地址重写配置 URL Rewrites：

```js
module.exports = {
  basePath: '/docs',
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },

  async rewrites() {
    return [
      {
        source: '/with-basePath', // automatically becomes /docs/with-basePath
        destination: '/another', // automatically becomes /docs/another
      },
      {
        // does not add /docs to /without-basePath since basePath: false is set
        // Note: this can not be used for internal rewrites e.g. `destination: '/another'`
        source: '/without-basePath',
        destination: 'https://example.com',
        basePath: false,
      },
      {
        // does not handle locales automatically since locale: false is set
        source: '/nl/with-locale-manual',
        destination: '/nl/another',
        locale: false,
      },
    ]
  },
}
```

重定向配置：

```js
module.exports = {
  basePath: '/docs',
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },

  async redirects() {
    return [
      {
        // this matches '/' since `en` is the defaultLocale
        source: '/en',
        destination: '/en/another',
        locale: false,
        permanent: false,
      },
      {
        source: '/post/:slug(\\d{1,})',
        destination: '/news/:slug', // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: '/with-basePath', // automatically becomes /docs/with-basePath
        destination: '/another', // automatically becomes /docs/another
        permanent: false,
      },
      {
        // does not add /docs since basePath: false is set
        source: '/without-basePath',
        destination: '/another',
        basePath: false,
        permanent: false,
      },
    ]
  },
}
```



配置 Webpack：

```js
// Example config for adding a loader that depends on babel-loader
// This source was taken from the @next/mdx plugin source:
// https://github.com/vercel/next.js/tree/canary/packages/next-mdx
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options,
        },
      ],
    })

    return config
  },
}
```

```js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))

    // Important: return the modified config
    return config
  },
}
```




配置 React Strict Mode 

```js
// next.config.js
module.exports = {
  reactStrictMode: true,
}
```
