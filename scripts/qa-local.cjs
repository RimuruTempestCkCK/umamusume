const fs = require('fs')
const { chromium } = require('playwright-core')

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE = 'http://127.0.0.1:5173'
const OUT = 'C:\\Users\\Maxtop\\AppData\\Local\\Temp\\opencode\\screenshots'
const viewports = [
  { width: 1920, height: 1080, label: '1920x1080' },
  { width: 1440, height: 900, label: '1440x900' },
  { width: 1366, height: 768, label: '1366x768' },
  { width: 768, height: 1024, label: '768x1024' },
  { width: 390, height: 844, label: '390x844' },
  { width: 360, height: 800, label: '360x800' },
]

async function waitReady(page) {
  await page.waitForFunction(() => !document.querySelector('#loading') && document.body.classList.contains('loaded'), null, { timeout: 20000 })
  await page.waitForTimeout(500)
}

async function collect(page) {
  return page.evaluate(() => {
    const fmt = (n) => Math.round(n * 10) / 10
    const box = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: fmt(r.x), y: fmt(r.y), w: fmt(r.width), h: fmt(r.height) }
    }
    const css = (selector, props) => {
      const el = document.querySelector(selector)
      if (!el) return null
      const s = getComputedStyle(el)
      return Object.fromEntries(props.map((p) => [p, s[p]]))
    }
    const selectors = [
      'body', '.umamusume-en-header', 'main', '.page-index', '.top-kv', '.top-news',
      '.top-about', '.top-gameplay', '.top-characters', '.top-media', '.umamusume-en-footer',
      '#splide01', '#splide01-track', '.splide__pagination', '.about-movie-thumb',
      '.top-characters__list li.chara1', '.news-item', '.footer__download',
    ]
    return {
      scrollHeight: document.documentElement.scrollHeight,
      boxes: Object.fromEntries(selectors.map((selector) => [selector, box(document.querySelector(selector))])),
      bodyStyle: css('body', ['backgroundColor', 'backgroundImage', 'fontFamily', 'color', 'overflowX']),
      headerStyle: css('.umamusume-en-header', ['position', 'height', 'maxWidth', 'transform', 'zIndex']),
      titleStyle: css('.top-news .section-title', ['clipPath', 'height', 'backgroundColor']),
      counts: {
        sections: document.querySelectorAll('section').length,
        newsItems: document.querySelectorAll('.news-item').length,
        slides: document.querySelectorAll('.splide__slide').length,
        pagination: document.querySelectorAll('.splide__pagination__page').length,
        characters: document.querySelectorAll('.top-characters__list li').length,
        storeBadges: document.querySelectorAll('.store-list .-badge').length,
        loading: document.querySelectorAll('#loading').length,
      },
      textNodes: Array.from(document.querySelectorAll('.page-index > *, .page-index section'))
        .map((el) => (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50))
        .filter(Boolean)
        .slice(0, 12),
      activeSlide: document.querySelector('.splide__slide.is-active')?.querySelector('.-headline')?.textContent || null,
    }
  })
}

;(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] })
  const report = { date: new Date().toISOString(), viewports: {}, routes: {}, interactions: {} }

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 })
    const errors = []
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`) })
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
    page.on('requestfailed', (request) => errors.push(`requestfailed: ${request.url()} ${request.failure()?.errorText || ''}`))
    try {
      const response = await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await waitReady(page)
      report.viewports[viewport.label] = {
        status: response.status(),
        ...(await collect(page)),
        errors,
      }
      await page.screenshot({ path: `${OUT}\\local-${viewport.label}.png`, fullPage: viewport.label === '1440x900' })
    } catch (error) {
      report.viewports[viewport.label] = { error: error.message, errors }
    }
    await page.close()
  }

  const routes = [
    '/', '/news/', '/news/100122', '/characters/', '/characters/specialweek', '/media/',
    '/about/', '/devices/', '/policy/', '/privacy-choices/', '/terms/', '/fan-createdguide/',
    '/visitingstables-guidelines/', '/promotion/steam_lp/', '/error/404', '/does-not-exist',
  ]
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  for (const route of routes) {
    const errors = []
    const onConsole = (msg) => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`) }
    const onPageError = (error) => errors.push(`pageerror: ${error.message}`)
    page.on('console', onConsole)
    page.on('pageerror', onPageError)
    try {
      const response = await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await waitReady(page)
      report.routes[route] = {
        status: response.status(),
        title: await page.title(),
        h1: await page.locator('h1').first().textContent().catch(() => null),
        errors,
      }
    } catch (error) {
      report.routes[route] = { error: error.message, errors }
    }
    page.off('console', onConsole)
    page.off('pageerror', onPageError)
  }
  await page.close()

  const interactionPage = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await interactionPage.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await waitReady(interactionPage)
  try {
    await interactionPage.click('.header__wrapper nav li.playnow a')
    report.interactions.playNow = { opened: await interactionPage.locator('.playnow-modal').isVisible() }
    await interactionPage.click('.playnow-modal__header .btn-close')
    report.interactions.playNow.closed = await interactionPage.locator('.playnow-modal').count() === 0

    await interactionPage.evaluate(() => document.querySelector('.top-about')?.scrollIntoView({ behavior: 'instant', block: 'center' }))
    await interactionPage.waitForTimeout(800)
    await interactionPage.click('.about-movie-thumb')
    report.interactions.aboutMovie = { opened: await interactionPage.locator('.-about-movie').isVisible() }
    await interactionPage.keyboard.press('Escape')
    await interactionPage.waitForTimeout(300)
    report.interactions.aboutMovie.closed = await interactionPage.locator('.-about-movie').count() === 0

    await interactionPage.evaluate(() => document.querySelector('.top-gameplay')?.scrollIntoView({ behavior: 'instant', block: 'center' }))
    await interactionPage.waitForTimeout(800)
    const before = await interactionPage.locator('.splide__slide.is-active .-headline').textContent()
    await interactionPage.click('.splide__arrows .splide__arrow--next')
    await interactionPage.waitForTimeout(800)
    const after = await interactionPage.locator('.splide__slide.is-active .-headline').textContent()
    report.interactions.gameplay = { before, after, changed: before !== after }
  } catch (error) {
    report.interactions.error = error.message
  }
  await interactionPage.close()

  await browser.close()
  fs.writeFileSync(`${OUT}\\qa-local.json`, JSON.stringify(report, null, 2))
  console.log(JSON.stringify({
    viewportErrors: Object.fromEntries(Object.entries(report.viewports).map(([k, v]) => [k, v.errors?.length ?? -1])),
    routeErrors: Object.fromEntries(Object.entries(report.routes).map(([k, v]) => [k, v.errors?.length ?? -1])),
    interactions: report.interactions,
  }, null, 2))
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
