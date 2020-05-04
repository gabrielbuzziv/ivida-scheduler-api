'use strict'

const Database = use('Database')
const Meeting = use('App/Models/Meeting')
const Schedule = use('App/Models/Schedule')

class MeetingController {
  /**
   * List all meetings ordered by date DESC.
   */
  async index () {
    const meetings = await Meeting.query().with('schedules').orderBy('date', 'DESC').fetch()

    return meetings
  }

  /**
   * Show a specific meeting by ID.
   */
  async show ({ response, params }) {
    const { id } = params

    try {
      const meeting = await Meeting.findOrFail(id)

      return meeting
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Não foi possível encontrar a reunião.' }
      })
    }
  }

  /**
   * Create a new meeting.
   * Create schedules and relate to the brand new meeting.
   */
  async store ({ request, response }) {
    const { schedules, ...data } = request.only([
      'name',
      'date',
      'is_active',
      'schedules'
    ])

    try {
      const trx = await Database.beginTransaction()
      const meeting = await Meeting.create(data, trx)

      await meeting.schedules().createMany(schedules, trx)

      await trx.commit()

      await meeting.loadMany({
        schedules: query => query.orderBy('time', 'asc')
      })

      return response.status(201).send(meeting)
    } catch (err) {
      console.log(err)

      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível criar a reunião.' } })
    }
  }

  /**
   * Update the meeting based on id.
   * Create, Update and Delete the related schedules of the meeting.
   */
  async update ({ request, response, params }) {
    const { id } = params
    const { schedules, ...data } = request.only([
      'name',
      'date',
      'is_active',
      'schedules'
    ])

    try {
      const trx = await Database.beginTransaction()
      const meeting = await Meeting.findOrFail(id, trx)

      await meeting.merge(data, trx)
      await meeting.save(trx)

      /**
       * Check all schedules from request
       * IF id is empty, create a new schedule to the meeting.
       * IF _destroy attribute exists, delete schedule from meeting.
       * ELSE update the schedule.
       */
      await Promise.all(
        schedules.map(async schedule => {
          if (!schedule.id) {
            await meeting.schedules().create(schedule, trx)
            return
          }

          const scheduleObject = await Schedule.findOrFail(schedule.id)

          if (schedule._destroy) {
            await scheduleObject.delete(trx)
            return
          }

          await scheduleObject.merge(schedule, trx)
          await scheduleObject.save(schedule, trx)
        })
      )

      await trx.commit()

      await meeting.loadMany({
        schedules: query => query.orderBy('time', 'asc')
      })

      return meeting
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível criar a reunião.' } })
    }
  }

  /**
   * Delete a meeting based on ID.
   * on CASCADE all relationships will get deleted too.
   */
  async destroy ({ response, params }) {
    const { id } = params

    try {
      const meeting = await Meeting.findOrFail(id)

      await meeting.delete()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível remover a reunião.' } })
    }
  }
}

module.exports = MeetingController
