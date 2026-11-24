import { useEffect } from 'react'
import { storeLinks } from '../data/site'

type PlayNowModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function PlayNowModal({ isOpen, onClose }: PlayNowModalProps) {
  useEffect(() => {
    if (!isOpen) return
    document.body.classList.add('c-modal-fixed')
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('c-modal-fixed')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="c-modal c-modal-open-anime" role="dialog" aria-modal="true" aria-label="Play Now">
      <div className="c-modal__bg" onClick={onClose} />
      <div className="c-modal__body">
        <div className="c-modal__main">
          <div className="c-modal__contents">
            <div className="playnow-modal">
              <div className="playnow-modal__header">
                <p>Play Now!</p>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close">
                  <img src="/assets/icons/close.svg" alt="" />
                </button>
              </div>
              <div className="playnow-modal__body">
                <div>
                  <img className="-logo" src="/assets/icons/logo_umamusume.png" alt="Umamusume: Pretty Derby" />
                  <img className="-app-icon" src="/assets/icons/app_icon.png" alt="" />
                </div>
                <ul className="store-list">
                  {storeLinks.map((store) => (
                    <li key={store.key}>
                      <a href={store.url} target="_blank" rel="noopener noreferrer">
                        <img className="-badge" src={store.icon} alt={store.alt} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
