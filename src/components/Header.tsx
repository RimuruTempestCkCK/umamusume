import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks, socialLinks, storeLinks } from '../data/site'
import PlayNowModal from './PlayNowModal'

type NavItemsProps = {
  onNavigate?: () => void
}

function NavItems({ onNavigate }: NavItemsProps) {
  return (
    <>
      {navLinks.map((link) =>
        link.external ? (
          <li key={link.label}>
            <a href={link.to} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
              <p>{link.label}</p>
            </a>
          </li>
        ) : (
          <li key={link.label}>
            <NavLink to={link.to} end={link.to === '/'} onClick={onNavigate}>
              <p>{link.label}</p>
            </NavLink>
          </li>
        ),
      )}
    </>
  )
}

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [playNowOpen, setPlayNowOpen] = useState(false)
  const isTopPage = location.pathname === '/' || location.pathname === ''
  const [isLarge, setIsLarge] = useState(true)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('is-fixed', menuOpen)
    return () => document.body.classList.remove('is-fixed')
  }, [menuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const threshold = Math.min(window.innerWidth, 2000) * -0.07
      const main = document.querySelector('main')
      if (main) {
        setIsLarge(main.getBoundingClientRect().top > threshold)
      } else {
        setIsLarge(window.scrollY < 100)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const logoClasses = `-logo${isTopPage ? ' is-top' : ''}${isLarge ? ' is-large' : ''}`

  return (
    <>
      <div id="umamusume-en-header">
        <header className={`umamusume-en-header${menuOpen ? ' is-menu-open' : ''}`}>
          <div className="header__wrapper">
            <Link id="js-logo" to="/" className={logoClasses} onClick={() => setMenuOpen(false)}>
              <div className="-logo-img">
                <img src="/assets/icons/logo_umamusume.png" alt="Umamusume: Pretty Derby" />
              </div>
            </Link>
            <div className="is-PC">
              <nav aria-label="Main navigation">
                <ul>
                  <NavItems onNavigate={() => setMenuOpen(false)} />
                  <li className="playnow">
                    <a
                      href="#"
                      className="js-c-modal-parts"
                      data-modal-type="others"
                      data-target="playnow"
                      onClick={(event) => {
                        event.preventDefault()
                        setPlayNowOpen(true)
                      }}
                    >
                      <p>Play Now!</p>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="is-SP">
              <button
                id="js-btn-menu"
                type="button"
                className="btn-menu"
                aria-expanded={menuOpen}
                aria-controls="js-header-nav"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <div className="-teitetsu">
                  <img src="/assets/icons/teitetsu.svg" alt="" />
                </div>
                <p className="close-text">Close</p>
                <p className="open-text">Menu</p>
              </button>
            </div>
          </div>
          <div id="js-header-nav" className="header__nav">
            <nav aria-label="Mobile navigation">
              <ul>
                <NavItems onNavigate={() => setMenuOpen(false)} />
              </ul>
            </nav>
            <div className="playnow">
              <button type="button" className="playnow__left" onClick={() => setPlayNowOpen(true)}>
                <span className="playnow-label"><p>Play Now!</p></span>
                <img className="-app-icon" src="/assets/icons/app_icon.png" alt="" />
              </button>
              <ul className="store-list">
                {storeLinks.map((store) => (
                  <li key={store.key}>
                    <a href={store.url} target="_blank" rel="noopener noreferrer">
                      <img className="-badge" src={store.icon} alt={store.alt} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="sns">
              <dt>Official<br />Social Media</dt>
              <dd>
                {socialLinks.map((social) => (
                  <a key={social.label} className={social.className} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <img src={social.icon} alt={social.label.toLowerCase()} />
                  </a>
                ))}
              </dd>
            </dl>
          </div>
          <div className="header__bg">
            <picture>
              <source media="(min-width: 899.98px)" srcSet="/assets/icons/bg_blue_pc.jpg" />
              <img src="/assets/icons/bg_blue_sp.jpg" alt="" />
            </picture>
          </div>
        </header>
      </div>
      <PlayNowModal isOpen={playNowOpen} onClose={() => setPlayNowOpen(false)} />
    </>
  )
}
