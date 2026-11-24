import officialHtml from '../data/officialHtml.json'

export default function News() {
  return <main id="main" dangerouslySetInnerHTML={{ __html: officialHtml.news }} />
}
