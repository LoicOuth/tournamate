import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organization_user'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('last_opened_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('last_opened_at')
    })
  }
}
