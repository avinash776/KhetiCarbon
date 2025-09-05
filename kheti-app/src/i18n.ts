import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: { translation: {
    brand: { name: 'KhetiCarbon', tag: 'MRV Solutions' },
    nav: { home: 'Home', how: 'How It Works', dashboard: 'Dashboard', impact: 'Impact', contact: 'Contact' },
    hero: { title: 'Scalable MRV Solutions for Agroforestry & Rice Carbon Projects', subtitle: 'Measure carbon. Verify transparently. Empower farmers.', ctaPrimary: 'Explore Dashboard', ctaSecondary: 'Learn More', mascot: 'Farmer mascot placeholder' },
    how: { title: 'How It Works', step1Title: 'Farmer inputs practices', step1Desc: 'Simple mobile data entry for planting, irrigation, and soil practices.', step2Title: 'AI + Satellites monitor', step2Desc: 'Remote sensing and models estimate carbon outcomes continuously.', step3Title: 'Verified credits issued', step3Desc: 'Third-party verification and transparent issuance of credits.' },
    dash: { title: 'Demo Dashboard', leftNav: { overview: 'Overview', agro: 'Agroforestry', rice: 'Rice Projects', verify: 'Verification' }, mapTitle: 'Project Fields', carbonKpi: 'Carbon Sequestration', carbonValue: '12,540 tons CO2e', charts: { trend: 'Carbon capture over time', split: 'Agro vs Rice contribution' }, earnings: "Farmer's Potential Earnings", earningsValue: '₹ 4,20,000 from Carbon Credits', statuses: { pending: 'Pending Verification', verified: 'Verified', progress: 'In Progress' } },
    impact: { title: 'Impact', farmers: 'Farmers Empowered', carbon: 'Tons CO2 Captured', hectares: 'Hectares Monitored', timeline: 'Project Growth', testimonials: 'Testimonials (placeholder)' },
    contact: { title: 'Contact Us', name: 'Name', email: 'Email', message: 'Message', send: 'Send Message', hq: 'Project HQ (map placeholder)' },
    footer: { rights: '© KhetiCarbon. All rights reserved.' },
    ui: { theme: 'Dark Mode', language: 'Language' }
    ,homeExtra:{
      trustTitle:'Trusted by design',
      trustBadges:['Verra (placeholder)','Gold Standard (placeholder)','ISO 14064 (placeholder)'],
      serveTitle:'Who we serve',
      serveCards:[
        {title:'Farmers',desc:'Simple mobile workflows, SMS prompts, transparent earnings.'},
        {title:'Aggregators',desc:'Bulk onboarding, geospatial tools, project templates.'},
        {title:'Verifiers',desc:'Evidence packs, sampling frames, traceable audit trails.'},
        {title:'Buyers',desc:'Quality credits with provenance and high-integrity claims.'}
      ],
      whyTitle:'Why KhetiCarbon',
      whyBullets:[
        'Evidence-led MRV combining field, satellite and model-based signals',
        'Near real-time analytics and risk flags',
        'Inclusive design for low-connectivity contexts',
        'End-to-end transparency—from plot to credit issuance'
      ]
    },
    howExtra:{
      methodologyTitle:'Methodology & workflow',
      methodologyBullets:[
        'Define boundaries and sampling strategy',
        'Data collection: practices, biomass, water, soils',
        'Remote sensing and model calibration',
        'QA/QC, uncertainty, leakage checks',
        'Third-party verification & issuance'
      ],
      faqTitle:'MRV FAQ',
      faq:[
        {q:'How do you validate satellite estimates?',a:'We blend multi-sensor RS with field plots and cross-validate against model outputs; deviations raise risk flags.'},
        {q:'What standards do you support?',a:'We align to leading voluntary standards and can adapt to programmatic requirements; see badges above.'},
        {q:'Can it work offline?',a:'Yes. Field apps cache data and sync when connectivity is restored.'}
      ]
    },
    impactExtra:{
      sdgTitle:'Aligned with UN SDGs',
      sdgBadges:['SDG 2: Zero Hunger','SDG 13: Climate Action','SDG 15: Life on Land'],
      partnersTitle:'Partners & pilots (placeholder)'
    },
    contactExtra:{
      officesTitle:'Offices',
      address1:'New Delhi, India (HQ)',
      address2:'Hyderabad, India',
      socialTitle:'Follow us',
      demoTitle:'Request a demo',
      demoBullets:['Live project walkthrough','Data pipeline overview','Pricing & rollout plan']
    },
    footerLinks:{ about:'About', privacy:'Privacy', terms:'Terms' }
  }},
  hi: { translation: {
    brand: { name: 'खेतीकार्बन', tag: 'एमआरवी समाधान' },
    nav: { home: 'होम', how: 'कैसे काम करता है', dashboard: 'डैशबोर्ड', impact: 'प्रभाव', contact: 'संपर्क' },
    hero: { title: 'कृषिवन और धान कार्बन परियोजनाओं के लिए स्केलेबल एमआरवी समाधान', subtitle: 'कार्बन मापें। पारदर्शी सत्यापन। किसानों को सशक्त बनाएं।', ctaPrimary: 'डैशबोर्ड देखें', ctaSecondary: 'और जानें', mascot: 'किसान मैस्कॉट प्लेसहोल्डर' },
    how: { title: 'यह कैसे काम करता है', step1Title: 'किसान प्रथाएँ दर्ज करता है', step1Desc: 'रोपण, सिंचाई और मिट्टी प्रथाओं के लिए सरल डेटा एंट्री।', step2Title: 'एआई + सैटेलाइट निगरानी', step2Desc: 'रिमोट सेंसिंग और मॉडल निरंतर कार्बन अनुमान करते हैं।', step3Title: 'सत्यापित क्रेडिट जारी', step3Desc: 'थर्ड-पार्टी सत्यापन और पारदर्शी क्रेडिट जारी।' },
    dash: { title: 'डेमो डैशबोर्ड', leftNav: { overview: 'ओवरव्यू', agro: 'कृषिवन', rice: 'धान परियोजनाएँ', verify: 'सत्यापन' }, mapTitle: 'परियोजना क्षेत्र', carbonKpi: 'कार्बन संकेचन', carbonValue: '12,540 टन CO2e', charts: { trend: 'समय के साथ कार्बन कैप्चर', split: 'कृषिवन बनाम धान योगदान' }, earnings: 'किसान की संभावित आय', earningsValue: '₹ 4,20,000 कार्बन क्रेडिट से', statuses: { pending: 'सत्यापन लंबित', verified: 'सत्यापित', progress: 'प्रगति में' } },
    impact: { title: 'प्रभाव', farmers: 'सशक्त किसान', carbon: 'कैप्चर CO2 टन', hectares: 'निगरानी हेक्टेयर', timeline: 'परियोजना वृद्धि', testimonials: 'प्रशंसापत्र (प्लेसहोल्डर)' },
    contact: { title: 'संपर्क करें', name: 'नाम', email: 'ईमेल', message: 'संदेश', send: 'संदेश भेजें', hq: 'मुख्यालय (नक्शा प्लेसहोल्डर)' },
    footer: { rights: '© खेतीकार्बन. सर्वाधिकार सुरक्षित.' },
    ui: { theme: 'डार्क मोड', language: 'भाषा' }
  }},
  te: { translation: {
    brand: { name: 'ఖేతి కార్బన్', tag: 'MRV పరిష్కారాలు' },
    nav: { home: 'హోమ్', how: 'ఎలా పనిచేస్తుంది', dashboard: 'డాష్‌బోర్డ్', impact: 'ప్రభావం', contact: 'సంప్రదించండి' },
    hero: { title: 'వ్యవసాయ అటవీ & బియ్యం కార్బన్ ప్రాజెక్టులకు స్కేలబుల్ MRV', subtitle: 'కార్బన్ కొలవండి. పారదర్శకంగా నిర్ధారించండి. రైతులను శక్తివంతం చేయండి.', ctaPrimary: 'డాష్‌బోర్డ్ చూడండి', ctaSecondary: 'మరింత తెలుసుకోండి', mascot: 'రైతు మాస్కాట్ ప్లేస్‌హోల్డర్' },
    how: { title: 'ఎలా పనిచేస్తుంది', step1Title: 'రైతు పద్ధతులు నమోదు', step1Desc: 'నాటడం, నీటిపారుదల, నేల పద్ధతుల కోసం సులభ డేటా ఎంట్రీ.', step2Title: 'AI + ఉపగ్రహాల పర్యవేక్షణ', step2Desc: 'రిమోట్ సెన్సింగ్ & మోడల్స్ నిరంతరం కార్బన్ అంచనా వేస్తాయి.', step3Title: 'నిర్ధారిత క్రెడిట్లు జారీ', step3Desc: 'తృతీయ పక్ష నిర్ధారణ మరియు పారదర్శక జారీ.' },
    dash: { title: 'డెమో డాష్‌బోర్డ్', leftNav: { overview: 'అవలోకనం', agro: 'వ్యవసాయ అటవీ', rice: 'బియ్యం ప్రాజెక్టులు', verify: 'నిర్ధారణ' }, mapTitle: 'ప్రాజెక్ట్ ఫీల్డ్స్', carbonKpi: 'కార్బన్ సీక్వెస్ట్రేషన్', carbonValue: '12,540 టన్నుల CO2e', charts: { trend: 'కాలానుగుణ కార్బన్ పట్టివేత', split: 'వ్యవసాయ అటవీ vs బియ్యం' }, earnings: 'రైతు సాధ్యమైన ఆదాయం', earningsValue: '₹ 4,20,000 కార్బన్ క్రెడిట్ల నుండి', statuses: { pending: 'నిర్ధారణ పెండింగ్', verified: 'నిర్ధారించబడింది', progress: 'ప్రగతిలో' } },
    impact: { title: 'ప్రభావం', farmers: 'శక్తివంతమైన రైతులు', carbon: 'CO2 పట్టివేత టన్నులు', hectares: 'మానిటర్ చేసిన హెక్టార్లు', timeline: 'వృద్ధి కాలరేఖ', testimonials: 'ప్రశంసలు (ప్లేస్‌హోల్డర్)' },
    contact: { title: 'మమ్మల్ని సంప్రదించండి', name: 'పేరు', email: 'ఈమెయిల్', message: 'సందేశం', send: 'సందేశం పంపండి', hq: 'ప్రాజెక్ట్ హెడ్‌క్వార్టర్స్ (మ్యాప్)' },
    footer: { rights: '© ఖేతి కార్బన్. అన్ని హక్కులు కలిగి ఉన్నాయి.' },
    ui: { theme: 'డార్క్ మోడ్', language: 'భాష' }
  }},
  ta: { translation: {
    brand: { name: 'கேதி கர்பன்', tag: 'MRV தீர்வுகள்' },
    nav: { home: 'முதல் பக்கம்', how: 'எப்படி செயல்படுகிறது', dashboard: 'டாஷ்போர்டு', impact: 'விளைவு', contact: 'தொடர்பு' },
    hero: { title: 'வனவேளாண்மை & நெல் கார்பன் திட்டங்களுக்கு அளவளாவிய MRV', subtitle: 'கார்பனை அளக்கவும். வெளிப்படையாக சரிபார்க்கவும். விவசாயிகளை வலுப்படுத்தவும்.', ctaPrimary: 'டாஷ்போர்டை பார்க்க', ctaSecondary: 'மேலும் அறிக', mascot: 'விவசாயி மாஸ்காட் ப்ளேஸ்ஹோல்டர்' },
    how: { title: 'எப்படி செயல்படுகிறது', step1Title: 'விவசாயி நடைமுறைகள் உள்ளிடுகிறார்', step1Desc: 'நட்டல், பாசனம், மண் நடைமுறைகளுக்கு எளிய தரவு உள்ளீடு.', step2Title: 'AI + செயற்கைக் கோள் கண்காணிப்பு', step2Desc: 'தொலை உணர்வு & மாதிரிகள் தொடர்ந்து கார்பனை மதிப்பிடும்.', step3Title: 'சரிபார்க்கப்பட்ட கிரெடிட்கள்', step3Desc: 'மூன்றாம் தரப்பு சரிபார்ப்பு மற்றும் வெளிப்படையான வெளியீடு.' },
    dash: { title: 'டெமோ டாஷ்போர்டு', leftNav: { overview: 'மேலோட்டம்', agro: 'வனவேளாண்மை', rice: 'நெல் திட்டங்கள்', verify: 'சரிபார்ப்பு' }, mapTitle: 'திட்ட புலங்கள்', carbonKpi: 'கார்பன் சேமிப்பு', carbonValue: '12,540 டன் CO2e', charts: { trend: 'காலம் வழியாக கார்பன்', split: 'வனவேளாண்மை vs நெல்' }, earnings: 'விவசாயியின் சாத்தியமான வருமானம்', earningsValue: '₹ 4,20,000 கார్బன் கிரெடிட்களில் இருந்து', statuses: { pending: 'சரிபார்ப்பு நிலுவையில்', verified: 'சரிபார்க்கப்பட்டது', progress: 'முன்னேற்றத்தில்' } },
    impact: { title: 'விளைவு', farmers: 'வலுப்படுத்தப்பட்ட விவசாயிகள்', carbon: 'பிடிக்கப்பட்ட CO2 (டன்)', hectares: 'மேற்பார்வை ஹெக்டேயர்கள்', timeline: 'திட்ட வளர்ச்சி', testimonials: 'சான்றுகள் (ப்ளேஸ்ஹோல்டர்)' },
    contact: { title: 'எங்களை தொடர்பு கொள்ள', name: 'பெயர்', email: 'மின்னஞ்சல்', message: 'செய்தி', send: 'செய்தி அனுப்புக', hq: 'திட்ட தலைமையகம் (வரைபடம்)' },
    footer: { rights: '© கேதி கர்பன். எல்லா உரிமைகளும் பாதுகாக்கப்பட்டவை.' },
    ui: { theme: 'டார்க் மோடு', language: 'மொழி' }
  }},
  bn: { translation: {
    brand: { name: 'খেতি কার্বন', tag: 'MRV সমাধান' },
    nav: { home: 'হোম', how: 'কিভাবে কাজ করে', dashboard: 'ড্যাশবোর্ড', impact: 'প্রভাব', contact: 'যোগাযোগ' },
    hero: { title: 'অ্যাগ্রোফরেস্ট্রি ও ধান কার্বন প্রকল্পের জন্য স্কেলেবল MRV', subtitle: 'কার্বন মাপুন। স্বচ্ছভাবে যাচাই করুন। কৃষকদের ক্ষমতায়ন করুন।', ctaPrimary: 'ড্যাশবোর্ড দেখুন', ctaSecondary: 'আরও জানুন', mascot: 'কৃষক মাসকট প্লেসহোল্ডার' },
    how: { title: 'কিভাবে কাজ করে', step1Title: 'কৃষক প্র্যাকটিস ইনপুট করেন', step1Desc: 'রোপণ, সেচ, মাটির প্র্যাকটিসের জন্য সহজ ডেটা এন্ট্রি।', step2Title: 'এআই + স্যাটেলাইট মনিটর', step2Desc: 'রিমোট সেন্সিং ও মডেল ধারাবাহিকভাবে কার্বন অনুমান করে।', step3Title: 'যাচাইকৃত ক্রেডিট ইস্যু', step3Desc: 'থার্ড-পার্টি যাচাই ও স্বচ্ছ ইস্যু।' },
    dash: { title: 'ডেমো ড্যাশবোর্ড', leftNav: { overview: 'ওভারভিউ', agro: 'অ্যাগ্রোফরেস্ট্রি', rice: 'ধান প্রকল্প', verify: 'যাচাই' }, mapTitle: 'প্রকল্প ক্ষেত্র', carbonKpi: 'কার্বন সিকোয়েস্ট্রেশন', carbonValue: '12,540 টন CO2e', charts: { trend: 'সময়ের সাথে কার্বন ক্যাপচার', split: 'অ্যাগ্রো বনাম ধান' }, earnings: 'কৃষকের সম্ভাব্য আয়', earningsValue: '₹ ৪,২০,০০০ কার্বন ক্রেডিট থেকে', statuses: { pending: 'যাচাই অপেক্ষমান', verified: 'যাচাইকৃত', progress: 'চলমান' } },
    impact: { title: 'প্রভাব', farmers: 'কৃষক ক্ষমতায়িত', carbon: 'ধরা CO2 (টন)', hectares: 'মনিটর করা হেক্টর', timeline: 'প্রকল্প বৃদ্ধি', testimonials: 'প্রশংসাপত্র (প্লেসহোল্ডার)' },
    contact: { title: 'যোগাযোগ করুন', name: 'নাম', email: 'ইমেইল', message: 'বার্তা', send: 'বার্তা পাঠান', hq: 'প্রকল্প সদর দপ্তর (মানচিত্র)' },
    footer: { rights: '© খেতি কার্বন. সর্বস্বত্ব সংরক্ষিত.' },
    ui: { theme: 'ডার্ক মোড', language: 'ভাষা' }
  }}
}

i18next.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('kheti_lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18next
