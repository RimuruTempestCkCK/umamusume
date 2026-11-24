import { Link, useParams } from 'react-router-dom'
import newsData from '../data/news.json'
import officialHtml from '../data/officialHtml.json'

export default function NewsDetail() {
  const { id } = useParams()

  if (id === '100122') {
    return <main id="main" dangerouslySetInnerHTML={{ __html: officialHtml['news-100122'] }} />
  }

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
        <h1 className="news-detail__title">{item.title}</h1>
        <p className="news-detail__meta">
          <span>Posted: {item.post_at}</span>
          {item.update_at && <span>Updated: {item.update_at}</span>}
        </p>
        <div className="article-box-like" dangerouslySetInnerHTML={{ __html: item.message }} />
        <Link to="/news/" className="button-link">Back to News</Link>
      </div>
    </main>
  )
}
