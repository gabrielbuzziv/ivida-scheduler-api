'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meeting extends Model {
  /**
   * A Meeting has many schedules.
   */
  schedules () {
    return this.hasMany('App/Models/Schedule')
  }
}

module.exports = Meeting
