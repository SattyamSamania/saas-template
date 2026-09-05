import { NextResponse } from "next/server";
import { getCurrentLeaderboardState, getMinimumBid } from "@/lib/leaderboard";
export async function GET(){try{const [entries,minimum]=await Promise.all([getCurrentLeaderboardState(),getMinimumBid()]);return NextResponse.json({entries,minimum},{headers:{"Cache-Control":"public, s-maxage=5, stale-while-revalidate=30"}})}catch{ return NextResponse.json({error:"Leaderboard temporarily unavailable."},{status:503})}}
