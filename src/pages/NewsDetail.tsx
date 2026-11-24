import { Link, useParams } from 'react-router-dom'
import newsData from '../data/news.json'

export default function NewsDetail() {
  const { id } = useParams()

  const item = newsData.information_list.find((entry) => String(entry.announce_id) === id)

  if (!item) {
    return (
      <main id="main" className="error-page">
        <div className="error-page__inner">
          <h1>News Not Found</h1>
          <p>The news item you are looking for could not be found.</p>
          <Link to="/news/" className="button-link">Back to News</Link>
        </div>
      </main>
    )
  }

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      return d.toISOString().slice(0, 10).replace(/-/g, '/')
    } catch {
      return dateStr
    }
  }

  return (
    <main id="main" className="page-news-detail">
      <div className="news-detail-inner">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Top</Link>
          <span aria-hidden="true">&gt;</span>
          <Link to="/news/">News</Link>
          <span aria-hidden="true">&gt;</span>
          <span>{item.title}</span>
        </nav>

        <header className="news-detail__header">
          <h1 className="news-detail__title">{item.title}</h1>
          <div className="news-detail__meta">
            <time className="meta-post" dateTime={item.post_at}>
              Posted: {formatDate(item.post_at)}
            </time>
            {item.update_at && (
              <time className="meta-update" dateTime={item.update_at}>
                Updated: {formatDate(item.update_at)}
              </time>
            )}
          </div>
        </header>

        {item.image && (
          <div className="news-detail__cover">
            <img src={item.image} alt={item.title} />
          </div>
        )}

        <div
          className="article-box-like news-detail__content"
          dangerouslySetInnerHTML={{ __html: item.message || '<p>No details provided.</p>' }}
        />

        <div className="news-detail__back">
          <Link to="/news/" className="button-link">
            Back to News
          </Link>
        </div>
      </div>
    </main>
  )
}
