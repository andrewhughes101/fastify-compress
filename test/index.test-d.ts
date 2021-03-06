import fastify from 'fastify'
import { createReadStream } from 'fs'
import fastifyCompress from '..'

const zlib = require('zlib')

const app = fastify()

app.register(fastifyCompress, {
  global: true,
  threshold: 10,
  zlib: zlib,
  inflateIfDeflated: true,
  customTypes: /x-protobuf$/,
  encodings: ['gzip', 'br', 'identity', 'deflate'],
  requestEncodings: ['gzip', 'br', 'identity', 'deflate'],
  forceRequestEncoding: 'gzip'
})

const appWithoutGlobal = fastify();

appWithoutGlobal.register(fastifyCompress, { global: false })

appWithoutGlobal.get('/', (req, reply) => {
  reply
    .type('text/plain')
    .compress(createReadStream('./package.json'))
})
