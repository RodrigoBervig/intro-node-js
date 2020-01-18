const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = async (name) => {
  const assetPath = path.join(__dirname, 'assets', name)
  return new Promise((resolve, reject) => {
    fs.readFile(assetPath, {encoding : 'utf-8'}, (error, result) => {
      if (error) {
        reject(error)
      } 
      resolve(result)
    })
  })
}

const hostname = '127.0.0.1'
const port = 3000

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const router = {
  '/ GET' : {
    //mime type: information about what kind of file you are sending, so that the browser knows how to handle it
    asset : 'index.html',
    mime : mime.getType('html')
  },
  '/style.css GET' : {
    asset : 'style.css',
    mime : mime.getType('css')
  }
}

const server = http.createServer( async (req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname
  const route_value = router[`${route} ${method}`] //method is like "GET or POST"
  if(!route_value) {
    res.writeHead(404)
    logRequest(method, route, 404)
    res.end()
    return
  }
  res.writeHead(200, {'Content-Type': `${route_value.mime}`})
  res.write( await findAsset(`${route_value.asset}`))
  logRequest(method, route, 200)
  res.end()
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
