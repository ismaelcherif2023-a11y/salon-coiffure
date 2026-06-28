import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [coiffure, setCoiffure] = useState(null)
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    dateHeure: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get('/coiffures').then(res => {
      const found = res.data.find(c => c.id === parseInt(id))
      setCoiffure(found)
    })
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/rendezvous', {
        ...form,
        coiffureId: id
      })
      setMessage('Rendez-vous confirmé ! Nous vous attendons.')
      setTimeout(() => navigate('/'), 3000)
    } catch (err) {
      setMessage('Erreur lors de la réservation.')
    }
  }

  if (!coiffure) return <p style={{ padding: '2rem' }}>Chargement...</p>

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h2>Réserver — {coiffure.nom}</h2>
      <p>{coiffure.description}</p>
      <p style={{ fontWeight: 'bold', color: '#2a9d8f' }}>{coiffure.prix} €</p>

      {message && (
        <div style={{ background: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required
          style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd' }} />
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required
          style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd' }} />
        <input name="telephone" placeholder="Numéro de téléphone" value={form.telephone} onChange={handleChange} required
          style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd' }} />
        <input name="dateHeure" type="datetime-local" value={form.dateHeure} onChange={handleChange} required
          style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd' }} />
        <button type="submit"
          style={{ background: '#2a9d8f', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}>
          Confirmer le rendez-vous
        </button>
        <button type="button" onClick={() => navigate('/')}
          style={{ background: '#eee', border: 'none', padding: '0.8rem', borderRadius: '6px', cursor: 'pointer' }}>
          Retour
        </button>
      </form>
    </div>
  )
}
