import passport from "passport";
import { Strategy as GitHubStrategy, type Profile } from "passport-github2";
import { prisma } from "../lib/prisma";
import { type User as prismaUser } from "../generated/prisma/client";
import dotenv from "dotenv";
dotenv.config();

//serialization happens on Login (once on login!!)
passport.serializeUser(function (user, done) {
  //for performance & security
  //store only userId
  const localUser = user as prismaUser;
  done(null, localUser.id);
});

//on every request browser sends session cookie to server
//deserializeUser take the id and fetches full user here
passport.deserializeUser(async function (id: string, done) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
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
    async function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void,
    ) {
      //save user in database!!! (on login) (upsert = update or create)
      const user = await prisma.user.upsert({
        where: { github_id: profile.id },
        update: { display_name: profile.displayName },
        create: {
          github_id: profile.id,
          display_name: profile.displayName,
          email: profile.emails?.[0]?.value ?? null,
        },
      });
      // Passes the profile metadata cleanly along to your callback router
      return done(null, user);
    },
  ),
);
