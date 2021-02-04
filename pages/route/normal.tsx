import Layout from '../../components/layout'
import {useRouter} from 'next/router'

export default function Normal(props:any){
    const Router = useRouter()
    console.log("-----------------route normal.tsx", props, Router);
    return (
    <>
    <Layout>
    <h3 className="card">Predefined Routes Test</h3>
    <pre className="card">{JSON.stringify(Router.query)}</pre>
    </Layout>
    </>
    )
}