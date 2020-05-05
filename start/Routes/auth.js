'use strict'

const Route = use('Route')

Route.group(() => {
  /**
   * Admin/MeetingController routes.
   */
  Route.resource('meetings', 'MeetingController').apiOnly()

  /**
   * Admin/ScheduleController routes.
   */
  Route.get('schedules/:id', 'ScheduleController.show')

  /**
   * Admin/SubscriptionController routes.
   */
  Route.delete('subscriptions/:id', 'SubscriptionController.destroy')
})
  .prefix('admin')
  .namespace('Admin')
  .middleware(['auth'])
