import { useEffect, useRef, useState } from 'react'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css/core'
import mediaData from '../data/media.json'

interface AnimeLink {
  url: string
  title: string
}

interface AnimeItem {
  subject: string
  image: string
  links?: AnimeLink[]
}

interface MusicItem {
  subject: string
  image: string
  link?: string
}

interface MediaData {
  anime: AnimeItem[]
  music: MusicItem[]
}

const DecoBaseSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 41" fill="none" className="cls-1-svg-decoration_base">
    <g opacity="0.5">
      <path opacity="0.2" d="M0 0.438477V40.4385L34.0945 0.438477H0Z" fill="currentColor" />
      <path opacity="0.2" d="M0 40.4385V0.438477L34.0945 40.4385H0Z" fill="currentColor" />
    </g>
  </svg>
)

const LineDecoSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 15" fill="none" className="-line-deco">
    <rect y="6.96851" width="233.015" height="1" fill="currentColor" />
    <path
      d="M243.96 12.4589C244.27 12.1874 244.865 11.9547 244.529 11.4505C242.098 7.94682 243.119 2.34875 247.426 0.900753C248.254 0.603396 249.134 0.461182 250 0.461182C250.867 0.461182 251.759 0.616324 252.574 0.900753C256.894 2.36168 257.902 7.95975 255.471 11.4505C255.135 11.9418 255.73 12.1874 256.04 12.4589C256.247 12.627 256.273 12.9114 256.105 13.1053C255.743 13.519 255.368 13.9328 254.992 14.3335C254.811 14.5274 254.514 14.5403 254.307 14.3593C252.923 13.157 251.397 12.5624 250 12.5624C248.603 12.5624 247.077 13.157 245.693 14.3593C245.486 14.5403 245.189 14.5274 245.008 14.3335C244.632 13.9328 244.257 13.519 243.895 13.1053C243.727 12.9114 243.753 12.627 243.96 12.4589Z"
      fill="currentColor"
    />
    <rect x="266.985" y="6.96851" width="233.015" height="1" fill="currentColor" />
  </svg>
)

const ArrowSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 51" className="cls-1-svg-arrow">
    <path
      d="M8.05789 0.444808L0.176522 8.33458L17.2165 25.3702L-6.82101e-07 42.5824L7.89176 50.4722L33 25.3702L8.05789 0.444808Z"
      fill="currentColor"
    />
  </svg>
)

export default function Media() {
  const data = mediaData as MediaData
  const animeSplideRef = useRef<HTMLDivElement>(null)
  const musicSplideRef = useRef<HTMLDivElement>(null)

  const [modalItem, setModalItem] = useState<AnimeItem | null>(null)
  const [modalClosing, setModalClosing] = useState(false)

  const animeList = data.anime || []
  const musicList = data.music || []

  // Initialize Anime Splide Carousel
  useEffect(() => {
    if (!animeSplideRef.current) return
    const splide = new Splide(animeSplideRef.current, {
      type: 'slide',
      perPage: 3,
      perMove: 3,
      gap: '2vw',
      pagination: true,
      arrows: true,
      breakpoints: {
        899.98: {
          destroy: true,
        },
      },
    })
    splide.mount()
    return () => {
      splide.destroy()
    }
  }, [])

  // Initialize Music Splide Carousel
  useEffect(() => {
    if (!musicSplideRef.current) return
    const splide = new Splide(musicSplideRef.current, {
      type: 'slide',
      perPage: 3,
      perMove: 3,
      gap: '2vw',
      pagination: true,
      arrows: true,
      breakpoints: {
        899.98: {
          destroy: true,
        },
      },
    })
    splide.mount()
    return () => {
      splide.destroy()
    }
  }, [])

  const closeModal = () => {
    setModalClosing(true)
    setTimeout(() => {
      setModalItem(null)
      setModalClosing(false)
    }, 200)
  }

  return (
    <main id="main">
      <div className="page -MEDIA svelte-ftganx">
        {/* Head Title */}
        <div className="page__head">
          <h2 className="page__title svelte-ftganx">
            <p className="ttl svelte-ftganx">Media</p>
          </h2>
        </div>

        <div className="page-media svelte-1w84d80">
          {/* Top Anchor Tabs */}
          <div className="page-media__tab svelte-1w84d80">
            <a href="#anime" className="svelte-1w84d80">
              <p>Anime</p>
            </a>
            <a href="#music" className="svelte-1w84d80">
              <p>Music</p>
            </a>
          </div>

          {/* ANIME SECTION */}
          <section id="anime" className="anime svelte-1w84d80">
            <h3 className="svelte-1w84d80">Anime</h3>

            {/* PC Splide Carousel */}
            <div
              className="splide js-anime-slide is-PC is-overflow is-initialized"
              ref={animeSplideRef}
              role="region"
              aria-roledescription="carousel"
            >
              <div className="splide__track">
                <ul className="splide__list">
                  {animeList.map((item, idx) => (
                    <li className="splide__slide media-item svelte-1w84d80" key={idx}>
                      <img src={item.image} alt={item.subject} loading="lazy" />
                      <p className="subject svelte-1w84d80">{item.subject}</p>
                      <div className="media__button svelte-1w84d80">
                        {item.links && item.links.length === 1 ? (
                          <a
                            className="button-base svelte-1lnpk4j"
                            href={item.links[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="-deco -left svelte-1lnpk4j">
                              <DecoBaseSvg />
                            </div>
                            <p className="-text svelte-1lnpk4j">Watch</p>
                            <div className="-deco -right svelte-1lnpk4j">
                              <DecoBaseSvg />
                            </div>
                          </a>
                        ) : (
                          <a
                            className="button-base js-modal-open-links svelte-1lnpk4j"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setModalItem(item)
                            }}
                          >
                            <div className="-deco -left svelte-1lnpk4j">
                              <DecoBaseSvg />
                            </div>
                            <p className="-text svelte-1lnpk4j">Watch</p>
                            <div className="-deco -right svelte-1lnpk4j">
                              <DecoBaseSvg />
                            </div>
                          </a>
                        )}
                      </div>
                      <LineDecoSvg />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Splide Arrows */}
              <div className="splide__arrows splide__arrows--ltr">
                <button className="splide__arrow splide__arrow--prev" type="button" aria-label="Previous slide">
                  <ArrowSvg />
                </button>
                <button className="splide__arrow splide__arrow--next" type="button" aria-label="Next slide">
                  <ArrowSvg />
                </button>
              </div>
            </div>

            {/* SP List View */}
            <div className="is-SP">
              <ul className="page-media__list svelte-1w84d80">
                {animeList.map((item, idx) => (
                  <li className="media-item svelte-1w84d80" key={idx}>
                    <img src={item.image} alt={item.subject} loading="lazy" />
                    <p className="subject svelte-1w84d80">{item.subject}</p>
                    <div className="media__button svelte-1w84d80">
                      {item.links && item.links.length === 1 ? (
                        <a
                          className="button-base svelte-1lnpk4j"
                          href={item.links[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="-deco -left svelte-1lnpk4j">
                            <DecoBaseSvg />
                          </div>
                          <p className="-text svelte-1lnpk4j">Watch</p>
                          <div className="-deco -right svelte-1lnpk4j">
                            <DecoBaseSvg />
                          </div>
                        </a>
                      ) : (
                        <a
                          className="button-base js-modal-open-links svelte-1lnpk4j"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setModalItem(item)
                          }}
                        >
                          <div className="-deco -left svelte-1lnpk4j">
                            <DecoBaseSvg />
                          </div>
                          <p className="-text svelte-1lnpk4j">Watch</p>
                          <div className="-deco -right svelte-1lnpk4j">
                            <DecoBaseSvg />
                          </div>
                        </a>
                      )}
                    </div>
                    <LineDecoSvg />
                  </li>
                ))}
              </ul>
            </div>

            <div className="section-bg svelte-1w84d80" />
          </section>

          {/* MUSIC SECTION */}
          <section id="music" className="music svelte-1w84d80">
            <h3 className="svelte-1w84d80">Music</h3>

            {/* PC Splide Carousel */}
            <div
              className="splide js-music-slide is-PC is-overflow is-initialized"
              ref={musicSplideRef}
              role="region"
              aria-roledescription="carousel"
            >
              <div className="splide__track">
                <ul className="splide__list">
                  {musicList.map((item, idx) => (
                    <li className="splide__slide media-item svelte-1w84d80" key={idx}>
                      <img src={item.image} alt={item.subject} loading="lazy" />
                      <p className="subject svelte-1w84d80">{item.subject}</p>
                      <div className="media__button svelte-1w84d80">
                        {item.link && (
                          <a
                            className="button-base svelte-1lnpk4j"
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="-deco -left svelte-1lnpk4j">
                              <DecoBaseSvg />
                            </div>
                            <div className="-icon-play svelte-1lnpk4j" />
                            <p className="-text svelte-1lnpk4j">
                              Listen<span>(Spotify)</span>
                            </p>
                            <div className="-deco -right svelte-1lnpk4j">
                              <DecoBaseSvg />
                            </div>
                          </a>
                        )}
                      </div>
                      <LineDecoSvg />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Splide Arrows */}
              <div className="splide__arrows splide__arrows--ltr">
                <button className="splide__arrow splide__arrow--prev" type="button" aria-label="Previous slide">
                  <ArrowSvg />
                </button>
                <button className="splide__arrow splide__arrow--next" type="button" aria-label="Next slide">
                  <ArrowSvg />
                </button>
              </div>
            </div>

            {/* SP List View */}
            <div className="is-SP">
              <ul className="page-media__list svelte-1w84d80">
                {musicList.map((item, idx) => (
                  <li className="media-item svelte-1w84d80" key={idx}>
                    <img src={item.image} alt={item.subject} loading="lazy" />
                    <p className="subject svelte-1w84d80">{item.subject}</p>
                    <div className="media__button svelte-1w84d80">
                      {item.link && (
                        <a
                          className="button-base svelte-1lnpk4j"
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="-deco -left svelte-1lnpk4j">
                            <DecoBaseSvg />
                          </div>
                          <div className="-icon-play svelte-1lnpk4j" />
                          <p className="-text svelte-1lnpk4j">
                            Listen<span>(Spotify)</span>
                          </p>
                          <div className="-deco -right svelte-1lnpk4j">
                            <DecoBaseSvg />
                          </div>
                        </a>
                      )}
                    </div>
                    <LineDecoSvg />
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Spotify external link button */}
            <a
              href="https://open.spotify.com/artist/5uL5Y2w7cI3m0WvNlQ5B6S"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-music svelte-1w84d80"
            >
              <span>Spotify</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21" className="-blank">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.1992 20.4136V15.6136L18.7992 15.6136V18.0136L3.19922 18.0136V2.41357L5.59922 2.41357V0.0135732L0.799218 0.0135732V20.4136L21.1992 20.4136Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.7992 2.41357V11.4136L21.1992 11.4136V0.0135738L9.79922 0.0135736V2.41357L18.7992 2.41357Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.85 14.062L20.25 2.66201L18.5529 0.964955L7.15294 12.365L8.85 14.062Z"
                />
              </svg>
            </a>

            <div className="section-bg svelte-1w84d80" />
          </section>
        </div>
      </div>

      {/* Streaming Platform Modal (Official Style) */}
      {modalItem && (
        <div className={`modal -links js-modal-links svelte-kxgkb1 is-open ${modalClosing ? 'is-close' : ''}`}>
          <div className="modal__body svelte-kxgkb1">
            <div className="modal__main svelte-kxgkb1">
              <div className="modal__bg js-modal-close svelte-kxgkb1" onClick={closeModal} />
              <div className="modal__contents svelte-kxgkb1">
                <div className="links-modal svelte-ofyp30">
                  <p className="links-modal__title svelte-ofyp30">{modalItem.subject}</p>
                  <ul className="links-modal__list svelte-ofyp30">
                    {modalItem.links?.map((link, lIdx) => (
                      <li key={lIdx} className="svelte-ofyp30">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button-base svelte-1lnpk4j"
                        >
                          <div className="-deco -left svelte-1lnpk4j">
                            <DecoBaseSvg />
                          </div>
                          <p className="-text svelte-1lnpk4j">{link.title}</p>
                          <div className="-deco -right svelte-1lnpk4j">
                            <DecoBaseSvg />
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="modal__close svelte-kxgkb1">
                  <button type="button" className="js-modal-close svelte-kxgkb1" onClick={closeModal} aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.34 62.34" className="cls-1-svg-close">
                      <polygon
                        className="cls-1-svg-close"
                        points="62.34 8.6 53.74 0 31.17 22.57 8.6 0 0 8.6 22.57 31.17 0 53.74 8.6 62.34 31.17 39.77 53.74 62.34 62.34 53.74 39.77 31.17 62.34 8.6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
