import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [view, setView] = useState('register') // 'register' | 'badge'
  const [formData, setFormData] = useState({
    fullName: '',
    localSociety: '',
    presbytery: '',
    synodalUnion: ''
  })
  const [badgeData, setBadgeData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:3000/api/register', formData)
      if (response.data.success) {
        setBadgeData(response.data.data)
        setView('badge')
      } else {
        setError(response.data.error || 'Error al registrar')
      }
    } catch (err) {
      setError('Error de conexión con el servidor')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Registration Form Component
  const RegistrationForm = () => (
    <div className="min-h-screen bg-[#002366] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-t-8 border-orange-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#002366] mb-2 uppercase tracking-tighter">Registro de Esforzador</h1>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">UNSEC - INPM</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre Completo</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 text-[#002366] font-bold focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Sociedad Local</label>
            <input
              type="text"
              name="localSociety"
              required
              value={formData.localSociety}
              onChange={handleChange}
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 text-[#002366] font-bold focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Ej. 'Dios es Amor'"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Presbiterio</label>
              <input
                type="text"
                name="presbytery"
                required
                value={formData.presbytery}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 text-[#002366] font-bold focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Ej. Nacional"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Unión Sinodal</label>
              <input
                type="text"
                name="synodalUnion"
                required
                value={formData.synodalUnion}
                onChange={handleChange}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 text-[#002366] font-bold focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Ej. Centro"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white p-4 rounded-xl font-black text-lg shadow-lg hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide flex items-center justify-center gap-2"
          >
            {loading ? 'Procesando...' : 'Registrarme ahora'}
          </button>
        </form>

        <div className="mt-8 text-center opacity-50">
          <p className="text-[10px] font-bold text-[#002366]">PLATAFORMA LOGÍSTICA OFICIAL</p>
        </div>
      </div>
    </div>
  )

  // Digital Badge Component
  const DigitalBadge = () => (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative">
        {/* Top Header */}
        <div className="bg-[#002366] p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            <h2 className="text-orange-500 font-black tracking-widest text-xs uppercase mb-1 relative z-10">Gafete Oficial</h2>
            <h1 className="text-white font-bold text-lg relative z-10">UNSEC</h1>
            <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mt-4 flex items-center justify-center text-4xl border-4 border-white/20 relative z-10">
                {/* Placeholder for shield */}
                🛡️
            </div>
        </div>

        {/* Badge Body */}
        <div className="p-8 text-center space-y-6">
            <div>
                <h3 className="text-2xl font-black text-[#002366] leading-none mb-2 uppercase">{badgeData?.attendee_name}</h3>
                <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-orange-200">
                    {badgeData?.society}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-6">
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Presbiterio</p>
                    <p className="text-[#002366] font-bold">{badgeData?.presbytery}</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unión Sinodal</p>
                    <p className="text-[#002366] font-bold">{badgeData?.union_synodal}</p>
                </div>
            </div>

            <div>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">ID de Registro</p>
                 <div className="font-mono text-3xl font-black text-slate-300 tracking-tighter">
                    {badgeData?.status}
                 </div>
            </div>

            <div className="pt-4">
                 <p className="text-[#002366] font-serif italic text-lg opacity-80">"Por Cristo y por su Iglesia"</p>
            </div>
        </div>

        {/* Footer */}
        <div className="bg-orange-500 p-3 text-center">
            <p className="text-white text-[10px] font-bold uppercase tracking-widest opacity-90">Iglesia Nacional Presbiteriana de México</p>
        </div>
      </div>
    </div>
  )

  return view === 'register' ? <RegistrationForm /> : <DigitalBadge />
}

export default App
