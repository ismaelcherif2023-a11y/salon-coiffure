const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prismaClient')

// Login admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) return res.status(401).json({ message: 'Email ou mot de passe incorrect' })

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) return res.status(401).json({ message: 'Email ou mot de passe incorrect' })

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '24h' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Créer admin (une seule fois)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const admin = await prisma.admin.create({ data: { email, password: hash } })
    res.json({ message: 'Admin créé', id: admin.id })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router