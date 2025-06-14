import { NextFn } from '@adonisjs/core/types/http'
import { HttpContext } from '@adonisjs/core/http'

export default class OnboardingMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    if (auth.user?.onboardingStep === 0) {
      return response.redirect().toRoute('onboarding.index')
    }

    return next()
  }
}
