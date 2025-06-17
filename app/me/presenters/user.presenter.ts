import User from '#me/models/user.model'
import { OrganizationPresenter } from '#organizations/presenters/organization.presenter'

export class UserPresenter {
  declare id: number
  declare name: string
  declare email: string
  declare avatar: string
  declare createdAt: string
  declare validatedAt?: string
  declare isConnectedWithProvider: boolean
  declare organizations: OrganizationPresenter[]
  declare lastOrganizationAccessed?: OrganizationPresenter
  declare currentOrganization?: OrganizationPresenter

  constructor(user: User, organizationSlug?: string) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.avatar = user.avatar?.includes('https') ? user.avatar : `/${user.avatar}`
    this.createdAt = user.createdAt.toString()
    this.validatedAt = user.validatedAt?.toString()
    this.organizations = user.organizations?.map((org) => new OrganizationPresenter(org)) || []
    this.lastOrganizationAccessed = user.organizations[0]
    this.currentOrganization = user.organizations.find((org) => org.slug === organizationSlug)
  }

  static async build(user: User, organizationSlug?: string): Promise<UserPresenter> {
    const presenter = new UserPresenter(user, organizationSlug)
    presenter.isConnectedWithProvider = !!(await user.connectedAuthProvider())

    return presenter
  }
}
