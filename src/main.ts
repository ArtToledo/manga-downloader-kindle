/* require('dotenv').config()
import { 
  perguntaLink, 
  pegaLinksDasImagensNoSite, 
  criarPastaDestino,
  baixarImagens,
  criarMangaFormatoPDF
} from './utils'
 
const load = async () => {
  const link = await perguntaLink()
  const resposta = await pegaLinksDasImagensNoSite(link)
  
  criarPastaDestino()
  const caminhoDasImagensBaixadas = await baixarImagens(resposta.links)
  criarMangaFormatoPDF(caminhoDasImagensBaixadas, resposta.nomeManga)
}
 
load()
 */

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

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
  };
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  };
});
