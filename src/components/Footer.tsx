import { useEffect } from 'react'
import officialFooter from '../data/officialFooter.json'

export default function Footer() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target?.closest('.btn-gotop')) return
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <footer
      id="umamusume-en-footer"
      className="umamusume-en-footer"
      dangerouslySetInnerHTML={{ __html: officialFooter.html }}
    />
  )
}
