import Head from 'next/head'
import Link from 'next/link'
import CardLink from './CardLink'
import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import React from 'react'

const name ="Jeango"
export let siteTitle = "Next.js Lectures"
export let subTitle = "My Vegetable Garden"
export let microView = "Micro View of Allium"

type Props = { children: any, home?: boolean, className?:string }

export default function Layout({children, home, className}:Props) {
  let basicImage = 'https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg';
  return (
    <>
      <Head>
        <link rel="icon" href="/micro_xs.png" />
        <meta name="description" content="Learn how to use Next.js" />
        <meta property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=${encodeURIComponent(basicImage)}`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <div className={className ?? styles.container}>
      <header className={styles.header}>
      {home ? (
        <>
          <img
            src="/daylily.jpg"
            className={`grow ${styles.headerHomeImage} ${utilStyles.borderCircle}`}
            title={subTitle}
            alt={subTitle}
          />
          {/* <h1 className={utilStyles.heading2Xl}>{subTitle}</h1> */}
        </>
      ):(
        <>
        <Link href="/">
          <a href="/">
          <img src="/micro_s.png" alt={microView} 
          className={['grow', styles.headerImage, utilStyles.borderCircle].join(' ')}
          srcSet=""/>
          </a>
        </Link>
        <h2 className={utilStyles.headingLg}>
          <Link href="/"><a className={utilStyles.colorInherit}>{microView}</a></Link>
        </h2>
        </>
      )}
      </header>
      <main>{children}</main>
      {!home && (<div className="grid">
        <Link href="/">Go Back Home ...</Link>
      </div>
      )}
      </div>
    </>
  )
}
