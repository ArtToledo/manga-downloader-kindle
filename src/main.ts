require('dotenv').config()
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
