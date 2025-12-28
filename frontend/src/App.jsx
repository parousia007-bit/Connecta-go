import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [view, setView] = useState('landing')
  const [now, setNow] = useState(new Date())
  const [attendeeData, setAttendeeData] = useState(null)

  // Actualizar el reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Itinerario del evento
  const schedule = [
    { time: "06:30", activity: "Culto Matutino 🌅", location: "Auditorio Central" },
    { time: "08:00", activity: "Desayuno de Confraternidad ☕", location: "Comedor" },
    { time: "09:30", activity: "Abordaje de Autobuses 🚌", location: "Estacionamiento" },
    { time: "10:30", activity: "Paseo de Campo: Mirador 🗺️", location: "Zona Norte" }
  ]

  // Encontrar la siguiente actividad
  const nextActivity = schedule.find(a => {
    const [h, m] = a.time.split(':')
    const target = new Date()
    target.setHours(h, m, 0)
    return target > now
  }) || schedule[0]

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${now.getHours() >= 18 || now.getHours() < 6 ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* NAVBAR */}
      <nav className="p-6 flex justify-between items-center border-b border-white/10">
        <h1 className="text-2xl font-black italic tracking-tighter">CONNECTA<span className="text-orange-500">GO</span></h1>
        <div className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full text-[10px] font-bold">
          {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </nav>

      <main className="p-6 max-w-md mx-auto space-y-8">
        
        {/* TARJETA DINÁMICA DE PRÓXIMA ACTIVIDAD */}
        <section className="bg-orange-600 p-8 rounded-[3rem] shadow-2xl shadow-orange-500/20 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Próxima Actividad</p>
            <h2 className="text-4xl font-black italic mb-1 tracking-tighter">{nextActivity.activity}</h2>
            <p className="text-sm font-bold opacity-90 mb-6">📍 {nextActivity.location}</p>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 inline-block">
               <p className="text-[9px] font-black uppercase mb-1">Inicia a las</p>
               <p className="text-2xl font-black">{nextActivity.time}</p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 text-9xl opacity-10 group-hover:scale-110 transition-transform">🕒</div>
        </section>

        {/* FEED DE NOTICIAS / ITINERARIO COMPLETO */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest opacity-50 ml-4">Itinerario de Hoy</h3>
          {schedule.map((item, index) => (
            <div key={index} className={`p-6 rounded-[2rem] flex items-center justify-between border ${now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) > item.time ? 'opacity-30' : 'bg-white shadow-sm'}`}>
              <div className="flex items-center gap-4">
                <span className="text-xl font-black text-orange-500">{item.time}</span>
                <span className={`font-bold ${now.getHours() >= 18 || now.getHours() < 6 ? 'text-slate-200' : 'text-slate-800'}`}>{item.activity}</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* BOTÓN DE PASEO DE CAMPO (MODO MAPA) */}
        <button onClick={() => alert("Cargando Mapa de Interés...")} className="w-full bg-slate-900 text-white p-8 rounded-[2.5rem] font-black text-xl shadow-xl flex items-center justify-center gap-4 active:scale-95 transition-all">
          🗺️ VER MAPA DEL PASEO
        </button>
      </main>

      {/* FOOTER NAV */}
      <div className="fixed bottom-6 left-6 right-6 h-20 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex items-center justify-around px-4">
         <button className="flex flex-col items-center gap-1 opacity-100"><span className="text-xl">🏠</span><span className="text-[8px] font-bold">INICIO</span></button>
         <button className="flex flex-col items-center gap-1 opacity-40"><span className="text-xl">🛡️</span><span className="text-[8px] font-bold">SEGURIDAD</span></button>
         <button className="flex flex-col items-center gap-1 opacity-40"><span className="text-xl">🎒</span><span className="text-[8px] font-bold">MI GRUPO</span></button>
      </div>
    </div>
  )
}

export default App
