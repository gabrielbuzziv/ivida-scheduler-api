'use strict'

const Route = use('Route')

Route.group(() => {
  /**
   * Admin/MeetingController routes.
   */
  Route.resource('meetings', 'MeetingController').apiOnly()
})
  .prefix('admin')
  .namespace('Admin')
  .middleware(['auth'])
