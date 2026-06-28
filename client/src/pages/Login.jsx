import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [erreur, setErreur] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', form)
      login(res.data.token)
      navigate('/admin')
    } catch (err) {
      setErreur('Email ou mot de passe incorrect')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Connexion Admin</h2>

      {erreur && (
        <div style={{ background: '#f8d7da', color: '#721c24', padding: '0.8rem', borderRadius: '6px', marginBottom: '1rem' }}>
          {erreur}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required
          style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd' }} />
        <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required
          style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #ddd' }} />
        <button type="submit"
          style={{ background: '#2a9d8f', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem' }}>
          Se connecter
        </button>
      </form>
    </div>
  )
}