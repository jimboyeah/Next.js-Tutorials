import Head from 'next/head'
import Link from 'next/link'
import Posts from '../components/posts'
import Layout, {siteTitle} from '../components/layout'
import {FrontMetter, MetterKey, getPostSlugs, getPosts} from '../utils/api'
import React, {useState, MouseEvent} from 'react'
import ViewSource from '../components/view-source/view-source'


const fields:MetterKey[] = ['slug', 'title', 'date', 'author']
export async function getStaticProps(context:any){
  console.log('++++++ Home getStaticProps', context);
  let mdFiles:{[folder:string]:FrontMetter[]} = {};
  let mdTree = getPostSlugs()
  mdFiles[mdTree.folder] = (getPosts(fields, mdTree.list, mdTree.folder))
  mdTree.tree && mdTree.tree.map((sub) => {
    mdFiles[sub.folder] = (getPosts(fields, sub.list, sub.folder))
  })
  return {
    props: {mdFiles, mdTree, locale: context.locale}
  }
}

export default function Home(props:any) {
  let timer:NodeJS.Timeout;
  const [state, setState] = useState("clear")
  
  let EchoAPI = (ev:MouseEvent<HTMLAnchorElement>) => {
    ev.stopPropagation()
    ev.preventDefault()
    fetch(ev.currentTarget.href)
    .then(res => res.text())
    .then(txt => setState(txt))
    clearTimeout(timer)
    timer = setTimeout(() => {
      setState("clear")
    }, 6000);
  }

  if(props.locale==="en") {
    return (
      <Layout home>
        <div className="card rows fxCenter fxEvenly">
        <Link href="/" locale="en">✊English coming soon</Link>
        <Link href="/" locale="zh-CN">🚩Chinese</Link>
        <ViewSource pathname="" />
        </div>
      </Layout>
    )
  }
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <h1 className="title">
          <a href="https://github.com/jimboyeah/Next.js-Tutorials">Next.js Tutorials!</a>
        </h1>
        <ViewSource pathname="" />

        <p className="description">开启组件化服务端渲染时代！</p>

        <div className="grid">
          
          <div className="card columns col37 col11s">
          <h3>路由测试</h3>
          <span>🚩<Link href="/route/normal"><a>Normal Link</a></Link></span>
          <span>🚩<Link href="/route/normal" as="/route/normal?more=yes"><a>Normal As</a></Link></span>

          <span>🚩<Link href="/route/dynamic"><a>Dynamic Link</a></Link></span>
          <span>🚩<Link href="/route/dynamic" as="/route/more?more=yes"><a>Dynamic More</a></Link></span>

          <span>🚩<Link href="/route/catch/all"><a>Catch All</a></Link></span>
          <span>🚩<Link href="/route/catch/GitHub?more=yes"><a>Catch GitHub</a></Link></span>
          </div>

          {/* <CardLink href="/authors/me" caption="Me &rarr;" text="Come this way..." /> */}
          <div className="card columns col37 col11s">
          <h3>其它功能</h3>
          <span>🚩<a href="/posts/build">Build log</a></span>
          <span>🚩<Link href="/posts/flexbox">Flexbox Demo </Link></span>
          <span>🚩<Link href="/posts/image">Image Optimize </Link></span>
          <span>🚩<a href="/api/echo?act=echo" onClick={EchoAPI}>API Route - Echo</a></span>
          <span>🚩<a href="/api/echo?act=noecho" onClick={EchoAPI}>API Route - No Echo</a></span>
          <span>🚩<Link href="/posts/graphql">API Route - GraphQL Playground</Link></span>
          <span>🚩<Link href="/posts/svg-radialGradient">SVG Playground</Link></span>
          {state!=='clear' && <pre className="scroll console">Output: {state}</pre>}
          </div>

          <Posts {...props} />

        </div>
      </section>

      <footer>
        <a
          href="https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Folk on Next-Learn-Starter{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      {<span dangerouslySetInnerHTML={{__html:`<!--[if IE]>
      <div style="position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:10;">According to the conditional comment this is IE<br /></div>
      <style>body { display:block !important; }</style>
      <![endif]-->`}}></span>}
      
      <style jsx="true">{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 3rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #f7f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 1em 0 0 0;
          line-height: 1.15;
          font-size: 2.5rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  )
}
