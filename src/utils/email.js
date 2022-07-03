const nodemailer = require ('nodemailer')

const criarTransportador = () => {
  const transportador = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
      user: process.env.EMAIL, 
      pass: process.env.SENHA
    } 
  })

  return transportador
}

module.exports = {
  async enviarEmail(nomeManga, destinatario, nomeArquivo, caminhoDoArquivo) {
    return new Promise((resolve, reject) => {
      const transportador = criarTransportador()
      const mailOptions = {
        from: process.env.EMAIL,
        to: destinatario,
        subject: `Download do Mangá - ${nomeManga}`,
        html: '<p>Obrigado por baixar mangá conosco!</p>',
        attachments: [
          {
            filename: nomeArquivo,
            path: caminhoDoArquivo,
          }
        ]
      }

      transportador.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err)
          resolve(false)
        } else {
          console.log(info)
          resolve(true)
        }
      })

    })
  }
}
