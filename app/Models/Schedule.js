'use strict'

const Model = use('Model')

class Schedule extends Model {
  getTime (time) {
    const parsedTime = time.split(':')

    return `${parsedTime[0]}:${parsedTime[1]}`
  }

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
