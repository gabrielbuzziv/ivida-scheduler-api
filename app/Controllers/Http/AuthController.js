'use strict'

const User = use('App/Models/User')

class AuthController {
  async store ({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password'])

    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findByOrFail('email', email)
        const jwt = await auth.generate(user)

        return { token: jwt.token, user }
      }
    } catch (err) {
      console.log(err)

      return response.status(err.status).send({
        error: { message: 'Não foi possível efetuar o login.' }
      })
    }
  }
}

module.exports = AuthController
