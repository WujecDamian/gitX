import passport from "passport";
import { Strategy as GitHubStrategy, type Profile } from "passport-github2";
import dotenv from "dotenv";
dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
passport.use(
  new GitHubStrategy(
    {
      // TypeScript requires explicit casting since process.env variables can technically be undefined
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
    },
    // Adding official type bindings to the verify callback function arguments
    function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void,
    ) {
      // Passes the profile metadata cleanly along to your callback router
      return done(null, profile);
    },
  ),
);
