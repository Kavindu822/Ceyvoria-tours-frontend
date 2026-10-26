import type { Config } from 'tailwindcss';
const config: Config = {content: ['./src/**/*.{ts,tsx,mdx}'],theme:{extend:{colors:{forest:'#073D32',gold:'#C49A45',ivory:'#FAF7F0',teal:'#247D80',palm:'#49764C',charcoal:'#242A28'},fontFamily:{display:['Cormorant Garamond','Georgia','serif'],body:['Manrope','Arial','sans-serif']}}},plugins:[]};export default config;
