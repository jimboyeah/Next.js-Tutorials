import Layout from '../../components/layout'
import {useRouter} from 'next/router'
import React from 'react'

export default function Normal(props:any){
    const Router = useRouter()
    console.log("------ route normal.tsx", props, Router);
    return (
    <>
    <Layout>
    <h3 className="card">Predefined Routes Test</h3>
    <pre className="card">{JSON.stringify(Router.query)}</pre>
    </Layout>
    </>
    )
}
// export async function getStaticProps(context: any) {
//     console.log("++++++ getStaticcontext", context);
//     return {
//         props: {
//             data: JSON.stringify(context)
//         }
//     }
// }