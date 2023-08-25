let UserModel = require("./models/userModel");
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "761243222092-k07bsrigbpuo1trj04iql0q6mmsar0pr.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4051/user/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    
    // const user = new UserModel({name:profile._json.name,email:profile._json.email,password:"123"});
    // await user.save()
    return cb(null, "user");
  }
));

module.exports={passport};