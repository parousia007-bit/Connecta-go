import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ExperienceGallery from './components/ExperienceGallery'

function App() {
  const [view, setView] = useState('landing') // landing, marketplace, register, welcome, security
  const [name, setName] = useState('')
  const [group, setGroup] = useState('Iglesia Central')
  const [attendees, setAttendees] = useState([])
  const [attendeeData, setAttendeeData] = useState(null)

  const fetchAttendees = async () => {
    try {
      const res = await axios.get('http://192.168.1.98:3000/api/attendees');
      setAttendees(res.data);
    } catch (e) { console.error("Error de red") }
  }

  useEffect(() => { if(view === 'security') fetchAttendees() }, [view])

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      {/* NAVBAR PERSISTENTE */}
      <nav className="bg-white p-5 shadow-sm flex justify-between items-center sticky top-0 z-50">
        <h2 onClick={() => setView('landing')} className="text-2xl font-black italic tracking-tighter cursor-pointer leading-none">
          CNCT<span className="text-orange-600">GO</span>
        </h2>
        <div className="flex gap-4">
           <button onClick={() => setView('security')} className="text-[10px] font-black uppercase text-slate-400">Control</button>
           <button onClick={() => setView('marketplace')} className="text-[10px] font-black uppercase text-slate-400">Market</button>
        </div>
      </nav>

      <main className="max-w-xl mx-auto p-6 animate-in fade-in duration-500">
        
        {/* 1. LANDING: BIENVENIDA */}
        {view === 'landing' && (
          <div className="text-center space-y-10">
            <section className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl">
              <h1 className="text-5xl font-black italic mb-4 leading-tight">Connecta<span className="text-orange-600">Go</span></h1>
              <p className="opacity-60 mb-8">La experiencia digital que sustituye al gafete de papel.</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => setView('register')} className="bg-orange-600 py-5 rounded-3xl font-black text-lg shadow-xl">IR A REGISTRO</button>
                <button onClick={() => setView('marketplace')} className="bg-white/10 py-5 rounded-3xl font-black text-lg border border-white/10">VER PRODUCTOS</button>
              </div>
            </section>
            <ExperienceGallery />
          </div>
        )}

        {/* 2. MARKETPLACE: ESTILO JAGUAR */}
        {view === 'marketplace' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black italic tracking-tighter">NUESTRO <span className="text-orange-600">MARKET</span></h2>
            <div className="grid gap-6">
              {[
                { t: 'Pulseras Twister', d: 'Neon Experience para jóvenes.', p: '$1.50', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=500' },
                { t: 'Tarjetas PVC Elite', d: 'Diseño formal con QR para ministros.', p: '$3.00', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=500' }
              ].map(item => (
                <div key={item.t} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg flex border border-slate-100">
                  <img src={item.img} className="w-32 h-auto object-cover" />
                  <div className="p-6">
                    <h4 className="font-bold text-lg leading-tight">{item.t}</h4>
                    <p className="text-orange-600 font-black mb-4">{item.p}</p>
                    <button onClick={() => setView('register')} className="text-[10px] font-black bg-slate-900 text-white px-4 py-2 rounded-xl uppercase">Lo quiero</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. REGISTRO: CON TEXTO OSCURO VISIBLE */}
        {view === 'register' && (
          <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-slate-100">
            <h3 className="text-3xl font-black mb-8 italic text-slate-900 leading-none uppercase">Nuevo <span className="text-orange-600 text-shadow-xl">Registro</span></h3>
            <div className="space-y-4">
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nombre del Asistente" className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-6 px-8 text-xl text-slate-900 outline-none" />
              <select value={group} onChange={(e)=>setGroup(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl py-6 px-8 text-xl text-slate-900">
                <option>Iglesia Central</option>
                <option>Distrito Sur</option>
                <option>Misión Élite</option>
              </select>
              <button onClick={async () => {
                if(!name) return;
                const res = await axios.post('http://192.168.1.98:3000/api/generate', { attendeeName: name, groupName: group });
                setAttendeeData(res.data.data);
                setView('welcome');
              }} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl shadow-xl">VINCULAR GAFETE</button>
            </div>
          </div>
        )}

        {/* 4. GAFETE + ALARMA + ITINERARIO */}
        {view === 'welcome' && (
          <div className="space-y-6">
             <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border-t-[14px] border-orange-600">
                <p className="text-orange-600 font-black text-[10px] uppercase mb-2">Identidad Digital</p>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{attendeeData?.attendee_name}</h2>
                <div className="mt-4 bg-slate-100 px-4 py-1 rounded-full inline-block text-[9px] font-bold text-slate-400 uppercase">{group}</div>
             </div>
             
             <div className="bg-orange-600 rounded-[2.5rem] p-8 text-white flex items-center gap-6 shadow-xl shadow-orange-200">
                <span className="text-5xl">🌅</span>
                <div>
                    <p className="font-black italic text-3xl leading-none">06:30 AM</p>
                    <p className="text-sm opacity-80">Próxima Actividad: Culto Matutino</p>
                </div>
             </div>
             
             <button onClick={() => setView('security')} className="w-full bg-white border border-slate-200 p-6 rounded-[2.5rem] font-bold text-slate-400 italic">Ver mi Grupo de Seguridad →</button>
          </div>
        )}

        {/* 5. SEGURIDAD: CONTROL DE AUTOBÚS */}
        {view === 'security' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic tracking-tighter text-slate-900 leading-none px-2">PASE DE <br/><span className="text-orange-600">AUTOBÚS</span></h2>
            {attendees.map(a => (
              <div key={a.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm flex justify-between items-center border border-slate-50">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold ${a.status.includes('_checked') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {a.status.includes('_checked') ? '✓' : '!'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 leading-none">{a.attendee_name}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{a.status.split('_')[0]}</p>
                  </div>
                </div>
                {!a.status.includes('_checked') && (
                   <button onClick={async () => {
                     await axios.post('http://192.168.1.98:3000/api/checkin', { label: a.label });
                     fetchAttendees();
                   }} className="bg-slate-900 text-white text-[9px] font-black px-5 py-3 rounded-2xl">LISTO</button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* NAV BAR ESTILO APK */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] flex items-center p-2 z-50">
        <button onClick={() => setView('landing')} className={`flex-1 h-full rounded-3xl flex flex-col items-center justify-center gap-1 ${view==='landing'?'bg-white text-slate-900':'text-white/30'}`}>🏠 <span className="text-[8px] font-bold uppercase">Inicio</span></button>
        <button onClick={() => setView('register')} className={`flex-1 h-full rounded-3xl flex flex-col items-center justify-center gap-1 ${view==='register'?'bg-white text-slate-900':'text-white/30'}`}>👤 <span className="text-[8px] font-bold uppercase">Registro</span></button>
        <button onClick={() => setView('security')} className={`flex-1 h-full rounded-3xl flex flex-col items-center justify-center gap-1 ${view==='security'?'bg-white text-slate-900':'text-white/30'}`}>🛡️ <span className="text-[8px] font-bold uppercase">Seguridad</span></button>
      </nav>
    </div>
  )
}
export default App
