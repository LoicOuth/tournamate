import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const OnboardingController = () => import('#organizations/controllers/onboarding.controller')
const DashboardController = () => import('#organizations/controllers/dashboard.controller')
const JoinOrganizationController = () =>
  import('#organizations/controllers/join_orgnanization.controller')
const CreateOrganizationController = () =>
  import('#organizations/controllers/create_organization.controller')

router
  .group(() => {
    router.get('/onboarding', [OnboardingController, 'render']).as('onboarding.index')
    router.post('/org/join', [JoinOrganizationController, 'handle']).as('orgnanization.join')
    router.post('/org/create', [CreateOrganizationController, 'handle']).as('organization.create')

    router
      .group(() => {
        router.get('/', [DashboardController, 'render']).as('dashboard.index')
      })
      .prefix('/org/:organizationSlug?')
      .middleware([middleware.onboarding(), middleware.organizationMember()])
  })
  .middleware([middleware.auth()])
