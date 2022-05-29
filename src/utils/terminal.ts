import { prompt } from 'enquirer'
import { RespostaLinkTerminal } from 'src/types'
 
const perguntaLink = async () => {
  const response: RespostaLinkTerminal = await prompt({
    type: 'input',
    name: 'link',
    message: 'Qual o link do mangá? '
  })

  return response.link
}

export { perguntaLink }
