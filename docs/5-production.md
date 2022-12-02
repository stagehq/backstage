# Production

## Hosting

You can host your Bedrock-powered app at **any hosting provider that supports Next.js API routes**. I've personally used [Vercel](https://vercel.com), but [Netlify](https://netlify.com) and others should also work.

The same thing goes for your PostgreSQL instance: you can host that at any database hosting provider you prefer. A manual AWS EC2 setup, [Heroku](https://heroku.com), [Compose](https://compose.com), it doesn't matter as long as **you have a database connection URL** at the end everything should work.

## Environment variables

The main thing you need to do to deploy your app is set the correct environment variables. Set all the env vars in `.env.example` to their production equivalents at your app's hosting provider.

### Database migrations in CI

CI runs any new database migrations against your production database on every push to your main/master branch. (see `.github/workflows/migrate.yml`) In order for that to work, you have to **set the DATABASE_URL environment variable in GitHub Actions** to your production database URL!
