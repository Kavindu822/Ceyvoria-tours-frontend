'use client';

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';

export interface Language {
  code: string;
  name: string;        // Native name
  englishName: string; // English name
  flag: string;        // Flag emoji
  dir?: 'ltr' | 'rtl';
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', englishName: 'English (Default)', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', englishName: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', englishName: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Español', englishName: 'Spanish', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', englishName: 'Italian', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', englishName: 'Russian', flag: '🇷🇺' },
  { code: 'zh-CN', name: '简体中文', englishName: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', englishName: 'Arabic', flag: '🇦🇪', dir: 'rtl' },
  { code: 'ja', name: '日本語', englishName: 'Japanese', flag: '🇯🇵' },
  { code: 'nl', name: 'Nederlands', englishName: 'Dutch', flag: '🇳🇱' },
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi', flag: '🇮🇳' },
  { code: 'si', name: 'සිංහල', englishName: 'Sinhala', flag: '🇱🇰' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', flag: '🇱🇰' },
];

export const NAV_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    home: 'Home',
    tours: 'Our Tours',
    destinations: 'Destinations',
    experiences: 'Experiences',
    about: 'About',
    blog: 'Travel Guide',
    contact: 'Contact',
    planTrip: 'Plan Your Journey',
    travelStyles: 'Travel Styles',
    faqs: 'FAQs',
    selectLanguage: 'Select Language',
    defaultNotice: 'Default language is English',
    resetToEnglish: 'Reset to English',
    viewingIn: 'Viewing in',
    changeLanguage: 'Change Language',
    searchPlaceholder: 'Search language...',
  },
  de: {
    home: 'Startseite',
    tours: 'Unsere Touren',
    destinations: 'Reiseziele',
    experiences: 'Erlebnisse',
    about: 'Über uns',
    blog: 'Reiseführer',
    contact: 'Kontakt',
    planTrip: 'Reise Planen',
    travelStyles: 'Reisestile',
    faqs: 'Häufige Fragen',
    selectLanguage: 'Sprache wählen',
    defaultNotice: 'Standardsprache ist Englisch',
    resetToEnglish: 'Zurück zu Englisch',
    viewingIn: 'Angezeigt auf',
    changeLanguage: 'Sprache ändern',
    searchPlaceholder: 'Sprache suchen...',
  },
  fr: {
    home: 'Accueil',
    tours: 'Nos Circuits',
    destinations: 'Destinations',
    experiences: 'Expériences',
    about: 'À Propos',
    blog: 'Guide de Voyage',
    contact: 'Contact',
    planTrip: 'Planifiez Votre Voyage',
    travelStyles: 'Styles de Voyage',
    faqs: 'FAQ',
    selectLanguage: 'Choisir la Langue',
    defaultNotice: 'La langue par défaut est l’anglais',
    resetToEnglish: 'Revenir à l’anglais',
    viewingIn: 'Affiché en',
    changeLanguage: 'Changer de langue',
    searchPlaceholder: 'Rechercher une langue...',
  },
  es: {
    home: 'Inicio',
    tours: 'Nuestros Tours',
    destinations: 'Destinos',
    experiences: 'Experiencias',
    about: 'Sobre Nosotros',
    blog: 'Guía de Viaje',
    contact: 'Contacto',
    planTrip: 'Planee su Viaje',
    travelStyles: 'Estilos de Viaje',
    faqs: 'Preguntas Frecuentes',
    selectLanguage: 'Seleccionar Idioma',
    defaultNotice: 'El idioma predeterminado es el inglés',
    resetToEnglish: 'Restablecer a inglés',
    viewingIn: 'Viendo en',
    changeLanguage: 'Cambiar idioma',
    searchPlaceholder: 'Buscar idioma...',
  },
  it: {
    home: 'Home',
    tours: 'I Nostri Tour',
    destinations: 'Destinazioni',
    experiences: 'Esperienze',
    about: 'Chi Siamo',
    blog: 'Guida di Viaggio',
    contact: 'Contatti',
    planTrip: 'Pianifica il Tuo Viaggio',
    travelStyles: 'Stili di Viaggio',
    faqs: 'Domande Frequenti',
    selectLanguage: 'Seleziona Lingua',
    defaultNotice: 'La lingua predefinita è l’inglese',
    resetToEnglish: 'Torna all’inglese',
    viewingIn: 'Visualizzato in',
    changeLanguage: 'Cambia lingua',
    searchPlaceholder: 'Cerca lingua...',
  },
  ru: {
    home: 'Главная',
    tours: 'Наши туры',
    destinations: 'Направления',
    experiences: 'Впечатления',
    about: 'О нас',
    blog: 'Путеводитель',
    contact: 'Контакты',
    planTrip: 'Спланировать тур',
    travelStyles: 'Стили путешествий',
    faqs: 'Частые вопросы',
    selectLanguage: 'Выберите язык',
    defaultNotice: 'Основной язык сайта — английский',
    resetToEnglish: 'Вернуть английский',
    viewingIn: 'Вы просматриваете на',
    changeLanguage: 'Сменить язык',
    searchPlaceholder: 'Поиск языка...',
  },
  'zh-CN': {
    home: '首页',
    tours: '定制行程',
    destinations: '目的地',
    experiences: '特色体验',
    about: '关于我们',
    blog: '旅行指南',
    contact: '联系我们',
    planTrip: '定制您的旅程',
    travelStyles: '旅行风格',
    faqs: '常见问题',
    selectLanguage: '选择语言',
    defaultNotice: '默认语言为英语',
    resetToEnglish: '恢复英语',
    viewingIn: '当前显示语言：',
    changeLanguage: '更改语言',
    searchPlaceholder: '搜索语言...',
  },
  ar: {
    home: 'الرئيسية',
    tours: 'جولاتنا',
    destinations: 'الوجهات',
    experiences: 'التجارب',
    about: 'من نحن',
    blog: 'دليل السفر',
    contact: 'اتصل بنا',
    planTrip: 'خطط لرحلتك',
    travelStyles: 'أنماط السفر',
    faqs: 'الأسئلة الشائعة',
    selectLanguage: 'اختر اللغة',
    defaultNotice: 'اللغة الأساسية الافتراضية هي الإنجليزية',
    resetToEnglish: 'العودة إلى الإنجليزية',
    viewingIn: 'عرض بـ',
    changeLanguage: 'تغيير اللغة',
    searchPlaceholder: 'ابحث عن لغة...',
  },
  ja: {
    home: 'ホーム',
    tours: 'ツアー一覧',
    destinations: '目的地',
    experiences: '体験',
    about: '私たちについて',
    blog: '旅行ガイド',
    contact: 'お問い合わせ',
    planTrip: '旅行を計画する',
    travelStyles: '旅行スタイル',
    faqs: 'よくある質問',
    selectLanguage: '言語を選択',
    defaultNotice: 'デフォルトの言語は英語です',
    resetToEnglish: '英語に戻す',
    viewingIn: '表示中：',
    changeLanguage: '言語を変更',
    searchPlaceholder: '言語を検索...',
  },
  nl: {
    home: 'Home',
    tours: 'Onze Rondreizen',
    destinations: 'Bestemmingen',
    experiences: 'Ervaringen',
    about: 'Over Ons',
    blog: 'Reisgids',
    contact: 'Contact',
    planTrip: 'Plan Uw Reis',
    travelStyles: 'Reisstijlen',
    faqs: 'Veelgestelde Vragen',
    selectLanguage: 'Selecteer Taal',
    defaultNotice: 'Standaardtaal is Engels',
    resetToEnglish: 'Herstel naar Engels',
    viewingIn: 'Weergave in',
    changeLanguage: 'Taal wijzigen',
    searchPlaceholder: 'Zoek taal...',
  },
  hi: {
    home: 'होम',
    tours: 'हमारे टूर्स',
    destinations: 'गंतव्य',
    experiences: 'अनुभव',
    about: 'हमारे बारे में',
    blog: 'यात्रा गाइड',
    contact: 'संपर्क करें',
    planTrip: 'यात्रा की योजना बनाएं',
    travelStyles: 'यात्रा शैलियाँ',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    selectLanguage: 'भाषा चुनें',
    defaultNotice: 'मुख्य डिफ़ॉल्ट भाषा अंग्रेजी है',
    resetToEnglish: 'अंग्रेजी में वापस जाएं',
    viewingIn: 'वर्तमान भाषा:',
    changeLanguage: 'भाषा बदलें',
    searchPlaceholder: 'भाषा खोजें...',
  },
  si: {
    home: 'මුල් පිටුව',
    tours: 'අපගේ සංචාර',
    destinations: 'ගමනාන්ත',
    experiences: 'අත්දැකීම්',
    about: 'අප ගැන',
    blog: 'සංචාරක මගපෙන්වීම',
    contact: 'සම්බන්ධ වන්න',
    planTrip: 'සංචාරය සැලසුම් කරන්න',
    travelStyles: 'සංචාරක විලාසයන්',
    faqs: 'නිතර අසන ප්‍රශ්න',
    selectLanguage: 'භාෂාව තෝරන්න',
    defaultNotice: 'ප්‍රධාන පෙරනිමි භාෂාව ඉංග්‍රීසි වේ',
    resetToEnglish: 'නැවත ඉංග්‍රීසි භාෂාවට',
    viewingIn: 'ප්‍රදර්ශනය වන්නේ',
    changeLanguage: 'භාෂාව මාරු කරන්න',
    searchPlaceholder: 'භාෂාව සොයන්න...',
  },
  ta: {
    home: 'முகப்பு',
    tours: 'எங்கள் சுற்றுலாக்கள்',
    destinations: 'இடங்கள்',
    experiences: 'அனுபவங்கள்',
    about: 'எங்களைப் பற்றி',
    blog: 'பயண வழிகாட்டி',
    contact: 'தொடர்புக்கு',
    planTrip: 'உங்கள் பயணத்தைத் திட்டமிடுங்கள்',
    travelStyles: 'பயண பாணிகள்',
    faqs: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    defaultNotice: 'முதன்மை இயல்புநிலை மொழி ஆங்கிலம்',
    resetToEnglish: 'ஆங்கிலத்திற்கு மீட்டமை',
    viewingIn: 'காட்டப்படும் மொழி:',
    changeLanguage: 'மொழியை மாற்றவும்',
    searchPlaceholder: 'மொழியைத் தேடுங்கள்...',
  },
};

interface LanguageContextType {
  currentLang: string;
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  isDefault: boolean;
  availableLanguages: Language[];
  t: (key: string) => string;
  isTranslateReady: boolean;
  resetToEnglish: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'en',
  currentLanguage: LANGUAGES[0],
  setLanguage: () => {},
  isDefault: true,
  availableLanguages: LANGUAGES,
  t: (key) => NAV_TRANSLATIONS.en[key] || key,
  isTranslateReady: false,
  resetToEnglish: () => {},
});

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [isTranslateReady, setIsTranslateReady] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  // Helper to read cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  // Helper to set cookie across paths & domains
  const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') return;
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const hostname = window.location.hostname;

    document.cookie = `${name}=${value}; ${expires}; path=/;`;
    if (hostname !== 'localhost' && !hostname.startsWith('127.')) {
      document.cookie = `${name}=${value}; ${expires}; domain=.${hostname}; path=/;`;
    }
  };

  // Helper to delete cookie completely
  const deleteCookie = (name: string) => {
    if (typeof document === 'undefined') return;
    const expired = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    const hostname = window.location.hostname;
    document.cookie = `${name}=; ${expired}`;
    document.cookie = `${name}=; ${expired} domain=${hostname};`;
    if (hostname !== 'localhost' && !hostname.startsWith('127.')) {
      document.cookie = `${name}=; ${expired} domain=.${hostname};`;
    }
  };

  // Check saved language on initial client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect if googtrans cookie is set
    const googCookie = getCookie('googtrans');
    const localLang = localStorage.getItem('ceyvoria_lang');

    let initialCode = 'en';

    if (googCookie) {
      // Cookie format is usually /en/de or /auto/de
      const parts = googCookie.split('/');
      const codeFromCookie = parts[parts.length - 1];
      if (codeFromCookie && LANGUAGES.some((l) => l.code === codeFromCookie)) {
        initialCode = codeFromCookie;
      }
    } else if (localLang && LANGUAGES.some((l) => l.code === localLang)) {
      initialCode = localLang;
      // Re-establish cookie if local storage had it
      if (initialCode !== 'en') {
        setCookie('googtrans', `/en/${initialCode}`);
      }
    }

    setCurrentLang(initialCode);

    // Initialize Google Translate script
    const initGoogleTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: LANGUAGES.map((l) => l.code).join(','),
              layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE || 0,
              autoDisplay: false,
            },
            'google_translate_element'
          );
          setIsTranslateReady(true);
        } catch {
          // Ignore re-init errors
        }
      }
    };

    window.googleTranslateElementInit = () => {
      initGoogleTranslate();
    };

    // Check if script already exists
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      initGoogleTranslate();
    }

    // Active guard to permanently prevent Google Translate from shifting the body top down
    const fixGoogleBanner = () => {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
      document.querySelectorAll('body > .skiptranslate, iframe.skiptranslate, .goog-te-banner-frame').forEach((el) => {
        (el as HTMLElement).style.setProperty('display', 'none', 'important');
      });
    };

    const observer = new MutationObserver(fixGoogleBanner);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'], childList: true });
    return () => observer.disconnect();
  }, []);

  // Update HTML direction when Arabic or other RTL language is selected
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const active = LANGUAGES.find((l) => l.code === currentLang);
    if (active?.dir === 'rtl') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [currentLang]);

  const setLanguage = (code: string) => {
    if (code === currentLang) return;

    if (code === 'en') {
      resetToEnglish();
      return;
    }

    startTransition(() => {
      setCurrentLang(code);
      localStorage.setItem('ceyvoria_lang', code);
      setCookie('googtrans', `/en/${code}`);

      // Try triggering google combo element directly
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        combo.value = code;
        combo.dispatchEvent(new Event('change'));
      } else {
        // If combo is not available yet, reload page so google translate initializes with cookie
        setTimeout(() => {
          window.location.reload();
        }, 150);
      }
    });
  };

  const resetToEnglish = () => {
    setCurrentLang('en');
    localStorage.removeItem('ceyvoria_lang');
    deleteCookie('googtrans');
    deleteCookie('googtrans');

    // Attempt resetting select
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = 'en';
      combo.dispatchEvent(new Event('change'));
    }

    // A fast reload guarantees 100% clean English text without cached translation remnants
    window.location.reload();
  };

  const currentLanguage = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const isDefault = currentLang === 'en';

  const t = (key: string): string => {
    const langDict = NAV_TRANSLATIONS[currentLang] || NAV_TRANSLATIONS.en;
    return langDict[key] || NAV_TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        currentLanguage,
        setLanguage,
        isDefault,
        availableLanguages: LANGUAGES,
        t,
        isTranslateReady,
        resetToEnglish,
      }}
    >
      {children}
      {/* Hidden Google Translate container */}
      <div id="google_translate_element" style={{ display: 'none' }} aria-hidden="true" />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
