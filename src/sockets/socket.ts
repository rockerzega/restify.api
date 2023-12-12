// import socketIo, { Socket } from 'socket.io'
import { Server as ServerSocket, Socket } from 'socket.io'
import { Server } from 'restify'

const origenes = ['http://localhost:5001']

export function configureSockets(server: Server): void {
  const io = new ServerSocket(server.server, {
    cors: {
      // credentials: true,
      origin: (req, next) => {
        if(req && (origenes.includes(req)) || !req) {
          return next(null, true)
        }
        console.log(`Rechazando conexión de ${req}`)
        next(new Error('Dominio no permitido'))
      },
      methods: ['GET', 'POST'],
    },
    transports: ['websocket']
  })

  io.on('connection', (socket: Socket) => {
    console.log('Usuario conectado : ', socket?.id)

    // Manejar eventos del socket
    socket.on('mensaje', (data) => {
      console.log('Mensaje recibido:', data)
      io.emit('respuesta', {msg: 'Hola desde el server'})
    })

    socket.on('disconnect', () => {
      console.log('Usuario desconectado')
    })
  })
}