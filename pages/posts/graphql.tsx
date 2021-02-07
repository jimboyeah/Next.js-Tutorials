import useSWR from 'swr'
import Layout from '../../components/layout'

let fetcher = (url:string) => fetch(url, {
  method: "post",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ 
    query: `{
      users(name:"WALLE") {
        name
      }
      sayHello
    }`, config:{} })
  // body: JSON.stringify({query: `{users{name}}` })
})
.then(res => res.text())
//.then(txt => console.log(txt))

let GraphQL = () =>{
  let { data, error } = useSWR('/api/graphql', fetcher)

  return (
    <Layout>
    {<pre className="scroll card console">Output: {data}</pre>}
    </Layout>
  )
}

export default GraphQL;


