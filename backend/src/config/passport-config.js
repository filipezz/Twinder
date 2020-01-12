const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const keys = require("./keys");
const Dev = require("../models/Dev");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Dev.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.TWITTER_CONSUMER_KEY,
      consumerSecret: keys.TWITTER_CONSUMER_SECRET,
      includeEmail: true,
      callbackURL: "/auth/twitter/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      Dev.findOne({ user: profile.username }).then(user => {
        if (user) {
          done(null, user);
        } else {
          const bigProfilePic = profile._json.profile_image_url.replace(
            "_normal",
            ""
          );
          Dev.create({
            user: profile.username,
            name: profile.displayName,
            bio: profile._json.description,
            avatar: bigProfilePic
          }).then(newUser => {
            done(null, newUser);
          });
        }
      });
    }
  )
);
