"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const copy = {
  fr: {
    title: "Accès privé",
    subtitle: "Saisis le mot de passe pour accéder aux œuvres privées.",
    placeholder: "Mot de passe",
    wrong: "Mot de passe incorrect.",
    loading: "Connexion...",
    cta: "Entrer",
    successPath: "/fr/prive/oeuvres",
  },
  en: {
    title: "Private access",
    subtitle: "Enter the password to access private artworks.",
    placeholder: "Password",
    wrong: "Incorrect password.",
    loading: "Signing in...",
    cta: "Enter",
    successPath: "/en/private/artworks",
  },
} as const;

type Locale = keyof typeof copy;

export default function PrivateLogin() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  const lang: Locale = locale === "en" ? "en" : "fr";
  const t = copy[lang];

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/private/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) return setError(t.wrong);

    router.push(t.successPath);
  }

  return (
    <main className="p-8 max-w-md">
      <h1 className="text-2xl font-bold">{t.title}</h1>
      <p className="mt-2 text-sm opacity-80">{t.subtitle}</p>

      <form className="mt-6 space-y-3" onSubmit={onSubmit}>
        <input
          className="w-full border rounded-md p-2"
          type="password"
          placeholder={t.placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          className="w-full rounded-md bg-black text-white p-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? t.loading : t.cta}
        </button>
      </form>
    </main>
  );
}
