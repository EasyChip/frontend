import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import ScrollProgress from '@/components/layout/ScrollProgress'

/** Marketing-site chrome. Auth/app routes live outside this group.
    Kept deliberately quiet: no floating CTA - the navbar carries it. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <div aria-hidden className="film-grain" />
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  )
}
