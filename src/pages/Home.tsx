import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Splide from '@splidejs/splide'
import '@splidejs/splide/css/core'
import newsJson from '../data/news.json'
import { characters, socialLinks, storeLinks } from '../data/site'
import { useInView } from '../hooks/useInView'
import PlayNowModal from '../components/PlayNowModal'
import VideoModal from '../components/VideoModal'

const newsItems = newsJson.information_list.slice(0, 5)

const homeCharactersSlugs = [
  'sakuralaurel',
  'littlecocon',
  'naritabrian',
  'admirevega',
  'supercreek',
  'zennorobroy',
  'shinkowindy',
  'sakurachiyonoo',
  'yayoiakikawa',
  'tazunahayakawa',
  'lighthello',
  'wonderacute',
  'finemotion',
  'tsurumarutsuyoshi',
  'kitasanblack'
]

const homeCharacters = homeCharactersSlugs.map(slug => characters.find(c => c.slug === slug)).filter(Boolean) as typeof characters

const gameplaySlides = [
  {
    character: characters.find(c => c.slug === 'specialweek') || characters[0],
    characterImg: '/assets/characters/gameplay_specialweek.webp',
    headlineSvg: '/assets/gameplay_headline_1.svg',
    text: 'Lead your Umamusume to victory by choosing a training regimen that fits their needs!',
    movieSrc: '/assets/videos/top_gameplay_1.mp4',
    images: [
      { pc: '/assets/gallery/gameplay_image_1-1_pc.webp', sp: '/assets/gallery/gameplay_image_1-1_sp.webp' },
      { pc: '/assets/gallery/gameplay_image_1-2_pc.webp', sp: '/assets/gallery/gameplay_image_1-2_sp.webp' }
    ]
  },
  {
    character: characters.find(c => c.slug === 'silencesuzuka') || characters[1],
    characterImg: '/assets/characters/gameplay_silencesuzuka.webp',
    headlineSvg: '/assets/gameplay_headline_2.svg',
    text: 'Interact with a variety of unique Umamusume at Tracen Academy! Train together, and you just might help each other reach new heights!',
    movieSrc: '/assets/videos/top_gameplay_2.mp4',
    images: [
      { pc: '/assets/gallery/gameplay_image_2-1_pc.webp', sp: '/assets/gallery/gameplay_image_2-1_sp.webp' },
      { pc: '/assets/gallery/gameplay_image_2-2_pc.webp', sp: '/assets/gallery/gameplay_image_2-2_sp.webp' }
    ]
  },
  {
    character: characters.find(c => c.slug === 'winningticket') || characters[2],
    characterImg: '/assets/characters/gameplay_winningticket.webp',
    headlineSvg: '/assets/gameplay_headline_3.svg',
    text: "Up to 18 Umamusume race against each other for first place—watch them go all out as you tune in to the game's incredibly realistic live commentary.",
    movieSrc: '/assets/videos/top_gameplay_3.mp4',
    images: [
      { pc: '/assets/gallery/gameplay_image_3-1_pc.webp', sp: '/assets/gallery/gameplay_image_3-1_sp.webp' },
      { pc: '/assets/gallery/gameplay_image_3-2_pc.webp', sp: '/assets/gallery/gameplay_image_3-2_sp.webp' }
    ]
  }
]

function groupLabel(label: number) {
  if (label === 1) return 'Game'
  if (label === 3) return 'Media'
  return 'News'
}

function formatDate(value: string) {
  return `${value.slice(0, 10).replace(/-/g, '/')} ${value.slice(11, 16)} (UTC)`
}

function SectionGroup({ children, id }: { children: ReactNode; id?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} id={id} className={inView ? 'is-show' : ''}>
      {children}
    </div>
  )
}

function SectionTitle({ label }: { label: string }) {
  return (
    <h3 className="section-title"><p>{label}</p></h3>
  )
}

function StoreLinks() {
  return (
    <ul className="store-list">
      {storeLinks.map((store) => (
        <li key={store.key} className={`store-${store.key}`}>
          <a href={store.url} target="_blank" rel="noopener noreferrer">
            <img src={store.icon} alt={store.alt} />
          </a>
        </li>
      ))}
    </ul>
  )
}

function SocialList() {
  return (
    <dl className="sns-list">
      <dt>Official Social Media</dt>
      <dd>
        {socialLinks.map((social) => (
          <a key={social.key} className={social.className} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
            <img src={social.icon} alt="" />
          </a>
        ))}
      </dd>
    </dl>
  )
}

export default function Home() {
  const splideRef = useRef<HTMLDivElement>(null)
  const [playNowOpen, setPlayNowOpen] = useState(false)
  const [aboutMovieOpen, setAboutMovieOpen] = useState(false)
  const [gameplayMovieSrc, setGameplayMovieSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!splideRef.current) return
    const splide = new Splide(splideRef.current, {
      type: 'slide',
      perPage: 1,
      speed: 600,
      rewind: true,
      arrows: true,
      pagination: true,
      drag: true,
      keyboard: 'global',
      updateOnMove: true,
    })
    splide.mount()
    return () => { splide.destroy() }
  }, [])

  return (
    <main>
      <div className="page-index">
        <section className="top-kv">
          <div className="top-kv__img">
            <picture>
              <source media="(max-width: 899.98px)" srcSet="/assets/hero/kv_sp.webp" />
              <img src="/assets/hero/kv_pc.webp" alt="" />
            </picture>
          </div>
          <div className="top-kv__left">
            <p className="-umamusume"><img src="/assets/hero/kv_txt_umamusume.svg" alt="Umamusume: Pretty Derby" /></p>
            <p className="-scroll"><img src="/assets/hero/kv_txt_scroll.svg" alt="Scroll" /></p>
          </div>
          <div className="banner-wrap">
            <div className="top-kv__banner is-PC">
              <a href="https://webstore.cygames.com/en/umamusume_en/" target="_blank" rel="noopener noreferrer">
                <div className="-hover">
                  <picture><img src="/assets/hero/kv_cygamesid_on.webp" alt="Cygames WebStore" /></picture>
                </div>
                <picture><img src="/assets/hero/kv_cygamesid_off.webp" alt="Cygames WebStore" /></picture>
              </a>
            </div>
          </div>
          <div className="top-kv__stopper" />
          <div className="top-kv__contents">
            <div className="contents-wrap">
              <picture><img className="-playnow" src="/assets/hero/kv_txt_playnow_pc.webp" alt="" /></picture>
              <StoreLinks />
              <div className="top-kv__banner is-SP">
                <a href="https://webstore.cygames.com/en/umamusume_en/" target="_blank" rel="noopener noreferrer">
                  <picture><img src="/assets/hero/kv_cygamesid_sp.webp" alt="Cygames WebStore" /></picture>
                </a>
              </div>
              <SocialList />
              <div className="tga-baged">
                <picture>
                  <source media="(max-width: 899.98px)" srcSet="/assets/hero/tga_winner_sp.webp" />
                  <img src="/assets/hero/tga_winner_pc.webp" alt="The Game Awards Best Mobile Game Winner" />
                </picture>
              </div>
            </div>
          </div>
        </section>

        <SectionGroup>
          <section className="top-news">
            <div className="top-section-box">
              <SectionTitle label="News" />
              <div className="top-section-box__contents">
                <div className="simplebar-scrollable-y">
                  <ul className="news-list">
                    {newsItems.map((item) => (
                      <li className="news-item" key={item.announce_id}>
                        <Link
                          className={`news-card${item.image ? ' -with-image' : ''}${item.update_at ? ' -with-update' : ''}`}
                          to={`/news/${item.announce_id}`}
                        >
                          {item.image && <img className="news-card__image" src={item.image} alt="" />}
                          <dl>
                            {item.update_at && (
                              <dd className="update">Update<time dateTime={item.update_at}>{formatDate(item.update_at)}</time></dd>
                            )}
                            <dd>
                              <span>{groupLabel(item.announce_label)}</span>
                              <time dateTime={item.post_at}>{formatDate(item.post_at)}</time>
                            </dd>
                            <dt>{item.title}</dt>
                          </dl>
                          <div className="detail-text">
                            <p>Details</p>
                            <svg className="-arrow" viewBox="0 0 38 42" aria-hidden="true">
                              <path d="M5.01094 36.4908L0.57554 31.5988L10.1651 21.0357L0.476196 10.3633L4.91744 5.47119L19.0476 21.0357L5.01094 36.4908Z" opacity=".5" />
                              <path d="M23.5824 36.4908L19.147 31.5988L28.7365 21.0357L19.0476 10.3633L23.4889 5.47119L37.619 21.0357L23.5824 36.4908Z" />
                            </svg>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/news/"><p>View more</p></Link>
              </div>
              <div className="top-news__bg">
                <picture>
                  <source media="(max-width: 899.98px)" srcSet="/assets/backgrounds/news_bg.avif" />
                  <img src="/assets/backgrounds/news_bg_pc.webp" alt="" />
                </picture>
              </div>
            </div>
          </section>
        </SectionGroup>

        <SectionGroup>
          <section className="top-about">
            <SectionTitle label="About" />
            <div className="top-about__contents">
              <button type="button" className="about-movie-thumb js-modal-open-about-movie" onClick={() => setAboutMovieOpen(true)} aria-label="Play About movie">
                <div className="-scale-img"><img src="/assets/backgrounds/about_bg_pc.webp" alt="" /></div>
                <div className="-play-icon" />
              </button>
            </div>
            <div className="top-about__bg">
              <picture>
                <source media="(max-width: 899.98px)" srcSet="/assets/backgrounds/about_bg_sp.webp" />
                <img src="/assets/backgrounds/about_bg_pc.webp" alt="" />
              </picture>
            </div>
          </section>
          {aboutMovieOpen && (
            <div className="modal -about-movie js-modal-about-movie">
              <VideoModal src="/assets/videos/top_about.mp4" title="About Umamusume: Pretty Derby" onClose={() => setAboutMovieOpen(false)} />
            </div>
          )}
        </SectionGroup>

        <SectionGroup>
          <section className="top-gameplay">
            <SectionTitle label="Gameplay" />
            <div className="top-gameplay__contents">
              <div className="splide js-gameplay-slide" id="splide01" ref={splideRef} aria-label="Gameplay">
                <div className="splide__track" id="splide01-track">
                  <ul className="splide__list">
                    {gameplaySlides.map((slide, index) => (
                      <li className={`splide__slide slide-${index + 1}`} key={slide.character.slug}>
                        <div className="-umamusume">
                          <img src={slide.characterImg} alt={slide.character.subject} />
                        </div>
                        <div className="-wrapper">
                          <div className="-left-contents">
                            <div className="-headline">
                              <img src={slide.headlineSvg} alt="Train to win" />
                            </div>
                            <ul className="-images-list">
                              <li>
                                <button
                                  type="button"
                                  className="gameplay-movie-thumb js-modal-open-gameplay-movie"
                                  onClick={() => setGameplayMovieSrc(slide.movieSrc)}
                                  aria-label="Play gameplay movie"
                                >
                                  <div className="-play-icon" />
                                  <div className="-scale-img">
                                    <picture>
                                      <source media="(max-width: 899.98px)" srcSet={slide.images[0].sp} />
                                      <img src={slide.images[0].pc} alt="" />
                                    </picture>
                                  </div>
                                </button>
                              </li>
                              <li>
                                <picture>
                                  <source media="(max-width: 899.98px)" srcSet={slide.images[1].sp} />
                                  <img src={slide.images[1].pc} alt="" />
                                </picture>
                              </li>
                            </ul>
                          </div>
                          <div className="-right-contents">
                            <div className="-text line-break">{slide.text}</div>
                            <div className="-frame">
                              <img src="/assets/gameplay_frame.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="splide__arrows splide__arrows--ltr">
                  <button type="button" className="splide__arrow splide__arrow--prev" aria-label="Previous" />
                  <button type="button" className="splide__arrow splide__arrow--next" aria-label="Next" />
                </div>
              </div>
              <div className="top-gameplay__bg">
                <img src="/assets/backgrounds/gameplay_bg_pc.webp" alt="" />
              </div>
            </div>
          </section>
          {gameplayMovieSrc && (
            <div className="modal -gameplay-movie js-modal-gameplay-movie">
              <VideoModal src={gameplayMovieSrc} title="Gameplay" onClose={() => setGameplayMovieSrc(null)} />
            </div>
          )}
        </SectionGroup>

        <SectionGroup>
          <section className="top-characters">
            <div className="top-section-box">
              <SectionTitle label="Characters" />
              <div className="top-section-box__contents">
                <Link to="/characters/" className="top-section-box__link">
                  <div className="-hover"><p>Explore</p></div>
                  <div className="-arrow" />
                  <ul className="top-characters__list -scale-img">
                    {homeCharacters.map((character, index) => (
                      <li
                        className={`chara${index + 1}${index >= 10 ? ' is-PC' : ''}`}
                        key={character.slug}
                      >
                        <div
                          className="characters-top-thumb"
                          style={{
                            '--color-characters-main': character.color.main,
                            '--color-characters-sub': character.color.sub,
                          } as CSSProperties}
                        >
                          <div className="-img">
                            <img src={character.topThumb} alt={character.subject} />
                          </div>
                          <p className="-name line-break">{character.subject}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Link>
              </div>
            </div>
          </section>
        </SectionGroup>

        <SectionGroup>
          <section className="top-media">
            <div className="top-section-box">
              <SectionTitle label="Media" />
              <div className="top-section-box__contents">
                <Link to="/media/" className="top-section-box__link">
                  <div className="-hover"><p>Explore</p></div>
                  <div className="-arrow" />
                  <div className="-scale-img">
                    <img src="/assets/gallery/media_image.webp" alt="Media" />
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </SectionGroup>
      </div>
      <PlayNowModal isOpen={playNowOpen} onClose={() => setPlayNowOpen(false)} />
    </main>
  )
}

