require('dotenv').config()
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const { pegaLinksDasImagensNoSite } = require('./utils/web-scrapping')
const { enviarEmail } = require('./utils/email')
const {
  criarPastaDestino,
  baixarImagens,
  criarMangaFormatoPDF
} = require('./utils/files')

// variaveis para funcionamento do electron
var win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 629,
    title: 'Mangá Downloader',
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.removeMenu();
  win.loadFile(path.resolve(__dirname, 'pages', 'home.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


ipcMain.on('activeSystem', async (event, arg) => {
  const { email, urlManga } = arg;
  await iniciaDownload(email, urlManga)
})

const iniciaDownload = async (email, urlManga) => {
  const resposta = await pegaLinksDasImagensNoSite(urlManga)
  
  criarPastaDestino()
  const caminhoDasImagensBaixadas = await baixarImagens(resposta.links)
  const {
    nomeArquivo,
    caminhoArquivo
  } = criarMangaFormatoPDF(caminhoDasImagensBaixadas, resposta.nomeManga)
  
  await enviarEmail(
    resposta.nomeManga,
    email,
    nomeArquivo,
    caminhoArquivo
  )
}
