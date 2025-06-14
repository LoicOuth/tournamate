import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, manyToMany } from '@adonisjs/lucid/orm'
import User from '#me/models/user.model'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'
import stringHelpers from '@adonisjs/core/helpers/string'

export default class Organization extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare logo: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @beforeSave()
  static async slugify(organization: Organization) {
    if (organization.$dirty.name) {
      organization.slug = stringHelpers.slug(organization.name)
    }
  }
}
