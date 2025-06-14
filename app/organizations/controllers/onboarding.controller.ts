import { HttpContext } from '@adonisjs/core/http'

export default class OnboardingController {
  render({ inertia }: HttpContext) {
    return inertia.render('Onboarding')
  }
}
