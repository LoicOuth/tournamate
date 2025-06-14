import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#me/models/user.model'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import { AuthProviderPresenter } from '#auth/presenters/auth_provider.presenter'
import { type AuthProviderNames } from '#types/common'

export default class AuthProvider extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare providerName: AuthProviderNames

  @column()
  declare providerId: string

  @column()
  declare isConnectedWith: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  projection() {
    return new AuthProviderPresenter(this)
  }
}
