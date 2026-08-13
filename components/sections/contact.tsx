import { Reveal } from '@/components/motion/reveal'
import { Section } from '@/components/ui/section'
import { type Locale, resumeHref } from '@/lib/i18n'
import { site } from '@/lib/site'

interface ContactProps {
  title: string
  message: string
  resumeLabel: string
  locale: Locale
}

export function Contact({ title, message, resumeLabel, locale }: ContactProps) {
  return (
    <Section id="contact" title={title} index="06">
      <Reveal>
        <div className="border-ac bg-surface border px-7 py-9 text-center">
          <p className="text-fg mx-auto mb-5.5 max-w-[560px] text-[15px] leading-relaxed">
            {message}
          </p>

          <ul className="inline-flex list-none flex-wrap justify-center gap-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="border-ac text-ac hover:bg-ac hover:text-bg border px-4.5 py-2.5 text-[13px] font-bold transition-colors"
              >
                @ {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border text-fg-dim hover:border-ac hover:text-ac border px-4.5 py-2.5 text-[13px] font-bold transition-colors"
              >
                [ linkedin ]
              </a>
            </li>
            <li>
              <a
                href={resumeHref(locale)}
                target="_blank"
                rel="noopener"
                className="border-border text-fg-dim hover:border-ac hover:text-ac border px-4.5 py-2.5 text-[13px] font-bold transition-colors"
              >
                ↓ {resumeLabel}
              </a>
            </li>
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
