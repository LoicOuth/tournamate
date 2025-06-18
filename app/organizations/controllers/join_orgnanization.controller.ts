import Organization from '#organizations/models/organization.model'
import { assertExists } from '@adonisjs/core/helpers/assert'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class JoinOrgnanizationController {
  static validator = vine.compile(
    vine.object({
      slug: vine.string().exists({ column: 'slug', table: 'organizations' }),
    })
  )

  async handle({ auth, request, response }: HttpContext) {
    assertExists(auth.user, 'User is not authenticated')
    const { slug } = await request.validateUsing(JoinOrgnanizationController.validator)

    const organization = await Organization.findByOrFail('slug', slug)

    if (auth.user.organizations.some((org) => org.id === organization.id)) {
      return response.redirect().toRoute('dashboard.index', { organizationSlug: organization.slug })
    }

    await auth.user.related('organizations').attach([organization.id])

    auth.user.onboardingStep = 1
    await auth.user.save()

    return response.redirect().toRoute('dashboard.index', { organizationSlug: organization.slug })
  }
}
