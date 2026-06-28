const express = require('express')
const router = express.Router()
const prisma = require('../prismaClient')
const { notifierProprietaire } = require('../services/mailer')

router.post('/', async (req, res) => {
  try {
    const { nom, prenom, telephone, coiffureId, dateHeure } = req.body

    const client = await prisma.client.create({
      data: { nom, prenom, telephone }
    })

    const rdv = await prisma.rendezVous.create({
      data: {
        clientId: client.id,
        coiffureId: parseInt(coiffureId),
        dateHeure: new Date(dateHeure),
        statut: 'en_attente'
      },
      include: {
        client: true,
        coiffure: true
      }
    })

    notifierProprietaire(rdv).catch(err => console.error('Email error:', err))
    res.json({ message: 'Rendez-vous créé', rdv })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

router.get('/', async (req, res) => {
  try {
    const rdvs = await prisma.rendezVous.findMany({
      include: {
        client: true,
        coiffure: true
      },
      orderBy: { dateHeure: 'asc' }
    })
    res.json(rdvs)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const { statut } = req.body
    const rdv = await prisma.rendezVous.update({
      where: { id: parseInt(req.params.id) },
      data: { statut }
    })
    res.json(rdv)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await prisma.rendezVous.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Rendez-vous supprimé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router