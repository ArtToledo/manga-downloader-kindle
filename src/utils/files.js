const { existsSync, mkdirSync, createWriteStream, unlinkSync } = require('fs')
const { resolve } = require('path')
const axios = require('axios')
const PDFDocument = require('pdfkit')
const sizeOf = require('image-size')

const downloadArquivo = async (url, caminhoArquivo) => {
  try {
    const writer = createWriteStream(caminhoArquivo)
    const response = await axios({
      url: encodeURI(url),
      method: 'GET',
      responseType: 'stream',
    })

    response.data.pipe(writer)
    return new Promise((resolve) => {
      writer.on('finish', () => {
        resolve('OK')
      })
    })
  } catch (erro) {
    return new Promise((resolve, reject) => {
      reject('Arquivo não encontrado')
    })
  }
}

module.exports = {
  criarPastaDestino() {
    const dir = process.env.DESTINO_MANGAS
    if (!existsSync(dir)) mkdirSync(dir)
  },
  
  async baixarImagens(links) {
    let caminhoArquivosCriados = []
    for (const [index, link] of links.entries()) {
      const caminhoArquivo = resolve(process.env.DESTINO_MANGAS, `imagem-manga-temp-${index}.jpg`)
      caminhoArquivosCriados.push(caminhoArquivo)
  
      const resposta = await downloadArquivo(link, caminhoArquivo)
      if (resposta !== 'OK') throw new Error('Erro ao baixar imagens do mangá')
    }
  
    return caminhoArquivosCriados
  },

  criarMangaFormatoPDF(caminhoDasImagens, nomeManga) {
    const manga = new PDFDocument({
      autoFirstPage: false,
      size: [960, 1481],
      compress: true,
    })
    manga.pipe(createWriteStream(resolve(process.env.DESTINO_MANGAS, `${nomeManga}.pdf`)))
  
    for (const imagem of caminhoDasImagens) {
      const dimensoes = sizeOf(imagem)
      manga
        .addPage({ margin: 0, size: [dimensoes.width, dimensoes.height] })
        .image(imagem, 0, 0, {
            height: manga.page.height,
        })
  
      unlinkSync(imagem)
    }
  
    manga.end()
  }
}
