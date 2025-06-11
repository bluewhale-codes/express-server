const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

passport.use(new GoogleStrategy({
  clientID: '1098521023893-mars59uedpf7i00ihs3ucf340032v6tm.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create user in DB here

  const existingUser = await User.findOne({ googleId: profile.id });
   if (existingUser) {
    return done(null, existingUser);
   }
   const user = await User.create({
    fullName: profile.displayName,
    email: profile.emails[0].value,
    googleId: profile.id,
    provider: 'google',
  });
  // const user = {
  //   googleId: profile.id,
  //   name: profile.displayName,
  //   email: profile.emails[0].value,
  //   avatar: profile.photos[0].value,
  // };
  return done(null, user);
}));

// Serialize and deserialize user for session support
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
