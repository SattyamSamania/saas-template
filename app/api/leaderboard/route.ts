import { NextResponse } from "next/server";
import { getCurrentLeaderboardState, getMinimumBid } from "@/lib/leaderboard";
const hits=new Map<string,{count:number;reset:number}>();
function limited(ip:string){const now=Date.now(),x=hits.get(ip);if(!x||x.reset<now){hits.set(ip,{count:1,reset:now+60_000});return false}x.count++;return x.count>120}
export async function GET(r:Request){const ip=r.headers.get("x-forwarded-for")?.split(",")[0]?.trim()??"unknown";if(limited(ip))return NextResponse.json({error:"Too many requests."},{status:429});try{const [entries,minimum]=await Promise.all([getCurrentLeaderboardState(),getMinimumBid()]);return NextResponse.json({entries,minimum},{headers:{"Cache-Control":"public, s-maxage=5, stale-while-revalidate=30"}})}catch{return NextResponse.json({error:"Leaderboard temporarily unavailable."},{status:503})}}
