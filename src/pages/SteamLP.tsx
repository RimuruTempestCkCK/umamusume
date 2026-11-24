import { useEffect } from 'react'
import officialHtml from '../data/officialHtml.json'

export default function SteamLP() {
  useEffect(() => {
    document.body.classList.add('page-promotion-steam_lp')
    return () => document.body.classList.remove('page-promotion-steam_lp')
  }, [])

  const html = officialHtml.steam
  return <main id="main" dangerouslySetInnerHTML={{ __html: html }} />
}
