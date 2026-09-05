import { NextResponse } from "next/server";
import { processPaymentEvent, verifyDodoWebhook } from "@/lib/webhook";
const hits=new Map<string,{count:number;reset:number}>();
function limited(ip:string){const now=Date.now(),x=hits.get(ip);if(!x||x.reset<now){hits.set(ip,{count:1,reset:now+60_000});return false}x.count++;return x.count>30}
export async function POST(request:Request){const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()??"unknown";if(limited(ip))return NextResponse.json({error:"Too many requests."},{status:429});try{const raw=await request.text();await verifyDodoWebhook(raw,request.headers);await processPaymentEvent(JSON.parse(raw));return NextResponse.json({received:true})}catch(error){console.error("Dodo webhook rejected/failed",error instanceof Error?error.message:"unknown");return NextResponse.json({error:"Invalid webhook"},{status:401})}}
