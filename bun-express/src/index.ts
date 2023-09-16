import express from 'express'
import bodyParser from 'body-parser'

import helloRoute from './routes/hello'
import jsonWalkRoute from './routes/json_walk'
import jsonCopyRoute from './routes/json_copy'
import jsonStructuredRoute from './routes/json_structured'

const port = 8000
const app = express()

// middleware
app.use(bodyParser.json())

// routes
app.use(helloRoute)
app.use(jsonWalkRoute)
app.use(jsonCopyRoute)
app.use(jsonStructuredRoute)

// handle 404
app.get('*', (_, res): void => {
  res.status(404).contentType("text/plain").send('what???')
  return ;
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
