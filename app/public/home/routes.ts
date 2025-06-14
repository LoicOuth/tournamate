import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const HomeController = () => import('#home/controllers/home.controller')

router.get('/', [HomeController, 'render']).as('home.index').middleware([middleware.silentAuth()])
