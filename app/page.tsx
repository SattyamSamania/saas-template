import { getCurrentLeaderboardState, getMinimumBid, formatUsd } from "@/lib/leaderboard";
import { Leaderboard } from "@/components/Leaderboard";
import { ClaimButton } from "@/components/ClaimButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [entries, minimum] = await Promise.all([getCurrentLeaderboardState(), getMinimumBid()]);
  const top = entries[0];
  return <main className="min-h-screen overflow-hidden bg-[#fafafa] text-[#111]">
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8">
      <header className="flex items-center justify-between border-b border-black/10 pb-5">
        <a href="/" className="text-xl font-black tracking-tight">brandmywallet<span className="text-violet-600">.</span></a>
        <nav className="hidden gap-7 text-sm font-medium md:flex"><a href="#leaderboard">Leaderboard</a><a href="#how">How it works</a></nav>
        <ClaimButton amount={minimum} />
      </header>

      <section className="relative py-20 text-center md:py-28">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold shadow-sm">🏆 THE INTERNET'S PAID LEADERBOARD</div>
        <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[.95] tracking-[-.055em] md:text-8xl">Buy Your Spot on<br/><span className="text-violet-600">BrandMyWallet.</span></h1>
        <p className="mx-auto mt-7 max-w-xl text-lg text-black/55 md:text-xl">Pay more. Rank higher. Get seen. The highest-paid wallet owns the top spot.</p>
        <div className="mx-auto mt-10 grid max-w-xl grid-cols-2 gap-3">
          <div className="rounded-2xl border border-black/10 bg-white p-5 text-left"><p className="text-xs font-bold uppercase text-black/45">Current top</p><p className="mt-2 text-3xl font-black">{top ? formatUsd(top.amount) : "$—"}</p></div>
          <div className="rounded-2xl bg-[#111] p-5 text-left text-white"><p className="text-xs font-bold uppercase text-white/50">Next spot</p><p className="mt-2 text-3xl font-black">{formatUsd(minimum)}</p></div>
        </div>
        <div className="mt-6"><ClaimButton amount={minimum} large /></div>
      </section>

      <section id="leaderboard" className="scroll-mt-10 pb-24">
        <div className="mb-7 flex items-end justify-between"><div><p className="text-sm font-bold text-violet-600">LIVE BOARD</p><h2 className="mt-1 text-3xl font-black tracking-tight md:text-4xl">Who owns #1?</h2></div><p className="text-sm text-black/45">Updates automatically</p></div>
        <Leaderboard entries={entries} />
      </section>

      <section id="how" className="border-t border-black/10 py-24">
        <p className="text-sm font-bold text-violet-600">HOW IT WORKS</p><h2 className="mt-2 text-4xl font-black tracking-tight">Simple game. Real money.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">{[["01","Pick your wallet"],["02","Pay more than #1"],["03","Take the top spot"],["04","Wait for someone to outbid you"]].map(([n,t]) => <div key={n} className="rounded-3xl border border-black/10 bg-white p-6"><span className="text-sm font-black text-violet-600">{n}</span><h3 className="mt-12 text-xl font-bold">{t}</h3></div>)}</div>
      </section>
      <section className="rounded-[2rem] bg-[#111] px-6 py-16 text-center text-white md:px-12"><p className="text-4xl font-black tracking-tight">Think you can hold #1?</p><p className="mx-auto mt-3 max-w-md text-white/50">There is only one way to find out.</p><div className="mt-7"><ClaimButton amount={minimum} large /></div></section>
      <footer className="flex flex-col gap-4 py-10 text-sm text-black/45 md:flex-row md:justify-between"><span>© {new Date().getFullYear()} BrandMyWallet</span><div className="flex gap-5"><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="mailto:hello@brandmywallet.com">Contact</a></div></footer>
    </div>
  </main>;
}
