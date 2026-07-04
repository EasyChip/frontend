import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import ScrollProgress from '@/components/layout/ScrollProgress'
import FloatingCta from '@/components/layout/FloatingCta'

/** Marketing-site chrome. Auth/app routes live outside this group. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <div aria-hidden className="film-grain" />
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-dvh">{children}</main>
      <FloatingCta />
      <Footer />
    </>
  )
}
