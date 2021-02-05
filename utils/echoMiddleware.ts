import Cors from 'cors'
import {NextApiRequest, NextApiResponse} from 'next'

// Initializing the cors middleware
const cors = Cors({
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: true,
  optionsSuccessStatus: 204
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req:NextApiRequest, res:NextApiResponse, fn: any ) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req:NextApiRequest, res:NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  res.setHeader("Access-Control-Allow-Methods", "HEAD")
  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
}

export default handler