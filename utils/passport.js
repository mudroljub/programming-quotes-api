import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import User from '../models/User.js'

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) =>
  User.findById(id).then(user => done(null, user))
)

const findOrCreateUser = (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value
  User.findOne({ email })
    .then(currentUser => {
      if (currentUser) return done(null, currentUser)
      const user = new User({
        name: profile.displayName,
        email,
        accessToken,
      })
      user.save().then(newUser => done(null, newUser))
    })
    .catch(e => console.error('Auth error', e))
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/redirect',
  scope: ['profile', 'email']
}, findOrCreateUser))

/*
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  // callbackURL: '/auth/github/redirect',
  scope: ['user:email'],
}, findOrCreateUser))
*/

export passport
