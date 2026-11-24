import { useEffect } from 'react'

export default function SteamLP() {
  useEffect(() => {
    document.body.classList.add('page-promotion-steam_lp')
    return () => document.body.classList.remove('page-promotion-steam_lp')
  }, [])

  return (
    <main id="main">
      <section className="steam_lp">
        <div className="steam_lp__header">
          <a href="/" className="-logo" aria-label="Home">
            <picture>
              <source
                srcSet="https://umamusume.com/_app/immutable/assets/logo_umamusume_1st.DnaEsmx_.avif 359w, https://umamusume.com/_app/immutable/assets/logo_umamusume_1st.BYxIY8fL.avif 718w"
                type="image/avif"
              />
              <source
                srcSet="https://umamusume.com/_app/immutable/assets/logo_umamusume_1st.LAITqv8U.webp 359w, https://umamusume.com/_app/immutable/assets/logo_umamusume_1st.BNW5bcr1.webp 718w"
                type="image/webp"
              />
              <img
                src="https://umamusume.com/_app/immutable/assets/logo_umamusume_1st.eX2KDqZj.png"
                alt="Umamusume: Pretty Derby"
                width="718"
                height="316"
              />
            </picture>
          </a>
          <img
            src="https://parts.cygames.co.jp/assets/images/logo_steam.svg"
            alt="STEAM"
            className="-steam"
          />
        </div>

        <div className="steam_lp__main">
          <div className="-text">1st Anniversary Event Underway!</div>
          <a
            href="https://store.steampowered.com/app/3224770/?utm_source=umamusume.com&utm_medium=referral&utm_campaign=202509_steam_lp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Play for Free on Steam</p>
          </a>
        </div>

        <video
          className="steam_lp__video"
          width="250"
          loop
          muted
          autoPlay
          playsInline
          controlsList="nodownload"
        >
          <source src="https://umamusume.com/assets/videos/kv_bg.mp4#t=0.1" type="video/mp4" />
        </video>
      </section>
    </main>
  )
}
