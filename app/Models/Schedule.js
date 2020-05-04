'use strict'

const Model = use('Model')

class Schedule extends Model {
  /**
   * A Schedule belongs to a meeting.
   */
  meeting () {
    return this.belongsTo('App/Models/Meeting')
  }

  /**
   * A schedule has many subscriptions.
   */
  subscriptions () {
    return this.hasMany('App/Models/Subscription')
  }
}

module.exports = Schedule
