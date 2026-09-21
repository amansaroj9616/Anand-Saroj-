import { useState, useEffect, useRef, useMemo } from 'react'

// ── Floating Petals ──────────────────────────────────────────────────────────
function FloatingPetals() {
  const petals = Array.from({ length: 18 }, (_, i) => i)
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map(i => {
        const left = (i * 5.5 + 3) % 100
        const delay = (i * 0.7) % 8
        const duration = 8 + (i % 5) * 2
        const size = 8 + (i % 4) * 4
        const colors = ['#f5c5c5', '#ffd700', '#ffb6c1', '#f9e4a0', '#e8b4b8']
        const color = colors[i % 5]
        return (
          <div
            key={i}
            className="petal absolute"
            style={{
              left: `${left}%`,
              top: '-20px',
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <svg width={size} height={size} viewBox="0 0 20 20">
              <ellipse cx="10" cy="10" rx="5" ry="9" fill={color} opacity="0.7" transform={`rotate(${i * 20} 10 10)`} />
              <ellipse cx="10" cy="10" rx="5" ry="9" fill={color} opacity="0.5" transform={`rotate(${i * 20 + 60} 10 10)`} />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

// ── Diya SVG ─────────────────────────────────────────────────────────────────
function Diya({ size = 48 }: { size?: number }) {
  return (
    <span className="diya-glow inline-block">
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="34" rx="14" ry="6" fill="#c9a84c" opacity="0.9" />
        <ellipse cx="24" cy="32" rx="12" ry="5" fill="#e8a000" />
        <path d="M18 32 Q24 22 30 32" fill="#c9a84c" opacity="0.6" />
        <ellipse cx="24" cy="28" rx="4" ry="2" fill="#ff6b00" />
        <path d="M24 26 Q22 18 24 10 Q26 18 24 26" fill="#ffd700" />
        <path d="M24 22 Q20 16 24 12 Q28 16 24 22" fill="#ff8c00" opacity="0.8" />
        <ellipse cx="24" cy="12" rx="2" ry="3" fill="#fff0a0" opacity="0.9" />
      </svg>
    </span>
  )
}

// ── Ornamental Divider ────────────────────────────────────────────────────────
function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
      <svg width="32" height="32" viewBox="0 0 32 32" className="text-amber-400 opacity-80">
        <path d="M16 2 L18 10 L26 8 L20 14 L28 16 L20 18 L26 24 L18 22 L16 30 L14 22 L6 24 L12 18 L4 16 L12 14 L6 8 L14 10 Z" fill="#c9a84c" />
      </svg>
      <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
    </div>
  )
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-script text-center mb-2" style={{ color: '#c9a84c', fontSize: '1.5rem' }}>
      {children}
    </p>
  )
}

// ── Use Intersection Observer for fade-up ─────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// ── Countdown Timer ───────────────────────────────────────────────────────────
function Countdown({ target }: { target: Date }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  const units = [
    { label: 'Days', val: time.d },
    { label: 'Hours', val: time.h },
    { label: 'Mins', val: time.m },
    { label: 'Secs', val: time.s },
  ]
  return (
    <div className="flex gap-4 justify-center mt-8">
      {units.map(({ label, val }) => (
        <div key={label} className="glass-card px-4 py-3 text-center min-w-16">
          <div className="font-display countdown-num" style={{ fontSize: '2.2rem', color: '#e8c96a', lineHeight: 1 }}>
            {String(val).padStart(2, '0')}
          </div>
          <div className="font-body text-xs mt-1 uppercase tracking-widest" style={{ color: '#c9a84c99', fontSize: '0.65rem' }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle browser autoplay policy gracefully
      })
    }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-4 sm:px-6"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #3d0d1a 0%, #1a0605 40%, #0d0302 100%)',
      }}
    >
      {/* Full screen background video in infinite loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videoplayback.mp4"
      />

      {/* Transparent luxury overlay for high readability */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(13,3,2,0.5) 0%, rgba(26,6,5,0.75) 60%, rgba(13,3,2,0.92) 100%)',
        }}
      />

      {/* Animated background ornament rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40">
        {[360, 520, 680, 840].map((r, i) => (
          <div key={r} className="absolute rounded-full border animate-pulse" style={{
            width: r, height: r,
            borderColor: `rgba(201,168,76,${0.12 - i * 0.025})`,
            animationDuration: `${4 + i * 2}s`,
          }} />
        ))}
      </div>

      {/* Decorative corner paisleys */}
      <CornerPaisley pos="top-4 left-4" />
      <CornerPaisley pos="top-4 right-4" flip />
      <CornerPaisley pos="bottom-4 left-4" flipY />
      <CornerPaisley pos="bottom-4 right-4" flip flipY />

      {/* Transparent content overlay */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-4xl mx-auto w-full">
        {/* Royal Sacred Symbol Header */}
        <div className="mb-3 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass-card border border-amber-400/50 flex items-center justify-center diya-glow shadow-2xl">
            <span className="font-display text-amber-300 text-3xl sm:text-4xl">🪔</span>
          </div>
        </div>

        <p className="invited-text font-display uppercase tracking-widest font-medium mb-2" style={{ color: '#e8c96a', fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
          With The Grace Of God · You're Cordially Invited To The Royal Wedding Of
        </p>

        <OrnamentalDivider />

        {/* Floating Couple Names directly over background video (No Card Box) */}
        <div className="float-name my-4">
          <h1 className="font-display font-light" style={{ fontSize: 'clamp(3rem, 9vw, 6rem)', color: '#fdf6e9', lineHeight: 1.15, textShadow: '0 4px 30px rgba(0,0,0,0.95), 0 0 25px rgba(201,168,76,0.6)' }}>
            <span className="gold-shimmer font-semibold block drop-shadow-2xl tracking-wide">Anand Saroj</span>
            <span className="font-display font-light block my-1 text-amber-300" style={{ fontSize: '0.6em', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>&amp;</span>
            <span className="gold-shimmer font-semibold block drop-shadow-2xl tracking-wide">Parul Saroj</span>
          </h1>
        </div>

        <p className="font-display font-medium uppercase tracking-widest mt-4" style={{ color: '#f5c5c5', fontSize: 'clamp(1rem, 2.2vw, 1.4rem)', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
          "Two Sacred Souls · Bound By Eternal Love"
        </p>

        {/* Save The Date Badge */}
        <div className="mt-6 glass-card px-8 sm:px-12 py-3.5 rounded-full inline-block backdrop-blur-md border border-amber-400/60 shadow-2xl diya-glow">
          <p className="font-display tracking-widest font-semibold" style={{ color: '#e8c96a', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', letterSpacing: '0.22em' }}>
            ✦ 11 · 12 · 2026 ✦
          </p>
        </div>

        {/* Countdown Timer */}
        <Countdown target={new Date('2026-12-11T11:11:00')} />
      </div>

      {/* Diyas Accent */}
      <div className="mt-10 sm:mt-12 flex gap-12 sm:gap-16 opacity-95 z-10">
        <Diya size={44} />
        <Diya size={56} />
        <Diya size={44} />
      </div>

      {/* Scroll indicator */}
      <a href="#gallery" className="mt-8 flex flex-col items-center gap-2 scroll-indicator" style={{ color: '#c9a84cbb', zIndex: 20 }}>
        <span className="font-body text-xs tracking-widest uppercase font-medium">Scroll To Explore</span>
        <svg width="16" height="24" viewBox="0 0 16 24">
          <rect x="6" y="0" width="4" height="14" rx="2" fill="currentColor" opacity="0.5" />
          <path d="M0 16 L8 24 L16 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </a>
    </section>
  )
}

function CornerPaisley({ pos, flip, flipY }: { pos: string; flip?: boolean; flipY?: boolean }) {
  return (
    <div
      className={`absolute ${pos} w-24 h-24 pointer-events-none opacity-30`}
      style={{ transform: `scaleX(${flip ? -1 : 1}) scaleY(${flipY ? -1 : 1})` }}
    >
      <svg viewBox="0 0 80 80" fill="none">
        <path d="M4 4 Q40 4 40 40 Q40 4 76 4" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
        <path d="M4 8 Q36 8 36 40 Q36 8 72 8" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.5" />
        <circle cx="4" cy="4" r="3" fill="#c9a84c" />
        <circle cx="76" cy="4" r="3" fill="#c9a84c" />
        <path d="M8 4 Q8 30 28 38" stroke="#e8c96a" strokeWidth="0.8" fill="none" opacity="0.6" />
      </svg>
    </div>
  )
}

// ── Family Section ────────────────────────────────────────────────────────────
function FamilySection() {
  const ref = useFadeUp()
  const families = [
    {
      side: "Groom's Family (वर पक्ष)",
      icon: '🏰',
      members: [
        { role: 'Father', name: 'Sh. Ramchandra Saroj' },
        { role: 'Mother', name: 'Smt. Kamala Devi' },
        { role: 'Brother', name: 'Aman Saroj' },
        { role: 'Sisters', name: 'Seema Devi, Shashikala Devi' },
        { role: 'Family Members', name: 'Sunil Saroj, Dinesh Saroj, Adarsh Saroj, Jitendra Saroj, Mithun Saroj, Arun Saroj, Sanjay Saroj, Raju Saroj, Rajesh Saroj' },
      ],
      accent: '#c9a84c',
    },
    {
      side: "Bride's Family (वधू पक्ष)",
      icon: '🌸',
      members: [
        { role: 'Father', name: 'Sh. Jeet Lal Saroj' },
        { role: 'Mother', name: 'Smt. Parmila Saroj' },
        { role: 'Brother', name: 'Sahil Saroj' },
      ],
      accent: '#e8b4b8',
    },
  ]
  return (
    <section id="family" className="py-20 sm:py-24 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0d0302 0%, #1a0a08 100%)' }}>
      <div ref={ref} className="fade-up max-w-5xl mx-auto">
        <SectionLabel>With the Blessings of</SectionLabel>
        <h2 className="font-display text-center mb-2" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: '#fdf6e9' }}>
          Our Families
        </h2>
        <OrnamentalDivider />

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-12">
          {families.map(fam => (
            <div key={fam.side} className="glass-card p-6 sm:p-8 relative overflow-hidden gallery-glow-frame shine-container transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${fam.accent}, transparent)` }} />
              <div>
                <div className="text-center mb-6">
                  <span className="text-4xl sm:text-5xl inline-block transition-transform duration-300 hover:scale-125 cursor-pointer">{fam.icon}</span>
                  <h3 className="font-display mt-2 font-semibold" style={{ fontSize: '1.5rem', color: fam.accent }}>
                    {fam.side}
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {fam.members.map((m, idx) => (
                    <div key={`${m.role}-${m.name}-${idx}`} className="flex items-center justify-between py-2 border-b transition-colors hover:bg-amber-400/5 px-2 rounded-lg gap-3" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                      <span className="font-body text-xs sm:text-sm flex-shrink-0" style={{ color: '#c9a84c99' }}>{m.role}</span>
                      <span className="font-display font-medium text-sm sm:text-base text-right" style={{ color: '#fdf6e9' }}>{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 mt-6" style={{ background: `linear-gradient(90deg, transparent, ${fam.accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Timeline Section ──────────────────────────────────────────────────────────
const timelineEvents = [
  {
    name: 'Sundarkand Path',
    emoji: '🛕',
    date: 'December 08, 2026',
    time: '6:00 AM – 10:00 AM',
    venue: 'Rajapur',
    desc: 'A sacred recitation of Sundarkand to invoke divine blessings for the upcoming wedding rituals.',
    color: '#9b7ccc',
    bg: 'rgba(155,124,204,0.08)',
  },
  {
    name: 'Haldi Ceremony',
    emoji: '🌼',
    date: 'December 09, 2026',
    time: '7:00 PM',
    venue: 'Rajapur',
    desc: 'Yellow blooms, songs, and laughter as holy turmeric paste is lovingly applied.',
    color: '#e8c96a',
    bg: 'rgba(232,201,106,0.08)',
  },
  {
    name: 'Mehndi Ceremony',
    emoji: '🌿',
    date: 'December 09, 2026',
    time: '9:00 PM',
    venue: 'Rajapur',
    desc: 'Intricate henna designs painted with affection and festive celebration.',
    color: '#5a8f5a',
    bg: 'rgba(90,143,90,0.08)',
  },
  {
    name: 'Baraat Procession',
    emoji: '🎺',
    date: 'December 10, 2026',
    time: '1:00 PM',
    venue: 'Royal Garden Palace, Punjab',
    desc: 'Grand royal procession of music, dance, and joyous celebration arriving at the venue.',
    color: '#e8b4b8',
    bg: 'rgba(232,180,184,0.08)',
  },
  {
    name: 'Wedding Ceremony',
    emoji: '🔥',
    date: 'December 11, 2026',
    time: 'Muhurat: 11:11 AM',
    venue: 'Royal Garden Palace, Punjab',
    desc: 'Sacred pheras around the holy agni — seven eternal vows of love and commitment.',
    color: '#c9a84c',
    bg: 'rgba(201,168,76,0.08)',
  },
  {
    name: 'Vidaai',
    emoji: '🌸',
    date: 'December 12, 2026',
    time: '10:00 AM',
    venue: 'Royal Garden Palace, Punjab',
    desc: 'A bittersweet farewell filled with tears, love, and a beautiful new beginning.',
    color: '#e8b4b8',
    bg: 'rgba(232,180,184,0.08)',
  },
  {
    name: 'Grand Reception',
    emoji: '✨',
    date: 'December 15, 2026',
    time: '7:00 PM onwards',
    venue: 'Rajapur',
    desc: 'A magnificent royal evening to celebrate the newly wedded couple with family and friends.',
    color: '#c9a84c',
    bg: 'rgba(201,168,76,0.1)',
  },
]

function TimelineSection() {
  const ref = useFadeUp()
  return (
    <section id="timeline" className="py-20 sm:py-24 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #1a0a08 0%, #200c0a 100%)' }}>
      <div ref={ref} className="fade-up max-w-4xl mx-auto">
        <SectionLabel>The Celebrations</SectionLabel>
        <h2 className="font-display text-center mb-2" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: '#fdf6e9' }}>
          Wedding Timeline
        </h2>
        <OrnamentalDivider />

        <div className="relative mt-12 sm:mt-16">
          {/* Central line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px timeline-line hidden md:block" style={{ transform: 'translateX(-50%)' }} />

          <div className="space-y-8 sm:space-y-12">
            {timelineEvents.map((ev, i) => (
              <TimelineCard key={ev.name} event={ev} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({ event: ev, index: i }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useFadeUp()
  const isLeft = i % 2 === 0
  return (
    <div ref={ref} className={`fade-up flex md:items-center gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Card */}
      <div className="flex-1 glass-card p-5 sm:p-6 relative overflow-hidden gallery-glow-frame shine-container transition-all duration-300 hover:scale-[1.02]" style={{ background: ev.bg }}>
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${ev.color}, transparent)` }} />
        <div className="flex items-start gap-3.5">
          <span className="text-3xl sm:text-4xl transition-transform duration-300 hover:scale-125 cursor-pointer">{ev.emoji}</span>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-lg sm:text-xl" style={{ color: ev.color }}>
              {ev.name}
            </h3>
            <p className="font-body text-xs mt-1 mb-2 tracking-wider" style={{ color: '#c9a84c' }}>
              {ev.date} · {ev.time}
            </p>
            <p className="font-body text-xs sm:text-sm leading-relaxed" style={{ color: '#fdf6e999' }}>{ev.desc}</p>
            <p className="font-body text-xs mt-2.5 flex items-center gap-1.5" style={{ color: '#c9a84cbb' }}>
              <span>📍</span> {ev.venue}
            </p>
          </div>
        </div>
      </div>

      {/* Dot on timeline */}
      <div className="hidden md:flex items-center justify-center w-11 h-11 rounded-full border-2 flex-shrink-0 shadow-lg diya-glow" style={{ borderColor: ev.color, background: '#1a0a08' }}>
        <div className="w-3.5 h-3.5 rounded-full animate-pulse" style={{ background: ev.color }} />
      </div>

      {/* Spacer */}
      <div className="hidden md:block flex-1" />
    </div>
  )
}

// ── Venue Section ─────────────────────────────────────────────────────────────
function VenueSection() {
  const ref = useFadeUp()
  const venues = [
    {
      name: 'Royal Garden Palace',
      event: 'Baraat, Wedding Ceremony & Vidaai',
      address: 'Royal Garden Palace, Punjab',
      phone: '+91 98765 43210',
      parking: 'Ample parking for 300+ vehicles',
      icon: '🏯',
    },
    {
      name: 'Rajapur Venue',
      event: 'Grand Reception Ceremony',
      address: 'Rajapur, Punjab',
      phone: '+91 98765 43211',
      parking: 'Valet parking available',
      icon: '✨',
    },
  ]
  return (
    <section id="venue" className="py-20 sm:py-24 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #200c0a 0%, #0d0302 100%)' }}>
      <div ref={ref} className="fade-up max-w-5xl mx-auto">
        <SectionLabel>Come & Celebrate</SectionLabel>
        <h2 className="font-display text-center mb-2" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: '#fdf6e9' }}>
          Venue Details
        </h2>
        <OrnamentalDivider />

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-12">
          {venues.map(v => (
            <div key={v.name} className="glass-card p-6 sm:p-8 relative overflow-hidden gallery-glow-frame shine-container transition-all duration-500 hover:-translate-y-2 border border-amber-400/30 hover:border-amber-400">
              <div className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 hover:scale-110 cursor-pointer">{v.icon}</div>
              <h3 className="font-display font-semibold mb-1 text-xl sm:text-2xl" style={{ color: '#e8c96a' }}>
                {v.name}
              </h3>
              <p className="font-body text-xs sm:text-sm mb-4 tracking-wider" style={{ color: '#c9a84c' }}>
                {v.event}
              </p>
              <div className="space-y-2 text-xs sm:text-sm font-body" style={{ color: '#fdf6e999' }}>
                <p className="flex gap-2 items-start"><span>📍</span><span>{v.address}</span></p>
                <p className="flex gap-2 items-center"><span>📞</span><a href={`tel:${v.phone}`} className="hover:text-amber-300 transition-colors">{v.phone}</a></p>
                <p className="flex gap-2 items-center"><span>🅿️</span><span>{v.parking}</span></p>
              </div>
              {/* Map box */}
              <div className="mt-6 rounded-xl overflow-hidden h-32 flex items-center justify-center relative group cursor-pointer border border-amber-400/30 hover:border-amber-400 transition-colors" style={{ background: 'rgba(201,168,76,0.08)' }}>
                <div className="text-center transition-transform duration-300 group-hover:scale-105">
                  <span className="text-2xl">🗺️</span>
                  <p className="font-body text-xs mt-1 text-amber-300 font-medium">Open in Google Maps ➔</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Gallery Section ───────────────────────────────────────────────────────────
const galleryItems = [
  { id: 1, src: '/gallery/gallery2.jpeg', category: 'romance' },
  { id: 2, src: '/gallery/gallery3.jpeg', category: 'romance' },
  { id: 3, src: '/gallery/gallery4.jpeg', category: 'wedding' },
  { id: 4, src: '/gallery/gallery5.jpeg', category: 'portraits' },
  { id: 5, src: '/gallery/gallery1.jpeg', category: 'romance' },
  { id: 6, src: '/gallery/gallery6.jpeg', category: 'rituals' },
  { id: 7, src: '/gallery/gallery7.jpeg', category: 'portraits' },
  { id: 8, src: '/gallery/gallery8.jpeg', category: 'romance' },
  { id: 9, src: '/gallery/gallery9.jpeg', category: 'wedding' },
]

function GallerySection() {
  const ref = useFadeUp()
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [slideAnim, setSlideAnim] = useState<'next' | 'prev'>('next')
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Continuous Auto slide effect
  useEffect(() => {
    if (!isPlaying || viewMode !== 'slider' || galleryItems.length <= 1) return
    const timer = setInterval(() => {
      setSlideAnim('next')
      setCurrentIndex(prev => (prev + 1) % galleryItems.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [isPlaying, viewMode])

  // Slide navigation
  const nextSlide = () => {
    setSlideAnim('next')
    setCurrentIndex(prev => (prev + 1) % galleryItems.length)
  }

  const prevSlide = () => {
    setSlideAnim('prev')
    setCurrentIndex(prev => (prev - 1 + galleryItems.length) % galleryItems.length)
  }

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev! + 1) % galleryItems.length)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev! - 1 + galleryItems.length) % galleryItems.length)
      } else if (e.key === 'Escape') {
        setLightboxIndex(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  const currentItem = galleryItems[currentIndex] || galleryItems[0]

  return (
    <section id="gallery" className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d0302 0%, #1a0a08 50%, #0d0302 100%)' }}>
      {/* Background mandala embellishment */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
        <MandalaPattern size={700} />
      </div>

      <div ref={ref} className="fade-up max-w-6xl mx-auto relative z-10">
        <SectionLabel>Memories in the Making</SectionLabel>
        <h2 className="font-display text-center mb-2" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: '#fdf6e9' }}>
          Photo Gallery
        </h2>
        <OrnamentalDivider />

        {/* View mode toggle switch */}
        <div className="flex justify-center items-center mt-6 sm:mt-8 mb-8 sm:mb-10">
          <div className="glass-card p-1 flex items-center gap-1 border border-amber-400/40 rounded-full shadow-lg">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-4 py-1.5 rounded-full font-body text-xs flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === 'slider' ? 'bg-amber-400 text-slate-950 font-semibold shadow-md' : 'text-amber-200/80 hover:text-white'}`}
            >
              <span>🖼️</span> Slider
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-1.5 rounded-full font-body text-xs flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-amber-400 text-slate-950 font-semibold shadow-md' : 'text-amber-200/80 hover:text-white'}`}
            >
              <span>⣿</span> Grid
            </button>
          </div>
        </div>

        {/* ── SLIDER VIEW MODE (PURE PHOTO DISPLAY - NO TEXT) ────────────────── */}
        {viewMode === 'slider' && (
          <div className="relative">
            {/* Main Showcase Container */}
            <div
              className="glass-card rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl relative gallery-glow-frame p-2 sm:p-4"
              style={{ background: 'rgba(13,3,2,0.85)' }}
            >
              <div className="relative overflow-hidden bg-black/70 rounded-2xl flex items-center justify-center min-h-[350px] sm:min-h-[520px]">
                {/* Background Blur Effect */}
                <img
                  src={currentItem.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-40 scale-110"
                />

                {/* Main Slide Image */}
                <div
                  key={currentItem.id}
                  className={`relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-4 ${slideAnim === 'next' ? 'animate-slide-right' : 'animate-slide-left'}`}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl shine-container cursor-pointer group max-h-[500px]"
                    onClick={() => {
                      const globalIdx = galleryItems.findIndex(x => x.id === currentItem.id)
                      setLightboxIndex(globalIdx !== -1 ? globalIdx : 0)
                    }}
                  >
                    <img
                      src={currentItem.src}
                      alt="Gallery Photo"
                      className="w-full max-h-[340px] sm:max-h-[500px] object-contain sm:object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Expand Lightbox overlay icon */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-amber-400 text-slate-950 font-display font-medium text-xs tracking-widest uppercase flex items-center gap-1.5 shadow-2xl">
                        <span>🔍</span> Expand Full Screen
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left Nav Arrow */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full glass-card flex items-center justify-center border border-amber-400/60 text-amber-300 hover:scale-110 hover:bg-amber-400 hover:text-slate-950 transition-all shadow-2xl cursor-pointer text-lg"
                  title="Previous Photo"
                >
                  ❮
                </button>

                {/* Right Nav Arrow */}
                <button
                  onClick={nextSlide}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full glass-card flex items-center justify-center border border-amber-400/60 text-amber-300 hover:scale-110 hover:bg-amber-400 hover:text-slate-950 transition-all shadow-2xl cursor-pointer text-lg"
                  title="Next Photo"
                >
                  ❯
                </button>

                {/* Slide Counter Badge */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full glass-card text-xs font-body text-amber-300 border border-amber-400/40 backdrop-blur-md">
                  {currentIndex + 1} / {galleryItems.length}
                </div>

                {/* Auto-play toggle button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute top-4 right-4 z-20 px-3.5 py-1 rounded-full glass-card text-xs font-body text-amber-300 border border-amber-400/40 backdrop-blur-md hover:bg-amber-400 hover:text-slate-950 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>{isPlaying ? '⏸️ Auto' : '▶️ Play'}</span>
                </button>
              </div>

              {/* Progress dots indicator */}
              <div className="flex items-center justify-center gap-2 my-4">
                {galleryItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSlideAnim(idx > currentIndex ? 'next' : 'prev')
                      setCurrentIndex(idx)
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'w-8 bg-amber-400' : 'w-2 bg-amber-400/30 hover:bg-amber-400/60'}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails Ribbon at Bottom */}
            <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-2 gallery-thumb-scroll px-1">
              {galleryItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSlideAnim(idx > currentIndex ? 'next' : 'prev')
                    setCurrentIndex(idx)
                  }}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer relative group ${idx === currentIndex ? 'border-amber-400 scale-105 shadow-lg shadow-amber-400/30' : 'border-amber-400/20 opacity-60 hover:opacity-100 hover:border-amber-400/50'}`}
                >
                  <img src={item.src} alt="Thumbnail" className="w-full h-full object-cover" />
                  {idx === currentIndex && (
                    <div className="absolute inset-0 bg-amber-400/10 border-2 border-amber-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── GRID VIEW MODE (PURE PHOTO GRID - NO TEXT OVERLAYS) ───────────── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  const globalIdx = galleryItems.findIndex(x => x.id === item.id)
                  setLightboxIndex(globalIdx !== -1 ? globalIdx : 0)
                }}
                className="glass-card rounded-2xl overflow-hidden border border-amber-400/30 group cursor-pointer gallery-glow-frame shine-container relative transition-all duration-500 hover:-translate-y-1.5"
              >
                <div className="relative h-72 sm:h-80 overflow-hidden bg-black/40">
                  <img
                    src={item.src}
                    alt="Gallery Photo"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle hover sheen overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center text-lg shadow-2xl transform group-hover:scale-110 transition-transform">
                      🔍
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── FULL-SCREEN LIGHTBOX MODAL (PURE PHOTO - NO TEXT) ─────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 transition-opacity duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Content Container */}
          <div
            className="relative max-w-5xl w-full max-h-[92vh] glass-card border border-amber-400/60 rounded-3xl p-3 sm:p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(30,10,12,0.96) 0%, rgba(13,3,2,0.99) 100%)' }}
          >
            {/* Header with Close & Counter */}
            <div className="w-full flex items-center justify-between px-3 py-2 border-b border-amber-400/20">
              <span className="font-script text-amber-400 text-2xl">
                Anand &amp; Parul
              </span>

              <div className="flex items-center gap-4">
                <div className="font-body text-xs text-amber-300 glass-card px-3 py-1 border border-amber-400/30">
                  {lightboxIndex + 1} of {galleryItems.length}
                </div>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-9 h-9 rounded-full glass-card border border-amber-400/60 text-amber-300 flex items-center justify-center hover:bg-amber-400 hover:text-slate-950 transition-all cursor-pointer text-base shadow-xl"
                  title="Close (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Pure Lightbox Image Display */}
            <div className="relative w-full flex-1 flex items-center justify-center my-3 overflow-hidden min-h-[320px] sm:min-h-[500px]">
              <img
                src={galleryItems[lightboxIndex].src}
                alt="Full Screen Wedding Photo"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-amber-400/40 animate-fade-in"
              />

              {/* Prev Button */}
              <button
                onClick={e => {
                  e.stopPropagation()
                  setLightboxIndex(prev => (prev! - 1 + galleryItems.length) % galleryItems.length)
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full glass-card border border-amber-400/60 text-amber-300 flex items-center justify-center hover:scale-110 hover:bg-amber-400 hover:text-slate-950 transition-all shadow-2xl cursor-pointer text-lg"
              >
                ❮
              </button>

              {/* Next Button */}
              <button
                onClick={e => {
                  e.stopPropagation()
                  setLightboxIndex(prev => (prev! + 1) % galleryItems.length)
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full glass-card border border-amber-400/60 text-amber-300 flex items-center justify-center hover:scale-110 hover:bg-amber-400 hover:text-slate-950 transition-all shadow-2xl cursor-pointer text-lg"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ── Blessings Section ─────────────────────────────────────────────────────────
function BlessingsSection() {
  const ref = useFadeUp()
  return (
    <section id="blessings" className="py-20 sm:py-24 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #1a0a08 0%, #200c0a 100%)' }}>
      <div ref={ref} className="fade-up max-w-3xl mx-auto text-center">
        <Diya size={64} />
        <SectionLabel>A Heartfelt Prayer</SectionLabel>
        <h2 className="font-display font-light mt-4 mb-6" style={{ fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: '#fdf6e9', lineHeight: 1.4 }}>
          "Your presence and blessings will make our celebration truly unforgettable."
        </h2>
        <OrnamentalDivider />
        <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: '#fdf6e999' }}>
          We joyfully invite you to be part of this beautiful journey.
          Your love, laughter, and blessings are the greatest gifts we could ever receive.
          Come, celebrate, and make memories with us that will last a lifetime.
        </p>

        {/* Floral divider */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3">
          {['🌸', '🌺', '🪷', '🌸', '🌺', '🪷', '🌸'].map((f, i) => (
            <span key={i} className="text-xl sm:text-2xl opacity-80 hover:scale-125 transition-transform cursor-pointer" style={{ animationDelay: `${i * 0.2}s` }}>{f}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Special Invitation Section (Little Ones' Love in Devanagari Hindi) ──────────
const specialInvitations = [
  {
    name: 'Disha (दिशा)',
    tag: 'दिशा का न्योता',
    emoji: '🌸',
    verse: 'ढोल-नगाड़ों की थाप पर खुशियाँ हजार होंगी,\nमामा की शादी में रौनक और बहार होगी, दिशा की तरफ से आने का न्योता स्वीकार कीजिए!',
    color: '#e8c96a',
    bg: 'rgba(232,201,106,0.08)',
  },
  {
    name: 'Arnav (अर्णव)',
    tag: 'अर्णव का पैगाम',
    emoji: '🎺',
    verse: 'शहनाई की धुन सजी है और महकेंगे फूल गुलाब,\nमामा की शादी में शामिल होकर बढ़ाइए मान-जनाब, अर्णव का यह प्यारा सा पैगाम कुबूल कीजिए!',
    color: '#9b7ccc',
    bg: 'rgba(155,124,204,0.08)',
  },
  {
    name: 'Aditya (आदित्य)',
    tag: 'आदित्य का बुलावा',
    emoji: '✨',
    verse: 'सज-धज कर बारात निकलेगी, सजेगी खुशियों की थाली, मामा की शादी में आपके आने से ही होगी दीवाली, आदित्य के इस प्यार भरे बुलावे को जरूर मानिए!',
    color: '#e8b4b8',
    bg: 'rgba(232,180,184,0.08)',
  },
]

function SpecialInvitationSection() {
  const ref = useFadeUp()
  return (
    <section id="invitation" className="py-20 sm:py-24 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #200c0a 0%, #1a0605 100%)' }}>
      <div ref={ref} className="fade-up max-w-4xl mx-auto">
        <SectionLabel>स्नेह निमंत्रण एवं बाल आग्रह</SectionLabel>
        <h2 className="font-display text-center mb-2" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', color: '#fdf6e9' }}>
          बाल बुलावा
        </h2>
        <OrnamentalDivider />

        <div className="relative mt-12 sm:mt-16">
          {/* Central golden timeline line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px timeline-line hidden md:block" style={{ transform: 'translateX(-50%)' }} />

          <div className="space-y-8 sm:space-y-12">
            {specialInvitations.map((inv, i) => (
              <SpecialInvitationCard key={inv.name} invitation={inv} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecialInvitationCard({ invitation: inv, index: i }: { invitation: typeof specialInvitations[0]; index: number }) {
  const ref = useFadeUp()
  const isLeft = i % 2 === 0
  return (
    <div ref={ref} className={`fade-up flex md:items-center gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Timeline Card */}
      <div className="flex-1 glass-card p-5 sm:p-6 relative overflow-hidden gallery-glow-frame shine-container transition-all duration-300 hover:scale-[1.02]" style={{ background: inv.bg }}>
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${inv.color}, transparent)` }} />
        <div className="flex items-start gap-3.5">
          <span className="text-3xl sm:text-4xl transition-transform duration-300 hover:scale-125 cursor-pointer">{inv.emoji}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <h3 className="font-display font-semibold text-lg sm:text-xl" style={{ color: inv.color }}>
                {inv.name}
              </h3>
              <span className="px-3 py-0.5 rounded-full text-[11px] font-body tracking-wider border border-amber-400/30 font-medium" style={{ color: inv.color, background: 'rgba(13,3,2,0.6)' }}>
                {inv.tag}
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm leading-relaxed whitespace-pre-line tracking-wide mt-2" style={{ color: '#fdf6e9ee' }}>
              {inv.verse}
            </p>
          </div>
        </div>
      </div>

      {/* Glowing Dot on timeline */}
      <div className="hidden md:flex items-center justify-center w-11 h-11 rounded-full border-2 flex-shrink-0 shadow-lg diya-glow" style={{ borderColor: inv.color, background: '#1a0a08' }}>
        <div className="w-3.5 h-3.5 rounded-full animate-pulse" style={{ background: inv.color }} />
      </div>

      {/* Timeline Spacer */}
      <div className="hidden md:block flex-1" />
    </div>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-16 px-6 text-center relative overflow-hidden" style={{ background: '#0d0302' }}>
      {/* Mandala background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <MandalaPattern size={500} />
      </div>

      <div className="relative z-10">
        <Diya size={40} />
        <h2 className="font-script mt-4" style={{ fontSize: '3rem', color: '#c9a84c' }}>
          Thank You
        </h2>
        <p className="font-display font-light mt-2" style={{ fontSize: '1.2rem', color: '#fdf6e988' }}>
          for being part of our love story
        </p>

        <OrnamentalDivider />

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6 font-display" style={{ color: '#fdf6e9' }}>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#c9a84c66' }}>Groom's Family</p>
            <p style={{ fontSize: '1.1rem' }}>Sunil Saroj &amp; Dinesh Saroj</p>
          </div>
          <div className="text-2xl" style={{ color: '#c9a84c' }}>✦</div>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#c9a84c66' }}>Bride's Family</p>
            <p style={{ fontSize: '1.1rem' }}>Sh. Jeet Lal Saroj</p>
          </div>
        </div>

        <p className="font-body text-xs mt-10" style={{ color: '#c9a84c44', letterSpacing: '0.1em' }}>
          With Love & Joy · ✦ · Made with ❤️ for a Beautiful Forever
        </p>
      </div>
    </footer>
  )
}

function MandalaPattern({ size }: { size: number }) {
  const spokes = 16
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mandala-rotate" style={{ animationDuration: '60s' }}>
      <g transform={`translate(${size / 2} ${size / 2})`}>
        {Array.from({ length: spokes }).map((_, i) => {
          const angle = (i / spokes) * 360
          return (
            <g key={i} transform={`rotate(${angle})`}>
              <ellipse cx="0" cy={-size / 4} rx={size / 20} ry={size / 6} fill="#c9a84c" />
              <circle cx="0" cy={-size / 2.2} r={size / 30} fill="#c9a84c" />
            </g>
          )
        })}
        {[80, 140, 200].map(r => (
          <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="#c9a84c" strokeWidth="1" />
        ))}
      </g>
    </svg>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '#gallery', label: 'Gallery' },
    { href: '#family', label: 'Family' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#venue', label: 'Venue' },
    { href: '#invitation', label: 'Invitations' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? 'rgba(13,3,2,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : 'none' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-script" style={{ color: '#c9a84c', fontSize: '1.5rem' }}>
          Anand & Parul
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="font-body text-xs uppercase tracking-widest transition-colors hover:text-amber-400" style={{ color: '#fdf6e988' }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(o => !o)} style={{ color: '#c9a84c' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /> : <>
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3" style={{ background: 'rgba(13,3,2,0.97)' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block font-body text-sm uppercase tracking-widest py-2" style={{ color: '#c9a84c' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ── Background Music & Royal Welcome ──────────────────────────────────────────
function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)

  const enableAndPlayAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 1.0
    audio.muted = false
    audio.play().then(() => {
      setIsPlaying(true)
      setHasInteracted(true)
      setShowOverlay(false)
    }).catch(err => {
      console.log("Audio play attempt:", err)
    })
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 1.0
    audio.muted = false

    // Attempt playback immediately
    audio.play().then(() => {
      setIsPlaying(true)
      setShowOverlay(false)
      setHasInteracted(true)
    }).catch(() => {
      setIsPlaying(false)
      setShowOverlay(true)
    })

    // Listen to gestures on window
    const events = ['click', 'touchstart', 'pointerdown', 'scroll', 'keydown']

    const handleGesture = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
          setShowOverlay(false)
        }).catch(() => { })
      }
    }

    events.forEach(evt => window.addEventListener(evt, handleGesture, { passive: true }))

    return () => {
      events.forEach(evt => window.removeEventListener(evt, handleGesture))
    }
  }, [])

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying && !audio.paused) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.muted = false
      audio.play().then(() => {
        setIsPlaying(true)
        setShowOverlay(false)
      }).catch(() => { })
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/videoplayback.m4a"
        loop
        playsInline
        preload="auto"
      />

      {/* Royal Welcome Card Overlay to guarantee instant music start */}
      {showOverlay && !hasInteracted && (
        <div
          onClick={enableAndPlayAudio}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md cursor-pointer transition-all duration-500 p-6"
        >
          <div className="glass-card p-8 sm:p-12 rounded-3xl max-w-md w-full text-center border border-amber-400/60 shadow-2xl animate-pulse">
            <div className="text-5xl mb-3 diya-glow">🪔</div>
            <p className="font-script text-amber-300 text-3xl mb-1">
              Anand &amp; Parul
            </p>
            <h2 className="font-display text-white text-xl sm:text-2xl font-light mb-6">
              Wedding Invitation
            </h2>
            <div className="py-3 px-6 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-display font-semibold text-sm sm:text-base tracking-widest uppercase shadow-xl inline-flex items-center gap-2">
              <span>🎵</span> Tap Anywhere To Open &amp; Play Music
            </div>
            <p className="font-body text-xs text-amber-200/70 mt-4 tracking-wider">
              Touch screen to experience royal wedding invitation with song
            </p>
          </div>
        </div>
      )}

      {/* Floating Music Control Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-40 glass-card px-4 py-2.5 flex items-center gap-2 text-xs transition-all hover:scale-105 hover:border-amber-400 cursor-pointer shadow-2xl backdrop-blur-md border border-amber-400/40"
        style={{ color: '#c9a84c' }}
        title={isPlaying ? "Click to Pause Music" : "Click to Play Music"}
      >
        <span className={`text-base ${isPlaying ? 'animate-bounce' : ''}`}>
          {isPlaying ? '🎵' : '🔇'}
        </span>
        <span className="font-body tracking-wider uppercase font-medium">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>
        {isPlaying && (
          <span className="flex gap-0.5 items-end h-3 ml-1">
            <span className="w-0.5 bg-amber-400 animate-pulse h-full" />
            <span className="w-0.5 bg-amber-300 animate-pulse h-2" style={{ animationDelay: '0.2s' }} />
            <span className="w-0.5 bg-yellow-400 animate-pulse h-3" style={{ animationDelay: '0.4s' }} />
          </span>
        )}
      </button>
    </>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative">
      <BackgroundMusic />
      <FloatingPetals />
      <HeroSection />
      <GallerySection />
      <FamilySection />
      <TimelineSection />
      <VenueSection />
      <BlessingsSection />
      <SpecialInvitationSection />
      <Footer />
    </div>
  )
}
