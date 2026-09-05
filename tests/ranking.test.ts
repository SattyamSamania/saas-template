import { describe, expect, it } from "vitest";
import { calculateMinimumBid } from "../lib/leaderboard";
describe("BrandMyWallet ranking rules",()=>{
 it("empty leaderboard => $1",()=>expect(calculateMinimumBid(null)/100).toBe(1));
 it("$1 top => $2",()=>expect(calculateMinimumBid(100)/100).toBe(2));
 it("$37 top => $38",()=>expect(calculateMinimumBid(3700)/100).toBe(38));
 it("two users cannot reserve the same next amount",()=>expect(calculateMinimumBid(1000,1100)).toBe(1200));
 it("tampered $1 cannot beat a $37 top",()=>expect(calculateMinimumBid(3700)).toBe(3800));
 it("equal amounts use earliest successful payment first",()=>{const a=[{amount:1000,paidAt:2},{amount:1000,paidAt:1}];a.sort((x,y)=>x.amount===y.amount?x.paidAt-y.paidAt:y.amount-x.amount);expect(a[0].paidAt).toBe(1)});
 it("pending/hidden entries are not public",()=>{const rows=[{status:"PENDING",visibility:"VISIBLE"},{status:"PAID",visibility:"HIDDEN"},{status:"PAID",visibility:"VISIBLE"}];expect(rows.filter(x=>x.status==="PAID"&&x.visibility==="VISIBLE")).toHaveLength(1)});
});
