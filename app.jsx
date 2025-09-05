/* global React, ReactDOM, ReactRouterDOM, i18next, L, Chart, window */

// React & Router
const { useState, useEffect, useRef } = React;
const { BrowserRouter, Routes, Route, NavLink, Link, useLocation, useNavigate } = ReactRouterDOM;

// Framer Motion (UMD global can be framerMotion or FramerMotion)
const FM = window.framerMotion || window.FramerMotion;
const { motion, AnimatePresence } = FM || { motion: (p)=>p.children, AnimatePresence: ({children})=>children };

// react-i18next (UMD global can be ReactI18next or reactI18next)
const RI18N = window.ReactI18next || window.reactI18next;
const { I18nextProvider, initReactI18next, useTranslation } = RI18N;

// ---------------- i18n ----------------
const resources = {
  en: {
    translation: {
      brand: { name: "KhetiCarbon", tag: "MRV Solutions" },
      nav: { home: "Home", how: "How It Works", dashboard: "Dashboard", impact: "Impact", contact: "Contact" },
      hero: {
        title: "Scalable MRV Solutions for Agroforestry & Rice Carbon Projects",
        subtitle: "Measure carbon. Verify transparently. Empower farmers.",
        ctaPrimary: "Explore Dashboard",
        ctaSecondary: "Learn More",
        mascot: "Farmer mascot placeholder"
      },
      how: {
        title: "How It Works",
        step1Title: "Farmer inputs practices",
        step1Desc: "Simple mobile data entry for planting, irrigation, and soil practices.",
        step2Title: "AI + Satellites monitor",
        step2Desc: "Remote sensing and models estimate carbon outcomes continuously.",
        step3Title: "Verified credits issued",
        step3Desc: "Third-party verification and transparent issuance of credits."
      },
      dash: {
        title: "Demo Dashboard",
        leftNav: { overview: "Overview", agro: "Agroforestry", rice: "Rice Projects", verify: "Verification" },
        mapTitle: "Project Fields",
        carbonKpi: "Carbon Sequestration",
        carbonValue: "12,540 tons CO2e",
        charts: { trend: "Carbon capture over time", split: "Agro vs Rice contribution" },
        earnings: "Farmer's Potential Earnings",
        earningsValue: "₹ 4,20,000 from Carbon Credits",
        statuses: { pending: "Pending Verification", verified: "Verified", progress: "In Progress" }
      },
      impact: {
        title: "Impact",
        farmers: "Farmers Empowered",
        carbon: "Tons CO2 Captured",
        hectares: "Hectares Monitored",
        timeline: "Project Growth",
        testimonials: "Testimonials (placeholder)"
      },
      contact: {
        title: "Contact Us",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        hq: "Project HQ (map placeholder)"
      },
      footer: { rights: "© KhetiCarbon. All rights reserved." },
      ui: { theme: "Dark Mode", language: "Language" }
    }
  },
  hi: {
    translation: {
      brand: { name: "खेतीकार्बन", tag: "एमआरवी समाधान" },
      nav: { home: "होम", how: "कैसे काम करता है", dashboard: "डैशबोर्ड", impact: "प्रभाव", contact: "संपर्क" },
      hero: {
        title: "कृषिवन और धान कार्बन परियोजनाओं के लिए स्केलेबल एमआरवी समाधान",
        subtitle: "कार्बन मापें। पारदर्शी सत्यापन। किसानों को सशक्त बनाएं।",
        ctaPrimary: "डैशबोর্ড देखें",
        ctaSecondary: "और जानें",
        mascot: "किसान मैस्कॉट प्लेसहोल्डर"
      },
      how: {
        title: "यह कैसे काम करता है",
        step1Title: "किसान प्रथाएँ दर्ज करता है",
        step1Desc: "रोपण, सिंचाई और मिट्टी प्रथाओं के लिए सरल डेटा एंट्री।",
        step2Title: "एआई + सैटेलाइट निगरानी",
        step2Desc: "रिमोट सेंसिंग और मॉडल निरंतर कार्बन अनुमान करते हैं।",
        step3Title: "सत्यापित क्रेडिट जारी",
        step3Desc: "थर्ड-पार्टी सत्यापन और पारदर्शी क्रेडिट जारी।"
      },
      dash: {
        title: "डेमो डैशबोर्ड",
        leftNav: { overview: "ओवरव्यू", agro: "कृषिवन", rice: "धान परियोजनाएँ", verify: "सत्यापन" },
        mapTitle: "परियोजना क्षेत्र",
        carbonKpi: "कार्बन संकेचन",
        carbonValue: "12,540 टन CO2e",
        charts: { trend: "समय के साथ कार्बन कैप्चर", split: "कृषिवन बनाम धान योगदान" },
        earnings: "किसान की संभावित आय",
        earningsValue: "₹ 4,20,000 कार्बन क्रेडिट से",
        statuses: { pending: "सत्यापन लंबित", verified: "सत्यापित", progress: "प्रगति में" }
      },
      impact: {
        title: "प्रभाव",
        farmers: "सशक्त किसान",
        carbon: "कैप्चर CO2 टन",
        hectares: "निगरानी हेक्टेयर",
        timeline: "परियोजना वृद्धि",
        testimonials: "प्रशंसापत्र (प्लेसहोल्डर)"
      },
      contact: { title: "संपर्क करें", name: "नाम", email: "ईमेल", message: "संदेश", send: "संदेश भेजें", hq: "मुख्यालय (नक्शा प्लेसहोल्डर)" },
      footer: { rights: "© खेतीकार्बन. सर्वाधिकार सुरक्षित." },
      ui: { theme: "डार्क मोड", language: "भाषा" }
    }
  },
  te: {
    translation: {
      brand: { name: "ఖేతి కార్బన్", tag: "MRV పరిష్కారాలు" },
      nav: { home: "హోమ్", how: "ఎలా పనిచేస్తుంది", dashboard: "డాష్‌బోర్డ్", impact: "ప్రభావం", contact: "సంప్రదించండి" },
      hero: {
        title: "వ్యవసాయ అటవీ & బియ్యం కార్బన్ ప్రాజెక్టులకు స్కేలబుల్ MRV",
        subtitle: "కార్బన్ కొలవండి. పారదర్శకంగా నిర్ధారించండి. రైతులను శక్తివంతం చేయండి.",
        ctaPrimary: "డాష్‌బోర్డ్ చూడండి",
        ctaSecondary: "మరింత తెలుసుకోండి",
        mascot: "రైతు మాస్కాట్ ప్లేస్‌హోల్డర్"
      },
      how: {
        title: "ఎలా పనిచేస్తుంది",
        step1Title: "రైతు పద్ధతులు నమోదు",
        step1Desc: "నాటడం, నీటిపారుదల, నేల పద్ధతుల కోసం సులభ డేటా ఎంట్రీ.",
        step2Title: "AI + ఉపగ్రహాల పర్యవేక్షణ",
        step2Desc: "రిమోట్ సెన్సింగ్ & మోడల్స్ నిరంతరం కార్బన్ అంచనా వేస్తాయి.",
        step3Title: "నిర్ధారిత క్రెడిట్లు జారీ",
        step3Desc: "తృతీయ పక్ష నిర్ధారణ మరియు పారదర్శక జారీ."
      },
      dash: {
        title: "డెమో డాష్‌బోర్డ్",
        leftNav: { overview: "అవలోకనం", agro: "వ్యవసాయ అటవీ", rice: "బియ్యం ప్రాజెక్టులు", verify: "నిర్ధారణ" },
        mapTitle: "ప్రాజెక్ట్ ఫీల్డ్స్",
        carbonKpi: "కార్బన్ సీక్వెస్ట్రేషన్",
        carbonValue: "12,540 టన్నుల CO2e",
        charts: { trend: "కాలానుగుణ కార్బన్ పట్టివేత", split: "వ్యవసాయ అటవీ vs బియ్యం" },
        earnings: "రైతు సాధ్యమైన ఆదాయం",
        earningsValue: "₹ 4,20,000 కార్బన్ క్రెడిట్ల నుండి",
        statuses: { pending: "నిర్ధారణ పెండింగ్", verified: "నిర్ధారించబడింది", progress: "ప్రగతిలో" }
      },
      impact: { title: "ప్రభావం", farmers: "శక్తివంతమైన రైతులు", carbon: "CO2 పట్టివేత టన్నులు", hectares: "మానిటర్ చేసిన హెక్టార్లు", timeline: "వృద్ధి కాలరేఖ", testimonials: "ప్రశంసలు (ప్లేస్‌హోల్డర్)" },
      contact: { title: "మమ్మల్ని సంప్రదించండి", name: "పేరు", email: "ఈమెయిల్", message: "సందేశం", send: "సందేశం పంపండి", hq: "ప్రాజెక్ట్ హెడ్‌క్వార్టర్స్ (మ్యాప్)" },
      footer: { rights: "© ఖేతి కార్బన్. అన్ని హక్కులు కలిగి ఉన్నాయి." },
      ui: { theme: "డార్క్ మోడ్", language: "భాష" }
    }
  },
  ta: {
    translation: {
      brand: { name: "கேதி கர்பன்", tag: "MRV தீர்வுகள்" },
      nav: { home: "முதல் பக்கம்", how: "எப்படி செயல்படுகிறது", dashboard: "டாஷ்போர்டு", impact: "விளைவு", contact: "தொடர்பு" },
      hero: {
        title: "வனவேளாண்மை & நெல் கார்பன் திட்டங்களுக்கு அளவளாவிய MRV",
        subtitle: "கார்பனை அளக்கவும். வெளிப்படையாக சரிபார்க்கவும். விவசாயிகளை வலுப்படுத்தவும்.",
        ctaPrimary: "டாஷ்போர்டை பார்க்க",
        ctaSecondary: "மேலும் அறிக",
        mascot: "விவசாயி மாஸ్కாட் ப்ளேஸ்ஹோல்டர்"
      },
      how: {
        title: "எப்படி செயல்படுகிறது",
        step1Title: "விவசாயி நடைமுறைகள் உள்ளிடுகிறார்",
        step1Desc: "நட்டல், பாசனம், மண் நடைமுறைகளுக்கு எளிய தரவு உள்ளீடு.",
        step2Title: "AI + செயற்கைக் கோள் கண்காணிப்பு",
        step2Desc: "தொலை உணர்வு & மாதிரிகள் தொடர்ந்து கார்பனை மதிப்பிடும்.",
        step3Title: "சரிபார்க்கப்பட்ட கிரெடிட்கள்",
        step3Desc: "மூன்றாம் தரப்பு சரிபார்ப்பு மற்றும் வெளிப்படையான வெளியீடு."
      },
      dash: {
        title: "டெமோ டாஷ்போர்டு",
        leftNav: { overview: "மேலோட்டம்", agro: "வனவேளாண்மை", rice: "நெல் திட்டங்கள்", verify: "சரிபார்ப்பு" },
        mapTitle: "திட்ட புலங்கள்",
        carbonKpi: "கார்பன் சேமிப்பு",
        carbonValue: "12,540 டன் CO2e",
        charts: { trend: "காலம் வழியாக கார்பன்", split: "வனவேளாண்மை vs நெல்" },
        earnings: "விவசாயியின் சாத்தியமான வருமானம்",
        earningsValue: "₹ 4,20,000 கார్బன் கிரெடிட்களில் இருந்து",
        statuses: { pending: "சரிபார்ப்பு நிலுவையில்", verified: "சரிபார்க்கப்பட்டது", progress: "முன்னேற்றத்தில்" }
      },
      impact: { title: "விளைவு", farmers: "வலுப்படுத்தப்பட்ட விவசாயிகள்", carbon: "பிடிக்கப்பட்ட CO2 (டன்)", hectares: "மேற்பார்வை ஹெக்டேயர்கள்", timeline: "திட்ட வளர்ச்சி", testimonials: "சான்றுகள் (ப்ளேஸ்ஹோல్డர்)" },
      contact: { title: "எங்களை தொடர்பு கொள்ள", name: "பெயர்", email: "மின்னஞ்சல்", message: "செய்தி", send: "செய்தி அனுப்புக", hq: "திட்ட தலைமையகம் (வரைபடம்)" },
      footer: { rights: "© கேதி கர்பன். எல்லா உரிமைகளும் பாதுகாக்கப்பட்டவை." },
      ui: { theme: "டார்க் மோடு", language: "மொழி" }
    }
  },
  bn: {
    translation: {
      brand: { name: "খেতি কার্বন", tag: "MRV সমাধান" },
      nav: { home: "হোম", how: "কিভাবে কাজ করে", dashboard: "ড্যাশবোর্ড", impact: "প্রভাব", contact: "যোগাযোগ" },
      hero: {
        title: "অ্যাগ্রোফরেস্ট্রি ও ধান কার্বন প্রকল্পের জন্য স্কেলেবল MRV",
        subtitle: "কার্বন মাপুন। স্বচ্ছভাবে যাচাই করুন। কৃষকদের ক্ষমতায়ন করুন।",
        ctaPrimary: "ড্যাশবোর্ড দেখুন",
        ctaSecondary: "আরও জানুন",
        mascot: "কৃষক মাসকট প্লেসহোল্ডার"
      },
      how: {
        title: "কিভাবে কাজ করে",
        step1Title: "কৃষক প্র্যাকটিস ইনপুট করেন",
        step1Desc: "রোপণ, সেচ, মাটির প্র্যাকটিসের জন্য সহজ ডেটা এন্ট্রি।",
        step2Title: "এআই + স্যাটেলাইট মনিটর",
        step2Desc: "রিমোট সেন্সিং ও মডেল ধারাবাহিকভাবে কার্বন অনুমান করে।",
        step3Title: "যাচাইকৃত ক্রেডিট ইস্যু",
        step3Desc: "থার্ড-পার্টি যাচাই ও স্বচ্ছ ইস্যু।"
      },
      dash: {
        title: "ডেমো ড্যাশবোর্ড",
        leftNav: { overview: "ওভারভিউ", agro: "অ্যাগ্রোফরেস্ট্রি", rice: "ধান প্রকল্প", verify: "যাচাই" },
        mapTitle: "প্রকল্প ক্ষেত্র",
        carbonKpi: "কার্বন সিকোয়েস্ট্রেশন",
        carbonValue: "12,540 টন CO2e",
        charts: { trend: "সময়ের সাথে কার্বন ক্যাপচার", split: "অ্যাগ্রো বনাম ধান" },
        earnings: "কৃষকের সম্ভাব্য আয়",
        earningsValue: "₹ ৪,২০,০০০ কার্বন ক্রেডিট থেকে",
        statuses: { pending: "যাচাই অপেক্ষমান", verified: "যাচাইকৃত", progress: "চলমান" }
      },
      impact: { title: "প্রভাব", farmers: "কৃষক ক্ষমতায়িত", carbon: "ধরা CO2 (টন)", hectares: "মনিটর করা হেক্টর", timeline: "প্রকল্প বৃদ্ধি", testimonials: "প্রশংসাপত্র (প্লেসহোল্ডার)" },
      contact: { title: "যোগাযোগ করুন", name: "নাম", email: "ইমেইল", message: "বার্তা", send: "বার্তা পাঠান", hq: "প্রকল্প সদর দপ্তর (মানচিত্র)" },
      footer: { rights: "© খেতি কার্বন. সর্বস্বত্ব সংরক্ষিত." },
      ui: { theme: "ডার্ক মোড", language: "ভাষা" }
    }
  }
};

i18next.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('kheti_lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

// ---------------- Theme ----------------
function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('kheti_theme') === 'dark');
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('kheti_theme', dark ? 'dark' : 'light');
  }, [dark]);
  return { dark, setDark };
}

// ---------------- Shared UI ----------------
function Navbar() {
  const { t, i18n } = useTranslation();
  const { dark, setDark } = useTheme();
  useLocation(); // ensure rerender on route change for active links

  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="logo" aria-hidden="true" />
          <div className="name">{t('brand.name')}</div>
          <div className="tag">{t('brand.tag')}</div>
        </div>
        <nav className="nav-links">
          <NavLink className={({isActive})=>`nav-link ${isActive ? 'active':''}`} to="/">{t('nav.home')}</NavLink>
          <NavLink className={({isActive})=>`nav-link ${isActive ? 'active':''}`} to="/how">{t('nav.how')}</NavLink>
          <NavLink className={({isActive})=>`nav-link ${isActive ? 'active':''}`} to="/dashboard">{t('nav.dashboard')}</NavLink>
          <NavLink className={({isActive})=>`nav-link ${isActive ? 'active':''}`} to="/impact">{t('nav.impact')}</NavLink>
          <NavLink className={({isActive})=>`nav-link ${isActive ? 'active':''}`} to="/contact">{t('nav.contact')}</NavLink>
        </nav>
        <div className="controls">
          <label className="toggle" title={t('ui.theme')} onClick={()=>setDark(!dark)}>
            <span className="dot" /> {t('ui.theme')}
          </label>
          <select
            className="select"
            aria-label={t('ui.language')}
            value={i18n.language}
            onChange={(e)=>{ i18n.changeLanguage(e.target.value); localStorage.setItem('kheti_lang', e.target.value); }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
            <option value="ta">தமிழ்</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function Section({ id, children }) {
  return <section id={id} className="section container">{children}</section>;
}

// ---------------- Pages ----------------
function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="container">
      <motion.div className="hero" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
        <div className="hero-grid">
          <div>
            <motion.h1 className="title" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.1, duration:0.6}}>
              {t('hero.title')}
            </motion.h1>
            <motion.p className="subtitle" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.2, duration:0.6}}>
              {t('hero.subtitle')}
            </motion.p>
            <motion.div className="cta" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.3, duration:0.6}}>
              <button className="btn-primary" onClick={()=>navigate('/dashboard')}>{t('hero.ctaPrimary')}</button>
              <Link className="btn-glass" to="/how">{t('hero.ctaSecondary')}</Link>
            </motion.div>
          </div>
          <motion.div className="mascot" initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} transition={{delay:0.25, duration:0.6}}>
            {t('hero.mascot')}
          </motion.div>
        </div>
      </motion.div>

      <Section id="how">
        <h2 className="section-title">{t('how.title')}</h2>
        <div className="grid-3">
          {[1,2,3].map((i)=> (
            <motion.div key={i} className="card" whileHover={{scale:1.02}}>
              <div style={{fontSize:24}}> {i===1?'📱': i===2?'🛰️':'✅'} </div>
              <h3>{t(`how.step${i}Title`)}</h3>
              <p>{t(`how.step${i}Desc`)}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function HowItWorks() {
  const { t } = useTranslation();
  return (
    <div className="container section">
      <h2 className="section-title">{t('how.title')}</h2>
      <div className="grid-3">
        {[1,2,3].map((i)=> (
          <motion.div key={i} className="card" whileHover={{scale:1.02}}>
            <div style={{fontSize:28}}> {i===1?'📱': i===2?'🛰️':'✅'} </div>
            <h3>{t(`how.step${i}Title`)}</h3>
            <p>{t(`how.step${i}Desc`)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const { t, i18n } = useTranslation();
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const lineRef = useRef(null);
  const pieRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(()=>{
    if (!mapRef.current && mapContainerRef.current) {
      const map = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 4.5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      const marker = L.circle([22.9734, 78.6569], { radius: 120000, color: '#00a86b' }).addTo(map);
      marker.bindPopup('Sample Agroforestry Cluster');
      mapRef.current = map;
    }
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  useEffect(()=>{
    // Charts init
    if (!lineChartRef.current && lineRef.current) {
      const ctx = lineRef.current.getContext('2d');
      lineChartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2019','2020','2021','2022','2023','2024'],
          datasets: [{
            label: t('dash.charts.trend'),
            data: [600, 1100, 1800, 2600, 3600, 4800],
            borderColor: '#00a86b',
            backgroundColor: 'rgba(0,168,107,0.25)',
            tension: 0.35,
            fill: true,
          }]
        },
        options: { responsive: true, plugins: { legend: { display: true, labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text') } }},
          scales: { x: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--muted') } }, y: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--muted') } } }
        }
      });
    }
    if (!pieChartRef.current && pieRef.current) {
      const ctx2 = pieRef.current.getContext('2d');
      pieChartRef.current = new Chart(ctx2, {
        type: 'pie',
        data: { labels: [t('dash.leftNav.agro'), t('dash.leftNav.rice')], datasets: [{ data: [65, 35], backgroundColor: ['#00a86b', '#5a4634'] }] },
        options: { plugins: { legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text') } } } }
      });
    }
    const onLang = () => {
      // Update labels on language change
      if (lineChartRef.current) {
        lineChartRef.current.data.datasets[0].label = t('dash.charts.trend');
        lineChartRef.current.update();
      }
      if (pieChartRef.current) {
        pieChartRef.current.data.labels = [t('dash.leftNav.agro'), t('dash.leftNav.rice')];
        pieChartRef.current.update();
      }
    };
    i18n.on('languageChanged', onLang);
    return ()=> i18n.off('languageChanged', onLang);
  }, [t, i18n]);

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
        <main className="panel" style={{display:'grid', gap:12}}>
          <div>
            <div className="panel-title">{t('dash.mapTitle')}</div>
            <div ref={mapContainerRef} className="map" />
          </div>
          <div>
            <div className="panel-title">{t('dash.carbonKpi')}</div>
            <div className="kpi">{t('dash.carbonValue')}</div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <div className="panel">
              <canvas ref={lineRef} height="120"></canvas>
            </div>
            <div className="panel">
              <canvas ref={pieRef} height="120"></canvas>
            </div>
          </div>
        </main>
        <aside className="panel" style={{display:'grid', gap:12}}>
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
  );
}

function AnimatedCounter({ to = 0, duration = 1.2 }) {
  const [value, setValue] = useState(0);
  useEffect(()=>{
    let raf; const start = performance.now();
    const step = (now)=>{
      const p = Math.min(1, (now - start) / (duration*1000));
      setValue(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return ()=> cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span className="num">{value.toLocaleString()}</span>;
}

function Impact() {
  const { t } = useTranslation();
  return (
    <div className="container section">
      <h2 className="section-title">{t('impact.title')}</h2>
      <div className="counters">
        <div className="counter"><AnimatedCounter to={1200000} duration={1.6}/> <div>{t('impact.farmers')}</div></div>
        <div className="counter"><AnimatedCounter to={3400000} duration={1.6}/> <div>{t('impact.carbon')}</div></div>
        <div className="counter"><AnimatedCounter to={200000} duration={1.6}/> <div>{t('impact.hectares')}</div></div>
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
            <p style={{margin:'6px 0 0', color:'var(--muted)'}}>“{t('hero.subtitle')}”</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  const mapEl = useRef(null);
  useEffect(()=>{
    if (!mapRef.current && mapEl.current) {
      const map = L.map(mapEl.current).setView([28.6139, 77.2090], 5); // New Delhi placeholder
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
      L.marker([28.6139, 77.2090]).addTo(map).bindPopup('KhetiCarbon HQ (placeholder)');
      mapRef.current = map;
    }
    return ()=>{ if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);
  return (
    <div className="container section">
      <h2 className="section-title">{t('contact.title')}</h2>
      <div className="grid-3" style={{gridTemplateColumns:'1fr 1fr'}}>
        <form className="panel form" onSubmit={(e)=>{e.preventDefault(); alert('Prototype only');}}>
          <input className="input" placeholder={t('contact.name')} aria-label={t('contact.name')} />
          <input className="input" type="email" placeholder={t('contact.email')} aria-label={t('contact.email')} />
          <textarea className="textarea" placeholder={t('contact.message')} aria-label={t('contact.message')} />
          <button className="btn-primary" type="submit">{t('contact.send')}</button>
        </form>
        <div className="panel" style={{display:'grid', gap:8}}>
          <div className="panel-title">{t('contact.hq')}</div>
          <div className="map" ref={mapEl}></div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="bar" />
      <div>{t('footer.rights')}</div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(()=>{ window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how" element={<HowItWorks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);
