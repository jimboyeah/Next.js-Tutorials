import echo from "../../utils/echoMiddleware"
import {IncomingMessage, ServerResponse} from 'http'
import {NextApiRequest, NextApiResponse} from 'next'

// req = request data, res = response data
// curl http://localhost:3000/api/echo -d "a=1&b=2"
// curl http://localhost:3000/api/echo -d "{a:1, b:2}"
// curl http://localhost:3000/api/echo -d "{""a"":1, ""b"":2}" -H "Content-Type: application/json"
// curl http://localhost:3000/api/echo -d "{""a"":1, ""b"":2}" -H "Content-Type: binary/octet-stream"
export default async (req:NextApiRequest, res:NextApiResponse) => {
  if(req.query.act==='echo'){
    return await echo(req, res)
  }
  let { headers, httpVersion, method, url, statusCode, statusMessage } = req;
  let json;
  try{
    json = JSON.parse(req.body);
  }catch(ex){
    json = `${ex.message}[req.body:${typeof req.body}]`;
  }
  res.status(200).json({ 
    text: 'Hello', 
    query: req.query,
    data: req.body,
    json,
    req:{ headers, httpVersion, method, url, statusCode, statusMessage },
    types: {res: typeof res, req: typeof req }
  })
}