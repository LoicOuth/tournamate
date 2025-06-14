import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const MeDetailsController = () => import('#me/controllers/me_details.controller')
const MeSecurityController = () => import('#me/controllers/me_security.controller')
const MeConnectionController = () => import('#me/controllers/me_connections.controller')
const MeChangeThemeController = () => import('#me/controllers/me_change_theme.controller')

router
  .get('/me/details', [MeDetailsController, 'render'])
  .as('me.details.render')
  .middleware([middleware.auth()])
router
  .post('/me/details', [MeDetailsController, 'handle'])
  .as('me.details.handle')
  .middleware([middleware.auth()])

router
  .get('/me/security', [MeSecurityController, 'render'])
  .as('me.security.render')
  .middleware([middleware.auth()])
router
  .post('/me/security', [MeSecurityController, 'handle'])
  .as('me.security.handle')
  .middleware([middleware.auth()])

router
  .get('/me/connections', [MeConnectionController, 'render'])
  .as('me.connections.render')
  .middleware([middleware.auth()])

router.put('/me/theme', [MeChangeThemeController, 'handle']).as('me.theme')
