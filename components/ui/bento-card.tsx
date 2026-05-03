"use client"

import { useRef } from "react"
import { useInView } from "@/lib/hooks/use-in-view"

interface OrbColors {
  orb1: string
  orb2: string
}

interface BentoCardProps {
  isLarge?: boolean
  orbColors: OrbColors
  title: string
  maxTitleWidth?: string
  children?: React.ReactNode
  onClick?: () => void
  triggerRef?: React.RefObject<HTMLElement | null>
  className?: string
}

export function BentoCard({
  isLarge = false,
  orbColors,
  title,
  maxTitleWidth,
  children,
  onClick,
  triggerRef,
  className = "",
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { ref: inViewRef, inView } = useInView(0.1)

  const titleMaxWidth = maxTitleWidth ?? (isLarge ? "42ch" : "21ch")

  const orbSize1 = isLarge ? "70%" : "50%"
  const orbSize2 = isLarge ? "50%" : "35%"
  const orbOpacity1 = isLarge ? 0.12 : 0.08
  const orbOpacity2 = isLarge ? 0.08 : 0.05

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick?.()
    }
  }

  const setRefs = (node: HTMLDivElement | null) => {
    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    ;(inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    if (triggerRef) {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node
    }
  }

  return (
    <div
      ref={setRefs}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group
        ${isLarge ? "md:col-span-8 md:row-span-2" : "md:col-span-4"}
        transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
        ${className}`}
      onClick={() => {
        if (triggerRef) {
          (triggerRef as React.MutableRefObject<HTMLElement | null>).current = cardRef.current
        }
        onClick?.()
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      style={{ contain: "layout style paint" }}
    >
      {/* Gradient border layer */}
      <div
        className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${orbColors.orb1}, ${orbColors.orb2} 33%, rgba(0,0,0,0.06) 66%)`,
          zIndex: 0,
        }}
      />

      {/* Inner card content */}
      <div className="relative bg-white rounded-2xl z-[1] h-full" style={{ padding: "32px" }}>
        {/* Gradient orb 1 */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orbSize1,
            aspectRatio: "1",
            background: `radial-gradient(50% 50%, ${orbColors.orb1}${Math.round(orbOpacity1 * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
            filter: inView ? "blur(30px)" : "none",
            top: "-15%",
            right: "-10%",
            willChange: "transform",
            transition: "filter 0.5s ease-out",
          }}
        />
        {/* Gradient orb 2 */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orbSize2,
            aspectRatio: "1",
            background: `radial-gradient(50% 50%, ${orbColors.orb2}${Math.round(orbOpacity2 * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
            filter: inView ? "blur(25px)" : "none",
            bottom: "-10%",
            left: "-5%",
            willChange: "transform",
            transition: "filter 0.5s ease-out",
          }}
        />

        {/* Title — absolute on desktop, flow on mobile */}
        <h3
          className={`font-bold text-slate-900 z-[3] relative
            ${isLarge ? "text-xl" : "text-lg"}`}
          style={{ maxWidth: titleMaxWidth, textWrap: "balance" }}
        >
          {title}
        </h3>

        {/* Mockup / children */}
        {children && <div className="relative z-[2] mt-4">{children}</div>}

        {/* Expand button — top-right */}
        <div
          className="absolute top-4 right-4 w-[38px] h-[38px] z-10 flex items-center justify-center rounded-full group-hover:bg-slate-100/80 transition-colors pointer-events-none min-w-[44px] min-h-[44px]"
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M13.75 6.75L10.25 6.75L10.25 5L15.5 5L15.5 10.25L13.75 10.25L13.75 6.75Z"
              fill="#0077FF"
              className="transition-transform duration-[600ms] group-hover:rotate-180"
              style={{ transformOrigin: "12.75px 7.625px" }}
            />
            <path
              d="M6.75 10.25L5 10.25L5 15.5L10.25 15.5L10.25 13.75L6.75 13.75L6.75 10.25Z"
              fill="#0077FF"
              className="transition-transform duration-[600ms] group-hover:rotate-180"
              style={{ transformOrigin: "7.625px 12.875px" }}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
