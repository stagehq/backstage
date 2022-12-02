# Authentication

Bedrock uses [Passport](https://passportjs.org) for authentication. By default, it ships with the [passport-magic-login](https://github.com/mxstbr/passport-magic-login) strategy but you can use any of [the 500+ strategies](http://www.passportjs.org/packages/) that Passport supports (like Google, Facebook, Twitter, etc. authentication).

## Magic login authentication

The reason Bedrock ships with magic login authentication by default is twofold:

1. **No password storage necessary**, which removes a lot of stressful security overhead
2. **It works with deploy previews**, which many standard OAuth authentication providers don't because e.g. Facebook & Google make you hard-code a whitelist of callback URLs

Here's how users authenticate:

1. They visit `/login` or `/signup` and enter their email
2. We POST their email to `/api/auth/magiclogin`, which sends them a login link (in development Bedrock logs emails to the console)
3. We redirect the user to `/check-your-mailbox`, which prompts them to check their inbox and verify the security code
4. They click on the link in their inbox, which goes to `/api/auth/magiclogin/callback?token=<random_token>`
5. Passport sets the session and signed session cookies in their browser and we redirect them to the app at `/app`

At this point we can access the user data at `req.user` in API routes and fetch the current user data on the frontend via the `{ currentUser { id } }` GraphQL query!

> NOTE: The reason Bedrock has both /login and /signup even though they're the same authentication code is because /signup is a great place for a little bit of extra marketing (like a testimonial) to get people over the hurdle of signing up

## Why stateless authentication?

There are two broad types of authentication:

- **Stateful authentication** stores a _session_ in the database every time a user authenticates
- **Stateless authentication** does not store anything anywhere, but adds the user data to the session cookie

The tradeoff between them is:

- Stateful authentication requires a database query on every request.
- Stateless authentication only does a database query when the user authenticates.
- Stateful authentication allows you (or your users) to revoke sessions.
- You cannot revoke sessions with stateless authentication.

At Spectrum, I initially implemented stateful authentication but it started affecting our performance too much since it's overhead on every request and we were hammering our database unnecessarily.

Switching to stateless authentication made scaling a lot easier, and we never even revoked a session or implemented that for users while we had stateful authentication.

I've used stateless authentication ever since, hence why it's in Bedrock as well!
