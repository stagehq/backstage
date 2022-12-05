export { default } from "next-auth/middleware"

/* TODO: Check if all routes are defined here for unauthenticated users */
export const config = { matcher: ["/", "/discover/:path*", "/workspace/:path*", "/profile/:path*"] }

