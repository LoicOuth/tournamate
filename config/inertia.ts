import { UserPresenter } from '#me/presenters/user.presenter'
import { defineConfig } from '@adonisjs/inertia'
import { ToastErrorKey, ToastSucessKey } from '#core/types/toast.types'
import '@adonisjs/inertia/types'
import { Theme, ThemSessionKey } from '#types/theme'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: ({ session }) => session?.flashMessages.get('errors'),
    success: ({ session }) => session?.flashMessages.get('success'),
    authError: ({ session }) => !!session?.flashMessages.get('errorsBag.E_INVALID_CREDENTIALS'),
    toastError: ({ session }) => session.flashMessages.get(ToastErrorKey)?.message,
    toastSuccess: ({ session }) => session.flashMessages.get(ToastSucessKey)?.message,
    user: async ({ auth, request }) =>
      await auth.user?.projection(request.param('organizationSlug')),
    theme: ({ session }) => session.get(ThemSessionKey, Theme.Dark),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    pages: (_, page) => page.startsWith('public'),
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends Record<string, any> {
    user?: UserPresenter
    authError?: boolean
    toastError?: string
    toastSuccess?: string
    success?: any
    theme: Theme
  }
}
