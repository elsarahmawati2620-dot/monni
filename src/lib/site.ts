export const SITE = {
  name: "Monni",
  ticker: "$uMONNI",
  supply: 5_000,
  supplyLabel: "5K",
  xUrl: "https://x.com/monnidotfun",
  xHandle: "monnidotfun",
  launchUrl: "https://utoken.gg/",
  /** Empty until launch — the UI shows TBA and copy is disabled. */
  contractAddress: "",
} as const;

export type CollectionPiece = {
  id: string;
  src: string;
  thumb: string;
  name: string;
  tag: string;
};

export const COLLECTION: CollectionPiece[] = [
  { id: "01", src: "/collection/01.jpg", thumb: "/collection/01-thumb.jpg", name: "Monni #001", tag: "Street Sip" },
  { id: "02", src: "/collection/02.jpg", thumb: "/collection/02-thumb.jpg", name: "Monni #002", tag: "Homeroom" },
  { id: "03", src: "/collection/03.jpg", thumb: "/collection/03-thumb.jpg", name: "Monni #003", tag: "Floor Break" },
  { id: "04", src: "/collection/04.jpg", thumb: "/collection/04-thumb.jpg", name: "Monni #004", tag: "Desk Hour" },
  { id: "05", src: "/collection/05.jpg", thumb: "/collection/05-thumb.jpg", name: "Monni #005", tag: "Cafeteria" },
  { id: "06", src: "/collection/06.jpg", thumb: "/collection/06-thumb.jpg", name: "Monni #006", tag: "Study Hall" },
  { id: "07", src: "/collection/07.jpg", thumb: "/collection/07-thumb.jpg", name: "Monni #007", tag: "Front Row" },
  { id: "08", src: "/collection/08.jpg", thumb: "/collection/08-thumb.jpg", name: "Monni #008", tag: "Hall Pass" },
];

export const STATS = [
  { label: SITE.supplyLabel, detail: "Supply / max Monni" },
  { label: "PURPLE", detail: "School-day vibe" },
  { label: "ON-CHAIN", detail: "Layers in storage" },
  { label: "ERC-20", detail: "One token = one Monni" },
] as const;

export const STEPS = [
  {
    n: "01",
    title: "Deploy",
    body: `Name, ticker ${SITE.ticker}, ${SITE.supply.toLocaleString()} supply, and curve are set permanently at launch. Collections use 18 decimals, so one whole token always backs one item.`,
  },
  {
    n: "02",
    title: "Upload layers",
    body: "Art goes on-chain across several transactions. Once trading opens, the layer set is locked. Metadata cannot change later.",
  },
  {
    n: "03",
    title: "Buy & reveal",
    body: `A buy mints one Monni per whole ${SITE.ticker} token. Traits reveal layer by layer from a later block, so rarity cannot be gamed at buy time.`,
  },
  {
    n: "04",
    title: "Graduate",
    body: "At the ETH target, anyone can graduate. Liquidity moves to Uniswap and the LP key is burned. Each Monni also trades on its own card.",
  },
] as const;

export const FACTS = [
  `Monni launches on µToken. Buys mint one item per whole ${SITE.ticker} token received.`,
  "Fractions and transfers never mint. Only new buys create new Monni.",
  "Traits cannot be previewed or cherry-picked. Looks come from a later block.",
  "Layers stay on-chain. Any Monni can be rendered from chain data alone.",
] as const;

export function tokenPageUrl(ca: string) {
  return `https://utoken.gg/token/${ca}`;
}

export function shortAddress(ca: string) {
  if (ca.length < 12) return ca;
  return `${ca.slice(0, 6)}…${ca.slice(-4)}`;
}

export function buyUrl() {
  return SITE.contractAddress
    ? tokenPageUrl(SITE.contractAddress)
    : SITE.launchUrl;
}
