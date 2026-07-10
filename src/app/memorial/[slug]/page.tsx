import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart } from "lucide-react";
import { MemorialGuestbookForm } from "@/components/memorial/MemorialGuestbookForm";
import { getPublishedMemorialBySlug } from "@/lib/cms/store";
import { MemorialMedia, renderMemorialStory } from "@/lib/memorial/render";
import { BRAND } from "@/config/brand";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPublishedMemorialBySlug(slug);
  if (!page) {
    return { title: "Memorial Not Found" };
  }

  return {
    title: `${page.petName} — In Loving Memory | ${BRAND.name}`,
    description: `A digital memorial honoring ${page.petName}. Photos, videos, stories, and messages from family and friends.`,
    robots: { index: true, follow: true },
  };
}

export default async function MemorialPublicPage({ params }: Props) {
  const { slug } = await params;
  const page = getPublishedMemorialBySlug(slug);
  if (!page) notFound();

  const approvedGuestbook = page.guestbook.filter((entry) => entry.approved);
  const dateLine = [page.birthDate, page.memorialDate].filter(Boolean).join(" — ");

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a href={BRAND.url} className="text-sm text-gold hover:underline shrink-0">
            {BRAND.name}
          </a>
          <p className="text-xs text-light text-center">Digital Pet Memorial</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-highlight text-gold mb-5">
            <Heart className="w-7 h-7" />
          </div>
          {page.portraitUrl ? (
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-gold-light shadow-lg mb-6">
              <Image src={page.portraitUrl} alt={page.petName} fill className="object-cover" priority />
            </div>
          ) : null}
          <h1 className="font-serif text-4xl md:text-5xl text-text mb-2">{page.petName}</h1>
          {page.petType ? <p className="text-gold font-medium mb-2">{page.petType}</p> : null}
          {dateLine ? <p className="text-muted">{dateLine}</p> : null}
          <p className="text-light text-sm mt-4">Forever in our hearts</p>
        </section>

        {page.story ? (
          <section className="mb-12 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-2xl text-text mb-4">Their Story</h2>
            <div>{renderMemorialStory(page.story)}</div>
          </section>
        ) : null}

        {page.gallery.length > 0 ? (
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-text mb-6 text-center">Memories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.gallery.map((item, index) => (
                <div
                  key={`${item.url}-${index}`}
                  className={
                    item.type === "video"
                      ? "sm:col-span-2"
                      : "relative aspect-square rounded-xl overflow-hidden bg-highlight"
                  }
                >
                  {item.type === "image" ? (
                    <MemorialMedia item={item} />
                  ) : (
                    <MemorialMedia item={item} />
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {page.familyMessages.length > 0 ? (
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-text mb-6 text-center">Messages from Family</h2>
            <div className="space-y-4">
              {page.familyMessages.map((msg, index) => (
                <blockquote
                  key={`${msg.author}-${index}`}
                  className="rounded-2xl border border-border bg-highlight p-6"
                >
                  <p className="text-muted leading-relaxed italic">&ldquo;{msg.text}&rdquo;</p>
                  <footer className="mt-3 text-sm font-medium text-text">— {msg.author}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        ) : null}

        {approvedGuestbook.length > 0 ? (
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-text mb-6 text-center">Guestbook</h2>
            <div className="space-y-4">
              {approvedGuestbook.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-muted leading-relaxed">{entry.message}</p>
                  <p className="mt-2 text-sm text-light">
                    {entry.name} · {formatDate(entry.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {page.guestbookEnabled ? (
          <section className="mb-12 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-2xl text-text mb-2 text-center">Leave a Message</h2>
            <p className="text-sm text-muted text-center mb-6">
              Share a memory or kind word. Messages are reviewed before appearing.
            </p>
            <MemorialGuestbookForm slug={page.slug} />
          </section>
        ) : null}

        <footer className="text-center pt-8 border-t border-border">
          <p className="text-sm text-light">
            Created with love on{" "}
            <a href={BRAND.url} className="text-gold hover:underline">
              {BRAND.name}
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
