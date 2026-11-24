import officialHtml from '../data/officialHtml.json'

export default function Article({ slug }: { slug?: string }) {
  const html = officialHtml[slug as keyof typeof officialHtml]
  if (!html) return null
  return <main id="main" dangerouslySetInnerHTML={{ __html: html }} />
}
