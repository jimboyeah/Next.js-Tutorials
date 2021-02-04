import Link from 'next/link'
import Layout from '../../components/layout'

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
++++++ Optional Catch-all getStaticPaths { locales: [ 'en', 'zh-CN' ], defaultLocale: 'en' }

++++++ Dynamic getStaticPaths { locales: [ 'en', 'zh-CN' ], defaultLocale: 'en' }
====== getPostSlugs Docs
====== getPostSlugs Docs\\Advanced
====== getPostSlugs Docs\\React

++++++ [...slug] getStaticPaths { locales: [ 'en', 'zh-CN' ], defaultLocale: 'en' } [{"locale":"en","params":{"slug":["tutorial-assets"]}},{"locale":"en","params":{"slug":["tutorial-basic"]}},{"locale":"en","params":{"slug":["tutorial-config"]}},{"locale":"en","params":{"slug":["tutorial-custom-page"]}},{"locale":"en","params":{"slug":["tutorial-layout"]}},{"locale":"en","params":{"slug":["tutorial-link-route"]}},{"locale":"en","params":{"slug":["tutorial-start"]}},{"locale":"en","params":{"slug":["tutorial-styling"]}},{"locale":"en","params":{"slug":["tutorial-typescript"]}},{"locale":"en","params":{"slug":["Advanced","i18n"]}},{"locale":"en","params":{"slug":["Advanced","markdown"]}},{"locale":"en","params":{"slug":["Advanced","pages"]}},{"locale":"en","params":{"slug":["Advanced","prerendering"]}},{"locale":"en","params":{"slug":["Advanced","route"]}},{"locale":"en","params":{"slug":["React","babel"]}},{"locale":"en","params":{"slug":["React","createClass"]}},{"locale":"en","params":{"slug":["React","hello"]}},{"locale":"en","params":{"slug":["React","list-key-reconciliation"]}},{"locale":"en","params":{"slug":["React","mainconcepts"]}},{"locale":"en","params":{"slug":["React","props"]}},{"locale":"en","params":{"slug":["React","render"]}},{"locale":"en","params":{"slug":["React","state"]}}]
info  - Collecting page data
[   =] info  - Generating static pages (0/45)
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

++++++ Dynamic getStaticProps {
  params: { dynamic: 'dynamic' },
  locales: [ 'en', 'zh-CN' ],
  locale: 'en',
  defaultLocale: 'en'
}
[    ] info  - Generating static pages (0/45)
++++++ Dynamic getStaticProps {
  params: { dynamic: 'pass' },
  locales: [ 'en', 'zh-CN' ],
  locale: 'en',
  defaultLocale: 'en'
}

------ route [dynamic].tsx {
  data: '{"params":{"dynamic":"dynamic"},"locales":["en","zh-CN"],"locale":"en","defaultLocale":"en"}'
} {"dynamic":"dynamic"} ServerRouter {
  route: '/route/[dynamic]',
  pathname: '/route/[dynamic]',
  query: { dynamic: 'dynamic' },
  asPath: '/route/dynamic',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'en',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}

------ route [dynamic].tsx {
  data: '{"params":{"dynamic":"pass"},"locales":["en","zh-CN"],"locale":"en","defaultLocale":"en"}'
} {"dynamic":"pass"} ServerRouter {
  route: '/route/[dynamic]',
  pathname: '/route/[dynamic]',
  query: { dynamic: 'pass' },
  asPath: '/route/pass',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'en',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}

++++++ Dynamic getStaticProps {
  params: { dynamic: 'more' },
  locales: [ 'en', 'zh-CN' ],
  locale: 'en',
  defaultLocale: 'en'
}

++++++ Dynamic getStaticProps {
  params: { dynamic: 'sideway' },
  locales: [ 'en', 'zh-CN' ],
  locale: 'en',
  defaultLocale: 'en'
}

------ route [dynamic].tsx {
  data: '{"params":{"dynamic":"more"},"locales":["en","zh-CN"],"locale":"en","defaultLocale":"en"}'
} {"dynamic":"more"} ServerRouter {
  route: '/route/[dynamic]',
  pathname: '/route/[dynamic]',
  query: { dynamic: 'more' },
  asPath: '/route/more',
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
------ route [dynamic].tsx {
  data: '{"params":{"dynamic":"sideway"},"locales":["en","zh-CN"],"locale":"en","defaultLocale":"en"}'
} {"dynamic":"sideway"} ServerRouter {
  route: '/route/[dynamic]',
  pathname: '/route/[dynamic]',
  query: { dynamic: 'sideway' },
  asPath: '/route/sideway',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'en',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}

++++++ [...slug] getStaticProps { slug: [ 'tutorial-assets' ] }
[  ==] info  - Generating static pages (0/45)
++++++ [...slug] getStaticProps { slug: [ 'tutorial-basic' ] }
====== getPostBySlug [ 'tutorial-assets' ] \\nextjs-blog\\Docs\\tutorial-assets.md 👉 05 静态资源管理
Markdown { slug: [ 'tutorial-assets' ] } /tutorial/tutorial-assets

++++++ [...slug] getStaticProps { slug: [ 'tutorial-layout' ] }

++++++ [...slug] getStaticProps { slug: [ 'tutorial-custom-page' ] }
[ ===] info  - Generating static pages (0/45)
++++++ [...slug] getStaticProps { slug: [ 'tutorial-config' ] }
====== getPostBySlug [ 'tutorial-basic' ] \\nextjs-blog\\Docs\\tutorial-basic.md 👉 02 工程基本结构

++++++ [...slug] getStaticProps { slug: [ 'tutorial-styling' ] }
====== getPostBySlug [ 'tutorial-layout' ] \\nextjs-blog\\Docs\\tutorial-layout.md 👉 06 布局打磨
Markdown { slug: [ 'tutorial-basic' ] } /tutorial/tutorial-basic
====== getPostBySlug [ 'tutorial-styling' ] \\nextjs-blog\\Docs\\tutorial-styling.md 👉 07 样式配置建议
====== getPostBySlug [ 'tutorial-custom-page' ] \\nextjs-blog\\Docs\\tutorial-custom-page.md 👉 03 自定义页面
Markdown { slug: [ 'tutorial-custom-page' ] } /tutorial/tutorial-custom-page
Markdown { slug: [ 'tutorial-layout' ] } /tutorial/tutorial-layout
Markdown { slug: [ 'tutorial-styling' ] } /tutorial/tutorial-styling
====== getPostBySlug [ 'tutorial-config' ] \\nextjs-blog\\Docs\\tutorial-config.md 👉 09 TypeScript 配置使用
Markdown { slug: [ 'tutorial-config' ] } /tutorial/tutorial-config

++++++ [...slug] getStaticProps { slug: [ 'tutorial-link-route' ] }

++++++ [...slug] getStaticProps { slug: [ 'tutorial-typescript' ] }
[====] info  - Generating static pages (0/45)
++++++ [...slug] getStaticProps { slug: [ 'tutorial-start' ] }
====== getPostBySlug [ 'tutorial-typescript' ] \\nextjs-blog\\Docs\\tutorial-typescript.md 👉 08 TypeScript 配置使用

++++++ [...slug] getStaticProps { slug: [ 'Advanced', 'i18n' ] }

++++++ [...slug] getStaticProps { slug: [ 'Advanced', 'pages' ] }

++++++ [...slug] getStaticProps { slug: [ 'Advanced', 'markdown' ] }
====== getPostBySlug [ 'Advanced', 'markdown' ] \\nextjs-blog\\Docs\\Advanced\\markdown.md 👉 14 Markdown 文档处理
====== getPostBySlug [ 'tutorial-link-route' ] \\nextjs-blog\\Docs\\tutorial-link-route.md 👉 04 路由相关组件 Link & Route
Markdown { slug: [ 'tutorial-typescript' ] } /tutorial/tutorial-typescript
[=== ] info  - Generating static pages (11/45)
====== getPostBySlug [ 'Advanced', 'i18n' ] \\nextjs-blog\\Docs\\Advanced\\i18n.md ?  15 i18n 国际化与本地化
====== getPostBySlug [ 'tutorial-start' ] \\nextjs-blog\\Docs\\tutorial-start.md 👉 01 Next.js SSR 服务端渲染!
====== getPostBySlug [ 'Advanced', 'pages' ] \\nextjs-blog\\Docs\\Advanced\\pages.md 👉 12 页面组件渲染
Markdown { slug: [ 'Advanced', 'markdown' ] } /tutorial/Advanced/markdown
Markdown { slug: [ 'tutorial-link-route' ] } /tutorial/tutorial-link-route
Markdown { slug: [ 'Advanced', 'i18n' ] } /tutorial/Advanced/i18n
Markdown { slug: [ 'tutorial-start' ] } /tutorial/tutorial-start
Markdown { slug: [ 'Advanced', 'pages' ] } /tutorial/Advanced/pages

++++++ [...slug] getStaticProps { slug: [ 'React', 'babel' ] }

++++++ [...slug] getStaticProps { slug: [ 'Advanced', 'route' ] }

++++++ [...slug] getStaticProps { slug: [ 'React', 'createClass' ] }
====== getPostBySlug [ 'React', 'babel' ] \\nextjs-blog\\Docs\\React\\babel.md 👉 A3 JSX & Babel 入门
====== getPostBySlug [ 'React', 'createClass' ] \\nextjs-blog\\Docs\\React\\createClass.md 👉 A4 换一种组件创建方式
Markdown { slug: [ 'React', 'createClass' ] } /tutorial/React/createClass

++++++ [...slug] getStaticProps { slug: [ 'Advanced', 'prerendering' ] }
Markdown { slug: [ 'React', 'babel' ] } /tutorial/React/babel
====== getPostBySlug [ 'Advanced', 'route' ] \\nextjs-blog\\Docs\\Advanced\\route.md 👉 11 路由配置

++++++ [...slug] getStaticProps { slug: [ 'React', 'hello' ] }

++++++ [...slug] getStaticProps { slug: [ 'React', 'mainconcepts' ] }
Markdown { slug: [ 'Advanced', 'route' ] } /tutorial/Advanced/route

++++++ [...slug] getStaticProps { slug: [ 'React', 'list-key-reconciliation' ] }
====== getPostBySlug [ 'Advanced', 'prerendering' ] \\nextjs-blog\\Docs\\Advanced\\prerendering.md 👉 13 预渲染与数据依赖
====== getPostBySlug [ 'React', 'hello' ] \\nextjs-blog\\Docs\\React\\hello.md 👉 A1 Hello React
====== getPostBySlug [ 'React', 'mainconcepts' ] \\nextjs-blog\\Docs\\React\\mainconcepts.md 👉 A2 基本概念
====== getPostBySlug [ 'React', 'list-key-reconciliation' ] \\nextjs-blog\\Docs\\React\\list-key-reconciliation.md 👉 A8 列表、键
值与协调器
[==  ] info  - Generating static pages (11/45)Markdown { slug: [ 'React', 'mainconcepts' ] } /tutorial/React/mainconcepts
Markdown { slug: [ 'React', 'list-key-reconciliation' ] } /tutorial/React/list-key-reconciliation
Markdown { slug: [ 'React', 'hello' ] } /tutorial/React/hello
Markdown { slug: [ 'Advanced', 'prerendering' ] } /tutorial/Advanced/prerendering

++++++ [...slug] getStaticProps { slug: [ 'React', 'props' ] }
[=   ] info  - Generating static pages (22/45)
++++++ [...slug] getStaticProps { slug: [ 'React', 'render' ] }

++++++ [...slug] getStaticProps { slug: [ 'React', 'state' ] }
====== getPostBySlug [ 'React', 'render' ] \\nextjs-blog\\Docs\\React\\render.md 👉 A5 触发更新渲染
====== getPostBySlug [ 'React', 'props' ] \\nextjs-blog\\Docs\\React\\props.md 👉 A6 组件与属性

++++++ Optional Catch-all getStaticProps {
  params: { catchopt: [ 'catch', 'all' ] },
  locales: [ 'en', 'zh-CN' ],
  locale: 'en',
  defaultLocale: 'en'
}
====== getPostBySlug [ 'React', 'state' ] \\nextjs-blog\\Docs\\React\\state.md 👉 A7 组件状态与生命周期
Markdown { slug: [ 'React', 'state' ] } /tutorial/React/state
Markdown { slug: [ 'React', 'props' ] } /tutorial/React/props

------ [[...catchopt]].tsx false {
  data: '{"params":{"catchopt":["catch","all"]},"locales":["en","zh-CN"],"locale":"en","defaultLocale":"en"}'
} ServerRouter {
  route: '/route/[[...catchopt]]',
  pathname: '/route/[[...catchopt]]',
  query: { catchopt: [ 'catch', 'all' ] },
  asPath: '/route/catch/all',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'en',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}

++++++ Optional Catch-all getStaticProps {
  params: { catchopt: [ 'catch', 'GitHub' ] },
  locales: [ 'en', 'zh-CN' ],
  locale: 'en',
  defaultLocale: 'en'
}
Markdown { slug: [ 'React', 'render' ] } /tutorial/React/render

------ [[...catchopt]].tsx false {
  data: '{"params":{"catchopt":["catch","GitHub"]},"locales":["en","zh-CN"],"locale":"en","defaultLocale":"en"}'
} ServerRouter {
  route: '/route/[[...catchopt]]',
  pathname: '/route/[[...catchopt]]',
  query: { catchopt: [ 'catch', 'GitHub' ] },
  asPath: '/route/catch/GitHub',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'en',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}

++++++ Optional Catch-all getStaticProps {
  params: {},
  locales: [ 'en', 'zh-CN' ],
  locale: 'en',
  defaultLocale: 'en'
}

------ [[...catchopt]].tsx false {
  data: '{"params":{},"locales":["en","zh-CN"],"locale":"en","defaultLocale":"en"}'
} ServerRouter {
  route: '/route/[[...catchopt]]',
  pathname: '/route/[[...catchopt]]',
  query: {},
  asPath: '/route',
  basePath: '',
  events: undefined,
  isFallback: false,
  locale: 'en',
  isReady: false,
  locales: [ 'en', 'zh-CN' ],
  defaultLocale: 'en',
  domainLocales: undefined
}
[    ] info  - Generating static pages (22/45)Will component execute getStaticProps? { locales: [ 'en', 'zh-CN' ], locale: 'en', defaultLocale: 'en' }
Will component execute getStaticProps? { locales: [ 'en', 'zh-CN' ], locale: 'zh-CN', defaultLocale: 'en' }

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

++++++ Home getStaticProps { locales: [ 'en', 'zh-CN' ], locale: 'zh-CN', defaultLocale: 'en' }
[=   ] info  - Generating static pages (33/45)
++++++ Home getStaticProps { locales: [ 'en', 'zh-CN' ], locale: 'en', defaultLocale: 'en' }
====== getPostSlugs Docs
====== getPostSlugs Docs\\Advanced
====== getPostSlugs Docs\\React
====== getPosts false Docs
====== getPostBySlug tutorial-assets \\nextjs-blog\\Docs\\tutorial-assets.md 👉 05 静态资源管理
====== getPostBySlug tutorial-basic \\nextjs-blog\\Docs\\tutorial-basic.md 👉 02 工程基本结构
====== getPostBySlug tutorial-config \\nextjs-blog\\Docs\\tutorial-config.md 👉 09 TypeScript 配置使用
====== getPostBySlug tutorial-custom-page \\nextjs-blog\\Docs\\tutorial-custom-page.md 👉 03 自定义页面
====== getPostBySlug tutorial-layout \\nextjs-blog\\Docs\\tutorial-layout.md 👉 06 布局打磨
====== getPostBySlug tutorial-link-route \\nextjs-blog\\Docs\\tutorial-link-route.md 👉 04 路由相关组件 Link & Route
====== getPostBySlug tutorial-start \\nextjs-blog\\Docs\\tutorial-start.md 👉 01 Next.js SSR 服务端渲染!
====== getPostBySlug tutorial-styling \\nextjs-blog\\Docs\\tutorial-styling.md 👉 07 样式配置建议
====== getPostBySlug tutorial-typescript \\nextjs-blog\\Docs\\tutorial-typescript.md 👉 08 TypeScript 配置使用
====== getPosts false Docs\\Advanced
====== getPostBySlug i18n \\nextjs-blog\\Docs\\Advanced\\i18n.md 👉 15 i18n 国际化与本地化
====== getPostBySlug markdown \\nextjs-blog\\Docs\\Advanced\\markdown.md 👉 14 Markdown 文档处理
====== getPostBySlug pages \\nextjs-blog\\Docs\\Advanced\\pages.md 👉 12 页面组件渲染
====== getPostSlugs Docs
====== getPostBySlug prerendering \\nextjs-blog\\Docs\\Advanced\\prerendering.md 👉 13 预渲染与数据依赖
====== getPostSlugs Docs\\Advanced
[==  ] info  - Generating static pages (33/45)
====== getPostBySlug route \\nextjs-blog\\Docs\\Advanced\\route.md 👉 11 路由配置
====== getPostSlugs Docs\\React
====== getPosts false Docs\\React
====== getPosts false Docs
====== getPostBySlug babel \\nextjs-blog\\Docs\\React\\babel.md 👉 A3 JSX & Babel 入门
====== getPostBySlug tutorial-assets \\nextjs-blog\\Docs\\tutorial-assets.md 👉 05 静态资源管理
====== getPostBySlug createClass \\nextjs-blog\\Docs\\React\\createClass.md 👉 A4 换一种组件创建方式
====== getPostBySlug tutorial-basic \\nextjs-blog\\Docs\\tutorial-basic.md 👉 02 工程基本结构
====== getPostBySlug hello \\nextjs-blog\\Docs\\React\\hello.md 👉 A1 Hello React
====== getPostBySlug tutorial-config \\nextjs-blog\\Docs\\tutorial-config.md 👉 09 TypeScript 配置使用
====== getPostBySlug list-key-reconciliation \\nextjs-blog\\Docs\\React\\list-key-reconciliation.md 👉 A8 列表、键值与协调器
====== getPostBySlug tutorial-custom-page \\nextjs-blog\\Docs\\tutorial-custom-page.md 👉 03 自定义页面
====== getPostBySlug mainconcepts \\nextjs-blog\\Docs\\React\\mainconcepts.md 👉 A2 基本概念
====== getPostBySlug tutorial-layout \\nextjs-blog\\Docs\\tutorial-layout.md 👉 06 布局打磨
====== getPostBySlug props \\nextjs-blog\\Docs\\React\\props.md 👉 A6 组件与属性
====== getPostBySlug tutorial-link-route \\nextjs-blog\\Docs\\tutorial-link-route.md 👉 04 路由相关组件 Link & Route
====== getPostBySlug render \\nextjs-blog\\Docs\\React\\render.md 👉 A5 触发更新渲染
====== getPostBySlug tutorial-start \\nextjs-blog\\Docs\\tutorial-start.md 👉 01 Next.js SSR 服务端渲染!
====== getPostBySlug state \\nextjs-blog\\Docs\\React\\state.md 👉 A7 组件状态与生命周期
====== getPostBySlug tutorial-styling \\nextjs-blog\\Docs\\tutorial-styling.md 👉 07 样式配置建议
====== getPostBySlug tutorial-typescript \\nextjs-blog\\Docs\\tutorial-typescript.md 👉 08 TypeScript 配置使用
====== getPosts false Docs\\Advanced
====== getPostBySlug i18n \\nextjs-blog\\Docs\\Advanced\\i18n.md 👉 15 i18n 国际化与本地化
====== getPostBySlug markdown \\nextjs-blog\\Docs\\Advanced\\markdown.md 👉 14 Markdown 文档处理
====== getPostBySlug pages \\nextjs-blog\\Docs\\Advanced\\pages.md 👉 12 页面组件渲染
====== getPostBySlug prerendering \\nextjs-blog\\Docs\\Advanced\\prerendering.md 👉 13 预渲染与数据依赖
====== getPostBySlug route \\nextjs-blog\\Docs\\Advanced\\route.md 👉 11 路由配置
====== getPosts false Docs\\React
====== getPostBySlug babel \\nextjs-blog\\Docs\\React\\babel.md 👉 A3 JSX & Babel 入门
info  - Generating static pages (45/45)
info  - Finalizing page optimization .
====== getPostBySlug createClass \\nextjs-blog\\Docs\\React\\createClass.md 👉 A4 换一种组件创建方式
info  - Finalizing page optimization

Page                                                           Size     First Load JS
┌ ● /                                                          2.31 kB        73.8 kB
├   /_app                                                      0 B            63.6 kB
├ ○ /404                                                       3.46 kB          67 kB
├ ○ /authors/me                                                2.86 kB        66.4 kB
├ ○ /posts/build                                               1.25 kB        72.7 kB
├ ● /posts/posts                                               1.93 kB        65.5 kB
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
    ├ /en/tutorial/tutorial-assets
    ├ /en/tutorial/tutorial-basic
    ├ /en/tutorial/tutorial-config
    └ [+19 more paths]
+ First Load JS shared by all                                  63.6 kB
  ├ chunks/3b3c9a2ea2010c89a76e8629b038f31464800316.486aa7.js  13.7 kB
  ├ chunks/framework.abffcf.js                                 41.8 kB
  ├ chunks/main.fee731.js                                      6.76 kB
  ├ chunks/pages/_app.1731a5.js                                586 B
  ├ chunks/webpack.50bee0.js                                   751 B
  └ css/08a98f08e724fed460cb.css                               1.01 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
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