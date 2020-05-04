'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up () {
    this.create('schedules', (table) => {
      table.increments()
      table.integer('meeting_id')
        .unsigned()
        .references('id')
        .inTable('meetings')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.time('time').notNullable()
      table.string('minister').nullable()
      table.integer('vacancies').notNullable().defaultTo(130)
      table.timestamps()
    })
  }

  down () {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
