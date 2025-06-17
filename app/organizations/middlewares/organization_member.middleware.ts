import { NextFn } from '@adonisjs/core/types/http'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { ToastService } from '#core/services/toast.service'
import { DateTime } from 'luxon'

@inject()
export default class OnboardingMiddleware {
  constructor(private readonly toastService: ToastService) {}

  async handle({ auth, response, request }: HttpContext, next: NextFn) {
    const organizationSlug = request.param('organizationSlug')

    if (organizationSlug && auth.user) {
      const organization = auth.user.organizations.find((org) => org.slug === organizationSlug)
      if (organization) {
        if (
          !organization.$extras.pivot_last_opened_at ||
          DateTime.fromJSDate(organization.$extras.pivot_last_opened_at).diffNow('minutes')
            .minutes <= -10
        ) {
          await auth.user
            .related('organizations')
            .pivotQuery()
            .where('organization_id', organization.id)
            .update({
              last_opened_at: DateTime.now(),
            })
        }

        return next()
      }
    }

    this.toastService.error('error.organizationNotFoundOrNotMember')

    return response.redirect().toRoute('home.index')
  }
}
