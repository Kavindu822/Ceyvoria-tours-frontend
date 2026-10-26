import AdminPanel from '@/components/AdminPanel';import {notFound} from 'next/navigation';
const allowed=['dashboard','bookings','custom-trips','tours','destinations','experiences','travel-styles','blog','faqs','messages','customers','payments','reviews','hotels','media','settings'];
export function generateStaticParams(){return allowed.map(section=>({section}))}
export default async function AdminSection({params}:{params:Promise<{section:string}>}){const{section}=await params;if(!allowed.includes(section))notFound();return <AdminPanel section={section}/>;}
