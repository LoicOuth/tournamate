import { NextFn } from '@adonisjs/core/types/http'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { ToastService } from '#core/services/toast.service'

@inject()
export default class OnboardingMiddleware {
  constructor(private readonly toastService: ToastService) {}

  async handle({ auth, response, request }: HttpContext, next: NextFn) {
    const organizationSlug = request.param('organizationSlug')

    if (organizationSlug && auth.user) {
      if (auth.user.organizations.some((org) => org.slug === organizationSlug)) {
        return next()
      }
    }

    this.toastService.error('error.organizationNotFoundOrNotMember')

    return response.redirect().toRoute('home.index')
  }
}
