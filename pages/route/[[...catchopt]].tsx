import Layout from '../../components/layout'
import {useRouter} from 'next/router'

export default function Catchopt(props:any){
    const Router = useRouter()
    let json = JSON.stringify(Router.query);
    let fallback = Router.isFallback && "FALLBACK";
    console.log(`-----------------[[...catchopt]].tsx`, fallback, props, Router);
    return (
    <Layout>
    <h3 className="card">Optional Catch-all Routes Test</h3>
    {Router.isFallback?(
        <h1 className="card">Router.isFallback</h1>
    ):(
        <pre className="card">{json}</pre>
    )}
    </Layout>
    )
}

export async function getStaticProps(context: any) {
    console.log("+++++++++++++++Optional Catch-all getStaticProps", context);
    return {
        props: {
            data: JSON.stringify(context)
        }
    }
}

export async function getStaticPaths(context:any) {
    console.log("+++++++++++++++Optional Catch-all getStaticPaths", context);
    const res = await fetch(`https://github.com/manifest.json`)
    const data = await res.json()
    let locale = context.locale ?? 'zh-CN';
    let paths = [
        {params:{ locale, catchopt: ['catch', 'all'] }},
        {params:{ locale, catchopt: ['catch', data.name] }},
        {params:{ locale, catchopt: false }}, 
    ]
    return { paths, fallback: false }
}
