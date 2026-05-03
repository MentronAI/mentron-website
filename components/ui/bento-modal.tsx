"use client"

import React from "react"
import * as Dialog from "@radix-ui/react-dialog"

export interface BentoModalContent {
  title: string
  description: string
  benefits: string[]
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string; onClick?: () => void }
  mockup?: React.ReactNode
  secondaryMockup?: React.ReactNode
  relatedFeatures?: {
    title: string
    description: string
    href: string
    linkText: string
    graphic: React.ReactNode
  }[]
}

interface BentoModalProps {
  isOpen: boolean
  onClose: () => void
  content: BentoModalContent | null
  mockup?: React.ReactNode
  secondaryMockup?: React.ReactNode
  relatedFeatures?: BentoModalContent["relatedFeatures"]
  triggerRef?: React.RefObject<HTMLElement | null>
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="#0077FF" />
      <path
        fill="white"
        fillRule="evenodd"
        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m4.28-9.72a.75.75 0 1 0-1.06-1.06L7 9.44 5.03 7.47a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function ArrowIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M0.5 5.5h7" />
      <path d="M1.5 1.5l4 4-4 4" />
    </svg>
  )
}

export function BentoModal({
  isOpen,
  onClose,
  content,
  mockup,
  secondaryMockup,
  relatedFeatures,
}: BentoModalProps) {
  if (!content) return null

  const features = relatedFeatures ?? content.relatedFeatures
  const secondary = secondaryMockup ?? content.secondaryMockup

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[8px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200"
        />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[60] w-[calc(100%-32px)] max-w-[1100px] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white focus:outline-none data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:fade-out-0 data-[state=closed]:duration-200"
          style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          {/* Close button */}
          <Dialog.Close className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Dialog.Close>

          {/* Header: 2-column grid */}
          <div className="p-6 sm:p-8 pb-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* Left column: title + description + CTAs */}
              <div className="md:col-span-7">
                <Dialog.Title className="text-2xl font-bold text-slate-900 pr-8">
                  {content.title}
                </Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-slate-500 leading-relaxed pr-4 max-w-[50ch]">
                  {content.description}
                </Dialog.Description>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={content.ctaPrimary.href}
                    className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all inline-flex items-center gap-1.5"
                  >
                    {content.ctaPrimary.label}
                    <ArrowIcon />
                  </a>
                  {content.ctaSecondary.onClick ? (
                    <button
                      onClick={content.ctaSecondary.onClick}
                      className="text-sm font-semibold text-slate-500 hover:text-primary py-2.5 px-4 transition-colors"
                    >
                      {content.ctaSecondary.label}
                    </button>
                  ) : (
                    <a
                      href={content.ctaSecondary.href}
                      className="text-sm font-semibold text-slate-500 hover:text-primary py-2.5 px-4 transition-colors"
                    >
                      {content.ctaSecondary.label}
                    </a>
                  )}
                </div>
              </div>

              {/* Right column: benefits with styled checkmarks */}
              <div className="md:col-span-5">
                <ul className="space-y-2.5">
                  {content.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 shrink-0"><CheckIcon /></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Graphics container */}
          {(mockup || secondary) && (
            <div className="relative mt-6 mx-6 sm:mx-8 rounded-xl overflow-hidden" style={{ backgroundColor: "#f8fafd" }}>
              {/* Gradient orbs */}
              <div
                className="absolute w-[60%] aspect-square rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(50% 50%, rgba(0,119,255,0.15) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  top: "-20%",
                  left: "10%",
                }}
              />
              <div
                className="absolute w-[40%] aspect-square rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(50% 50%, rgba(102,94,253,0.1) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  bottom: "-10%",
                  right: "5%",
                }}
              />

              {/* Graphics grid */}
              <div className="relative z-[1] grid gap-4 p-6" style={{ gridTemplateColumns: secondary ? "7fr 5fr" : "1fr" }}>
                {mockup && (
                  <div className="rounded-lg bg-white p-6 border border-slate-100" style={secondary ? { aspectRatio: "1/1" } : undefined}>
                    {mockup}
                  </div>
                )}
                {secondary && (
                  <div className="rounded-lg bg-white p-4 border border-slate-100 flex flex-col gap-3">
                    {secondary}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* More to discover */}
          {features && features.length > 0 && (
            <>
              <div className="w-full h-px bg-slate-100 my-6" />
              <div className="px-6 sm:px-8">
                <h4 className="text-base font-semibold text-slate-900 mb-4">More to discover</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {features.map((feature) => (
                    <div key={feature.title} className="rounded-lg border border-slate-100 overflow-hidden">
                      <div className="aspect-[0.93/1] bg-[#f8fafd] p-4 flex items-center justify-center">
                        {feature.graphic}
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-slate-500">{feature.description}</p>
                        <a
                          href={feature.href}
                          className="mt-2 text-sm font-semibold text-primary inline-flex items-center gap-1"
                        >
                          {feature.linkText}
                          <ArrowIcon />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Footer */}
          <>
            <div className="w-full h-px bg-slate-100 my-6" />
            <div className="pb-6 sm:pb-8 flex flex-col items-center gap-4">
              <span className="text-base font-semibold text-slate-900">Get started with Mentron</span>
              <div className="flex gap-3">
                <a
                  href="/institutional-demo"
                  className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-2.5 px-5 rounded-lg inline-flex items-center gap-1.5"
                >
                  Get Early Access
                  <ArrowIcon />
                </a>
                <a
                  href="#integrations"
                  className="text-sm font-semibold text-slate-500 hover:text-primary py-2.5 px-4 transition-colors"
                >
                  See integrations
                </a>
              </div>
            </div>
          </>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
