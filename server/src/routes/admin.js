const express = require('express')
const router = express.Router()
const prisma = require('../prismaClient')
const jwt = require('jsonwebtoken')

// Middleware protection admin
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token manquant' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' })
  }
}

// Stats dashboard
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const totalRdv = await prisma.rendezVous.count()
    const rdvEnAttente = await prisma.rendezVous.count({ where: { statut: 'en_attente' } })
    const rdvConfirmes = await prisma.rendezVous.count({ where: { statut: 'confirme' } })
    const totalClients = await prisma.client.count()
    res.json({ totalRdv, rdvEnAttente, rdvConfirmes, totalClients })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Liste des clients
router.get('/clients', authMiddleware, async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: { rendezvous: true }
    })
    res.json(clients)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router