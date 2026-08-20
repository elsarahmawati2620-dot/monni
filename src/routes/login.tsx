import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="relative grid min-h-dvh place-items-center px-6 py-12">
      <div className="grain" />
      <div className="relative z-10 w-full max-w-sm border-pixel border-ink bg-paper p-6 shadow-pixel-lg">
        <Link to="/" className="font-display text-sm font-bold hover:underline">
          ← Monni
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Join the {SITE.ticker} club. Use Google or X — same session as the rest of the site.
        </p>
        <div className="mt-6 grid gap-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant={p.idp === "google" ? "ink" : "paper"}
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>
      </div>
    </main>
  );
}
