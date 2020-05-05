'use strict'

const Subscription = use('App/Models/Subscription')

class SubscriptionController {
  /**
   * Remover subscription based on id.
   */
  async destroy ({ response, params }) {
    const { id } = params

    try {
      const subscription = await Subscription.findOrFail(id)

      await subscription.delete()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível remover a inscrição.' } })
    }
  }
}

module.exports = SubscriptionController
