"use client";
import { useState } from "react";
import { ClaimForm } from "@/components/ClaimForm";
export function ClaimButton({ amount, large=false }: { amount: number; large?: boolean }) { const [open,setOpen]=useState(false); return <><button onClick={()=>setOpen(true)} className={`${large?'px-7 py-4 text-base':'px-4 py-2 text-sm'} rounded-xl bg-violet-600 font-bold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700`}>Claim #1 for ${(amount/100).toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0})} →</button>{open&&<ClaimForm minimum={amount} onClose={()=>setOpen(false)}/>}</> }
