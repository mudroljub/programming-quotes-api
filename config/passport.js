const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) =>
  User.findById(id).then(user => done(null, user))
)

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    const email = `${profile._json.nickname}@gmail.com`
    User.findOne({ email })
      .then(currentUser => {
        if (currentUser) return done(null, currentUser)
        const user = new User({
          email,
          accessToken,
          name: profile.displayName,
          googleId: profile.id
        })
        user.save().then(newUser => done(null, newUser))
      })
      .catch(e => console.error('GoogleStrategy error', e))
  })
)

module.exports = passport
