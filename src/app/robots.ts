import type {MetadataRoute} from 'next';import {urlFor} from '@/lib/site';
export default function robots():MetadataRoute.Robots {return {rules:{userAgent:'*',allow:'/',disallow:['/admin/','/account/','/booking/']},sitemap:urlFor('/sitemap.xml')};}
