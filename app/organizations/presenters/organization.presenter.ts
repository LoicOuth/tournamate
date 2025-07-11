import Organization from '#organizations/models/organization.model'

export class OrganizationPresenter {
  declare id: number
  declare name: string
  declare slug: string
  declare createdAt?: string
  declare lastOpenedAt?: string

  constructor(organization: Organization) {
    this.id = organization.id
    this.name = organization.name
    this.slug = organization.slug
    this.createdAt = organization.createdAt.toString()
    this.lastOpenedAt = organization.$extras.pivot_last_opened_at
  }
}
