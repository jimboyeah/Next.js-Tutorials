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
┌ ○ /                                                          7.34 kB        70.5 kB
├ ○ /404                                                       3.46 kB        66.6 kB
└ ○ /posts/first-post                                          310 B          63.5 kB
+ First Load JS shared by all                                  63.2 kB
  ├ chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.783b05.js  13.3 kB
  ├ chunks/framework.e2fe4a.js                                 41.8 kB
  ├ chunks/main.f685e0.js                                      6.37 kB
  ├ chunks/pages/_app.7d2df5.js                                1.01 kB
  └ chunks/webpack.50bee0.js                                   751 B

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