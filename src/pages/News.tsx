import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import newsData from '../data/news.json'

interface NewsItem {
  announce_id: number
  title: string
  message?: string
  post_at: string
  update_at: string | null
  announce_label: number
  image?: string
}

const ITEMS_PER_PAGE = 10

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'game' | 'media'>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const allNews = newsData.information_list as NewsItem[]

  // Filter based on category
  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') return allNews
    if (selectedCategory === 'game') return allNews.filter((item) => item.announce_label === 1)
    if (selectedCategory === 'media') return allNews.filter((item) => item.announce_label === 2)
    return allNews
  }, [allNews, selectedCategory])

  const visibleNews = filteredNews.slice(0, visibleCount)
  const hasMore = visibleCount < filteredNews.length

  const handleCategoryChange = (cat: 'all' | 'game' | 'media') => {
    setSelectedCategory(cat)
    setVisibleCount(ITEMS_PER_PAGE)
    setIsDropdownOpen(false)
  }

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
  }

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      const year = d.getUTCFullYear()
      const month = String(d.getUTCMonth() + 1).padStart(2, '0')
      const day = String(d.getUTCDate()).padStart(2, '0')
      const hours = String(d.getUTCHours()).padStart(2, '0')
      const mins = String(d.getUTCMinutes()).padStart(2, '0')
      return `${year}/${month}/${day} ${hours}:${mins} (UTC)`
    } catch {
      return dateStr
    }
  }

  const getCategoryName = (label: number) => {
    switch (label) {
      case 1:
        return 'Game'
      case 2:
        return 'Media'
      default:
        return 'Game'
    }
  }

  return (
    <main id="main">
      <div className="page -NEWS svelte-ftganx">
        {/* Page Head */}
        <div className="page__head">
          <h2 className="page__title svelte-ftganx">
            <p className="ttl svelte-ftganx">News</p>
          </h2>
        </div>

        <section className="news svelte-rnlpst">
          {/* News Category Tabs & Dropdown */}
          <div className="news-category">
            {/* Desktop Tabs */}
            <ul className="news-category__tab svelte-14noguc">
              <li>
                <button
                  type="button"
                  className={`svelte-14noguc ${selectedCategory === 'all' ? 'selected' : ''}`}
                  onClick={() => handleCategoryChange('all')}
                >
                  <p>All News</p>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`svelte-14noguc ${selectedCategory === 'game' ? 'selected' : ''}`}
                  onClick={() => handleCategoryChange('game')}
                >
                  <p>Game</p>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`svelte-14noguc ${selectedCategory === 'media' ? 'selected' : ''}`}
                  onClick={() => handleCategoryChange('media')}
                >
                  <p>Media</p>
                </button>
              </li>
            </ul>

            {/* Mobile Dropdown Listbox */}
            <div className="news-category__listbox svelte-14noguc">
              <div className={`listbox svelte-14noguc ${isDropdownOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="listbox-button svelte-14noguc"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <p className="svelte-14noguc">
                    {selectedCategory === 'all'
                      ? 'All News'
                      : selectedCategory === 'game'
                      ? 'Game'
                      : 'Media'}
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 51" className="-arrow">
                    <path
                      d="M8.05789 0.444808L0.176522 8.33458L17.2165 25.3702L-6.82101e-07 42.5824L7.89176 50.4722L33 25.3702L8.05789 0.444808Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <div
                  className="transition-height svelte-z8nqgf"
                  style={{ '--height': isDropdownOpen ? 'auto' : '0' } as React.CSSProperties}
                  aria-expanded={isDropdownOpen}
                >
                  <div>
                    <ul className="svelte-14noguc">
                      <li className="-all svelte-14noguc">
                        <button
                          type="button"
                          className={`svelte-14noguc ${selectedCategory === 'all' ? 'selected' : ''}`}
                          onClick={() => handleCategoryChange('all')}
                        >
                          <p className="svelte-14noguc">All News</p>
                        </button>
                      </li>
                      <li className="-game svelte-14noguc">
                        <button
                          type="button"
                          className={`svelte-14noguc ${selectedCategory === 'game' ? 'selected' : ''}`}
                          onClick={() => handleCategoryChange('game')}
                        >
                          <p className="svelte-14noguc">Game</p>
                        </button>
                      </li>
                      <li className="-media svelte-14noguc">
                        <button
                          type="button"
                          className={`svelte-14noguc ${selectedCategory === 'media' ? 'selected' : ''}`}
                          onClick={() => handleCategoryChange('media')}
                        >
                          <p className="svelte-14noguc">Media</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News List */}
          <ul className="news-list svelte-rnlpst">
            {visibleNews.map((item) => {
              const catClass = item.announce_label === 2 ? '-media' : '-game'
              return (
                <li
                  className={`news-item -type-news ${catClass} svelte-1ufvo21 is-show`}
                  key={item.announce_id}
                >
                  <Link className="news-card svelte-1ufvo21" to={`/news/${item.announce_id}`}>
                    {item.image && (
                      <img
                        alt=""
                        className="news-card__image svelte-1ufvo21"
                        src={item.image}
                        loading="lazy"
                      />
                    )}
                    <dl className="svelte-1ufvo21">
                      {item.update_at && (
                        <dd className="update svelte-1ufvo21">
                          Update
                          <time className="svelte-1ufvo21">{formatDate(item.update_at)}</time>
                        </dd>
                      )}
                      <dd className="svelte-1ufvo21">
                        <span className="svelte-1ufvo21">{getCategoryName(item.announce_label)}</span>
                        <time className="svelte-1ufvo21">{formatDate(item.post_at)}</time>
                      </dd>
                      <dt className="svelte-1ufvo21">{item.title}</dt>
                    </dl>
                    <div className="detail-text svelte-1ufvo21">
                      <p className="svelte-1ufvo21">Details</p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 42" className="-arrow">
                        <g opacity="0.5">
                          <path d="M5.01094 36.4908L0.57554 31.5988L10.1651 21.0357L0.476196 10.3633L4.91744 5.47119L19.0476 21.0357L5.01094 36.4908Z" />
                        </g>
                        <path d="M23.5824 36.4908L19.147 31.5988L28.7365 21.0357L19.0476 10.3633L23.4889 5.47119L37.619 21.0357L23.5824 36.4908Z" />
                      </svg>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* View More Button */}
          {hasMore && (
            <button
              type="button"
              className="btn-more svelte-rnlpst"
              onClick={handleViewMore}
            >
              <p className="svelte-rnlpst">View more</p>
            </button>
          )}
        </section>
      </div>
    </main>
  )
}
