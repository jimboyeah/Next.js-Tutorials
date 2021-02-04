import FileSystem from 'fs'
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

/**
 * @param {string} folder path to the root, default: Docs
 * @returns {SlugTree} markdown filenames
 */
export function getPostSlugs(folder: string = 'Docs'): SlugTree {
  let subs: string[] = []
  let path = join(process.cwd(), folder)
  let list = FileSystem.readdirSync(path)
  list.map((it, id) => {
    let sta = FileSystem.statSync(join(path, it))
    if (sta.isDirectory()) {
      subs.push(join(folder, it))
      delete list[id]
    }
  })
  list = list.filter(it => !!it)
  let tree = subs.map(it => getPostSlugs(it.substr(0, process.cwd().length + 1)))
  return { folder, list, tree };
}

/**
 * @param {fields} markdown file's front-matter fields be return
 * @param {string} folder path to the root, default: Docs
 */
export function getPosts(fields: MetterKey[] = [], folder: string = 'Docs') {
  const tree = getPostSlugs(folder)
  const posts = tree.list
    .map((slug) => getPostBySlug(slug, fields, folder))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.title > post2.title ? 1 : -1))
  return posts
}

export function getPostBySlug(slug: string[] | string, fields: MetterKey[] = [], folder: string = 'Docs') {
  console.log("========================getPostBySlug", slug)
  const realSlug = (typeof slug === 'string') ? slug.replace(/\.md$/, '') : join(...slug)
  const fullPath = join(join(process.cwd(), folder), `${realSlug}.md`)
  const fileContents = FileSystem.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

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
