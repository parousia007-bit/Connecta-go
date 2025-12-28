import React from 'react'

const ExperienceGallery = () => {
  const experiences = [
    { id: 1, title: "Congresos Masivos", tag: "Logística", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Noches de Gala", tag: "PVC Cards", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "Gamificación Real", tag: "Trivias", img: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1000&auto=format&fit=crop" }
  ];

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-10 px-4">
          Experiencias <span className="text-orange-600 italic">Reales.</span>
        </h2>
        <div className="flex gap-8 overflow-x-auto pb-10 px-4 scrollbar-hide">
          {experiences.map(exp => (
            <div key={exp.id} className="min-w-[85vw] md:min-w-[400px] h-[500px] relative rounded-[3.5rem] overflow-hidden shadow-2xl group transition-all duration-500 hover:-translate-y-2">
              <img src={exp.img} className="absolute inset-0 w-full h-full object-cover" alt={exp.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-12 left-10 right-10 z-20">
                <span className="inline-block bg-orange-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest mb-4">{exp.tag}</span>
                <h3 className="text-4xl font-bold text-white tracking-tighter leading-none">{exp.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default ExperienceGallery
