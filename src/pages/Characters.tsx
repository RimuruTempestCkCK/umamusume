import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import charactersData from '../data/characters.json'

interface CharacterItem {
  subject: string
  slug: string
  color: { main: string; sub: string }
  list_thumb?: string
  top_thumb?: string
  profile?: {
    catch?: string
    va?: string
  }
}

export default function Characters() {
  const [activeTab, setActiveTab] = useState<'umamusume' | 'other'>('umamusume')
  const [searchTerm, setSearchTerm] = useState('')

  const allCharacters = charactersData as {
    umamusume: CharacterItem[]
    other: CharacterItem[]
  }

  const currentList = allCharacters[activeTab] || []

  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return currentList
    const term = searchTerm.toLowerCase()
    return currentList.filter(
      (c) =>
        c.subject.toLowerCase().includes(term) ||
        c.slug.toLowerCase().includes(term) ||
        c.profile?.va?.toLowerCase().includes(term)
    )
  }, [currentList, searchTerm])

  return (
    <main id="main" className="page-characters">
      <div className="characters-inner">
        <header className="page-header">
          <h1 className="page-title">Characters</h1>
          <p className="page-subtitle">Umamusume & Other Characters</p>
        </header>

        {/* Category Navigation & Search */}
        <div className="characters-filter-bar">
          <div className="characters-tabs">
            <button
              type="button"
              className={`characters-tab-btn ${activeTab === 'umamusume' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('umamusume')}
            >
              Umamusume ({allCharacters.umamusume?.length || 0})
            </button>
            <button
              type="button"
              className={`characters-tab-btn ${activeTab === 'other' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('other')}
            >
              Other ({allCharacters.other?.length || 0})
            </button>
          </div>

          <div className="characters-search">
            <input
              type="text"
              placeholder="Search by name or voice actor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="characters-search-input"
            />
          </div>
        </div>

        {/* Characters Grid */}
        <div className="characters-container">
          {filteredList.length > 0 ? (
            <ul className="characters-grid">
              {filteredList.map((character) => (
                <li key={character.slug} className="character-card-item">
                  <Link
                    to={`/character/${character.slug}`}
                    className="character-card-link"
                    style={{ '--char-main-color': character.color.main } as React.CSSProperties}
                  >
                    <div className="character-card-thumb">
                      <img
                        src={character.list_thumb || character.top_thumb}
                        alt={character.subject}
                        loading="lazy"
                      />
                    </div>
                    <div className="character-card-info">
                      <h2 className="character-name">{character.subject}</h2>
                      {character.profile?.va && (
                        <p className="character-va">CV: {character.profile.va}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No characters match your search.</p>
          )}
        </div>
      </div>
    </main>
  )
}
