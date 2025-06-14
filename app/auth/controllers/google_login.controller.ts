import AuthProvider from '#auth/models/auth_provider.model'
import User from '#me/models/user.model'
import LoopService from '#core/services/loop.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class GoogleLoginController {
  async redirect({ ally, inertia }: HttpContext) {
    const redirectUrl = await ally.use('google').getRedirectUrl()
    return inertia.location(redirectUrl)
  }

  @inject()
  async handle({ ally, auth, response, session }: HttpContext, loop: LoopService) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      session.flash({ errors: 'login.googleAccessDenied' })
      return response.redirect().toRoute('login.index')
    }

    if (google.stateMisMatch()) {
      session.flash({ errors: 'login.googleRequestExpired' })
      return response.redirect().toRoute('login.index')
    }

    if (google.hasError()) {
      session.flash({ errors: google.getError()! })
      return response.redirect().toRoute('login.index')
    }

    const googleUser = await google.user()
    const userData = {
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.avatarUrl,
      password: '',
    }

    let user = await User.query()
      .whereHas('authProviders', (query) => {
        query
          .where('providerName', 'google')
          .where('providerId', googleUser.id)
          .where('isConnectedWith', true)
      })
      .preload('authProviders')
      .first()

    if (user) {
      await user.merge(userData).save()
    } else {
      user = await User.create({ ...userData, validatedAt: DateTime.now() })
      await AuthProvider.create({ providerId: googleUser.id, userId: user.id })
      const splittedName = user.name.split(' ')
      await loop.createContact({
        email: user.email,
        userId: user.id.toString(),
        firstName: splittedName[0],
        lastName: splittedName[1],
      })
    }

    await auth.use('web').login(user)

    return response
      .redirect()
      .toRoute('dashboard.index', { organizationSlug: user.organizations[0]?.slug })
  }
}
