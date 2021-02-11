import React, {useState} from 'react'
import Image from 'next/image'
import Layout from '../../components/layout'

type Mode = "intrinsic" | "responsive" | "fixed" | "fill"

let Img = ({mode}:{mode: any}) => (
    <Image alt="daylily" src="/daylily.jpg" 
        layout={mode} objectFit="cover" quality={100} width={"630"} height={"630"} />
    )


export default function TutorialAssets(props:any){
  const [Mode, setMode] = useState("fill")
  return (
    <Layout>
      <div>
      <button onClick={ ev => setMode('intrinsic')}>intrinsic</button>
      <button onClick={ ev => setMode('responsive')}>responsive</button>
      <button onClick={ ev => setMode('fixed')}>fixed</button>
      <button onClick={ ev => setMode('fill')}>fill</button>
      </div>
      { <Img mode={Mode} /> }
    </Layout>
  );
}

// export async function getServerSideProps(){
//   return {
//     props: { }
//   }
// }

