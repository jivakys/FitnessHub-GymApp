const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "37480018286-3pfifhmn1iek7ae9qbjm2cvp4fkk505o.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3456/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      return cb(null, "user");
    }
  )
);

module.exports = { passport };
