import Head from 'next/head'
import Link from 'next/link'
import Posts from './posts/posts'
import CardLink from '../components/CardLink'
import Layout, {siteTitle} from '../components/layout'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <h1 className="title">
          欢迎来到 <a href="https://github.com/jimboyeah/demo/tree/Next.js-Tutorials">Next.js 教程!</a>
        </h1>

        <p className="description"> React SSR 服务端渲染由此开启！</p>

        <div className="grid">
          
          🚩<Link href="/route/normal"><a>Normal Link</a></Link>
          🚩<Link href="/route/normal" as="/route/normal?more=yes"><a>Normal As</a></Link>

          🚩<Link href="/route/dynamic"><a>Dynamic Link</a></Link>
          🚩<Link href="/route/dynamic" as="/route/more?more=yes"><a>Dynamic More</a></Link>

          🚩<Link href="/route/catch/all"><a>Catch All</a></Link>
          🚩<Link href="/route/catch/GitHub?more=yes"><a>Catch GitHub</a></Link>

          <CardLink href="/authors/me" caption="Me &rarr;" text="Come this way..." />
          <CardLink href="/posts/build" caption="Build" text={` Build log `} />

          <Posts />

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

      <style jsx global>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
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
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
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

      <style jsx global>{`
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
