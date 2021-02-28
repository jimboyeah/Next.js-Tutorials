import {useRouter} from 'next/router'
import { getPostBySlug, getPostSlugs, FrontMetter } from '../../utils/api'
import Layout from '../../components/layout'
import Marked, {Renderer} from 'marked'
import utilStyles from '../../styles/utils.module.css'
import React from 'react'

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

export default function Markdown({post}: {post: FrontMetter}){
    let router = useRouter()
    // console.log("Markdown", router.query, router.asPath);
    
    let slug = router.query.slug as string;
    let md = post.content ?? "<h1>NOT FOUND</h1>";
    let handle = (ev:any) => {
        // console.log(slug, md, ev);
        alert(slug);
    }
    return (
        <Layout>
            {/* <h1 onClick={handle}>{post.title}</h1> */}
            <div className="rows fxBetween">
              <img src={post.author.picture} width="64px" height="64"
                className={utilStyles.borderCircle}
                alt={post.author.name} srcSet=""/>
              <p className={`fxSelfEnd ${utilStyles.panel}`}>
              {post.author.name} {new Date(post.date).toLocaleString()}
              </p>
            </div>
            <div dangerouslySetInnerHTML={{__html:`${md}`}}></div>
        </Layout>
    );
}

type Params = { params: { slug: string[]|string } }

export async function getStaticProps({ params }: Params) {
  // console.log("++++++[...slug] getStaticProps", params);
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'excerpt',
    'coverImage',
  ])
  const content = Marked(post.content || '')

  return {
    props: {
      post: { ...post, content }
    },
  }
}

export async function getStaticPaths(context:any) {
  const slugTree = getPostSlugs()
  let locale = context.locale ?? 'zh-CN';
  let paths = slugTree.list.map((slug) => {
    return { locale, params: { slug: [slug] } }
  })
  slugTree.tree?.map(it => {
    let dir = it.folder.split(/\/|\\/).splice(1)
    paths = paths.concat(
      it.list.map(slug => {
        return { locale, params: { slug: slug.split('/') } } 
      })
    )
  })

  // console.log("++++++[...slug] getStaticPaths", context, JSON.stringify(paths));
  return {
    fallback: false,
    paths,
  }
}
