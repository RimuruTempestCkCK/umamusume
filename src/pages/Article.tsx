import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import officialHtml from '../data/officialHtml.json'

interface ArticleProps {
  slug?: string
}

export default function Article({ slug }: ArticleProps) {
  if (!slug) return null

  // If structured article data exists in src/data/articles.ts, render cleanly as JSX
  const article = articles[slug]

  if (article) {
    return (
      <main id="main" className={`page-article page-article--${slug}`}>
        <div className="article-container">
          <header className="article-header">
            <h1 className="article-title">{article.title}</h1>
            {article.lead && <p className="article-lead">{article.lead}</p>}
          </header>

          <div className="article-body">
            {article.sections.map((section, idx) => (
              <section key={idx} className="article-section">
                {section.heading && <h2 className="article-heading">{section.heading}</h2>}
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="article-paragraph">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="article-footer-nav">
            <Link to="/" className="button-back-top">
              Back to Top
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Fallback to officialHtml if slug is not yet in articles.ts
  const html = officialHtml[slug as keyof typeof officialHtml]
  if (html) {
    return <main id="main" dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <main id="main" className="error-page">
      <div className="error-page__inner">
        <h1>Article Not Found</h1>
        <p>The requested page content is currently unavailable.</p>
        <Link to="/" className="button-link">Back to Home</Link>
      </div>
    </main>
  )
}
