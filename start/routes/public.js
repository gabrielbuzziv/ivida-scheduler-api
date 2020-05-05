'use strict'

const Route = use('Route')

/**
 * AuthController routes.
 */
Route.post('auth', 'AuthController.store')

/**
 * MeetingController routes.
 */
Route.get('meeting', 'MeetingController.index')

/**
 * SubscriptionController routes.
 */
Route.post('subscribe', 'SubscriptionController.store')
