/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes = [
  "/"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/home"