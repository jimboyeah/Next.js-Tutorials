import Link from 'next/link'
import Layout from '../../components/layout'

export default function FirstPost(){
    return (
    <>
    <Layout>
    <pre className="card">
{`
PS > npm run build

> learn-starter@0.1.0 build C:\coding\md-code\react-nextjs-blog
> next build

info  - Creating an optimized production build
info  - Compiled successfully
info  - Collecting page data
info  - Generating static pages (3/3)
info  - Finalizing page optimization

Page                                                           Size     First Load JS
┌ ● /                                                          2.29 kB        73.7 kB
├   /_app                                                      0 B            63.6 kB
├ ○ /404                                                       3.46 kB          67 kB
├ ○ /authors/me                                                2.86 kB        66.4 kB
├ ○ /posts/build                                               981 B          72.4 kB
├ ● /posts/posts                                               1.92 kB        65.5 kB
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
    ├ /zh-CN/tutorial/tutorial-typescript
    ├ /zh-CN/tutorial/tutorial-styling
    ├ /zh-CN/tutorial/tutorial-start
    └ [+5 more paths]
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

PS >`}
    </pre>

    </Layout>
    <style global jsx>{`
        body {background: darkblue; margin:0; padding:12px; }
        pre {background: darkblue; color: cornsilk; white-space: break-spaces;}
    `}</style>
    </>
    )
}