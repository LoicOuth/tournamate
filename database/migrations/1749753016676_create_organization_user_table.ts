import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organization_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('organization_id').unsigned().notNullable().references('organizations.id')
      table.integer('user_id').unsigned().notNullable().references('users.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
