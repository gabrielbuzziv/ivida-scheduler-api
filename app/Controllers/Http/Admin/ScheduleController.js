'use strict'

const Schedule = use('App/Models/Schedule')

class ScheduleController {
  /**
   * Get schedule data based on id.
   * Returning the meeting that the schedule belong and the subscriptions.
   */
  async show ({ response, params }) {
    const { id } = params

    try {
      const schedule = await Schedule.findOrFail(id)

      await schedule.loadMany(['meeting', 'subscriptions'])

      return schedule
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Não foi possível pegar os dados do horário' }
      })
    }
  }
}

module.exports = ScheduleController
