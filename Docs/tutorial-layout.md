---
title: '👉 06 布局打磨'
excerpt: '现在有了基本的站点结构，样式布局还需要打磨 Polishing Layout。'
coverImage: '/20161106s.jpg'
date: '2021-02-03T03:01:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 Polishing Layout 布局打磨

- https://nextjs.org/docs/advanced-features/customizing-postcss-config

现在有了基本的站点结构，样式布局还需要打磨 Polishing Layout。

主要工作：

- 添加样式模块 `styles/layout.module.css`
- 添加样式模块 `styles/utils.module.css`
- 更新布局 `components/layout.js`
- 在主页上应用布局 `pages/index.js`

模块样式的组织方式供参考，可以按喜欢的方式组织或编写样式具体风格：

添加样式模块 `styles/layout.module.css`

```css
.container {
    max-width: 64rem;
    padding: 0 1rem;
    margin: 3rem auto 6rem;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.headerImage {
    width: 6rem;
    height: 6rem;
}

.headerHomeImage {
    width: 8rem;
    height: 8rem;
}

.backToHome {
    margin: 3rem 0 0;
}
```

添加样式模块 `styles/utils.module.css`

```css
.heading2Xl {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
}

.headingXl {
    font-size: 2rem;
    line-height: 1.3;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
}

.headingLg {
    font-size: 1.5rem;
    line-height: 1.4;
    margin: 1rem 0;
}

.headingMd {
    font-size: 1.2rem;
    line-height: 1.5;
}

.borderCircle {
    border-radius: 9999px;
}

.colorInherit {
    color: inherit;
}

.padding1px {
    padding-top: 1px;
}

.list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.listItem {
    margin: 0 0 1.25rem;
}

.lightText {
    color: #999;
}
```

在布局模块上应用以上样式，注意导入时指定完整样式文件名。

布局在页面头部使用的 og 元标签式是 Facebook 的 Open Graph 即开放图谱协议，一般是用于方便分享到 facebook 用的，同时使用了 og-image.now.sh 图片生成工具。

布局模块导出站点标题 siteTitle 供其它页面使用，还设置了 home 属性来指示是否作为主页显示相应的布局元素，使用了 {home ? (...) : (...)} 这种三元运算的用法，做条件选择渲染。

```jsx
import Head from 'next/head'
import Link from 'next/link'
import CardLink from './CardLink'
import styles from '/styles/layout.module.css'
import utilStyles from '/styles/utils.module.css'

const name ="Jeango"
export const siteTitle = "Next.js Lectures"

export default function Layout({children, home}) {
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
          srcset=""/>
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
        <CardLink href="/" caption="Back Home">Go...</CardLink>
      </div>
      )}
      </div>
    </>
  )
}
```

```jsx
pages/index.js and replace its content with:

import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}
```
