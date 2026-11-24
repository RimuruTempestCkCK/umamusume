import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { tsParticles } from '@tsparticles/engine'
import { loadFull } from 'tsparticles'
import { characters } from '../data/site'
import NotFound from './NotFound'

export default function CharacterDetail() {
  const { slug } = useParams()
  const index = characters.findIndex((character) => character.slug === slug)
  const character = characters[index]
  const audioRef = useRef<HTMLAudioElement>(null)
  const [activeVisual, setActiveVisual] = useState(0)
  const [voicePlaying, setVoicePlaying] = useState(false)
  const [movieOpen, setMovieOpen] = useState(false)

  useEffect(() => {
    setActiveVisual(0)
    setVoicePlaying(false)
    setMovieOpen(false)
    audioRef.current?.pause()
  }, [slug])

  useEffect(() => {
    let container: any = null
    const initParticles = async () => {
      try {
        await loadFull(tsParticles)
        container = await tsParticles.load({
          id: 'tsparticles',
          options: {
            fpsLimit: 60,
            fullScreen: { enable: false },
            particles: {
              color: { value: '#ffffff' },
              move: {
                direction: 'top-right',
                enable: true,
                speed: { min: 0.5, max: 2 },
                straight: true,
                outModes: { default: 'out' },
              },
              number: {
                value: 15,
                density: { enable: true, width: 1920, height: 1080 },
              },
              opacity: { value: 1 },
              shape: {
                type: 'image',
                options: {
                  image: {
                    src: '/assets/icons/teitetsu.svg',
                    width: 108,
                    height: 112,
                  },
                },
              },
              size: {
                value: { min: 30, max: 80 },
              },
            },
            detectRetina: true,
            responsive: [
              {
                maxWidth: 899.98,
                options: {
                  particles: {
                    number: {
                      value: 20,
                      density: { enable: true },
                    },
                    size: {
                      value: { min: 20, max: 60 },
                    },
                  },
                },
              },
            ],
          },
        })
      } catch (err) {
        console.error('Failed to init particles', err)
      }
    }

    void initParticles()

    return () => {
      if (container) {
        container.destroy()
      }
    }
  }, [slug])

  useEffect(() => {
    document.body.classList.toggle('is-fixed', movieOpen)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMovieOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('is-fixed')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [movieOpen])

  if (!character) return <NotFound />

  const previous = characters[(index - 1 + characters.length) % characters.length]
  const next = characters[(index + 1) % characters.length]
  const visuals = character.official.visual
  const profile = [
    ['Birthday', character.profile.birthday],
    ['Height', character.profile.height],
    ['Weight', character.profile.weight],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]))
  const downloads: [string, string][] = []
  if (character.official.download?.icon) downloads.push(['Download Icon', character.official.download.icon])
  if (character.official.download?.banner) downloads.push(['Download Banner', character.official.download.banner])

  const toggleVoice = async () => {
    const audio = audioRef.current
    if (!audio || !character.official.voice) return
    if (voicePlaying) {
      audio.pause()
      setVoicePlaying(false)
      return
    }
    try {
      await audio.play()
      setVoicePlaying(true)
    } catch {
      setVoicePlaying(false)
    }
  }

  return (
    <main id="main" className="svelte-1dadfk3">
      <div className="page -CHARACTERS svelte-ftganx">
        <div className="page__head">
          <h2 className="page__title svelte-ftganx">
            <p className="ttl svelte-ftganx">Characters</p>
          </h2>
        </div>
        <ul className="bread-crumb svelte-125nrs4" style={{ '--color-bread-crumb': '#ffffff' } as React.CSSProperties}>
          <li className="svelte-125nrs4">
            <Link className="bread-crumb__link svelte-125nrs4" to="/"><p>Top</p></Link>
          </li>
          <li className="svelte-125nrs4">
            <Link className="bread-crumb__link svelte-125nrs4" to="/characters/"><p>Characters</p></Link>
          </li>
          <li className="svelte-125nrs4">
            <p className="no-link svelte-125nrs4">{character.subject}</p>
          </li>
        </ul>

        <section className="characters-detail svelte-1r08lep">
          <div
            className="characters-detail__wrapper svelte-1r08lep"
            style={{ '--color-characters-main': character.color.main, '--color-characters-sub': character.color.sub } as React.CSSProperties}
          >
            <div className="characters-detail__visual svelte-1r08lep">
              <div className="characters-detail__visual-main svelte-1r08lep">
                <div className="splide js-visual-slide splide--fade splide--ltr is-active is-overflow is-initialized" id="splide01" role="region" aria-roledescription="carousel">
                  <div className="splide__track svelte-1r08lep splide__track--fade splide__track--ltr" id="splide01-track" aria-live="polite" aria-atomic="true" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <ul className="splide__list" id="splide01-list" role="presentation">
                      {visuals.map((visual, visualIndex) => (
                        <li
                          key={visual.image}
                          className={`splide__slide${visualIndex === activeVisual ? ' is-active is-visible' : ''}`}
                          id={`splide01-slide${String(visualIndex + 1).padStart(2, '0')}`}
                          role="group"
                          aria-roledescription="slide"
                          aria-label={`${visualIndex + 1} of ${visuals.length}`}
                          aria-hidden={visualIndex !== activeVisual}
                          style={{ width: '100%', transform: `translateX(-${visualIndex * 100}%)` }}
                        >
                          <img loading="lazy" alt={`${character.subject} ${visual.name.label}`} src={visual.image} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="characters-detail__visual-thumb svelte-1r08lep">
                <div className="-thumb-title svelte-1r08lep">
                  <img src="/assets/detail/outfits-pc.svg" alt="Outfits" />
                </div>
                <div className="-thumb-title-parts is-PC svelte-1r08lep">
                  <img src="/assets/detail/arrow-triple.svg" alt="" />
                </div>
                <div className="splide js-visual-thumb-slide splide--slide splide--ltr is-active is-initialized" id="splide02" role="region" aria-roledescription="carousel">
                  <div className="splide__track svelte-1r08lep splide__track--slide splide__track--ltr" id="splide02-track" aria-live="polite" aria-atomic="true" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <ul className="splide__list" id="splide02-list" role="presentation">
                      {visuals.map((visual, visualIndex) => (
                        <li
                          key={visual.thumb}
                          className={`splide__slide svelte-1r08lep${visualIndex === activeVisual ? ' is-active is-visible' : ''}`}
                          id={`splide02-slide${String(visualIndex + 1).padStart(2, '0')}`}
                          role="group"
                          aria-roledescription="slide"
                          aria-label={`${visualIndex + 1} of ${visuals.length}`}
                        >
                          <button type="button" className="-thumb-button svelte-1r08lep" aria-label={visual.name.label} onClick={() => setActiveVisual(visualIndex)}>
                            <img className="svelte-1r08lep" src={visual.thumb} alt={`${character.subject} ${visual.name.label}`} />
                          </button>
                          <label className="svelte-1r08lep">{visual.name.label}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="splide__arrows splide__arrows--ltr" style={{ display: 'none' }}>
                    <button className="splide__arrow splide__arrow--prev" type="button"><img src="/assets/detail/arrow-triple.svg" alt="" /></button>
                    <button className="splide__arrow splide__arrow--next" type="button"><img src="/assets/detail/arrow-triple.svg" alt="" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="characters-detail__text svelte-1r08lep">
              <div className="-name line-break svelte-1r08lep">{character.subject}</div>
              <div className="-va svelte-1r08lep">
                <p className="line-break"><span className="svelte-1r08lep">VA:</span>{character.profile.va}</p>
                {character.official.voice && (
                  <button type="button" className="-va-voice svelte-1r08lep" aria-label={voicePlaying ? 'Pause voice' : 'Play voice'} onClick={toggleVoice}>
                    <div className={`${voicePlaying ? 'pause' : 'play'} svelte-1r08lep`} />
                  </button>
                )}
              </div>
              <div className="-catch line-break svelte-1r08lep">{character.profile.catch}</div>
              <div className="-line-deco svelte-1r08lep">
                <div className="line-teitetsu svelte-19zkzxo"><p className="-icon svelte-19zkzxo" /></div>
              </div>
              <dl className="-profile svelte-1r08lep">
                {profile.map(([label, value]) => (
                  <div key={label} style={{ display: 'contents' }}>
                    <dt className="svelte-1r08lep">{label}</dt>
                    <dd className="line-break svelte-1r08lep">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="-detail-text line-break svelte-1r08lep">{character.profile.detail}</div>
              {character.profile.movie_id && (
                <div className="-movie-thumb svelte-1r08lep">
                  <button
                    type="button"
                    className="movie-thumbnail js-modal-open-movie svelte-ggkvhn"
                    data-id={character.profile.movie_id}
                    onClick={() => setMovieOpen(true)}
                  >
                    <div className="-hover svelte-ggkvhn" />
                    <img src={`https://img.youtube.com/vi/${character.profile.movie_id}/maxresdefault.jpg`} alt={`${character.subject} Movie`} />
                    <div className="-play-icon svelte-ggkvhn" />
                  </button>
                </div>
              )}
              {downloads.length > 0 && (
                <div className="-download-list svelte-1r08lep">
                  {downloads.map(([label, url]) => (
                    <div className="-download-list__button svelte-1r08lep" key={label}>
                      <a className="button-base svelte-1lnpk4j" href={url} target="_blank" rel="noreferrer" download>
                        <div className="-deco -left svelte-1lnpk4j">
                          <svg viewBox="0 0 35 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="cls-1-svg-decoration_base">
                            <g opacity="0.5">
                              <path opacity="0.2" d="M0 0.438477V40.4385L34.0945 0.438477H0Z" fill="currentColor" />
                              <path opacity="0.2" d="M0 40.4385V0.438477L34.0945 40.4385H0Z" fill="currentColor" />
                            </g>
                          </svg>
                        </div>
                        <p className="-text svelte-1lnpk4j">{label}</p>
                        <div className="-icon-download svelte-1lnpk4j">
                          <svg viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="cls-1-svg-icon_download">
                            <path d="M17.5781 14.6985H1.07812V9.44849H2.57812V13.1985H16.0781V9.44849H17.5781V14.6985Z" fill="currentColor" />
                            <path d="M8.57812 0.718506H10.0781V10.461H8.57812V0.718506Z" fill="currentColor" />
                            <path d="M9.32141 11.3685L4.94141 6.98852L6.00641 5.93102L9.32141 9.24602L12.6514 5.91602L13.7164 6.98102L9.32141 11.3685Z" fill="currentColor" />
                          </svg>
                        </div>
                        <div className="-deco -right svelte-1lnpk4j">
                          <svg viewBox="0 0 35 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="cls-1-svg-decoration_base">
                            <g opacity="0.5">
                              <path opacity="0.2" d="M0 0.438477V40.4385L34.0945 0.438477H0Z" fill="currentColor" />
                              <path opacity="0.2" d="M0 40.4385V0.438477L34.0945 40.4385H0Z" fill="currentColor" />
                            </g>
                          </svg>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="characters-background size-md svelte-mh967d">
              <div className="-line-01 svelte-mh967d" />
              <div className="-line-02 svelte-mh967d" />
              <div id="tsparticles" className="svelte-mh967d" />
            </div>

            {character.profile.movie_id && (
              <div className={`modal -movie js-modal-movie svelte-kxgkb1${movieOpen ? ' is-open' : ''}`}>
                <div className="modal__body svelte-kxgkb1">
                  <div className="modal__main svelte-kxgkb1">
                    <div className="modal__bg js-modal-close svelte-kxgkb1" onClick={() => setMovieOpen(false)} />
                    <div className="modal__contents svelte-kxgkb1">
                      <div className="movie svelte-kxgkb1">
                        <iframe
                          width="640"
                          height="360"
                          src={movieOpen ? `https://www.youtube.com/embed/${character.profile.movie_id}?autoplay=1` : undefined}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`${character.subject} Movie`}
                          className="svelte-kxgkb1"
                        />
                      </div>
                      <div className="modal__close svelte-kxgkb1">
                        <button type="button" className="js-modal-close svelte-kxgkb1" aria-label="Close" onClick={() => setMovieOpen(false)}>
                          <img src="/assets/detail/icon-close.svg" alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="characters-detail__navigation svelte-1r08lep">
            <Link className="btn-prev svelte-1r08lep" to={`/characters/${previous.slug}/`} aria-label={`Previous: ${previous.subject}`}>
              <img src="/assets/detail/arrow-reverse.svg" alt="" />
            </Link>
            <Link className="btn-back svelte-1r08lep" to="/characters/"><p className="svelte-1r08lep">Return to Characters</p></Link>
            <Link className="btn-next svelte-1r08lep" to={`/characters/${next.slug}/`} aria-label={`Next: ${next.subject}`}>
              <img src="/assets/detail/arrow.svg" alt="" />
            </Link>
          </div>
        </section>
      </div>
      {character.official.voice && <audio ref={audioRef} src={character.official.voice} preload="none" onEnded={() => setVoicePlaying(false)} />}
    </main>
  )
}
