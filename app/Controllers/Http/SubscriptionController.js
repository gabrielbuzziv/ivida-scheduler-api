'use strict'

const Subscription = use('App/Models/Subscription')

class SubscriptionController {
  async store ({ request, response }) {
    const data = request.only(['name', 'district', 'schedule_id'])

    try {
      const subscription = await Subscription.create(data)

      return response.status(201).send(subscription)
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível se inscrever' } })
    }
  }
}

module.exports = SubscriptionController
