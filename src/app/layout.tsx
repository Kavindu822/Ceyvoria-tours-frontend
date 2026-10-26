import type {Metadata} from 'next';
import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { LanguageProvider } from '@/context/LanguageContext';
import { ActiveLanguageFloatingPill } from '@/components/LanguageSelector';
import {site} from '@/lib/site';
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),title:{default:'CEYVORIA TOURS | Discover Sri Lanka, Beautifully',template:'%s | CEYVORIA TOURS'},description:site.subtitle,icons:{icon:[{url:'/favicon.ico',sizes:'any'},{url:'/icon.png',type:'image/png',sizes:'32x32'},{url:'/icon-192.png',type:'image/png',sizes:'192x192'},{url:'/icon-512.png',type:'image/png',sizes:'512x512'}],apple:[{url:'/apple-icon.png',sizes:'180x180',type:'image/png'}]},openGraph:{title:'CEYVORIA TOURS',description:site.subtitle,type:'website'},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header/>
          <main id="main">{children}</main>
          <Footer/>
          <CookieConsent/>
          <ActiveLanguageFloatingPill/>
        </LanguageProvider>
      </body>
    </html>
  );
}

