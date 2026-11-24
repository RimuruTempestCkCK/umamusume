import { useEffect } from 'react'
import officialHtml from '../data/officialHtml.json'

export default function Characters() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.characters-list-thumb'))
    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-show')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -5% 0px',
        threshold: 0.05,
      },
    )

    cards.forEach((card) => {
      if (!card.classList.contains('is-show')) {
        observer.observe(card)
      }
    })

    return () => observer.disconnect()
  }, [])

  return <main id="main" dangerouslySetInnerHTML={{ __html: officialHtml.characters }} />
}

