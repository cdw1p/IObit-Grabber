const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

async function main () {
  const browser  = await puppeteer.launch({ headless: true, args: ['--disable-notifications'] });
  const [page]   = await browser.pages()
  const response = await page.goto('http://ld.iobit.com/en/giveawaycovid-19.php', { timeout: 120000, waitUntil: 'networkidle0' })

  const $ = cheerio.load(await response.text())
  let dataText = []
  let dataCode = []
  $('div.content > h2').each(function(i) { dataText.push($(this).text()) })
  $('div.code').each(function(i) { dataCode.push($(this).text()) })

  for (var i=0; i<dataText.length; i++) {
    console.log(`${dataText[i]} - ${dataCode[i]}`)
  }

  await browser.close()
}

main()