import Organization from '#organizations/models/organization.model'
import { assertExists } from '@adonisjs/core/helpers/assert'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class CreateOrgnanizationController {
  static validator = vine.compile(
    vine.object({
      name: vine.string().minLength(3).maxLength(50),
    })
  )

  async handle({ auth, request, response }: HttpContext) {
    assertExists(auth.user, 'User is not authenticated')
    const { name } = await request.validateUsing(CreateOrgnanizationController.validator)

    const organization = await Organization.create({
      name,
    })

    await auth.user.related('organizations').attach([organization.id])

    auth.user.onboardingStep = 1
    await auth.user.save()

    return response
      .redirect()
      .toRoute('dashboard.index', { organizationSlug: auth.user.organizations[0]?.slug })
  }
}
