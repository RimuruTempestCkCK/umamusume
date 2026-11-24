import officialHtml from '../data/officialHtml.json'

export default function Media() {
  return <main id="main" dangerouslySetInnerHTML={{ __html: officialHtml.media }} />
}
