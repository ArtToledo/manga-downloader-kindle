const puppeteer = require('puppeteer')
const userAgent = require('user-agents')

module.exports = {
  async pegaLinksDasImagensNoSite(linkManga) {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
  
    await page.setUserAgent(userAgent.toString())
    await page.goto(linkManga)
    await page.waitForSelector('.page-navigation')
  
    const tituloManga = await page.title()
  
    //Pegando quantidade total de paginas
    let totalDePaginas = await page.evaluate(el => el.innerHTML, await page.$('.page-navigation em:nth-child(2)'))
    totalDePaginas = Number(totalDePaginas)
  
    let linkDasFotosDasPaginas = []
    for (let index = 0; index < totalDePaginas; index += 1) {
      if (index !== 0) {
        await page.waitForSelector('.page-next')
        await page.click('.page-next')
        await page.waitForSelector('.manga-image picture img')
      }
  
      const linkImagem = await page.evaluate(el => el.src, await page.$('.manga-image picture img'))
      linkDasFotosDasPaginas.push(linkImagem)
    }
  
    await browser.close()
    return {
      links: linkDasFotosDasPaginas,
      nomeManga: tituloManga
    }
  }
}
