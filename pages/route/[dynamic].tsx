import Layout from '../../components/layout'
import {useRouter} from 'next/router'

export default function Dynamic(props:any){
    const Router = useRouter()
    let json = JSON.stringify(Router.query);
    console.log("------ route [dynamic].tsx", props, json, Router);
    return (
    <Layout>
    <h3 className="card">Dynamic Routes Test</h3>
    <pre className="card">{json}</pre>
    </Layout>
    )
}

export async function getStaticProps(context: any) {
    console.log("++++++ Dynamic getStaticProps", context);
    return {
        props: {
            data: JSON.stringify(context)
        }
    }
}

export async function getStaticPaths(context:any) {
    console.log("++++++ Dynamic getStaticPaths", context);
    let locale = context.locale ?? 'zh-CN';
    let paths = [
        {params:{ locale, dynamic: 'dynamic' }},
        {params:{ locale, dynamic: 'pass' }},
        {params:{ locale, dynamic: 'sideway' }},
        {params:{ locale, dynamic: 'more' }},
    ]
    return { paths, fallback: false }
}
