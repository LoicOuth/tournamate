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
  declare firstOrganization?: OrganizationPresenter

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.avatar = user.avatar?.includes('https') ? user.avatar : `/${user.avatar}`
    this.createdAt = user.createdAt.toString()
    this.validatedAt = user.validatedAt?.toString()
    this.organizations = user.organizations?.map((org) => new OrganizationPresenter(org)) || []
    this.firstOrganization = this.organizations?.[0]
  }

  static async build(user: User): Promise<UserPresenter> {
    const presenter = new UserPresenter(user)
    presenter.isConnectedWithProvider = !!(await user.connectedAuthProvider())

    return presenter
  }
}
