import { Router } from 'restify-router'
import { Request, Response, Next } from 'restify'

const router: Router = new Router()

router.get('/', (req: Request, res: Response, next: Next) => {
  console.log(req.headers.host)
  res.send({
    name: 'api-restify',
    versino: '0.0.1',
    description: 'Api de pruebas',
  })
  next()
})

export default router