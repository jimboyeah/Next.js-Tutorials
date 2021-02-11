import fs from 'fs'
import path, { join, dirname, parse } from 'path'
import matter from 'gray-matter'

export type FrontMetter = {
  title: string,
  date: string,
  slug: string,
  author: { name: string, picture: string },
  content: string,
  excerpt: string,
  coverImage: string,
}
export type MetterKey = keyof FrontMetter;

export type SlugTree = {
  folder: string,
  list: string[],
  tree?: SlugTree[],
}

export function getTaggedContent(tag:RegExp, path:string):String {
  if(!fs.statSync(path).isFile()) return "";
  let ct = fs.readFileSync(path, 'utf8')
  return ct.split(tag)[1]
}
/**
 * @param {string} folder path to the root, default: Docs
 * @returns {SlugTree} markdown filenames
 * @see
 * Server-side code
 * API exported from this script should be use only in getStaticProps()
 * where is a proper place to write server-side codes.
 * See also:
 * https://next-code-elimination.now.sh/
 * https://www.nextjs.cn/docs/basic-features/data-fetching#write-server-side-code-directly
 */
export function getPostSlugs(folder: string = 'Docs'): SlugTree {
  let subs: string[] = []
  let path = join(process.cwd(), folder)
  let list = fs.readdirSync(path)
  // console.log("====== getPostSlugs", folder)
  list.map((it, id) => {
    let sta = fs.statSync(join(path, it))
    if (sta.isDirectory()) {
      subs.push(join(folder, it))
      delete list[id]
    } else {
      // for base with extension
      list[id] = [...folder.split(/\/|\\/).splice(1), parse(it).name].join("/")
    }
  })
  list = list.filter(it => !!it)
  let tree = subs.map(it => getPostSlugs(it))
  return { folder, list, tree };
}

/**
 * @param {fields} markdown file's front-matter fields be return
 * @param {string} folder path to the root, default: Docs
 * @see
 * Server-side code
 * API exported from this script should be use only in getStaticProps()
 * where is a proper place to write server-side codes.
 * See also:
 * https://next-code-elimination.now.sh/
 * https://www.nextjs.cn/docs/basic-features/data-fetching#write-server-side-code-directly
 */
export function getPosts(fields: MetterKey[] = [], slugs: string[] = [], folder: string = 'Docs') {
  // console.log("====== getPosts", slugs, folder)
  if (!slugs.length) {
    const tree = getPostSlugs(folder)
    slugs = tree.list
  }
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.title > post2.title ? 1 : -1))
  return posts
}
/**
 * @param slug 
 * @param fields 
 * @param folder 
 * @see
 * Server-side code
 * API exported from this script should be use only in getStaticProps()
 * where is a proper place to write server-side codes.
 * See also:
 * https://next-code-elimination.now.sh/
 * https://www.nextjs.cn/docs/basic-features/data-fetching#write-server-side-code-directly
 */
export function getPostBySlug(slug: string[] | string, fields: MetterKey[] = [], folder: string = 'Docs') {
  const realSlug = ((typeof slug === 'string') ? slug : join(...slug)).replace(/\.md$/, '')
  const fullPath = join(join(process.cwd(), folder), `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  // console.log("====== getPostBySlug", slug, fullPath, data.title)

  const items: FrontMetter = {} as FrontMetter

  // populate front-matter data and exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}
