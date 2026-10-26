import{NextRequest,NextResponse}from'next/server';import{cookies}from'next/headers';
const base=(process.env.NEXT_PUBLIC_API_URL||'').replace(/\/$/,'');
async function relay(req:NextRequest,params:Promise<{path:string[]}>) {
 if(!base)return NextResponse.json({message:'API server is not configured.'},{status:503});
 const token=(await cookies()).get('ceyvoria_session')?.value;if(!token)return NextResponse.json({message:'Sign in required.'},{status:401});
 const {path}=await params;const url=base+'/api/'+path.join('/')+(req.nextUrl.search||'');
 try{const res=await fetch(url,{method:req.method,headers:{Authorization:`Bearer ${token}`, 'Content-Type':'application/json'},body:['GET','HEAD'].includes(req.method)?undefined:await req.text(),cache:'no-store'});const txt=await res.text();return new NextResponse(txt,{status:res.status,headers:{'Content-Type':res.headers.get('Content-Type')||'application/json'}})}catch{return NextResponse.json({message:'API server unavailable.'},{status:502})}
}
type P={params:Promise<{path:string[]}>};
export const GET=(r:NextRequest,{params}:P)=>relay(r,params);
export const POST=(r:NextRequest,{params}:P)=>relay(r,params);
export const PUT=(r:NextRequest,{params}:P)=>relay(r,params);
export const PATCH=(r:NextRequest,{params}:P)=>relay(r,params);
export const DELETE=(r:NextRequest,{params}:P)=>relay(r,params);
