import type{Metadata}from'next';import TripWizard from '@/components/TripWizard';import {PageHero} from '@/components/UI';
export const metadata:Metadata={title:'Plan Your Tailor-Made Journey'};
export default function Plan(){return <><PageHero title="Tell us your story." description="Tell us a little about your plans. We'll shape the next conversation around you." image="/images/hendrik-cornelissen-jptt-sau034-unsplash.webp" kicker="PERSONAL TRAVEL PLANNING"/><section className="section"><div className="container"><TripWizard/></div></section></>}
