import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Home() {
  const [coiffures, setCoiffures] = useState([])
  const [showContact, setShowContact] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/coiffures').then(res => setCoiffures(res.data))
  }, [])

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>

      {/* NAVBAR */}
      <nav style={{ background: '#0a0a0a', borderBottom: '1px solid #C9A84C', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: '#C9A84C', letterSpacing: '1px' }}>✦ Royal Cut</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: '#aaa', fontSize: '14px', cursor: 'pointer' }}>Accueil</span>
          <span onClick={() => document.getElementById('coiffures').scrollIntoView({ behavior: 'smooth' })} style={{ color: '#aaa', fontSize: '14px', cursor: 'pointer' }}>Coiffures</span>
          <span onClick={() => setShowContact(!showContact)} style={{ color: '#aaa', fontSize: '14px', cursor: 'pointer' }}>Contact</span>
          <span onClick={() => navigate('/login')} style={{ color: '#C9A84C', fontSize: '14px', cursor: 'pointer' }}>Admin</span>
        </div>
      </nav>

      {/* CONTACT DROPDOWN */}
      {showContact && (
        <div style={{ background: '#111', border: '1px solid #C9A84C33', padding: '20px 40px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:0773234160" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '10px 20px', color: '#fff', textDecoration: 'none', fontSize: '14px' }}>
            📞 <span>0773234160</span>
          </a>
          <a href="mailto:cherifismaelfr@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '10px 20px', color: '#fff', textDecoration: 'none', fontSize: '14px' }}>
            ✉️ <span>cherifismaelfr@gmail.com</span>
          </a>
          <a href="sms:0773234160" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '10px 20px', color: '#fff', textDecoration: 'none', fontSize: '14px' }}>
            💬 <span>SMS</span>
          </a>
          <a href="https://wa.me/33773234160" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#25D366', border: 'none', borderRadius: '8px', padding: '10px 20px', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
            WhatsApp
          </a>
        </div>
      )}

      {/* HERO */}
      <div style={{ background: '#111', padding: '60px 40px', textAlign: 'center', borderBottom: '1px solid #222' }}>
        <div style={{ display: 'inline-block', background: '#C9A84C22', border: '1px solid #C9A84C', color: '#C9A84C', fontSize: '11px', padding: '4px 16px', borderRadius: '20px', marginBottom: '20px', letterSpacing: '2px' }}>
          CHÂTEAU ROUGE · PARIS 18
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '42px', color: '#fff', lineHeight: '1.2', marginBottom: '16px' }}>
          L'art de la coupe<br />
          <span style={{ color: '#C9A84C' }}>afro-urbaine</span>
        </h1>
        <p style={{ color: '#888', fontSize: '16px', marginBottom: '32px' }}>
          Dégradés, afros, barbes — faits par des pros pour les rois
        </p>
        <button
          onClick={() => document.getElementById('coiffures').scrollIntoView({ behavior: 'smooth' })}
          style={{ background: '#C9A84C', color: '#0a0a0a', border: 'none', padding: '14px 32px', borderRadius: '6px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', marginRight: '12px' }}>
          Prendre rendez-vous
        </button>
        <button
          onClick={() => document.getElementById('coiffures').scrollIntoView({ behavior: 'smooth' })}
          style={{ background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', padding: '14px 32px', borderRadius: '6px', fontSize: '15px', cursor: 'pointer' }}>
          Voir les coiffures
        </button>
      </div>

      {/* COIFFURES */}
      <div id="coiffures" style={{ padding: '48px 40px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#C9A84C', marginBottom: '8px' }}>Nos coiffures</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>Choisissez votre style et réservez en ligne</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {coiffures.length === 0 && <p style={{ color: '#666' }}>Aucune coiffure disponible.</p>}
          {coiffures.map(c => (
            <div key={c.id}
              style={{ background: 'transparent', border: '1px solid #333', borderRadius: '10px', overflow: 'hidden' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}>
              {c.imageUrl
                ? <img src={`http://localhost:5000${c.imageUrl}`} alt={c.nom} style={{ width: '100%', height: 'auto' }} />
                : <div style={{ height: '160px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>✂</div>
              }
              <div style={{ padding: '16px' }}>
                <h3 style={{ color: '#fff', fontWeight: '600', fontSize: '16px', marginBottom: '6px' }}>{c.nom}</h3>
                <p style={{ color: '#666', fontSize: '13px', marginBottom: '14px' }}>{c.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#C9A84C', fontWeight: '700', fontSize: '18px' }}>{c.prix} €</span>
                  <button onClick={() => navigate(`/booking/${c.id}`)}
                    style={{ background: '#C9A84C', color: '#0a0a0a', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#111', borderTop: '1px solid #C9A84C33', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#555', fontSize: '13px' }}>© 2025 Royal Cut — Tous droits réservés</span>
        <span style={{ color: '#C9A84C', fontSize: '13px' }}>📍 Château Rouge, Paris 18ème</span>
      </div>

    </div>
  )
}