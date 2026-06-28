const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY
  }
})

async function notifierProprietaire(rdv) {
  await transporter.sendMail({
    from: '"Royal Cut" <cherifismaelfr@gmail.com>',
    to: process.env.PROPRIETAIRE_EMAIL,
    subject: '🔔 Nouveau rendez-vous — Royal Cut',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 10px;">
        <h2 style="color: #C9A84C; border-bottom: 1px solid #C9A84C; padding-bottom: 10px;">✦ Nouveau rendez-vous</h2>
        <table style="width: 100%; margin-top: 20px;">
          <tr>
            <td style="color: #888; padding: 8px 0;">Client</td>
            <td style="color: #fff; font-weight: bold;">${rdv.client.prenom} ${rdv.client.nom}</td>
          </tr>
          <tr>
            <td style="color: #888; padding: 8px 0;">Téléphone</td>
            <td style="color: #fff;">${rdv.client.telephone}</td>
          </tr>
          <tr>
            <td style="color: #888; padding: 8px 0;">Coiffure</td>
            <td style="color: #C9A84C; font-weight: bold;">${rdv.coiffure.nom}</td>
          </tr>
          <tr>
            <td style="color: #888; padding: 8px 0;">Prix</td>
            <td style="color: #fff;">${rdv.coiffure.prix} €</td>
          </tr>
          <tr>
            <td style="color: #888; padding: 8px 0;">Date et heure</td>
            <td style="color: #fff;">${new Date(rdv.dateHeure).toLocaleString('fr-FR')}</td>
          </tr>
        </table>
        <div style="margin-top: 30px; padding: 15px; background: #111; border-radius: 8px; border: 1px solid #C9A84C33;">
          <p style="color: #888; font-size: 13px; margin: 0;">Royal Cut — Château Rouge, Paris 18ème</p>
        </div>
      </div>
    `
  })
}

module.exports = { notifierProprietaire }