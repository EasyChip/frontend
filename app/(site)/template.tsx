/**
 * Route-entrance: a clean deposit (fade + settle) on every navigation.
 *
 * This is the single most important place in the app to get right. It wraps
 * the entire contents of every marketing route, and it used to be a
 * framer-motion component whose `initial` state put `opacity: 0` on that
 * wrapper in the server HTML - so until React hydrated, every page on the site
 * was a blank column below the navbar, and it stayed blank if hydration never
 * finished. Next remounts a template on each navigation, so `@starting-style`
 * gives the same per-route entrance with the finished state as the default.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="reveal-rise">{children}</div>
}
