import { useEffect, useState } from 'react'

export default function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const [closing, setClosing] = useState(false)

  const close = () => {
    setClosing(true)
    window.setTimeout(onClose, 200)
  }

  useEffect(() => {
    document.body.classList.add('c-modal-fixed')
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('c-modal-fixed')
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className={`c-modal ${closing ? 'c-modal-close-anime' : 'c-modal-open-anime'}`} role="presentation">
      <div className="c-modal__bg" onClick={close} />
      <div className="c-modal__body">
        <div className="c-modal__main">
          <div className="c-modal__contents">
            <div className="video-modal">
              <button type="button" className="btn-close" aria-label="Close" onClick={close}>
                <img src="/assets/icons/close.svg" alt="" />
              </button>
              <video src={src} controls autoPlay playsInline />
              <p>{title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
