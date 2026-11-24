import { Link } from 'react-router-dom'
import { defaultFooterConfig, type FooterConfig } from '../data/footerConfig'

interface FooterProps {
  config?: Partial<FooterConfig>
}

export default function Footer({ config }: FooterProps) {
  const currentConfig: FooterConfig = {
    ...defaultFooterConfig,
    ...config,
    downloadSection: {
      ...defaultFooterConfig.downloadSection,
      ...config?.downloadSection
    },
    socialMedia: {
      ...defaultFooterConfig.socialMedia,
      ...config?.socialMedia
    },
    copyright: {
      ...defaultFooterConfig.copyright,
      ...config?.copyright
    }
  }

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { showBackToTop, downloadSection, socialMedia, navLinks, copyright } = currentConfig

  return (
    <footer id="umamusume-en-footer" className="umamusume-en-footer">
      {/* Back to Top Button */}
      {showBackToTop && (
        <a href="#" onClick={scrollToTop} className="btn-gotop is-PC js-c-scroll-parts" aria-label="Back to Top">
          <img src="https://parts.umamusume.com/assets/images/btn_to-top.CRbv8WQ1.svg" alt="" />
        </a>
      )}

      {/* Download Section */}
      {downloadSection.enabled && (
        <div className="footer__download">
          <div className="footer__download--box">
            <div className="grid1">
              <div className="-download-title">{downloadSection.title}</div>
              {downloadSection.appIcon && (
                <img src={downloadSection.appIcon} className="-app-icon" alt="" />
              )}
            </div>

            <ul className="store-list grid2">
              {downloadSection.stores.map((store) => (
                <li key={store.name}>
                  <a href={store.href} target="_blank" rel="noopener noreferrer">
                    <img src={store.badgeImage} alt={store.name} className="-badge" />
                  </a>
                </li>
              ))}
            </ul>

            {downloadSection.notes.length > 0 && (
              <ul className="store-notes grid3">
                {downloadSection.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Blue Background Pattern */}
          <picture>
            <source media="(min-width: 899.98px)" srcSet="https://parts.umamusume.com/assets/images/bg_blue.CVGWJ7fP.jpg" />
            <img src="https://parts.umamusume.com/assets/images/bg_blue.CTN6vPsz.jpg" className="pattern-bg" alt="" />
          </picture>
        </div>
      )}

      {/* Footer Wrapper */}
      <div className="footer__wrapper">
        {/* Social Media Links */}
        {socialMedia.enabled && (
          <dl className="footer__sns">
            <dt>{socialMedia.title}</dt>
            <dd>
              {socialMedia.links.map((sns) => (
                <a
                  key={sns.name}
                  href={sns.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={sns.className}
                  aria-label={sns.name}
                >
                  <img src={sns.icon} alt={sns.name} />
                </a>
              ))}
            </dd>
          </dl>
        )}

        {/* Footer Nav Links */}
        <div className="footer__nav">
          <ul>
            {navLinks.map((item) => {
              const isExternal = item.isExternal || item.href.startsWith('http')
              return (
                <li key={item.label}>
                  {isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={item.className}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className={item.className}>
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Copyright and Company Logo */}
        <div className="footer__copy">
          {copyright.logoUrl && (
            <a
              href={copyright.logoLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="-cygames"
            >
              <img src={copyright.logoUrl} alt={copyright.logoAlt || 'Company Logo'} />
            </a>
          )}

          {copyright.companyText && <p className="-text">{copyright.companyText}</p>}

          {copyright.copyrightImage ? (
            <img
              src={copyright.copyrightImage}
              alt={copyright.copyrightText || 'Copyright'}
              className="-copy"
            />
          ) : (
            <p className="-copy" style={{ color: '#8d7f8a', fontSize: '12px' }}>
              {copyright.copyrightText}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
