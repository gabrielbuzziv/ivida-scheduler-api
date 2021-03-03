'use strict'

const moment = require('moment')

const Meeting = use('App/Models/Meeting')

class MeetingController {
  /**
   * Return the active meeting with date between today and the next 7 days.
   */
  async index () {
    let meetings = await Meeting.query()
      .with('schedules', builder => {
        builder.withCount('subscriptions as subscribed')
        builder.orderBy('time', 'asc')
      })
      .where('is_active', true)
      .where('date', '>=', moment())
      .orderBy('date', 'ASC')
      .fetch()

    meetings = meetings.toJSON()

    return meetings.map(meeting => ({
      ...meeting,
      schedules: meeting.schedules.map(schedule => ({
        ...schedule,
        available: schedule.vacancies - schedule.__meta__.subscribed,
        busy: schedule.__meta__.subscribed
      }))
    }))
  }
}

module.exports = MeetingController
