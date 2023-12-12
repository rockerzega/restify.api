import router from './routes'
import { configureSockets } from './sockets/socket'
import { Server, createServer, plugins } from 'restify'

const server: Server = createServer({
  name: 'Mi primer servidor',
  version: '1.0.0',
})

server.use(plugins.bodyParser())
server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser())

// Router
router.applyRoutes(server)

// Sockets
configureSockets(server)

// Escuchar peticiones
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`${server.name} escuchando en ${server.url}`);
})
