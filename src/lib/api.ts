import type {ApiEnvelope} from './types';
export const API_URL=(process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/,'');
export class ServiceUnavailable extends Error {constructor(){super('Online enquiries are not connected yet. Please contact CEYVORIA TOURS once verified contact channels are published.');}}
export async function apiRequest<T>(path:string,options:RequestInit={}):Promise<T>{
 if(!API_URL) throw new ServiceUnavailable();
 const response=await fetch(`${API_URL}${path}`,{...options,headers:{'Content-Type':'application/json',...(options.headers||{})},cache:'no-store'});
 let result:ApiEnvelope<T>;
 try{result=await response.json()}catch{throw new Error('An unexpected response was received. Please try again later.');}
 if(!response.ok || !result.success || result.data===null) throw new Error(result.message || `Request failed (${response.status})`);
 return result.data;
}
export const submitEnquiry=(body:unknown)=>apiRequest<{reference:string}>('/api/custom-trips',{method:'POST',body:JSON.stringify(body)});
export const submitContact=(body:unknown)=>apiRequest<{reference:string}>('/api/contact',{method:'POST',body:JSON.stringify(body)});
export const createBooking=(body:unknown)=>apiRequest<{reference:string}>('/api/bookings',{method:'POST',body:JSON.stringify(body)});
