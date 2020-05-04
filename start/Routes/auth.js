'use strict'

const Route = use('Route')

Route.group(() => {})
  .prefix('admin')
  .namespace('Admin')
  .middleware(['auth'])
