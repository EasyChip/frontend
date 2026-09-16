'use client'

import { useCallback, useRef } from 'react'
import AmbientVideo from './AmbientVideo'
import { cn } from '@/lib/utils'

interface VideoWindowProps {
  /** The full film, opened in the theater and linked when scripts are off. */
  src: string
  /** Still shown in the window, and behind the theater unless overridden. */
  poster: string
  /**
   * A different still for the theater. The hero needs one: its window poster is
   * a crop of the excerpt, which is right behind the chrome and meaningless
   * inside a player. A feature window's poster is a real frame of its own film,
   * so it serves both and this is omitted.
   */
  theaterPoster?: string
  /**
   * A silent excerpt that starts on its own. Omit for a still window - which is
   * the right default anywhere more than one of these shares a page, because
   * several autoplaying loops at once is noise, not evidence.
   */
  preview?: string
  /** Mono title bar text. */
  title: string
  /** Written into the status line, e.g. "1:03". */
  duration: string
  /** Accessible name for the theater dialog. */
  label: string
  /** Status line verb. */
  caption?: string
  /** On the light plate the outer edge inverts; the window interior does not. */
  light?: boolean
}

/**
 * A terminal window carrying a video, and the theater it opens.
 *
 * The window is an anchor pointing at the file, not a button, and that is the
 * no-JavaScript branch rather than a stylistic choice: this audience is on
 * managed corporate machines, and with scripts blocked the link still resolves
 * to a video the browser plays on its own. JavaScript upgrades it to the
 * overlay by cancelling the navigation.
 *
 * The overlay is a native <dialog>. showModal() supplies the focus trap, the
 * Esc handler, the top layer and the return of focus to the window on close -
 * four things that are tedious to write and easy to write wrongly.
 *
 * preload="none" keeps every film off the landing path. On /intelligence that
 * matters: five of these on one page would otherwise be 60MB of autoplay.
 */
export default function VideoWindow({
  src,
  poster,
  theaterPoster,
  preview,
  title,
  duration,
  label,
  caption = 'Watch the full demo',
  light = false,
}: VideoWindowProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const open = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const dialog = dialogRef.current
    // No dialog support, or a modified click the visitor meant for their
    // browser (new tab, save as): leave the anchor alone and let it navigate.
    if (!dialog || typeof dialog.showModal !== 'function') return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return
    }

    event.preventDefault()
    dialog.showModal()

    const video = videoRef.current
    if (!video) return
    // Always from the top. Each of these is a sequence with a brief at the
    // front, so resuming mid-way drops someone into an argument already running.
    video.currentTime = 0
    // Sound on: the click is the gesture that permits it. These films carry no
    // narration, but the keyboard foley is what makes a terminal recording feel
    // like a session rather than a screenshot.
    video.muted = false
    void video.play().catch(() => {})
  }, [])

  const close = useCallback(() => {
    dialogRef.current?.close()
  }, [])

  /** Stop and rewind whichever way it was dismissed - Esc, backdrop or control. */
  const reset = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }, [])

  /** Click on the surround, not on the picture. */
  const dismissFromBackdrop = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (event.target === event.currentTarget) close()
    },
    [close]
  )

  return (
    <>
      <a
        href={src}
        onClick={open}
        aria-label={`${caption}: ${label}, ${duration}`}
        className="group block w-full"
      >
        {/* 10px, not the 4px of bare media. The Three Corners Rule assigns 4px
            to media and bars and 10px to panels, and with chrome above and a
            readout below this is a panel that contains media rather than media
            itself. It stays inside the system's three values, which is what the
            rule actually protects.

            No shadow and no backdrop blur, which is what a real terminal window
            would carry: this system has neither, anywhere. The window separates
            by an opaque fill, one tonal step up to graphite in the title bar,
            and a hairline - the system's whole vocabulary for depth.

            Only the outer edge takes the light branch. The window interior stays
            dark on either ground, because a terminal is dark: inverting it would
            be inverting the content, not the chrome. */}
        <figure
          className={cn(
            'overflow-hidden rounded-[10px] border bg-near-black',
            light ? 'border-black/12' : 'border-[color:var(--hairline)]'
          )}
        >
          <div className="flex items-center gap-3 border-b border-[color:var(--hairline)] bg-graphite px-4 py-3">
            {/* The traffic lights, in grey. Red-amber-green is the one detail of
                the macOS window everyone pictures, and the one thing the No-Hue
                Rule cannot admit - three hues, in the corner, on a site whose
                whole argument is that emphasis is brightness. They read
                correctly monochrome because an unfocused macOS window greys them
                out anyway, so this is a real state, not a compromise. */}
            <span aria-hidden className="flex w-[41px] shrink-0 items-center gap-[7px]">
              <span className="h-[9px] w-[9px] rounded-full bg-gray-1 transition-colors duration-[120ms] ease-[var(--ease-out)] group-hover:bg-gray-2" />
              <span className="h-[9px] w-[9px] rounded-full bg-gray-1 transition-colors duration-[120ms] ease-[var(--ease-out)] group-hover:bg-gray-2" />
              <span className="h-[9px] w-[9px] rounded-full bg-gray-1 transition-colors duration-[120ms] ease-[var(--ease-out)] group-hover:bg-gray-2" />
            </span>

            {/* Centred the way a window title is, which needs the dots' own width
                mirrored on the right - otherwise "centre" is centred in what is
                left over, and sits visibly right of true. */}
            <span className="label-sm flex-1 text-center text-gray-1">{title}</span>
            <span aria-hidden className="w-[41px] shrink-0" />
          </div>

          <div className="relative aspect-video bg-black">
            {preview ? (
              <AmbientVideo src={preview} poster={poster} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={poster}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {/* Hover and focus lift the picture, they do not move it: this
                system's transitions touch colour and opacity only. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-black/25 transition-colors duration-[120ms] ease-[var(--ease-out)] group-hover:bg-black/0 group-focus-visible:bg-black/0"
            />
          </div>

          {/* The status line: the affordance on the left, the commitment on the
              right. Telling someone how long it runs before they click is what
              gets it watched to the end. */}
          <figcaption className="flex items-center justify-between gap-4 border-t border-[color:var(--hairline)] px-4 py-3">
            <span className="label inline-flex items-center gap-2.5 text-off-white transition-colors duration-[120ms] ease-[var(--ease-out)] group-hover:text-white">
              <span aria-hidden>▶</span>
              {caption}
            </span>
            <span className="label-sm text-gray-2">{duration}</span>
          </figcaption>
        </figure>
      </a>

      <dialog
        ref={dialogRef}
        onClose={reset}
        onClick={dismissFromBackdrop}
        className="theater"
        aria-label={label}
      >
        <div
          className="flex h-full w-full flex-col px-[var(--page-margin)] py-[22px]"
          onClick={dismissFromBackdrop}
        >
          <div className="mx-auto flex w-full max-w-[var(--page-max)] shrink-0 items-center justify-between gap-6">
            <span className="label text-gray-2">{label}</span>
            <button
              type="button"
              onClick={close}
              className="label inline-flex items-center gap-2 py-1 text-gray-2 transition-colors duration-[120ms] ease-[var(--ease-out)] hover:text-white"
            >
              Close
              <span aria-hidden>×</span>
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center py-6"
            onClick={dismissFromBackdrop}
          >
            <video
              ref={videoRef}
              controls
              playsInline
              preload="none"
              poster={theaterPoster ?? poster}
              className="h-auto max-h-full w-full max-w-[1280px] rounded-[4px] bg-black"
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        </div>
      </dialog>
    </>
  )
}
