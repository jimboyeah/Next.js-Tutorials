import Link from 'next/link'
import { FrontMetter, SlugTree } from '../../utils/api'

type ListProps = {posts: FrontMetter[], path:string};
function List({ posts, path }:ListProps) {
  return (
    <ul className="normalList columns ellipsis">
      {posts.map((post, id) => (
        <li key={id}> 
          <Link href={{
            pathname:`${path}/${encodeURIComponent(post.slug)}`,
            query:{qq:['a','b']}
          }} >
            <a title={post.date}>{post.title} - {post.author.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

type Props = {mdTree:SlugTree, mdFiles:{[folder:string]:FrontMetter[]}};

let Posts = (props: Props) => {
  let {mdTree, mdFiles} = props;
  if(!mdTree) return(<div className="card">Loading...</div>)
  return (
    <>
    <div className="card col37">
      <h3>Docs</h3>
      <List posts={mdFiles[mdTree.folder]} path={`/tutorial`} />
    </div>
    {
    mdTree.tree && mdTree.tree.map((it:SlugTree, id:number) => (
      <div className="card col37" key={id}>
        <h3>{it.folder.split(/\\/).pop()}</h3>
        <List posts={mdFiles[it.folder]} path={`/tutorial/${it.folder.split(/\\/).slice(1).join("/")}`} />
      </div>
    ))
    }
    </>
  )
}
/**
 * As a component for a Page, `getStaticProps()` or `getStaticPaths()` will be never executed!
 */
export async function getStaticProps(props: any) {
    console.log("Will component execute getStaticProps?", props);
    return {
        props: {
            data: JSON.stringify(props)
        }
    }
}

export default Posts;