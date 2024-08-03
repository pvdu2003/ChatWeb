const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const User = require("../models/users.model.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/redirect`,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            const newUser = new User({
              username: profile.displayName.replace(/\s/g, "").toLowerCase(),
              full_name: profile.displayName,
              email: profile.emails[0].value,
              gender: "male",
              avatar: profile.photos[0].value,
            });
            newUser
              .save()
              .then((user) => {
                done(null, user);
              })
              .catch((err) => {
                done(err, null);
              });
          }
        })
        .catch((err) => {
          done(err, null);
        });
    }
  )
);
