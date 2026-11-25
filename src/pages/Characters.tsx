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
    birthday?: string
    height?: string
    weight?: string
    detail?: string
    movie_id?: string
  }
}

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'height-asc' | 'height-desc'

function parseHeight(heightStr?: string): number | null {
  if (!heightStr) return null
  const match = heightStr.match(/(\d+(?:\.\d+)?)/)
  return match ? parseFloat(match[1]) : null
}

const SortIconSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 16" className="cls-1-svg-icon_sort">
    <path d="M18.5306 0.170898H8.10645V2.14956H18.5306V0.170898Z" />
    <path d="M23.2652 7.09082H8.10645V9.06948H23.2652V7.09082Z" />
    <path d="M27.9999 14.0215H8.10645V16.0001H27.9999V14.0215Z" />
    <path d="M5.12256 16L0 11.6309L1.29307 10.1243L3.13322 11.7012V0H5.12256V16Z" fill="black" />
  </svg>
)

export default function Characters() {
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Draft search inputs inside modal
  const [draftName, setDraftName] = useState('')
  const [draftVa, setDraftVa] = useState('')
  const [draftHeightMin, setDraftHeightMin] = useState('')
  const [draftHeightMax, setDraftHeightMax] = useState('')

  // Applied filters
  const [appliedFilter, setAppliedFilter] = useState({
    name: '',
    va: '',
    heightMin: '',
    heightMax: '',
  })

  const allCharacters = charactersData as {
    umamusume: CharacterItem[]
    other: CharacterItem[]
  }

  const filterAndSort = (list: CharacterItem[], applySort: boolean) => {
    const nameTerm = appliedFilter.name.trim().toLowerCase()
    const vaTerm = appliedFilter.va.trim().toLowerCase()
    const minH = appliedFilter.heightMin ? parseFloat(appliedFilter.heightMin) : null
    const maxH = appliedFilter.heightMax ? parseFloat(appliedFilter.heightMax) : null

    const filtered = list.filter((c) => {
      if (nameTerm && !c.subject.toLowerCase().includes(nameTerm) && !c.slug.toLowerCase().includes(nameTerm)) {
        return false
      }
      if (vaTerm && !(c.profile?.va || '').toLowerCase().includes(vaTerm)) {
        return false
      }
      if (minH !== null || maxH !== null) {
        const h = parseHeight(c.profile?.height)
        if (h === null) return false
        if (minH !== null && h < minH) return false
        if (maxH !== null && h > maxH) return false
      }
      return true
    })

    if (!applySort || sortBy === 'default') return filtered

    return [...filtered].sort((a, b) => {
      if (sortBy === 'name-asc') return a.subject.localeCompare(b.subject)
      if (sortBy === 'name-desc') return b.subject.localeCompare(a.subject)
      if (sortBy === 'height-asc') {
        const ha = parseHeight(a.profile?.height) ?? 9999
        const hb = parseHeight(b.profile?.height) ?? 9999
        return ha - hb
      }
      if (sortBy === 'height-desc') {
        const ha = parseHeight(a.profile?.height) ?? -1
        const hb = parseHeight(b.profile?.height) ?? -1
        return hb - ha
      }
      return 0
    })
  }

  const umamusumeList = useMemo(
    () => filterAndSort(allCharacters.umamusume || [], true),
    [allCharacters.umamusume, appliedFilter, sortBy]
  )

  const otherList = useMemo(
    () => filterAndSort(allCharacters.other || [], true),
    [allCharacters.other, appliedFilter, sortBy]
  )

  const handleApplySearch = (e: React.FormEvent) => {
    e.preventDefault()
    setAppliedFilter({
      name: draftName,
      va: draftVa,
      heightMin: draftHeightMin,
      heightMax: draftHeightMax,
    })
    setIsSearchOpen(false)
  }

  const handleResetSearch = () => {
    setDraftName('')
    setDraftVa('')
    setDraftHeightMin('')
    setDraftHeightMax('')
    setAppliedFilter({ name: '', va: '', heightMin: '', heightMax: '' })
  }

  const renderCharacterCard = (character: CharacterItem, idx: number) => (
    <li
      key={character.slug}
      className="svelte-16l0oe0"
      style={{ '--delay': `${(idx % 7) * 0.05}s` } as React.CSSProperties}
    >
      <Link
        className="characters-list-thumb svelte-dyrtrn is-show"
        to={`/characters/${character.slug}`}
        style={
          {
            '--color-characters-main': character.color.main,
            '--color-characters-sub': character.color.sub,
          } as React.CSSProperties
        }
      >
        <div className="-hover svelte-dyrtrn">
          <p className="svelte-dyrtrn">View more</p>
        </div>
        <div className="-wrapper svelte-dyrtrn">
          <div className="-img svelte-dyrtrn">
            <img
              className="-scale-img svelte-dyrtrn"
              loading="lazy"
              alt={character.subject}
              src={character.list_thumb || character.top_thumb}
            />
          </div>
          <div className="-info svelte-dyrtrn">
            <p className="-name line-break svelte-dyrtrn">{character.subject}</p>
            {character.profile?.va && (
              <p className="-va line-break svelte-dyrtrn">VA: {character.profile.va}</p>
            )}
          </div>
        </div>
      </Link>
    </li>
  )

  return (
    <main id="main">
      <div className="page -CHARACTERS svelte-ftganx">
        {/* Page Head */}
        <div className="page__head">
          <h2 className="page__title svelte-ftganx">
            <p className="ttl svelte-ftganx">Characters</p>
          </h2>
        </div>

        <div className="page-characters svelte-16l0oe0">
          {/* Umamusume Section */}
          <section id="umamusume" className="umamusume svelte-16l0oe0">
            <h3 className="section-title svelte-16l0oe0">
              <picture>
                <source media="(max-width: 899.98px)" srcSet="/assets/characters/title_umamusume_sp.svg" />
                <img src="/assets/characters/title_umamusume_pc.svg" alt="Umamusume" />
              </picture>
            </h3>

            {/* Sort & Search Controls */}
            <div className="search-box svelte-16l0oe0">
              <div className="search-box__select svelte-16l0oe0">
                <p className="svelte-16l0oe0">Sort By:</p>
                <select
                  className="svelte-16l0oe0"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label="Sort characters"
                >
                  <option value="default">Default</option>
                  <option value="name-asc">Name (A–Z)</option>
                  <option value="name-desc">Name (Z–A)</option>
                  <option value="height-asc">Height (Ascending)</option>
                  <option value="height-desc">Height (Descending)</option>
                </select>
                <p className="-icon svelte-16l0oe0">
                  <SortIconSvg />
                </p>
              </div>
              <button
                type="button"
                className="btn-search js-modal-open-search svelte-16l0oe0"
                onClick={() => setIsSearchOpen(true)}
              >
                <p>Search</p>
              </button>
            </div>

            <ul className="characters-list svelte-16l0oe0">
              {umamusumeList.length > 0 ? (
                umamusumeList.map((character, idx) => renderCharacterCard(character, idx))
              ) : (
                <li className="no-data">No Data</li>
              )}
            </ul>
          </section>

          {/* Other Characters Section */}
          <section id="other" className="other svelte-16l0oe0">
            <h3 className="section-title svelte-16l0oe0">
              <picture>
                <source media="(max-width: 899.98px)" srcSet="/assets/characters/title_other_sp.svg" />
                <img src="/assets/characters/title_other_pc.svg" alt="Other Characters" />
              </picture>
            </h3>

            <ul className="characters-list svelte-16l0oe0">
              {otherList.length > 0 ? (
                otherList.map((character, idx) => renderCharacterCard(character, idx))
              ) : (
                <li className="no-data">No Data</li>
              )}
            </ul>
          </section>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="modal -search js-modal-search svelte-kxgkb1 is-open">
          <div className="modal__body svelte-kxgkb1">
            <div className="modal__main svelte-kxgkb1">
              <div className="modal__bg js-modal-close svelte-kxgkb1" onClick={() => setIsSearchOpen(false)} />
              <div className="modal__contents svelte-kxgkb1">
                <form className="search-modal svelte-1ewcv7t" onSubmit={handleApplySearch}>
                  <div className="search-modal__header svelte-1ewcv7t">
                    <h4 className="svelte-1ewcv7t">
                      <img src="/assets/characters/icon_chara_search.svg" alt="" />
                      <span>Character Search</span>
                    </h4>
                    <button
                      type="button"
                      className="btn-close svelte-1ewcv7t"
                      onClick={() => setIsSearchOpen(false)}
                      aria-label="Close"
                    >
                      <img src="/assets/icons/close.svg" alt="Close" />
                    </button>
                  </div>

                  <div className="search-modal__body svelte-1ewcv7t">
                    <ul className="svelte-1ewcv7t">
                      <li>
                        <dl>
                          <dt>Name</dt>
                          <dd>
                            <input
                              type="text"
                              placeholder="Enter character name..."
                              value={draftName}
                              onChange={(e) => setDraftName(e.target.value)}
                            />
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Voice Actor</dt>
                          <dd>
                            <input
                              type="text"
                              placeholder="Enter voice actor..."
                              value={draftVa}
                              onChange={(e) => setDraftVa(e.target.value)}
                            />
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Height</dt>
                          <dd className="minmax-inputs">
                            <div>
                              <input
                                type="number"
                                placeholder="Min"
                                value={draftHeightMin}
                                onChange={(e) => setDraftHeightMin(e.target.value)}
                              />
                              <p>cm</p>
                            </div>
                            <span>–</span>
                            <div>
                              <input
                                type="number"
                                placeholder="Max"
                                value={draftHeightMax}
                                onChange={(e) => setDraftHeightMax(e.target.value)}
                              />
                              <p>cm</p>
                            </div>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </div>

                  <div className="search-modal__button svelte-1ewcv7t">
                    <button type="button" className="btn-reset" onClick={handleResetSearch}>
                      Reset
                    </button>
                    <button type="submit" className="btn-search">
                      <img src="/assets/characters/icon_chara_search.svg" alt="" />
                      <span>Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
