const express = require('express')
const router = express.Router()
const prisma = require('../prismaClient')
const upload = require('../middlewares/upload')

// Liste toutes les coiffures
router.get('/', async (req, res) => {
  try {
    const coiffures = await prisma.coiffure.findMany()
    res.json(coiffures)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Ajouter une coiffure avec image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { nom, description, prix } = req.body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null
    const coiffure = await prisma.coiffure.create({
      data: { nom, description, prix: parseFloat(prix), imageUrl }
    })
    res.json(coiffure)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Supprimer une coiffure
router.delete('/:id', async (req, res) => {
  try {
    await prisma.coiffure.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Coiffure supprimée' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router