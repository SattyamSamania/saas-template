import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"BrandMyWallet — Buy Your Spot",description:"Pay more than the current top wallet and get your brand on the BrandMyWallet leaderboard.",openGraph:{title:"BrandMyWallet — Buy Your Spot",description:"Pay more. Rank higher. Get seen.",type:"website"},twitter:{card:"summary_large_image",title:"BrandMyWallet — Buy Your Spot",description:"Pay more. Rank higher. Get seen."}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
