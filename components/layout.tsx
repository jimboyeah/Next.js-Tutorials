import Head from 'next/head'
import Link from 'next/link'
import CardLink from './CardLink'
import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'

const name ="Jeango"
export let siteTitle = "Next.js Lectures"

type Props = { children: any, home?: boolean }

export default function Layout({children, home}:Props) {
  let basicImage = 'https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg';
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to use Next.js" />
        <meta property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=${encodeURIComponent(basicImage)}`}
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div className={styles.container}>
      <header className={styles.header}>
      {home ? (
        <>
          <img
            src="/profile.jpg"
            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
            alt={name}
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
      ):(
        <>
        <Link href="/">
          <a href="/">
          <img src="/profile.jpg" alt={name} 
          className={[styles.headerImage, utilStyles.borderCircle].join(' ')}
          srcSet=""/>
          </a>
        </Link>
        <h2 className={utilStyles.headingLg}>
          <Link href="/"><a className={utilStyles.colorInherit}>{name}</a></Link>
        </h2>
        </>
      )}
      </header>
      <main className={styles.main}>{children}</main>
      {!home && (<div className="grid">
        <Link href="/">Go Back Home ...</Link>
      </div>
      )}
      </div>
    </>
  )
}
