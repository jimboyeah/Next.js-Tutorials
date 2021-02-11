import React, { useRef,useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Layout from '../../components/layout'
import {getTaggedContent} from '../../utils/api'

let fetcher = ({query, variables}:any = null) => fetch(
  '/api/graphql', {
  method: "post",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ query, variables })
  // body: JSON.stringify({ query, variables: { name: "Jane" } })
  // body: JSON.stringify({query: `{users{name}}` })
})
.then(res => res.json())
//.then(txt => console.log(txt))

/* example to use variable
{query: `mutation CreateUser($name: String) {
  createUser(name: $name) {
    id name
  }
}`, variables: { name: "Jane" }}
*/

let GraphQL = (props:{gql:string}) =>{
  const refInput = useRef<HTMLInputElement>(null)
  const refVariable = useRef<HTMLInputElement>(null)
  const [state, setState] = useState("")
  // let { data, error } = useSWR('{sayHello}', fetcher)
  let doKeydown = (ev:React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(ev.key)
    if(ev.key==="Enter" && ev.ctrlKey) doQuery();
  }
  let doQuery = (query?:string) => {
    if(query && refInput.current){
      refInput.current.value = query;
    }else{
      query = refInput.current?.value!;
    }
    let json = refVariable.current?.value || "{}"
    let variables
    try {
      variables = JSON.parse(json)
    }catch(ex) {
      return setState("variable error: "+ex.message)
    }
    console.log("doQuery", query)
    query && fetcher({query, variables})
    .then(json => {
      setState(JSON.stringify(json, null, 2))
      console.log(json)
    } )
    .catch(ex => {
      setState(JSON.stringify(ex, null, 2))
    } )
  }
  return (
    <Layout className="">
    <div className="rows">
      <div className="col13">
        <h3 className="fxCenter">GraphQL Server</h3>
        {<pre className="scroll card console scroll">{props.gql}</pre>}
      </div>
      <div className="col13 card rows fxAround fxWrap">
        <h3>GraphQL Playground</h3>
        <textarea onKeyDown={doKeydown} className="col11" style={{height:'50vh'}}
          ref={refInput} type="text" defaultValue="{ sayHello }"/>
        <input type="text" className="col11" 
          ref={refVariable} title="query variables" defaultValue={`{ "name": "Jane" }`}/>
        <div className="col11">
<button onClick={ ()=> doQuery()} className="col11" >Do Query</button>
<button onClick={(ev) => {doQuery(`{ count }`)}}>Query count</button>
<button onClick={(ev) => {doQuery(`{ users{name} }`)}}>Query users</button>
<button onClick={(ev) => {doQuery(`
  mutation CreateUser($name: String) {
    createUser(name: $name) {
      id name
    }
  }`)}}>Use Variable</button>
<button onClick={(ev) => {doQuery(`{ users{id name} }`)}}>Query users with id</button>
<button onClick={(ev) => {doQuery(`
  mutation {
    createUser(name: "Andy"){
      id name
    }
  }`)}}>add</button>
<button onClick={(ev) => {doQuery(`
  mutation { 
    removeUser(id:"3"){
      id name
    }
  }`)}}>remove</button>
<button onClick={(ev) => {doQuery(`{ sayHello users(name:"Walle"){name} }`)}}>Walle</button>
<button onClick={(ev) => {doQuery(`{ users{name} sayHello(msg: "Hi!") }`)}}>say Hi!</button>
<button onClick={(ev) => {doQuery(`{ sayHello books{title author{ id name}} }`)}}>sayHello books</button>
<button onClick={(ev) => {doQuery(`{ books(title:"the Art & Science of C Programming"){title author{ id name}} }`)}}>the Art & Science of C</button>
<button onClick={(ev) => {doQuery(`
{ __type(name: "User") {
    name
    description
    fields {
      name
      description
      type { name }
      args { name type {name} }
    }
  }
}`)}}>User Type</button>
<button onClick={(ev) => {doQuery(`
{ __schema {
  queryType{
    name fields {
      name type{name kind ofType{name kind}} args {
        name type{name kind ofType{name kind}} 
      }
    }
  }
}}
`)}}>Root Fields</button>
<button onClick={(ev) => {doQuery(`
{ __schema {
    types {
      name
      description
      kind
    }
  }
}
`)}}>All Types Introspection</button>
        </div>
        <Link href="/tutorial/Advanced/graphql"> 👉 Lean GraphQL</Link>
      </div>
      <div className="col13">
        <h3>Output:</h3>
        {<pre className="scroll card console scroll">{state}</pre>}
      </div>
    </div>
    <style>{`
    .console { height: 80vh; white-space: pre; }
    pre { margin: 1em 0 !important; }
    .col13 { margin: 0 1em; }
    `}</style>
    </Layout>
  )
}

export default GraphQL;

export async function getStaticProps(context:any) {
  let path = process.cwd()+'/pages/api/graphql.tsx'
  let gql = getTaggedContent(/\/{6,}/, path)?.trim()
  return {
    props: { gql }
  }
}
