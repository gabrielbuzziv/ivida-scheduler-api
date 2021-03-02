'use strict'

const Route = use('Route')

/**
 * AuthController routes.
 */
Route.post('auth', 'AuthController.store')

/**
 * MeetingController routes.
 */
Route.get('meetings', 'MeetingController.index')
Route.get('schedules/:id', 'ScheduleController.index')

/**
 * SubscriptionController routes.
 */
Route.post('subscribe', 'SubscriptionController.store')
