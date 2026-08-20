"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PointerGlow, SparkField } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  buyUrl,
  COLLECTION,
  FACTS,
  shortAddress,
  SITE,
  STATS,
  STEPS,
  type CollectionPiece,
} from "@/lib/site";
import { cn } from "@/lib/utils";

function AuthSlot() {
  const { user } = useCurrentUserState();
  if (user) {
    return (
      <div className="[&_button]:font-display [&_button]:font-bold [&_img]:size-8 [&_img]:border-pixel [&_img]:border-ink [&_span]:font-display">
        <UserButton />
      </div>
    );
  }
  return (
    <Link
      to="/login"
      className="inline-flex min-h-11 items-center font-display font-bold hover:underline"
    >
      Sign in
    </Link>
  );
}

function copyText(value: string, ok: string) {
  void navigator.clipboard.writeText(value).then(
    () => toast.success(ok),
    () => toast.error("Could not copy"),
  );
}

function ContractCard({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const ca = SITE.contractAddress;
  const display = ca ? shortAddress(ca) : "TBA";

  const onCopy = () => {
    if (!ca) {
      toast.message("CA drops at launch on µToken");
      return;
    }
    copyText(ca, "Contract address copied");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={cn(
        "w-full border-pixel border-ink bg-paper shadow-pixel",
        compact ? "px-3 py-2.5" : "px-4 py-4 sm:px-5",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 text-left">
          <p className="font-display text-xs font-bold tracking-widest text-muted">
            CONTRACT ADDRESS
          </p>
          <p
            className={cn(
              "mt-1 font-mono font-semibold tracking-tight",
              compact ? "text-sm" : "text-lg sm:text-xl",
            )}
          >
            {display}
          </p>
          {!compact && (
            <p className="mt-1 text-sm text-muted">
              {ca
                ? `Live on µToken · ${SITE.supply.toLocaleString()} supply`
                : `Launching on µToken · ${SITE.supply.toLocaleString()} supply`}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="ink"
            onClick={onCopy}
            className="min-h-11 px-4 text-sm"
            aria-label={ca ? "Copy contract address" : "Contract address coming soon"}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy CA"}
          </Button>
          <Button variant="ghost" asChild className="min-h-11 px-4 text-sm">
            <a href={buyUrl()} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4" />
              µToken
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function GalleryLightbox({
  piece,
  onClose,
}: {
  piece: CollectionPiece | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!piece) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [piece, onClose]);

  if (!piece) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm border-pixel border-ink bg-bg p-6 shadow-pixel-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={piece.src}
          alt={piece.name}
          width={320}
          height={320}
          className="mx-auto aspect-square w-full max-w-[260px] border-pixel border-ink bg-paper object-cover"
        />
        <p id="lightbox-title" className="mt-3 text-center font-display text-lg font-bold">
          {piece.name}
        </p>
        <p className="mb-4 text-center text-sm text-muted">{piece.tag}</p>
        <Button type="button" variant="ink" className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export function HomePage() {
  const [open, setOpen] = useState<CollectionPiece | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const loop = [...COLLECTION, ...COLLECTION];

  return (
    <div className="relative min-h-dvh">
      <SparkField />
      <PointerGlow />
      <div className="grain" />

      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b-pixel border-ink bg-bg px-[var(--page-pad,clamp(1rem,5vw,3.5rem))] py-3.5 pt-[max(14px,env(safe-area-inset-top))]">
        <a href="#top" className="font-display text-lg font-bold tracking-wide sm:text-xl">
          MONNI
        </a>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 font-display text-sm font-bold sm:gap-x-5 sm:text-base">
          <a href="#collection" className="inline-flex min-h-11 items-center hover:underline">
            Collection
          </a>
          <a href="#gallery" className="inline-flex min-h-11 items-center hover:underline">
            Gallery
          </a>
          <a href="#how" className="hidden min-h-11 items-center hover:underline sm:inline-flex">
            How it works
          </a>
          <a
            href={SITE.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center hover:underline"
          >
            X
          </a>
          <AuthSlot />
        </nav>
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto flex max-w-[1080px] flex-col items-center gap-4 px-[clamp(1rem,5vw,3.5rem)] py-[clamp(2rem,8vh,5.5rem)] text-center">
          <img
            src="/logo.jpg"
            width={500}
            height={500}
            alt="Monni $uMONNI"
            className="logo-bob w-[min(80vw,480px)] border-pixel border-ink shadow-pixel-lg"
          />
          <p className="enter font-display text-[0.7rem] font-bold tracking-[0.12em] sm:text-xs">
            A 5K GENERATIVE COLLECTION
          </p>
          <h1 className="enter font-display text-[clamp(1.7rem,4.6vw,3.1rem)] font-bold delay-100">
            5,000 unique Monni.
            <br />
            Minted on-chain.
          </h1>
          <p className="enter max-w-xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed delay-150">
            Monni is launching on µToken. A 5,000-supply ERC-20 ({SITE.ticker}) where every whole
            token mints one unique Monni from an on-chain layer set. Buy {SITE.ticker}, get a Monni.
          </p>
          <div className="enter mt-2 flex w-full max-w-md flex-wrap justify-center gap-3 delay-200 sm:w-auto">
            <Button asChild className="flex-1 sm:flex-none">
              <a href={buyUrl()} target="_blank" rel="noopener noreferrer">
                Launching on µToken
              </a>
            </Button>
            <Button variant="ghost" asChild className="flex-1 sm:flex-none">
              <a href={SITE.xUrl} target="_blank" rel="noopener noreferrer">
                Follow on X
              </a>
            </Button>
          </div>
          <div className="enter mt-2 w-full max-w-2xl delay-300">
            <ContractCard />
          </div>
        </section>

        <div className="ticker overflow-hidden border-y-pixel border-ink bg-ink py-3.5" aria-hidden="true">
          <div className="ticker-track flex w-max gap-2.5">
            {loop.map((piece, i) => (
              <img
                key={`${piece.id}-${i}`}
                src={piece.thumb}
                alt=""
                width={64}
                height={64}
                className="size-14 shrink-0 rounded-md border-2 border-bg object-cover sm:size-16"
              />
            ))}
          </div>
        </div>

        <section
          className="mx-auto grid max-w-[1080px] grid-cols-2 border-b-pixel border-ink sm:grid-cols-4"
          aria-label="Collection stats"
        >
          {STATS.map((stat, i) => (
            <article
              key={stat.label}
              className={cn(
                "border-ink px-[clamp(0.9rem,4vw,3.5rem)] py-5",
                i % 2 === 0 && "border-r-pixel",
                i < 2 && "border-b-pixel sm:border-b-0",
                i !== 3 && "sm:border-r-pixel",
              )}
            >
              <strong className="mb-1.5 block font-display text-[clamp(0.85rem,2vw,1.15rem)] font-bold">
                {stat.label}
              </strong>
              <span className="text-sm text-muted">{stat.detail}</span>
            </article>
          ))}
        </section>

        <section
          id="collection"
          className="mx-auto max-w-[1080px] px-[clamp(1rem,5vw,3.5rem)] py-[clamp(3rem,8vh,5.5rem)]"
        >
          <p className="font-display text-xs font-bold tracking-[0.12em]">THE COLLECTION</p>
          <h2 className="mt-2.5 mb-6 font-display text-[clamp(1.7rem,4.6vw,3.1rem)] font-bold">
            Not an NFT mint.
            <br />
            A generative token.
          </h2>
          <div className="mb-7 grid gap-7 md:grid-cols-2">
            <p className="leading-relaxed">
              Pieces carry identity and traits like NFTs, but the token itself is fungible and
              trades like an ERC-20. First on a bonding curve, then on Uniswap after graduation.
              Ownership of a whole {SITE.ticker} token is what mints and holds a Monni.
            </p>
            <p className="leading-relaxed">
              Art is uploaded as layers — one folder per trait, one image per variant. The protocol
              composes each piece. Possible looks are the product of those variants. The number of
              Monni that can ever exist is the supply: {SITE.supply.toLocaleString()}.
            </p>
          </div>
          <ul className="grid list-none gap-2.5">
            {FACTS.map((fact) => (
              <li key={fact} className="border-pixel border-ink bg-paper/70 px-3.5 py-3">
                {fact}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="gallery"
          className="mx-auto max-w-[1080px] px-[clamp(1rem,5vw,3.5rem)] pb-[clamp(3rem,8vh,5.5rem)]"
        >
          <p className="font-display text-xs font-bold tracking-[0.12em]">SAMPLE MONNI</p>
          <h2 className="mt-2.5 mb-4 font-display text-[clamp(1.7rem,4.6vw,3.1rem)] font-bold">
            Generated pieces
          </h2>
          <p className="max-w-xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed">
            Sample Monni from the layer set. The live collection continues to mint unique
            combinations as whole {SITE.ticker} tokens are bought.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COLLECTION.map((piece) => (
              <button
                key={piece.id}
                data-piece={piece.id}
                type="button"
                onClick={() => setOpen(piece)}
                className="group flex w-full cursor-pointer flex-col items-center border-pixel border-ink bg-paper px-3 pt-3 pb-2.5 transition-colors duration-150 hover:bg-ink hover:text-bg focus-visible:bg-ink focus-visible:text-bg focus-visible:outline-none"
              >
                <img
                  src={piece.src}
                  alt={piece.name}
                  width={220}
                  height={220}
                  className="aspect-square w-full max-w-[220px] object-cover"
                />
                <span className="mt-1.5 text-center font-display text-sm font-bold">
                  {piece.name}
                  <span className="mt-0.5 block text-xs font-semibold opacity-70 group-hover:opacity-90">
                    {piece.tag}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section
          id="how"
          className="mx-auto max-w-[1080px] px-[clamp(1rem,5vw,3.5rem)] pb-[clamp(3rem,8vh,5.5rem)]"
        >
          <p className="font-display text-xs font-bold tracking-[0.12em]">PROTOCOL</p>
          <h2 className="mt-2.5 mb-6 font-display text-[clamp(1.7rem,4.6vw,3.1rem)] font-bold">
            How a Monni is born
          </h2>
          <ol className="grid list-none gap-4">
            {STEPS.map((step) => (
              <li key={step.n} className="grid grid-cols-[auto_1fr] gap-4 border-pixel border-ink p-4">
                <span className="pt-1 font-display text-sm font-bold">{step.n}</span>
                <div>
                  <h3 className="mb-1 font-display text-xl font-bold">{step.title}</h3>
                  <p className="leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="relative z-10 grid gap-1.5 border-t-pixel border-ink px-[clamp(1rem,5vw,3.5rem)] py-7 pb-[max(6.5rem,env(safe-area-inset-bottom))] text-center">
        <p className="font-display text-base font-bold tracking-wide">MONNI</p>
        <p>
          {SITE.supply.toLocaleString()} on-chain Monni · {SITE.ticker} generative collection
        </p>
        <a
          href={SITE.xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center font-bold hover:underline"
        >
          x.com/{SITE.xHandle}
        </a>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t-pixel border-ink bg-bg/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:px-6">
        <div className="mx-auto max-w-[1080px]">
          <ContractCard compact />
        </div>
      </div>

      <GalleryLightbox piece={open} onClose={close} />
    </div>
  );
}
