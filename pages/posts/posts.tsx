import Link from 'next/link'
import {parse} from 'path'
import { FrontMetter, getPostSlugs, getPosts, MetterKey } from '../../utils/api'

function List({ posts }:{posts: FrontMetter[]}) {
  return (
    <ul className="normalList columns ellipsis">
      {posts.map((post, id) => (
        <li key={id}>
          <Link href={{
            pathname:`/tutorial/${encodeURIComponent(post.slug)}`,
            query:{slug:['a','b']}
          }} >
            <a title={post.date}>{post.title} - {post.author.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const fields:MetterKey[] = ['slug', 'title', 'date', 'author']

let Empty = ({folder}:{folder?:string}) => {
  return (<h1></h1>)
}

let Posts = ({folder}:{folder?:string}) => {
  let md = getPostSlugs(folder)
  return (
    <>
    <div className="card">
    <h3>Docs</h3>
    <List posts={getPosts(fields, md.folder)} />
    </div>
    {
    md.tree && md.tree.map((it,id) => (
      <>
      <div className="card" key={id}>
        <h3>{parse(it.folder).base}</h3>
        <List posts={getPosts(fields, it.folder)} />
      </div>
      </>
    ))
    }
    </>
  )
}


export default Posts;