import Link from 'next/link'
import Layout from '../../components/layout'
import React from 'react'

export default function FirstPost(){
    return (
    <>
    <Layout>
    <pre className="card console">
{`
> learn-starter@0.1.0 build \\nextjs-blog
> next build

info  - Creating an optimized production build
info  - Compiled successfully
info  - Collecting page data ...
++++++ Dynamic getStaticPaths { locales: [ 'en', 'zh-CN' ], defaultLocale: 'en' } [
  { locale: 'zh-CN', params: { dynamic: 'dynamic' } },
  { locale: 'zh-CN', params: { dynamic: 'pass' } },
  { locale: 'zh-CN', params: { dynamic: 'sideway' } },
  { locale: 'zh-CN', params: { dynamic: 'more' } }
]
====== getPostSlugs Docs
info  - Collecting page data .
====== getPostSlugs Docs\\Advanced
====== getPostSlugs Docs\\React
++++++[...slug] getStaticPaths { locales: [ 'en', 'zh-CN' ], defaultLocale: 'en' } [{"locale":"zh-CN","params":{"slug":["tutorial-assets"]}},{"locale":"zh-CN","params":{"slug":["tutorial-basic"]}},{"locale":"zh-CN","params":{"slug":["tutorial-config"]}},{"locale":"zh-CN","params":{"slug":["tutorial-custom-page"]}},{"locale":"zh-CN","params":{"slug":["tutorial-layout"]}},{"locale":"zh-CN","params":{"slug":["tutorial-link-route"]}},{"locale":"zh-CN","params":{"slug":["tutorial-start"]}},{"locale":"zh-CN","params":{"slug":["tutorial-styling"]}},{"locale":"zh-CN","params":{"slug":["tutorial-typescript"]}},{"locale":"zh-CN","params":{"slug":["Advanced","i18n"]}},{"locale":"zh-CN","params":{"slug":["Advanced","markdown"]}},{"locale":"zh-CN","params":{"slug":["Advanced","pages"]}},{"locale":"zh-CN","params":{"slug":["Advanced","prerendering"]}},{"locale":"zh-CN","params":{"slug":["Advanced","route"]}},{"locale":"zh-CN","params":{"slug":["React","babel"]}},{"locale":"zh-CN","params":{"slug":["React","createClass"]}},{"locale":"zh-CN","params":{"slug":["React","hello"]}},{"locale":"zh-CN","params":{"slug":["React","list-key-reconciliation"]}},{"locale":"zh-CN","params":{"slug":["React","mainconcepts"]}},{"locale":"zh-CN","params":{"slug":["React","props"]}},{"locale":"zh-CN","params":{"slug":["React","render"]}},{"locale":"zh-CN","params":{"slug":["React","state"]}}]
info  - Collecting page data ..
++++++ Optional Catch-all getStaticPaths { locales: [ 'en', 'zh-CN' ], defaultLocale: 'en' } [
  { locale: 'zh-CN', params: { catchopt: [Array] } },
  { locale: 'zh-CN', params: { catchopt: [Array] } },
  { locale: 'zh-CN', params: { catchopt: false } }
]
info  - Collecting page data
[  ==] info  - Generating static pages (0/45)
------ route normal.tsx {} ServerRouter {
  route: '/route/normal',
  pathname: '/route/normal',
  query: {},
  asPath: '/route/normal',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'en',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
[   =] info  - Generating static pages (0/45)
++++++ Dynamic getStaticProps {
  params: { dynamic: 'pass' },
  locales: [ 'en', 'zh-CN' ],
  locale: 'zh-CN',
  defaultLocale: 'en'
}
++++++ Dynamic getStaticProps {
  params: { dynamic: 'dynamic' },
  locales: [ 'en', 'zh-CN' ],
  locale: 'zh-CN',
  defaultLocale: 'en'
}
++++++ Dynamic getStaticProps {
  params: { dynamic: 'sideway' },
  locales: [ 'en', 'zh-CN' ],
  locale: 'zh-CN',
  defaultLocale: 'en'
}
++++++ Dynamic getStaticProps {
  params: { dynamic: 'more' },
  locales: [ 'en', 'zh-CN' ],
  locale: 'zh-CN',
  defaultLocale: 'en'
}
------ route [dynamic].tsx {
  data: '{"params":{"dynamic":"pass"},"locales":["en","zh-CN"],"locale":"zh-CN","defaultLocale":"en"}'
} {"dynamic":"pass"} ServerRouter {
  route: '/route/[dynamic]',
  pathname: '/route/[dynamic]',
  query: { dynamic: 'pass' },
  asPath: '/route/pass',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'zh-CN',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
------ route [dynamic].tsx {
  data: '{"params":{"dynamic":"dynamic"},"locales":["en","zh-CN"],"locale":"zh-CN","defaultLocale":"en"}'
} {"dynamic":"dynamic"} ServerRouter {
  route: '/route/[dynamic]',
  pathname: '/route/[dynamic]',
  query: { dynamic: 'dynamic' },
  asPath: '/route/dynamic',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'zh-CN',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
------ route [dynamic].tsx {
  data: '{"params":{"dynamic":"sideway"},"locales":["en","zh-CN"],"locale":"zh-CN","defaultLocale":"en"}'
} {"dynamic":"sideway"} ServerRouter {
  route: '/route/[dynamic]',
  pathname: '/route/[dynamic]',
  query: { dynamic: 'sideway' },
  asPath: '/route/sideway',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'zh-CN',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
------ route [dynamic].tsx {
  data: '{"params":{"dynamic":"more"},"locales":["en","zh-CN"],"locale":"zh-CN","defaultLocale":"en"}'
} {"dynamic":"more"} ServerRouter {
  route: '/route/[dynamic]',
  pathname: '/route/[dynamic]',
  query: { dynamic: 'more' },
  asPath: '/route/more',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'zh-CN',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
[    ] info  - Generating static pages (0/45)
++++++[...slug] getStaticProps { slug: [ 'tutorial-assets' ] }
[   =] info  - Generating static pages (0/45)
++++++[...slug] getStaticProps { slug: [ 'tutorial-config' ] }
====== getPostBySlug [ 'tutorial-assets' ] \\nextjs-blog\\Docs\\tutorial-assets.md 👉 05 静态资源管理
++++++[...slug] getStaticProps { slug: [ 'tutorial-basic' ] }
[  ==] info  - Generating static pages (0/45)
++++++[...slug] getStaticProps { slug: [ 'tutorial-custom-page' ] }
====== getPostBySlug [ 'tutorial-config' ] \\nextjs-blog\\Docs\\tutorial-config.md 👉 09 next.config.js 配置脚本
++++++[...slug] getStaticProps { slug: [ 'tutorial-layout' ] }
Markdown { slug: [ 'tutorial-assets' ] } /tutorial/tutorial-assets
====== getPostBySlug [ 'tutorial-basic' ] \\nextjs-blog\\Docs\\tutorial-basic.md 👉 02 工程基本结构
++++++[...slug] getStaticProps { slug: [ 'tutorial-start' ] }
++++++[...slug] getStaticProps { slug: [ 'tutorial-link-route' ] }
Markdown { slug: [ 'tutorial-config' ] } /tutorial/tutorial-config
Markdown { slug: [ 'tutorial-basic' ] } /tutorial/tutorial-basic
====== getPostBySlug [ 'tutorial-custom-page' ] \\nextjs-blog\\Docs\\tutorial-custom-page.md 👉 03 自定义页面
[ ===] info  - Generating static pages (0/45)Markdown { slug: [ 'tutorial-custom-page' ] } /tutorial/tutorial-custom-page
++++++[...slug] getStaticProps { slug: [ 'tutorial-styling' ] }
====== getPostBySlug [ 'tutorial-layout' ] \\nextjs-blog\\Docs\\tutorial-layout.md 👉 06 布局打磨
====== getPostBySlug [ 'tutorial-start' ] \\nextjs-blog\\Docs\\tutorial-start.md 👉 01 Next.js SSR 服务端渲染!
====== getPostBySlug [ 'tutorial-link-route' ] \\nextjs-blog\\Docs\\tutorial-link-route.md 👉 04 路由相关组件 Link & Route
Markdown { slug: [ 'tutorial-start' ] } /tutorial/tutorial-start
Markdown { slug: [ 'tutorial-link-route' ] } /tutorial/tutorial-link-route
====== getPostBySlug [ 'tutorial-styling' ] \\nextjs-blog\\Docs\\tutorial-styling.md ?  07 样式配置建议
Markdown { slug: [ 'tutorial-layout' ] } /tutorial/tutorial-layout
Markdown { slug: [ 'tutorial-styling' ] } /tutorial/tutorial-styling
++++++[...slug] getStaticProps { slug: [ 'Advanced', 'markdown' ] }
++++++[...slug] getStaticProps { slug: [ 'tutorial-typescript' ] }
++++++[...slug] getStaticProps { slug: [ 'Advanced', 'prerendering' ] }
++++++[...slug] getStaticProps { slug: [ 'Advanced', 'pages' ] }
++++++[...slug] getStaticProps { slug: [ 'Advanced', 'i18n' ] }
[====] info  - Generating static pages (11/45)
====== getPostBySlug [ 'tutorial-typescript' ] \\nextjs-blog\\Docs\\tutorial-typescript.md 👉 08 Typ
eScript 配置使用
====== getPostBySlug [ 'Advanced', 'markdown' ] \\nextjs-blog\\Docs\\Advanced\\markdown.md 👉 14 Markdown 文档处理
====== getPostBySlug [ 'Advanced', 'i18n' ] \\nextjs-blog\\Docs\\Advanced\\i18n.md 👉 15 i18n 国际化与本地化
====== getPostBySlug [ 'Advanced', 'pages' ] \\nextjs-blog\\Docs\\Advanced\\pages.md 👉 12 页面组件渲染
====== getPostBySlug [ 'Advanced', 'prerendering' ] \\nextjs-blog\\Docs\\Advanced\\prerendering.md 👉 13 预渲染与数据依赖
Markdown { slug: [ 'tutorial-typescript' ] } /tutorial/tutorial-typescript
Markdown { slug: [ 'Advanced', 'markdown' ] } /tutorial/Advanced/markdown
Markdown { slug: [ 'Advanced', 'i18n' ] } /tutorial/Advanced/i18n
Markdown { slug: [ 'Advanced', 'pages' ] } /tutorial/Advanced/pages
Markdown { slug: [ 'Advanced', 'prerendering' ] } /tutorial/Advanced/prerendering
++++++[...slug] getStaticProps { slug: [ 'React', 'babel' ] }
++++++[...slug] getStaticProps { slug: [ 'Advanced', 'route' ] }
++++++[...slug] getStaticProps { slug: [ 'React', 'hello' ] }
++++++[...slug] getStaticProps { slug: [ 'React', 'list-key-reconciliation' ] }
====== getPostBySlug [ 'React', 'babel' ] \\nextjs-blog\\Docs\\React\\babel.md 👉 A3 JSX & Babel 入门
++++++[...slug] getStaticProps { slug: [ 'React', 'createClass' ] }
[=== ] info  - Generating static pages (11/45)
====== getPostBySlug [ 'React', 'hello' ] \\nextjs-blog\\Docs\\React\\hello.md 👉 A1 Hello React
====== getPostBySlug [ 'React', 'list-key-reconciliation' ] \\nextjs-blog\\Docs\\React\\list-key-reconciliation.md 👉 A8 列表、键值与协调器
Markdown { slug: [ 'React', 'babel' ] } /tutorial/React/babel
====== getPostBySlug [ 'Advanced', 'route' ] \\nextjs-blog\\Docs\\Advanced\\route.md 👉 11 路由配置
====== getPostBySlug [ 'React', 'createClass' ] \\nextjs-blog\\Docs\\React\\createClass.md 👉 A4 换一种组件创建方式
Markdown { slug: [ 'React', 'hello' ] } /tutorial/React/hello
Markdown { slug: [ 'React', 'list-key-reconciliation' ] } /tutorial/React/list-key-reconciliation
Markdown { slug: [ 'Advanced', 'route' ] } /tutorial/Advanced/route
Markdown { slug: [ 'React', 'createClass' ] } /tutorial/React/createClass
++++++[...slug] getStaticProps { slug: [ 'React', 'mainconcepts' ] }
++++++[...slug] getStaticProps { slug: [ 'React', 'props' ] }
[==  ] info  - Generating static pages (11/45)
====== getPostBySlug [ 'React', 'mainconcepts' ] \\nextjs-blog\\Docs\\React\\mainconcepts.md 👉 A2 基
本概念
++++++[...slug] getStaticProps { slug: [ 'React', 'render' ] }
====== getPostBySlug [ 'React', 'props' ] \\nextjs-blog\\Docs\\React\\props.md 👉 A6 组件与属性
Markdown { slug: [ 'React', 'mainconcepts' ] } /tutorial/React/mainconcepts
====== getPostBySlug [ 'React', 'render' ] \\nextjs-blog\\Docs\\React\\render.md 👉 A5 触发更新渲染
Markdown { slug: [ 'React', 'props' ] } /tutorial/React/props
[=   ] info  - Generating static pages (22/45)Markdown { slug: [ 'React', 'render' ] } /tutorial/React/render
++++++ Optional Catch-all getStaticProps {
  params: { catchopt: [ 'catch', 'all' ] },
  locales: [ 'en', 'zh-CN' ],
  locale: 'zh-CN',
  defaultLocale: 'en'
}
++++++ Optional Catch-all getStaticProps {
  params: {},
  locales: [ 'en', 'zh-CN' ],
  locale: 'zh-CN',
  defaultLocale: 'en'
}
++++++ Optional Catch-all getStaticProps {
  params: { catchopt: [ 'catch', 'GitHub' ] },
  locales: [ 'en', 'zh-CN' ],
  locale: 'zh-CN',
  defaultLocale: 'en'
}
------ [[...catchopt]].tsx false {
  data: '{"params":{"catchopt":["catch","all"]},"locales":["en","zh-CN"],"locale":"zh-CN","defaultLocale":"en"}'
} ServerRouter {
  route: '/route/[[...catchopt]]',
  pathname: '/route/[[...catchopt]]',
  query: { catchopt: [ 'catch', 'all' ] },
  asPath: '/route/catch/all',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'zh-CN',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
++++++[...slug] getStaticProps { slug: [ 'React', 'state' ] }
------ [[...catchopt]].tsx false {
  data: '{"params":{},"locales":["en","zh-CN"],"locale":"zh-CN","defaultLocale":"en"}'
} ServerRouter {
  route: '/route/[[...catchopt]]',
  pathname: '/route/[[...catchopt]]',
  query: {},
  asPath: '/route',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'zh-CN',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
[    ] info  - Generating static pages (22/45)------ [[...catchopt]].tsx false {
  data: '{"params":{"catchopt":["catch","GitHub"]},"locales":["en","zh-CN"],"locale":"zh-CN","defaultLocale":"en"}'
} ServerRouter {
  route: '/route/[[...catchopt]]',
  pathname: '/route/[[...catchopt]]',
  query: { catchopt: [ 'catch', 'GitHub' ] },
  asPath: '/route/catch/GitHub',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'zh-CN',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
====== getPostBySlug [ 'React', 'state' ] \\nextjs-blog\\Docs\\React\\state.md 👉 A7 组件状态与生命周期
Markdown { slug: [ 'React', 'state' ] } /tutorial/React/state
------ route normal.tsx {} ServerRouter {
  route: '/route/normal',
  pathname: '/route/normal',
  query: {},
  asPath: '/route/normal',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'zh-CN',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
------ route normal.tsx {} ServerRouter {
  route: '/route/normal',
  pathname: '/route/normal',
  query: {},
  asPath: '/route/normal',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'en',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
[=   ] info  - Generating static pages (33/45)Will component execute getStaticProps? { locales: [ 'en', 'zh-CN' ], locale: 'en', defaultLocale: 'en' }
++++++ Home getStaticProps { locales: [ 'en', 'zh-CN' ], locale: 'en', defaultLocale: 'en' }
Will component execute getStaticProps? { locales: [ 'en', 'zh-CN' ], locale: 'zh-CN', defaultLocale: 'en' }
++++++ Home getStaticProps { locales: [ 'en', 'zh-CN' ], locale: 'zh-CN', defaultLocale: 'en' }
[==  ] info  - Generating static pages (33/45)
====== getPostSlugs Docs
====== getPostSlugs Docs\\Advanced
====== getPostSlugs Docs\\React
====== getPosts false Docs
====== getPostBySlug tutorial-assets \\nextjs-blog\\Docs\\tutorial-assets.md 👉 05 静态资源管理
====== getPostBySlug tutorial-basic \\nextjs-blog\\Docs\\tutorial-basic.md 👉 02 工程基本结构
====== getPostBySlug tutorial-config \\nextjs-blog\\Docs\\tutorial-config.md 👉 09 next.config.js 配置脚本
====== getPostBySlug tutorial-custom-page \\nextjs-blog\\Docs\\tutorial-custom-page.md 👉 03 自定义页面
====== getPostBySlug tutorial-layout \\nextjs-blog\\Docs\\tutorial-layout.md 👉 06 布局打磨
====== getPostBySlug tutorial-link-route \\nextjs-blog\\Docs\\tutorial-link-route.md ?  04 路由相关组件 Link & Route
====== getPostBySlug tutorial-start \\nextjs-blog\\Docs\\tutorial-start.md 👉 01 Next.js SSR 服务端渲染!
====== getPostBySlug tutorial-styling \\nextjs-blog\\Docs\\tutorial-styling.md 👉 07 样式配置建议
====== getPostBySlug tutorial-typescript \\nextjs-blog\\Docs\\tutorial-typescript.md ?  08 TypeScript 配置使用
====== getPosts false Docs\\Advanced
====== getPostSlugs Docs
====== getPostBySlug i18n \\nextjs-blog\\Docs\\Advanced\\i18n.md 👉 15 i18n 国际化与本地化
====== getPostBySlug markdown \\nextjs-blog\\Docs\\Advanced\\markdown.md 👉 14 Markdown 文档处理
====== getPostSlugs Docs\\Advanced
====== getPostBySlug pages \\nextjs-blog\\Docs\\Advanced\\pages.md 👉 12 页面组件渲染
====== getPostSlugs Docs\\React
====== getPostBySlug prerendering \\nextjs-blog\\Docs\\Advanced\\prerendering.md 👉 13 预渲染与数据依赖
====== getPosts false Docs
====== getPostBySlug route \\nextjs-blog\\Docs\\Advanced\\route.md 👉 11 路由配置
====== getPostBySlug tutorial-assets \\nextjs-blog\\Docs\\tutorial-assets.md 👉 05 静态资源管理
====== getPosts false Docs\\React
====== getPostBySlug tutorial-basic \\nextjs-blog\\Docs\\tutorial-basic.md 👉 02 工程基本结构
====== getPostBySlug babel \\nextjs-blog\\Docs\\React\\babel.md 👉 A3 JSX & Babel 入门
====== getPostBySlug tutorial-config \\nextjs-blog\\Docs\\tutorial-config.md 👉 09 next.config.js 配置脚本
====== getPostBySlug createClass \\nextjs-blog\\Docs\\React\\createClass.md 👉 A4 换一种组件创建方式
====== getPostBySlug tutorial-custom-page \\nextjs-blog\\Docs\\tutorial-custom-page.md 👉 03 自定义页面
====== getPostBySlug hello \\nextjs-blog\\Docs\\React\\hello.md 👉 A1 Hello React
====== getPostBySlug tutorial-layout \\nextjs-blog\\Docs\\tutorial-layout.md 👉 06 布局打磨
====== getPostBySlug list-key-reconciliation \\nextjs-blog\\Docs\\React\\list-key-reconciliation.md 👉 A8 列表、键值与协调器
====== getPostBySlug mainconcepts \\nextjs-blog\\Docs\\React\\mainconcepts.md 👉 A2 基本概念
====== getPostBySlug tutorial-link-route \\nextjs-blog\\Docs\\tutorial-link-route.md ?  04 路由相关组件 Link & Route
====== getPostBySlug props \\nextjs-blog\\Docs\\React\\props.md 👉 A6 组件与属性
====== getPostBySlug tutorial-start \\nextjs-blog\\Docs\\tutorial-start.md 👉 01 Next.js SSR 服务端渲染!
====== getPostBySlug render \\nextjs-blog\\Docs\\React\\render.md 👉 A5 触发更新渲染
====== getPostBySlug tutorial-styling \\nextjs-blog\\Docs\\tutorial-styling.md 👉 07 样式配置建议
====== getPostBySlug state \\nextjs-blog\\Docs\\React\\state.md 👉 A7 组件状态与生命周期
====== getPostBySlug tutorial-typescript \\nextjs-blog\\Docs\\tutorial-typescript.md ?  08 TypeScript 配置使用
====== getPosts false Docs\\Advanced
====== getPostBySlug i18n \\nextjs-blog\\Docs\\Advanced\\i18n.md 👉 15 i18n 国际化与本地化
====== getPostBySlug markdown \\nextjs-blog\\Docs\\Advanced\\markdown.md 👉 14 Markdown 文档处理
====== getPostBySlug pages \\nextjs-blog\\Docs\\Advanced\\pages.md 👉 12 页面组件渲染
====== getPostBySlug prerendering \\nextjs-blog\\Docs\\Advanced\\prerendering.md 👉 13 预渲染与数据依赖
====== getPostBySlug route \\nextjs-blog\\Docs\\Advanced\\route.md 👉 11 路由配置
====== getPosts false Docs\\React
====== getPostBySlug babel \\nextjs-blog\\Docs\\React\\babel.md 👉 A3 JSX & Babel 入门
info  - Generating static pages (45/45)
info  - Finalizing page optimization .====== getPostBySlug createClass \\nextjs-blog\\Docs\\React\\createClass.md 👉 A4 换一种组件创建方式
info  - Finalizing page optimization

Page                                                           Size     First Load JS
┌ ● /                                                          2.39 kB        73.8 kB
├   /_app                                                      0 B            63.6 kB
├ ○ /404                                                       3.46 kB          67 kB
├ ○ /authors/me                                                2.86 kB        66.4 kB
├ ○ /posts/build                                               3.51 kB          75 kB
├ ● /posts/posts                                               1.93 kB        65.5 kB
├ λ /posts/tutorial-assets                                     3.66 kB        82.9 kB
├ ● /route/[[...catchopt]]                                     459 B          68.4 kB
├   ├ /zh-CN/route/catch/all
├   ├ /zh-CN/route/catch/GitHub
├   └ /zh-CN/route
├ ● /route/[dynamic]                                           411 B          68.3 kB
├   ├ /zh-CN/route/dynamic
├   ├ /zh-CN/route/pass
├   ├ /zh-CN/route/sideway
├   └ /zh-CN/route/more
├ ○ /route/normal                                              403 B          68.3 kB
└ ● /tutorial/[...slug]                                        685 B          79.9 kB
    ├ /zh-CN/tutorial/tutorial-assets
    ├ /zh-CN/tutorial/tutorial-basic
    ├ /zh-CN/tutorial/tutorial-config
    └ [+19 more paths]
+ First Load JS shared by all                                  63.6 kB
  ├ chunks/3b3c9a2ea2010c89a76e8629b038f31464800316.486aa7.js  13.7 kB
  ├ chunks/framework.abffcf.js                                 41.8 kB
  ├ chunks/main.fee731.js                                      6.76 kB
  ├ chunks/pages/_app.3be81f.js                                586 B
  ├ chunks/webpack.50bee0.js                                   751 B
  └ css/245a5a5b69ac3d01410a.css                               1.03 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)


Terminal will be reused by tasks, press any key to close it.
`}
    </pre>

    </Layout>
    <style global jsx>{`
        body {background: darkblue; margin:0; padding:12px; }
        pre {background: darkblue; color: cornsilk; white-space: break-spaces;}
    `}</style>
    </>
    )
}