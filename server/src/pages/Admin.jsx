import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Admin() {
  const [rdvs, setRdvs] = useState([])
  const [stats, setStats] = useState({ totalRdv: 0, rdvEnAttente: 0, rdvConfirmes: 0, totalClients: 0 })
  const [form, setForm] = useState({ nom: '', description: '', prix: '' })
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const { logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAdmin) { navigate('/login'); return }
    chargerDonnees()
  }, [])

  const chargerDonnees = async () => {
    try {
      const [rdvRes, statsRes] = await Promise.all([
        api.get('/rendezvous'),
        api.get('/admin/stats')
      ])
      setRdvs(rdvRes.data)
      setStats(statsRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAjouter = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('nom', form.nom)
      formData.append('description', form.description)
      formData.append('prix', form.prix)
      if (image) formData.append('image', image)
      await api.post('/coiffures', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage('Coiffure ajoutée avec succès !')
      setForm({ nom: '', description: '', prix: '' })
      setImage(null)
      chargerDonnees()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage("Erreur lors de l'ajout.")
    }
  }

  const changerStatut = async (id, statut) => {
    await api.patch(`/rendezvous/${id}`, { statut })
    chargerDonnees()
  }

  const supprimerRdv = async (id) => {
    if (!confirm('Supprimer ce rendez-vous ?')) return
    await api.delete(`/rendezvous/${id}`)
    chargerDonnees()
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard Admin</h1>
        <button onClick={() => { logout(); navigate('/login') }}
          style={{ background: '#e63946', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
          Déconnexion
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', margin: '2rem 0' }}>
        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2a9d8f' }}>{stats.totalRdv}</div>
          <div style={{ color: '#666' }}>Total RDV</div>
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2a9d8f' }}>{stats.rdvEnAttente}</div>
          <div style={{ color: '#666' }}>En attente</div>
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2a9d8f' }}>{stats.rdvConfirmes}</div>
          <div style={{ color: '#666' }}>Confirmés</div>
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2a9d8f' }}>{stats.totalClients}</div>
          <div style={{ color: '#666' }}>Clients</div>
        </div>
      </div>

      <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
        <h2>Ajouter une coiffure</h2>
        {message && (
          <div style={{ background: '#d4edda', color: '#155724', padding: '0.8rem', borderRadius: '6px', marginBottom: '1rem' }}>
            {message}
          </div>
        )}
        <form onSubmit={handleAjouter} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input placeholder="Nom de la coiffure" value={form.nom}
            onChange={e => setForm({ ...form, nom: e.target.value })} required
            style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd' }} />
          <input placeholder="Prix (€)" type="number" value={form.prix}
            onChange={e => setForm({ ...form, prix: e.target.value })} required
            style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd' }} />
          <input placeholder="Description" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} required
            style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd', gridColumn: 'span 2' }} />
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>Photo de la coiffure</label>
            <input type="file" accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '6px', width: '100%' }} />
            {image && (
              <img src={URL.createObjectURL(image)} alt="preview"
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '6px', marginTop: '0.5rem' }} />
            )}
          </div>
          <button type="submit" style={{ gridColumn: 'span 2', background: '#2a9d8f', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}>
            Ajouter la coiffure
          </button>
        </form>
      </div>

      <h2>Liste des rendez-vous</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: '600' }}>Client</th>
            <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: '600' }}>Téléphone</th>
            <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: '600' }}>Coiffure</th>
            <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: '600' }}>Date & Heure</th>
            <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: '600' }}>Statut</th>
            <th style={{ padding: '0.8rem', textAlign: 'left', fontWeight: '600' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rdvs.map(rdv => (
            <tr key={rdv.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.8rem' }}>{rdv.client.prenom} {rdv.client.nom}</td>
              <td style={{ padding: '0.8rem' }}>{rdv.client.telephone}</td>
              <td style={{ padding: '0.8rem' }}>{rdv.coiffure.nom}</td>
              <td style={{ padding: '0.8rem' }}>{new Date(rdv.dateHeure).toLocaleString('fr-FR')}</td>
              <td style={{ padding: '0.8rem' }}>
                <span style={{
                  background: rdv.statut === 'confirme' ? '#d4edda' : rdv.statut === 'annule' ? '#f8d7da' : '#fff3cd',
                  color: rdv.statut === 'confirme' ? '#155724' : rdv.statut === 'annule' ? '#721c24' : '#856404',
                  padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem'
                }}>
                  {rdv.statut}
                </span>
              </td>
              <td style={{ padding: '0.8rem' }}>
                <button onClick={() => changerStatut(rdv.id, 'confirme')}
                  style={{ background: '#2a9d8f', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.3rem' }}>
                  Confirmer
                </button>
                <button onClick={() => changerStatut(rdv.id, 'annule')}
                  style={{ background: '#e9c46a', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.3rem' }}>
                  Annuler
                </button>
                <button onClick={() => supprimerRdv(rdv.id)}
                  style={{ background: '#e63946', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}