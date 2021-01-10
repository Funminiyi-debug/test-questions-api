const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

const initialize = (passport) => {
  const verifyPassword = async (password, user) => {
    return await bcrypt.compare(password, user.password);
  };
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      function (email, password, done) {
        User.findOne({ email: email }, async function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          const passwordValid = await verifyPassword(password, user);
          if (!passwordValid) {
            return done(null, false);
          }
          return done(null, user);
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = initialize;
