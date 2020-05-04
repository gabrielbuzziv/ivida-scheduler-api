'use strict'

const moment = require('moment')
require('moment-timezone')

const Meeting = use('App/Models/Meeting')

class MeetingController {
  /**
   * Return the active meeting with date between today and the next 7 days.
   */
  async index () {
    const meeting = await Meeting.query()
      .where('is_active', true)
      .whereBetween('date', [moment(), moment().add('days', 7)])
      .orderBy('date', 'DESC')
      .first()

    if (meeting === null) return null

    await meeting.loadMany({
      schedules: query => query.orderBy('time', 'asc')
    })

    return meeting
  }
}

module.exports = MeetingController
