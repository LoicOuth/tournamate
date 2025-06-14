import Organization from '#organizations/models/organization.model'

export class OrganizationPresenter {
  declare id: number
  declare name: string
  declare slug: string

  constructor(organization: Organization) {
    this.id = organization.id
    this.name = organization.name
    this.slug = organization.slug
  }
}
