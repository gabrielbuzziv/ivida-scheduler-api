'use strict'

const Schema = use('Schema')

class MeetingSchema extends Schema {
  up () {
    this.create('meetings', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.date('date')
      table.boolean('is_active').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }
}

module.exports = MeetingSchema
