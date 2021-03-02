'use strict'

const moment = require('moment')

const Meeting = use('App/Models/Meeting')

class MeetingController {
  /**
   * Return the active meeting with date between today and the next 7 days.
   */
  async index () {
    const meetings = await Meeting.query()
      .where('is_active', true)
      .where('date', '>=', moment())
      .orderBy('date', 'ASC')
      .fetch()

    return meetings

    if (meeting === null) return null

    await meeting.loadMany({
      schedules: builder => {
        return builder
          .withCount('subscriptions as subscribed')
          .orderBy('time', 'asc')
      }
    })

    meeting = meeting.toJSON()

    return {
      ...meeting,
      schedules: meeting.schedules.map(schedule => ({
        ...schedule,
        available: schedule.vacancies - schedule.__meta__.subscribed,
        busy: schedule.__meta__.subscribed
      }))
    }
  }
}

module.exports = MeetingController
