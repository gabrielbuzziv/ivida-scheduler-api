'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    if (!(await User.findBy('email', 'gabrielbuzziv@gmail.com'))) {
      await User.create({
        username: 'gabrielbuzzi',
        email: 'gabrielbuzziv@gmail.com',
        password: '123456'
      })
    }

    if (!(await User.findBy('email', 'pastorthyago@gmail.com'))) {
      await User.create({
        username: 'prthyagomello',
        email: 'pastorthyago@gmail.com',
        password: '123456'
      })
    }
  }
}

module.exports = UserSeeder
