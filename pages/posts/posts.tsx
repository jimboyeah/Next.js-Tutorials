import Link from 'next/link'
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

let Posts = (props:any) => {
  console.log("++++++++Posts", props);
  let {mdTree, mdFiles} = props;
  if(!mdTree) return(<div className="card">Loading...</div>)
  return (
    <>
    <div className="card">
    <h3>Docs</h3>
    <List posts={mdFiles[mdTree.folder]} />
    </div>
    {
    mdTree.tree && mdTree.tree.map((it,id) => (
      <>
      <div className="card" key={id}>
        <h3>{it.folder.split('/').pop()}</h3>
        <List posts={mdFiles[it.folder]} />
      </div>
      </>
    ))
    }
    </>
  )
}

export async function getStaticProps(props: any) {
    console.log("Will component execute getStaticProps?", props);
    return {
        props: {
            data: JSON.stringify(props)
        }
    }
}

export default Posts;