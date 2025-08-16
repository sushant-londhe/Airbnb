const express = require('express')
const router = express.Router()

const nodeMailer = require('nodemailer')

router.post('/send-email', async (request, response) => {
  const { emailAddress, subject, body } = request.body

  // create a transport
  const transport = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: '',
    },
  })

  // send email
  const result = await transport.sendMail({
    from: '',
    to: emailAddress,
    subject,
    html: body,
  })

  response.send('ok')
})

module.exports = router
