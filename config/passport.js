const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({nameId: profile.id})
      .then(currentUser => {
        if (currentUser) {
          done(null, currentUser)
        } else {
          const user = new User()
          user.nameId = profile.id
          user.name = profile.displayName
          user.admin = false
          user.save().then(newUser => {
            done(null, newUser)
          })
        }
      })
      .catch(e => console.error('greskakakaka', e))
  })
)

module.exports = passport
