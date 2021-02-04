import Marked, {Renderer} from 'marked'
import Layout from '../../components/layout'
import content from '../../docs/tutorial-assets.md'
// let content = 'NOTHING';

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
// let output = Marked(md, opts)
// let content = Marked('I am using **__markdown__**.')
// const content = Marked(marked)
// window.marked = Marked;

export default function TutorialAssets(props:any){
    console.log('++++++++++++++++++++++++TutorialAssets', props);
    return (
        <Layout><div dangerouslySetInnerHTML={{__html:`${content}`}}></div></Layout>
    );
}
export async function getServerSideProps(){
  // Fetch data from external API
  const res = await fetch(`https://github.com/manifest.json`)
  const data = await res.json()
  console.log('++++++++++++++++++++++++TutorialAssets->getServerSideProps', data.name);

  return {
    props: {
      data: data.name
    }
  }
}

