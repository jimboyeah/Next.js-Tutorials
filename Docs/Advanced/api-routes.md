---
title: '👉 16 API Routes'
excerpt: 'Next.js 提供 API Routes 可以创建 API 结点，只需要在 `pages/api` 目录下导出方法'
coverImage: '/20161106s.jpg'
date: '2021-02-05T08:10:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---
# 👉 API Routes

- https://www.nextjs.cn/learn/basics/api-routes/setup
- https://www.nextjs.cn/docs/api-routes/introduction
- https://nextjs.org/docs/advanced-features/preview-mode
- https://nodejs.org/docs/latest-v9.x/api/http.html#http_class_http_incomingmessage
- https://github.com/vercel/next.js/tree/canary/examples/api-routes
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://github.com/senchalabs/connect

Next.js 提供 API Routes 可以创建 API 结点，只需要在 `pages/api` 目录下导出类似以下的方法：

```ts
// req = request data, res = response data
export default (req, res) => {
  res.status(200).json({ text: 'Hello' })
  // ...
}
```

注意，API Routes 不可以与 `next export` 功能同时使用。

访问这个 API http://localhost:3000/api/hello 将得到 {"text":"Hello"}。

- req 是 http.IncomingMessage 对象实例，外加预置中间件处理包装成 NextApiRequest；
- res 是 http.ServerResponse 对象实例，外加辅助函数包装成 NextApiResponse；

禁止从 `getStaticProps()` 或 `getStaticPaths()` 访问 API Route，因为这两个方法是在构建过程中使用的，此时访问 API Route 意味着服务还未准备好就使用了。

以下示范 API 如何处理不同的客户端数据，并填充 `req.body`：

```ts
import {IncomingMessage, ServerResponse} from 'http'
import {NextApiRequest, NextApiResponse} from 'next'

/**
 * /api/echo.ts
 * req = request data, res = response data
 * curl http://localhost:3000/api/echo -d "a=1&b=2"
 * curl http://localhost:3000/api/echo -d "{a:1, b:2}"
 * curl http://localhost:3000/api/echo -d "{""a"":1, ""b"":2}" -H "Content-Type: "
 * curl http://localhost:3000/api/echo -d "{""a"":1, ""b"":2}" -H "Content-Type: "
 */
export default async (req:NextApiRequest, res:NextApiResponse) => {
  let { headers, httpVersion, method, url, statusCode, statusMessage } = req;
  let json;
  try{
    json = JSON.parse(req.body);
  }catch(ex){
    json = `${ex.message}[req.body:${typeof req.body}]`;
  }
  res.status(200).json({ 
    text: 'Hello', 
    data: req.body,
    query: req.query,
    json,
    req:{ headers, httpVersion, method, url, statusCode, statusMessage },
    types: {res: typeof res, req: typeof req }
  })
}
```

通过 CURL 工具 POST 提交不同的数据，没有指定 Content-Type 表示使用默认的 `application/x-www-form-urlencoded`，此时，提交的数据会当作键值对处理。`application/json` 和 `binary/octet-stream` 分别作为 JSON 对象和未知类型的原始 binary 数据处理。原始数据还可以使用 `application/octet-stream`，多文件上传时会有 `multipart/form-data` 类型。

服务器响应对象 res 包含了多个 Express.js 风格的助手方法，可以解化开发 API 结点的工作：

- **res.status(code)** - 向客户端发送 HTTP 响应状态代码；
- **res.json(json)** - 向客户端发送 JSON 响应；
- **res.send(body)** - 向客户端发送 HTTP 响应，可以是字符串、对象或者 Buffer；
- **res.redirect([status,] path)** - 向客户端发送一个重定向响应，默认的状态码是 307 即临时重定向 "Temporary redirect"。


参考 Vercel Next.js 示范代码仓库相关的示例： 

- Basic API Routes
- API Routes with middleware
- API Routes with GraphQL
- API Routes with REST
- API Routes with CORS
- API Routes with middleware

API Routes 的一个好用例是处理表单输入，API 路由结点并不打包在客户端，可以编写代码将保存到数据库。

```ts
export default function handler(req, res) {
  const email = req.body.email
  // Then save email to your database, etc...
}
```

Preview Mode 预览模式，当页面要从 HCMS 获取数据时，静态生成非常有用。然而，当你在 HCMS 上写草稿并且想要在你的页面上立即预览草稿时，这并不理想。你想要的不是在 Next.js 构建时呈现的页面，并获取草稿内容而不是发布的内容。这时需要 Next.js 仅在这种特定情况下绕过静态生成的流程。这就是 Preview Mode 特性，它来解决上述问题，它利用了 API 路由。

API 路由也可以是动态的，就像普通页面一样，具体参数动态路由。

例如，API 路由 `pages/api/post/[pid].js` 如下：

```jsx
export default function handler(req, res) {
  const {
    query: { pid },
  } = req

  res.end(`Post: ${pid}`)
}
```

请求 `/api/post/abc` 会得到 `Post: abc`。


以下 API route 是扩展路由 `pages/api/post/[...slug].js`：

```jsx
export default function handler(req, res) {
  const {
    query: { slug },
  } = req

  res.end(`Post: ${slug.join(', ')}`)
}
```

可以匹配 `/api/post/a`, `/api/post/a/b`, `/api/post/a/b/c` 等等。还可以介绍过的可选的扩展路由 `[[...slug]]`，都是有效的。


API Routes 默认没使用 CORS 头，即不允许非同源请求操作，可以使用 Next.js 内建的 API Middlewares 中间件 CORS Middleware 来设置。

中间件会自动解析 req 对象的数据，并填充到以下对象：

- req.cookies - 包含客户端 cookies 值的对象；
- req.query - 包含请求 query 键值对的对象；
- req.body - 根据 content-type 解析得到的数据对象，如果是二进制可以解析为字符串；

通过导出配置一个 `config` 配置对象，每个 API Route 可以改变默认配置，列如约束的请求数据大小限制：

```js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
      sizeLimit: '1000kb',
    },
  },
}
```

如果，API 路由接收的是 binary 数据，可以通过 `bodyParser` 来禁止解析：

```js
export const config = {
  api: {
    bodyParser: false,
  },
}
```

`externalResolver` 配置表示这个路由将使用外部解析器接管，如 Connect/Express 中间件，启用它可以禁止警告未解析的请求。

```js
export const config = {
  api: {
    externalResolver: true,
  },
}
```

除了使用 `setHeader()` 方法设置 CORS 标头：

```js
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
```

更好的方法是直接使用现有的 CORS 模块：

	npm i --save-dev @types/cors cors
	# or
	yarn add @types/cors cors

示范使用 CORS 模块编写中间件，配置项 `preflightContinue` 表示将响应传递给下一个处理程序，然后在需要使用的 API 脚本中引用使用：

```js
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
}

export default handler
```

使用 TypeScript 还可以对 req/res 进行扩展，通常为了类型安全，不建议这样做。

更好的是如以下使用纯函数进行包装：

```js
// utils/cookies.ts

import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}
```

```js
// pages/api/cookies.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Calling our pure function using the `res` object, it will add the `set-cookie` header
  setCookie(res, 'Next.js', 'api-middleware!')
  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  res.end(res.getHeader('Set-Cookie'))
}

export default handler
```

如果一定要进行类型扩展，可以定义自己的新类型以包含需要的属性：

```js
// pages/api/foo.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { withFoo } from 'external-lib-foo'

type NextApiRequestWithFoo = NextApiRequest & {
  foo: (bar: string) => void
}

const handler = (req: NextApiRequestWithFoo, res: NextApiResponse) => {
  req.foo('bar') // we can now use `req.foo` without type errors
  res.end('ok')
}

export default withFoo(handler)
```