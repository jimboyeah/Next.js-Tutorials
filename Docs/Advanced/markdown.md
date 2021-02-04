---
title: '👉 14 Markdown 文档处理'
excerpt: '添加 Markdown 文档功能，作为简洁的内容格式，必需要支持 MD 文件内容呈现。另外介绍了 Webpack 加载器，这是在打包时加载指定类型文件的一种插件，即专用于文件加载。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T15:35:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

 👉 Markdown & Webpack Loader

- https://webpack.js.org/concepts/#loaders
- https://www.npmjs.com/package/remark
- https://www.npmjs.com/package/markdown-loader
- https://www.npmjs.com/package/gray-matter
- https://nextjs.org/docs/api-reference/next.config.js/introduction
- https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
- https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript
- https://www.nextjs.cn/learn/basics/dynamic-routes/render-markdown
- [File System](https://nodejs.org/docs/latest-v9.x/api/fs.html)

添加 Markdown 文档功能，作为简洁的内容格式，必需要支持 MD 文件内容呈现。

在 packages.json 添加依赖，再执行 npm install 安装：

```js
"devDependencies": {
  "markdown-loader": "^5.1.0",
  "html-loader": "^1.3.2",
  "gray-matter": "^4.0.2",
  "marked": "^1.1.1",
  "@types/marked": "^1.2.2",
},
```

- markdown-loader 用于编译打包时转换 markdown 文件为 HTML 字符串；
- html-loader 将 HTML 字符串转换为模块；
- marked 可以选择在运行时转译 markdown 文件，可以用它来做客户端的渲染；

另外，MD 文件头还可以定义 YAML 数据叫做 Front-Matter，可以使用 gray-matter 解析：

	---
	title: 'Dynamic Routing and Static Generation'
	excerpt: 'In Next.js you can add brackets to a page ([param]) to create a dynamic route.'
	coverImage: '/assets/blog/dynamic-routing/cover.jpg'
	date: '2021-02-03T03:01:07.322Z'
	author:
	  name: Jeango
	  picture: '/jeango.jpg'
	ogImage:
	  url: '/20161106s.jpg'
	---


接下来要给 Webpack 配置好 markdown 和 html 加载器，因为：

```js
{
    module: {
        rules: [{
            test: /\.md$/,
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: "markdown-loader",
                    options: {
                        /* your options here */
                    }
                }
            ]
        }]
    }
}
```

Webpack 加载器是为 Webpack 在打包时加载指定类型文件的一种插件，即专用于文件加载，其中 raw-loader 是最简单的一个，可让将文件按原样加载。

	npm install --save-dev raw-loader

使用加载器，可以在 CLI 命令行中使用，也可以在代码内联使用加载器，或者通常配置方式使用。

	# CLI
	webpack --module-bind 'txt=raw-loader'

	# inline 
	import txt from 'raw-loader!./file.txt';
	let txt = require('raw-loader!./file.text');

	# via config
	import txt from './file.txt';

其中 inlineLoaders 这种使用方式，可以嵌套多个加载器，它们会从左到右执行，其中问号用于指定参数：

	import 'style-loader!css-loader!stylus-loader?a=b!../../common.styl'

对单文件打包的方式的加载器被称为 inline-loader。

先明确一点，Webpack 只认模块，所有模块都是 JavaScript 代码模块，将不合法的内容加载到 Webpack 后报错，提示信息大体的意思是说，在解析模块过程中遇到了非法字符，需要其它加载器来处理它：

	Module parse failed: Unexpected token (1:0)
	File was processed with these loaders:
	 * ./node_modules/markdown-loader/index.js
	You may need an additional loader to handle the result of these loaders.

如果看到的是以下提示，表明没有处理相应文件类型的加载器，需要检查配置文件是否名字写错了，配置内容是否错了：

	Module parse failed: Unexpected character '#' (1:0)
	You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.

而加载器机制的引入，使用得 Webpack 能够处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖地图中。

在 Webpack 官方文档 Module 模块的 `Rule.enforce` 配置属性定义加载的执行阶段划分：

- pre 对应 preloader 前期加载器；
- post 对应 postloader 后期加载器；
- 空值表示 normal loader 一般加载器；

加载器有 4 种加载工作方式，pre，normal，inline，post，这也是执行顺序。加载过程分为 `Pitching` 和 `Normal` 两个阶段，类似于 JavaScript 中的事件冒泡、捕获阶段，官方文档描述为 loader 标记阶段（mark stage）和执行阶段（execution/run stage）。

感叹号作为加载器的处理规则：

- !  - 前缀禁用配置文件中的 normal loader，比如：require("!raw!./script.coffee")
- !! - 前缀禁用配置文件中所有 loader，比如：require("!!raw!./script.coffee")
- -! - 前缀禁用配置文件中的 preloader 和 normal loader，不包括 postloader，比如：require("-!raw!./script.coffee")


You may need an additional loader to handle the result of these loaders.

	import html from 'markdown-loader!../../docs/tutorial-assets.md'


通过配置文件可以指导 Webpack 打包时，自动按文件类型执行加载器，配置文件名为 `webpack.config.js`。对于 Next.js 项目，配置文件改名作 `next.config.js` 如下，指明加载器对应加载的文件类型，需要注意文档的说明，配置 Webpack 要指定到对应的项：

```ts
let webpackConfig = (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  config.module.rules.push(
    {
      test: /\.md$/,
      use: [
      { loader: "html-loader" },
      { loader: "markdown-loader", options: { /* your options here */ } }
      ]
    }
  );
  return config
}

module.exports = (phase, { defaultConfig }) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) 
  // return {...defaultConfig, ...webpackConfig};
  defaultConfig.webpack = webpackConfig;
  return defaultConfig;
}
```

如果没有加载器，直接导入文本就会当作代码处理，这样就会导致出错。


接下来编写组件来加载 MD 文档，注意这里是服务端进行渲染处理：

```ts
import Marked, {Renderer} from 'marked'
import content from '../../docs/tutorial-assets.md'

Marked.setOptions({
    renderer: new Renderer(),
    gfm: true,
    // tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});
// let output = Marked(md, opts)
// let content = Marked('I am using **__markdown__**.')
// const content = Marked(marked)

export default function(){
    return <div dangerouslySetInnerHTML={{__html:`${content}`}}></div>;
} 
```

假设在一些高可用的服务中，服务端渲染可能需要降低负载以提供更好的服务，需要将一部分的算力迁向客户端进行。

也可以参考 blog-starter-typescript 示范中使用的 remark 模块：

	import remark from 'remark'
	import html from 'remark-html'

	export default async function markdownToHtml(markdown: string) {
	  const result = await remark().use(html).process(markdown)
	  return result.toString()
	}

例子中使用的 MD 文档，这需要页面获取外部数据进行的静态预渲染方式，为了使页面获取外部数据后再渲染，就必须导出 `getStaticPaths`，通常还要同时使用 `getStaticProps`。

接下来要掌握的内容涉及页面的渲染方式、数据的获取和动态路由，等内容，而且是混合的整体密不可分。


一个容易的学习路径是：

- 掌握动态路由的基本使用；
- 掌握页面的渲染方式，主要是有数据依赖的静态渲染方式；
- 将页面的渲染方式与数据获取 API 结合，`getStaticPaths`和`getStaticProps`。

当然，数据获取这部分可能还需要使用 Fetch API 或者文件处理，或者数据之类的方法。


为了示范读取 Markdown 文档，需要一个编写一个 API 文件来处理：

```tsx
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
```

基于数据依赖的静态渲染方式再对 MD 呈现组件改造，文件名为 `pages/tutorial/[slug].tsx` ，使其能在构建时处理 docs 目录下的文档：

```tsx
import {useRouter} from 'next/router'
import { getPostBySlug, getAllPosts } from '../../libs/api'
import Layout from '../../components/layout'
import Marked, {Renderer} from 'marked'
import utilStyles from '../../styles/utils.module.css'

// import TAssets from '../../docs/tutorial-assets.md'

Marked.setOptions({
    renderer: new Renderer(),
    gfm: true,
    // tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});
// let output = Marked(md, opts)
// let content = Marked('I am using **__markdown__**.')

type MdPost = {
    title: string,
    date: string,
    slug: string,
    author: { name: string, picture: string },
    content: string,
    ogImage: string,
    coverImage: string,
}

export default function Markdown({post}: {post: MdPost}){
    let router = useRouter()
    let slug = router.query.slug as string;
    let md = post.content ?? "<h1>NOT FOUND</h1>";
    console.log('Markdown', slug, post.author);
    let handle = (ev:any) => {
        console.log(slug, md, ev);
        alert(slug);
    }
    return (
        <Layout>
            {/* <h1 onClick={handle}>{post.title}</h1> */}
            <p className={utilStyles.panel}>{post.author.name} {post.date} 
                <img src={post.author.picture} width="64px"
                className={utilStyles.borderCircle}
                alt={post.author.name} srcSet=""/></p>
            <div dangerouslySetInnerHTML={{__html:`${md}`}}></div>
        </Layout>
    );
}


type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = Marked(post.content || '')
  //const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: { ...post, content }
    },
  }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])
    return {
        paths: posts.map((posts) => {
            return { params: { slug: posts.slug } }
        }),
        fallback: false,
    }
}
```

组件在静态化生成时基本的工作流程如下：

- Next.js 通过组件名称 `pages/tutorial/[slug].tsx` 知道使用了动态路由，并且导出的构造期要执行的数据获取 API；
- 接着，在执行页面组件的渲染前，调用 `getStaticPaths()` 获取路由参数的具体值列表，并一个个，或按当前请求的地址，将数据发送到下一个方法；
- 接着，执行 `getStaticProps()` 并将上一步得到的数据传入，在这里需要根据路由匹配到的参数读取文档数据，然后会传入组件渲染函数执行；
- 最后，组件通过以上两个方法得到数据，并将数据呈现在页面上。

经过编译后的静态页面其实是 JavaScript 脚本打包，一个页面对应一个包，因为这里使用了数据依赖和动态路由，所以同一个页面文件会合成多个页面模块。

参考编译结果，生成的文件存放于 `.next\server`:

	Page                                                           Size     First Load JS
	┌ ○ /                                                          1.99 kB        72.7 kB
	├   /_app                                                      0 B            62.8 kB
	├ ○ /404                                                       3.46 kB        66.2 kB
	├ ○ /authors/me                                                2.86 kB        65.6 kB
	├ ○ /posts/build                                               1.03 kB        71.7 kB
	├ ○ /posts/first-post                                          398 B          63.2 kB
	├ ○ /posts/posts                                               1.95 kB        64.7 kB
	├ ○ /posts/tutorial-assets                                     396 B          78.9 kB
	└ ● /tutorial/[slug]                                           624 B          79.1 kB
	    ├ /tutorial/tutorial-assets
	    ├ /tutorial/tutorial-basic
	    ├ /tutorial/tutorial-layout
	    └ [+4 more paths]
	+ First Load JS shared by all                                  62.8 kB
	  ├ chunks/29a50e9f3321aecabd6955269b6480445960261d.c82de7.js  13.1 kB
	  ├ chunks/framework.abffcf.js                                 41.8 kB
	  ├ chunks/main.a529c7.js                                      6.63 kB
	  ├ chunks/pages/_app.264736.js                                558 B
	  ├ chunks/webpack.50bee0.js                                   751 B
	  └ css/8071b5039535e22652c6.css                               532 B

	λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
	○  (Static)  automatically rendered as static HTML (uses no initial props)
	●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
	   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)

