import charactersRaw from './characters.json'
import characterDetailsRaw from './characterDetails.json'
import mediaRaw from './media.json'

type CharacterDetails = {
  list_thumb: string
  top_thumb: string
  visual: { image: string; name: { label: string }; thumb: string }[]
  voice: string | null
  download: { icon?: string; banner?: string } | null
}

export type Character = {
  subject: string
  slug: string
  color: { main: string; sub: string }
  profile: {
    catch: string
    va: string
    birthday?: string
    height?: string
    weight?: string
    detail: string
    movie_id?: string
  }
  listThumb: string
  topThumb: string
  official: CharacterDetails
  group: 'umamusume' | 'other'
}

const detailsBySlug = characterDetailsRaw as Record<string, CharacterDetails>

const toCharacter = (raw: (typeof charactersRaw.umamusume)[number] | (typeof charactersRaw.other)[number], group: Character['group']): Character => ({
  subject: raw.subject,
  slug: raw.slug,
  color: raw.color,
  profile: raw.profile,
  listThumb: `/assets/characters/${raw.slug}_list.png`,
  topThumb: `/assets/characters/${raw.slug}_top.png`,
  official: detailsBySlug[raw.slug],
  group,
})

export const characters: Character[] = [
  ...charactersRaw.umamusume.map((c) => toCharacter(c, 'umamusume')),
  ...charactersRaw.other.map((c) => toCharacter(c, 'other')),
]

export const umamusume = characters.filter((c) => c.group === 'umamusume')
export const otherCharacters = characters.filter((c) => c.group === 'other')

export type MediaItem = {
  subject: string
  image: string
  links: { url: string; title: string }[]
}

const toMedia = (raw: (typeof mediaRaw.anime)[number] | (typeof mediaRaw.music)[number], group: 'anime' | 'music', index: number): MediaItem => ({
  subject: raw.subject,
  image: `/assets/gallery/${group}_${String(index + 1).padStart(2, '0')}.${raw.image.includes('.png') ? 'png' : 'jpg'}`,
  links: 'links' in raw ? raw.links : raw.link ? [{ url: raw.link, title: 'Listen' }] : [],
})

export const mediaAnime: MediaItem[] = mediaRaw.anime.map((item, i) => toMedia(item, 'anime', i))
export const mediaMusic: MediaItem[] = mediaRaw.music.map((item, i) => toMedia(item, 'music', i))

export const navLinks = [
  { label: 'Top', to: '/' },
  { label: 'News', to: '/news/' },
  { label: 'Characters', to: '/characters/' },
  { label: 'Media', to: '/media/' },
  { label: 'WebStore', to: 'https://webstore.cygames.com/en/umamusume_en/', external: true },
]

export const storeLinks = [
  { key: 'steam', url: 'https://store.steampowered.com/app/3224770/', alt: 'Steam', icon: '/assets/icons/badge-steam.png' },
  { key: 'appstore', url: 'https://apps.apple.com/us/app/umamusume-pretty-derby/id6480433538', alt: 'Download on the App Store', icon: '/assets/icons/badge-appstore.png' },
  { key: 'googleplay', url: 'https://play.google.com/store/apps/details?id=com.cygames.umamusume&utm_source=umamusume.com&utm_medium=referral&utm_campaign=organic', alt: 'GET IT ON Google Play', icon: '/assets/icons/badge-googleplay.png' },
  { key: 'googleplaygames', url: 'https://play.google.com/store/apps/details?id=com.cygames.umamusume&hl=en_GB', alt: 'PLAY ON PC Google Play Games', icon: '/assets/icons/badge-googleplaygames.png' },
]

export const socialLinks = [
  { key: 'x', label: 'X', href: 'https://x.com/umamusume_eng', className: 'sns-x', icon: '/assets/icons/sns-x.svg' },
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/umamusume.eng', className: 'sns-facebook', icon: '/assets/icons/sns-facebook.svg' },
  { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@umamusume_eng', className: 'sns-youtube', icon: '/assets/icons/sns-youtube.svg' },
  { key: 'discord', label: 'Discord', href: 'https://discord.gg/umamusume-eng', className: 'sns-discord', icon: '/assets/icons/sns-discord.svg' },
]

export const footerLinks = [
  { label: 'Recommended Devices', to: '/devices/' },
  { label: 'About This Website', to: '/about/' },
  { label: 'Privacy Policy', to: '/policy/' },
  { label: 'California Privacy Notice', to: '/policy/#addendum_for_residents_of_california' },
  { label: 'Your Privacy Choices', to: '/privacy-choices/' },
  { label: 'Terms of Use & Copyrights', to: '/terms/' },
  { label: 'Contact Us & FAQ', to: 'https://support.umamusume.com' },
  { label: 'Fan-Created Content Guidelines', to: '/fan-createdguide/' },
  { label: 'Guidelines for Visiting Stables in Japan', to: '/visitingstables-guidelines/' },
]
