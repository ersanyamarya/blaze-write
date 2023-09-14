import { logger } from '@ersanyamarya/common-node-utils'
import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'
import puppeteer from 'puppeteer'
import { YoutubeTranscript } from 'youtube-transcript'
const isLinkYoutube = (link: string) => {
  return link.includes('youtube.com')
}

async function scrapeDataFromUrl(url: string): Promise<string> {
  logger.info('----------------- Scrape: Starting ----------------- ')
  logger.info(`Scraping ${url}`)
  if (isLinkYoutube(url)) {
    const transcript = await YoutubeTranscript.fetchTranscript(url)
    return transcript.map(t => t.text).join(' ')
  } else {
    const browser = await puppeteer.launch({
      headless: 'new',
    })

    const page = await browser.newPage()
    await page.goto(url)
    const content = await page.content()
    const doc = new JSDOM(content, {
      url,
    })
    await browser.close()
    const reader = new Readability(doc.window.document)
    const article = reader.parse().textContent

    logger.info('----------------- Scrape: Done ----------------- ')
    return article.replace(/\s\s+/g, ' ').replace(/\n/g, ' ').replace(/\t/g, ' ').replace(/\r/g, ' ').toString()
  }
}

export { isLinkYoutube, scrapeDataFromUrl }
