import { useEffect, useRef, useState } from 'react'
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import { Chart } from 'chart.js/auto'

function useTheme(){
  const [dark,setDark] = useState(()=> localStorage.getItem('kheti_theme')==='dark')
  useEffect(()=>{
    const root = document.documentElement
    if(dark) root.classList.add('dark'); else root.classList.remove('dark')
    localStorage.setItem('kheti_theme', dark?'dark':'light')
  },[dark])
  return { dark, setDark }
}

function Navbar(){
  const { t, i18n } = useTranslation()
  const { dark, setDark } = useTheme()
  useLocation()
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="logo" aria-hidden="true" />
          <div className="name">{t('brand.name')}</div>
          <div className="tag">{t('brand.tag')}</div>
        </div>
        <nav className="nav-links">
          <NavLink className={({isActive})=>`nav-link ${isActive?'active':''}`} to="/">{t('nav.home')}</NavLink>
          <NavLink className={({isActive})=>`nav-link ${isActive?'active':''}`} to="/how">{t('nav.how')}</NavLink>
          <NavLink className={({isActive})=>`nav-link ${isActive?'active':''}`} to="/dashboard">{t('nav.dashboard')}</NavLink>
          <NavLink className={({isActive})=>`nav-link ${isActive?'active':''}`} to="/impact">{t('nav.impact')}</NavLink>
          <NavLink className={({isActive})=>`nav-link ${isActive?'active':''}`} to="/contact">{t('nav.contact')}</NavLink>
        </nav>
        <div className="controls">
          <label className="toggle" title={t('ui.theme')} onClick={()=>setDark(!dark)}>
            <span className="dot"/> {t('ui.theme')}
          </label>
          <select className="select" aria-label={t('ui.language')} value={i18n.language} onChange={(e)=>{i18n.changeLanguage(e.target.value); localStorage.setItem('kheti_lang', e.target.value)}}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
            <option value="ta">தமிழ்</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function Home(){
  const { t } = useTranslation()
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement|null>(null)
  useEffect(()=>{
    const c = canvasRef.current; if(!c) return
    const ctx = c.getContext('2d')!
    let raf:number; const dpr = Math.min(2, window.devicePixelRatio||1)
    const resize = ()=>{ c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr }
    resize();
    const dots = Array.from({length:40}).map(()=>({ x: Math.random()*c.width, y: Math.random()*c.height, r: 1 + Math.random()*2, dx:(Math.random()-.5)*0.4, dy:(Math.random()-.5)*0.4 }))
    const draw = ()=>{
      ctx.clearRect(0,0,c.width,c.height)
      ctx.globalAlpha = .6
      for(const d of dots){
        d.x += d.dx; d.y += d.dy; if(d.x<0||d.x>c.width) d.dx*=-1; if(d.y<0||d.y>c.height) d.dy*=-1
      }
      ctx.fillStyle = 'rgba(0,168,107,0.25)'
      for(const d of dots){ ctx.beginPath(); ctx.arc(d.x, d.y, d.r*dpr, 0, Math.PI*2); ctx.fill() }
      ctx.strokeStyle = 'rgba(99,230,190,0.25)'
      ctx.lineWidth = 1*dpr
      for(let i=0;i<dots.length;i++){
        for(let j=i+1;j<dots.length;j++){
          const a=dots[i], b=dots[j]; const dx=a.x-b.x, dy=a.y-b.y; const dist = Math.hypot(dx,dy)
          if(dist<120*dpr){ ctx.globalAlpha = (1 - dist/(120*dpr)) * .7; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke() }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    const onResize = ()=>resize(); window.addEventListener('resize', onResize)
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  },[])
  return (
    <div className="container">
      <motion.div className="hero" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
        <canvas ref={canvasRef} style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'}}/>
        <div className="hero-grid">
          <div>
            <motion.h1 className="title" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.1,duration:.6}}>{t('hero.title')}</motion.h1>
            <motion.p className="subtitle" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.2,duration:.6}}>{t('hero.subtitle')}</motion.p>
            <motion.div className="cta" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.3,duration:.6}}>
              <button className="btn-primary" onClick={()=>navigate('/dashboard')}>{t('hero.ctaPrimary')}</button>
              <NavLink className="btn-glass" to="/how">{t('hero.ctaSecondary')}</NavLink>
            </motion.div>
          </div>
          <motion.div className="mascot" initial={{scale:.95,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:.25,duration:.6}}>
            {t('hero.mascot')}
          </motion.div>
        </div>
      </motion.div>
      <section className="section container">
        <h2 className="section-title">{t('how.title')}</h2>
        <div className="grid-3">
          {[1,2,3].map(i=> (
            <motion.div key={i} className="card" whileHover={{scale:1.02}}>
              <div style={{fontSize:24}}>{i===1?'📱':i===2?'🛰️':'✅'}</div>
              <h3>{t(`how.step${i}Title`)}</h3>
              <p>{t(`how.step${i}Desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="section container">
        <h2 className="section-title">{t('homeExtra.trustTitle')}</h2>
        <div className="grid-3">
          {t('homeExtra.trustBadges', { returnObjects:true }) as string[]}
          {((t('homeExtra.trustBadges',{returnObjects:true}) as string[])||[]).map((b,i)=> (
            <div className="card" key={i}>{b}</div>
          ))}
        </div>
      </section>
      <section className="section container">
        <h2 className="section-title">{t('homeExtra.serveTitle')}</h2>
        <div className="grid-3">
          {((t('homeExtra.serveCards',{returnObjects:true}) as any[])||[]).map((c,i)=> (
            <div className="card" key={i}>
              <h3 style={{marginTop:0}}>{c.title}</h3>
              <p style={{color:'var(--muted)'}}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section container">
        <h2 className="section-title">{t('homeExtra.whyTitle')}</h2>
        <div className="card">
          <ul style={{margin:0,paddingLeft:18}}>
            {((t('homeExtra.whyBullets',{returnObjects:true}) as string[])||[]).map((b,i)=> (
              <li key={i} style={{margin:'6px 0',color:'var(--muted)'}}>{b}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

function How(){
  const { t } = useTranslation()
  return (
    <div className="container section">
      <h2 className="section-title">{t('how.title')}</h2>
      <div className="grid-3">
        {[1,2,3].map(i=> (
          <motion.div key={i} className="card" whileHover={{scale:1.02}}>
            <div style={{fontSize:28}}>{i===1?'📱':i===2?'🛰️':'✅'}</div>
            <h3>{t(`how.step${i}Title`)}</h3>
            <p>{t(`how.step${i}Desc`)}</p>
          </motion.div>
        ))}
      </div>
      <div className="section"/>
      <h3 className="section-title">{t('howExtra.methodologyTitle')}</h3>
      <div className="card">
        <ol style={{margin:0,paddingLeft:18}}>
          {((t('howExtra.methodologyBullets',{returnObjects:true}) as string[])||[]).map((b,i)=> (
            <li key={i} style={{margin:'6px 0',color:'var(--muted)'}}>{b}</li>
          ))}
        </ol>
      </div>
      <div className="section"/>
      <h3 className="section-title">{t('howExtra.faqTitle')}</h3>
      <div className="grid-3">
        {((t('howExtra.faq',{returnObjects:true}) as any[])||[]).map((f,i)=> (
          <div className="card" key={i}>
            <strong>{f.q}</strong>
            <p style={{color:'var(--muted)'}}>{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Dashboard(){
  const { t, i18n } = useTranslation()
  const mapRef = useRef<L.Map|null>(null)
  const mapEl = useRef<HTMLDivElement|null>(null)
  const lineRef = useRef<HTMLCanvasElement|null>(null)
  const pieRef = useRef<HTMLCanvasElement|null>(null)
  const lineChartRef = useRef<Chart|null>(null)
  const pieChartRef = useRef<Chart|null>(null)

  useEffect(()=>{
    if(!mapRef.current && mapEl.current){
      const map = L.map(mapEl.current).setView([20.5937,78.9629], 4.5)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map)
      const marker = L.circle([22.9734,78.6569], { radius: 120000, color: '#00a86b' }).addTo(map)
      marker.bindPopup('Sample Agroforestry Cluster')
      mapRef.current = map
    }
    return ()=>{ if(mapRef.current){ mapRef.current.remove(); mapRef.current = null } }
  },[])

  useEffect(()=>{
    if(!lineChartRef.current && lineRef.current){
      const ctx = lineRef.current.getContext('2d')!
      lineChartRef.current = new Chart(ctx, {
        type:'line',
        data:{ labels:['2019','2020','2021','2022','2023','2024'], datasets:[{ label: t('dash.charts.trend'), data:[600,1100,1800,2600,3600,4800], borderColor:'#00a86b', backgroundColor:'rgba(0,168,107,.25)', tension:.35, fill:true }] },
        options:{ responsive:true, plugins:{ legend:{ labels:{ color:getComputedStyle(document.documentElement).getPropertyValue('--text') } } }, scales:{ x:{ ticks:{ color:getComputedStyle(document.documentElement).getPropertyValue('--muted') } }, y:{ ticks:{ color:getComputedStyle(document.documentElement).getPropertyValue('--muted') } } } }
      })
    }
    if(!pieChartRef.current && pieRef.current){
      const ctx2 = pieRef.current.getContext('2d')!
      pieChartRef.current = new Chart(ctx2, { type:'pie', data:{ labels:[t('dash.leftNav.agro'), t('dash.leftNav.rice')], datasets:[{ data:[65,35], backgroundColor:['#00a86b','#5a4634'] }] }, options:{ plugins:{ legend:{ labels:{ color:getComputedStyle(document.documentElement).getPropertyValue('--text') } } } } })
    }
    const onLang = ()=>{
      if(lineChartRef.current){ lineChartRef.current.data.datasets[0].label = t('dash.charts.trend'); lineChartRef.current.update() }
      if(pieChartRef.current){ pieChartRef.current.data.labels = [t('dash.leftNav.agro'), t('dash.leftNav.rice')]; pieChartRef.current.update() }
    }
    i18n.on('languageChanged', onLang)
    return ()=>{ i18n.off('languageChanged', onLang) }
  },[t,i18n])

  return (
    <div className="container section">
      <h2 className="section-title">{t('dash.title')}</h2>
      <div className="dashboard">
        <aside className="panel sidebar">
          <div className="panel-title">{t('dash.title')}</div>
          <div className="nav">
            <a href="#">{t('dash.leftNav.overview')}</a>
            <a href="#">{t('dash.leftNav.agro')}</a>
            <a href="#">{t('dash.leftNav.rice')}</a>
            <a href="#">{t('dash.leftNav.verify')}</a>
          </div>
        </aside>
        <main className="panel" style={{display:'grid',gap:12}}>
          <div>
            <div className="panel-title">{t('dash.mapTitle')}</div>
            <div className="map" ref={mapEl}></div>
          </div>
          <div>
            <div className="panel-title">{t('dash.carbonKpi')}</div>
            <div className="kpi">{t('dash.carbonValue')}</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div className="panel"><canvas ref={lineRef} height={120}/></div>
            <div className="panel"><canvas ref={pieRef} height={120}/></div>
          </div>
        </main>
        <aside className="panel" style={{display:'grid',gap:12}}>
          <div>
            <div className="panel-title">{t('dash.earnings')}</div>
            <div className="kpi">{t('dash.earningsValue')}</div>
          </div>
          <div>
            <div className="panel-title">Status</div>
            <div className="status-badges">
              <span className="badge pending">{t('dash.statuses.pending')}</span>
              <span className="badge verified">{t('dash.statuses.verified')}</span>
              <span className="badge progress">{t('dash.statuses.progress')}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function AnimatedCounter({ to=0, duration=1.2 }:{ to?:number, duration?:number }){
  const [value,setValue] = useState(0)
  useEffect(()=>{
    let raf:number; const start = performance.now()
    const step = (now:number)=>{ const p = Math.min(1,(now-start)/(duration*1000)); setValue(Math.floor(p*to)); if(p<1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step)
    return ()=> cancelAnimationFrame(raf)
  },[to,duration])
  return <span className="num">{value.toLocaleString()}</span>
}

function Impact(){
  const { t } = useTranslation()
  return (
    <div className="container section">
      <h2 className="section-title">{t('impact.title')}</h2>
      <div className="counters">
        <div className="counter"><AnimatedCounter to={1200000} duration={1.6}/><div>{t('impact.farmers')}</div></div>
        <div className="counter"><AnimatedCounter to={3400000} duration={1.6}/><div>{t('impact.carbon')}</div></div>
        <div className="counter"><AnimatedCounter to={200000} duration={1.6}/><div>{t('impact.hectares')}</div></div>
      </div>
      <div className="timeline">
        <div className="timeline-item">2019 → Pilot projects launched</div>
        <div className="timeline-item">2021 → Scaling across districts</div>
        <div className="timeline-item">2024 → Satellite-integrated MRV</div>
      </div>
      <h3 style={{marginTop:16}}>{t('impact.testimonials')}</h3>
      <div className="testimonials">
        {[1,2,3].map(i=> (
          <div className="testimonial" key={i}>
            <strong>Farmer #{i}</strong>
            <p style={{margin:'6px 0 0',color:'var(--muted)'}}>“{t('hero.subtitle')}”</p>
          </div>
        ))}
      </div>
      <div className="section"/>
      <h3 className="section-title">{t('impactExtra.sdgTitle')}</h3>
      <div className="status-badges">
        {((t('impactExtra.sdgBadges',{returnObjects:true}) as string[])||[]).map((s,i)=> (
          <span className="badge verified" key={i}>{s}</span>
        ))}
      </div>
      <div className="section"/>
      <h3 className="section-title">{t('impactExtra.partnersTitle')}</h3>
      <div className="testimonials">
        {[1,2,3].map(i=> (<div className="testimonial" key={i}>Partner #{i} (logo placeholder)</div>))}
      </div>
    </div>
  )
}

function Contact(){
  const { t } = useTranslation()
  const mapRef = useRef<L.Map|null>(null)
  const mapEl = useRef<HTMLDivElement|null>(null)
  useEffect(()=>{
    if(!mapRef.current && mapEl.current){
      const map = L.map(mapEl.current).setView([28.6139,77.2090], 5)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map)
      L.marker([28.6139,77.2090]).addTo(map).bindPopup('KhetiCarbon HQ (placeholder)')
      mapRef.current = map
    }
    return ()=>{ if(mapRef.current){ mapRef.current.remove(); mapRef.current = null } }
  },[])
  return (
    <div className="container section">
      <h2 className="section-title">{t('contact.title')}</h2>
      <div className="grid-3" style={{gridTemplateColumns:'1fr 1fr'}}>
        <form className="panel form" onSubmit={(e)=>{e.preventDefault(); alert('Prototype only')}}>
          <input className="input" placeholder={t('contact.name')!} aria-label={t('contact.name')!} />
          <input className="input" type="email" placeholder={t('contact.email')!} aria-label={t('contact.email')!} />
          <textarea className="textarea" placeholder={t('contact.message')!} aria-label={t('contact.message')!} />
          <button className="btn-primary" type="submit">{t('contact.send')}</button>
        </form>
        <div className="panel" style={{display:'grid',gap:8}}>
          <div className="panel-title">{t('contact.hq')}</div>
          <div className="map" ref={mapEl}></div>
        </div>
      </div>
      <div className="section"/>
      <div className="grid-3">
        <div className="card">
          <h3 style={{marginTop:0}}>{t('contactExtra.officesTitle')}</h3>
          <ul style={{margin:0,paddingLeft:18}}>
            <li>{t('contactExtra.address1')}</li>
            <li>{t('contactExtra.address2')}</li>
          </ul>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>{t('contactExtra.socialTitle')}</h3>
          <div className="status-badges">
            <span className="badge">LinkedIn</span>
            <span className="badge">X</span>
            <span className="badge">YouTube</span>
          </div>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>{t('contactExtra.demoTitle')}</h3>
          <ul style={{margin:0,paddingLeft:18}}>
            {((t('contactExtra.demoBullets',{returnObjects:true}) as string[])||[]).map((b,i)=> (<li key={i}>{b}</li>))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Footer(){
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <div className="bar"/>
      <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
        <a href="#" className="nav-link" style={{padding:'6px 10px'}}>{t('footerLinks.about')}</a>
        <a href="#" className="nav-link" style={{padding:'6px 10px'}}>{t('footerLinks.privacy')}</a>
        <a href="#" className="nav-link" style={{padding:'6px 10px'}}>{t('footerLinks.terms')}</a>
      </div>
      <div style={{marginTop:8}}>{t('footer.rights')}</div>
    </footer>
  )
}

function ScrollToTop(){
  const { pathname } = useLocation()
  useEffect(()=>{ window.scrollTo({ top:0, behavior:'smooth' }) }, [pathname])
  return null
}

export default function App(){
  return (
    <>
      <Navbar/>
      <ScrollToTop/>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/how" element={<How/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/impact" element={<Impact/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </AnimatePresence>
      <Footer/>
    </>
  )
}
