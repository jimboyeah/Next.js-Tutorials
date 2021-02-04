import Layout from '../../components/layout'
import {useRouter} from 'next/router'

export default function Dynamic(props:any){
    const Router = useRouter()
    let json = JSON.stringify(Router.query);
    console.log("-----------------route [dynamic].tsx", props, json, Router);
    return (
    <Layout>
    <h3 className="card">Dynamic Routes Test</h3>
    <pre className="card">{json}</pre>
    </Layout>
    )
}

export async function getStaticProps(props: any) {
    console.log("+++++++++++++++Dynamic getStaticProps", props);
    return {
        props: {
            data: JSON.stringify(props)
        }
    }
}

export async function getStaticPaths(props:any) {
    console.log("+++++++++++++++Dynamic getStaticPaths", props);
    let paths = [
        {params:{ dynamic: 'dynamic' }},
        {params:{ dynamic: 'pass' }},
        {params:{ dynamic: 'sideway' }},
        {params:{ dynamic: 'more' }},
    ]
    return { paths, fallback: false }
}
