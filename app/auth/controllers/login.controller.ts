import User from '#me/models/user.model'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class LoginController {
  static validator = vine.compile(
    vine.object({ email: vine.string().email(), password: vine.string() })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('public/auth/Login')
  }

  async handle({ response, request, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.validator)

    const user = await User.verifyCredentials(email, password)

    if (!user.validatedAt) {
      session.flash({ errors: 'login.validateError' })
      return response.redirect().toRoute('login.index')
    }

    await auth.use('web').login(user)

    return response
      .redirect()
      .toRoute('dashboard.index', { organizationSlug: user.organizations[0]?.slug })
  }
}
