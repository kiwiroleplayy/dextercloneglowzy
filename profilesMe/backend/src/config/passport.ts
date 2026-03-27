import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { supabase } from './database';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in Supabase
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('google_id', profile.id)
          .single();

        if (existingUser) {
          return done(null, existingUser);
        }

        // If user does not exist, create a new user
        const { data: newUser } = await supabase
          .from('users')
          .insert({
            google_id: profile.id,
            email: profile.emails![0].value,
            name: profile.displayName,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        return done(null, newUser);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('google_id', id)
      .single();
    done(null, user || null);
  } catch (error) {
    done(error, null);
  }
});
