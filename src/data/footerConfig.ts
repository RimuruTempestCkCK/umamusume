export interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
  className?: string
}

export interface SocialLink {
  name: string
  href: string
  icon: string
  className?: string
}

export interface StoreBadge {
  name: string
  href: string
  badgeImage: string
}

export interface FooterConfig {
  showBackToTop: boolean
  downloadSection: {
    enabled: boolean
    title: string
    appIcon: string
    stores: StoreBadge[]
    notes: string[]
  }
  socialMedia: {
    enabled: boolean
    title: string
    links: SocialLink[]
  }
  navLinks: FooterLink[]
  copyright: {
    logoUrl?: string
    logoLink?: string
    logoAlt?: string
    companyText?: string
    copyrightImage?: string
    copyrightText?: string
  }
}

export const defaultFooterConfig: FooterConfig = {
  showBackToTop: true,
  downloadSection: {
    enabled: true,
    title: 'Download',
    appIcon: 'https://parts.umamusume.com/assets/images/app_icon.png',
    stores: [
      {
        name: 'Steam',
        href: 'https://store.steampowered.com/app/3224770/',
        badgeImage: 'https://parts.umamusume.com/assets/images/badge-steam.png'
      },
      {
        name: 'Download on the App Store',
        href: 'https://apps.apple.com/us/app/umamusume-pretty-derby/id6480433538',
        badgeImage: 'https://parts.umamusume.com/assets/images/badge-appstore.png'
      },
      {
        name: 'GET IT ON Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.cygames.umamusume&utm_source=umamusume.com&utm_medium=referral&utm_campaign=organic',
        badgeImage: 'https://parts.umamusume.com/assets/images/badge-googleplay.png'
      },
      {
        name: 'PLAY ON PC Google Play Games',
        href: 'https://play.google.com/store/apps/details?id=com.cygames.umamusume&hl=en_GB',
        badgeImage: 'https://parts.umamusume.com/assets/images/badge-googleplaygames.png'
      }
    ],
    notes: [
      'Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries and regions.',
      'Google Play and the Google Play logo are trademarks of Google LLC.',
      '©2025 Valve Corporation. Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation in the U.S. and/or other countries.'
    ]
  },
  socialMedia: {
    enabled: true,
    title: 'Official Social Media',
    links: [
      {
        name: 'X',
        href: 'https://x.com/umamusume_eng',
        icon: 'https://parts.umamusume.com/assets/images/sns-x.svg',
        className: 'sns-x'
      },
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/umamusume.eng',
        icon: 'https://parts.umamusume.com/assets/images/sns-facebook.svg',
        className: 'sns-facebook'
      },
      {
        name: 'YouTube',
        href: 'https://www.youtube.com/@umamusume_eng',
        icon: 'https://parts.umamusume.com/assets/images/sns-youtube.svg',
        className: 'sns-youtube'
      },
      {
        name: 'Discord',
        href: 'https://discord.gg/umamusume-eng',
        icon: 'https://parts.umamusume.com/assets/images/sns-discord.svg',
        className: 'sns-discord'
      }
    ]
  },
  navLinks: [
    { label: 'Recommended Devices', href: '/devices/', className: 'devices' },
    { label: 'About This Website', href: '/about/', className: 'about' },
    { label: 'Privacy Policy', href: '/policy/', className: 'policy' },
    { label: 'California Privacy Notice', href: '/policy/#addendum_for_residents_of_california', className: 'california' },
    { label: 'Your Privacy Choices', href: '/privacy-choices/', className: 'privacyChoices' },
    { label: 'Terms of Use & Copyrights', href: '/terms/', className: 'terms' },
    { label: 'Contact Us & FAQ', href: 'https://support.umamusume.com', isExternal: true, className: 'faq' },
    { label: 'Fan-Created Content Guidelines', href: '/fan-createdguide/', className: 'fanCreatedGuide' },
    { label: 'Guidelines for Visiting Stables in Japan', href: '/visitingstables-guidelines/', className: 'visitingStablesGuidelines' }
  ],
  copyright: {
    logoUrl: 'https://parts.cygames.co.jp/assets/images/logo_cygames.svg',
    logoLink: 'https://www.cygames.co.jp/en/',
    logoAlt: 'Cygames',
    companyText: '',
    copyrightImage: 'https://parts.cygames.co.jp/assets/images/cygames_copyright_regular.svg',
    copyrightText: '© Cygames, Inc.'
  }
}
