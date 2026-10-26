import{NextRequest,NextResponse}from'next/server';import{cookies}from'next/headers';
const base=(process.env.NEXT_PUBLIC_API_URL||'').replace(/\/$/,'');
export async function POST(request:NextRequest){if(!base)return NextResponse.json({message:'The authentication server is not configured.'},{status:503});
try{const payload=await request.json();const r=await fetch(base+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store'});const data=await r.json();if(!r.ok||!data.success)return NextResponse.json({message:data.message||'Invalid sign-in details.'},{status:401});
const res=NextResponse.json({role:data.data.role,displayName:data.data.displayName});
res.cookies.set('ceyvoria_session',data.data.accessToken,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:20*60});
return res;}catch{return NextResponse.json({message:'Could not contact the authentication server.'},{status:502});}}
export async function DELETE(){const res=NextResponse.json({success:true});res.cookies.delete('ceyvoria_session');return res;}
export async function GET(){const t=(await cookies()).get('ceyvoria_session')?.value;if(!t||!base)return NextResponse.json({authenticated:false});
try{const r=await fetch(base+'/api/auth/me',{headers:{Authorization:`Bearer ${t}`},cache:'no-store'});if(!r.ok)return NextResponse.json({authenticated:false});const d=await r.json();return NextResponse.json({authenticated:true,user:d.data});}catch{return NextResponse.json({authenticated:false});}}
