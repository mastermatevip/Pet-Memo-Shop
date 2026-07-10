import type { MemorialGalleryItem } from "@/types";

export function renderMemorialStory(content: string) {
  return content
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const html = block
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br />");
      return (
        <p
          key={index}
          className="text-muted leading-relaxed mb-4 last:mb-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    });
}

export function getVideoEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  const youtubeMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`;

  const vimeoMatch = trimmed.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
}

export function MemorialMedia({ item }: { item: MemorialGalleryItem }) {
  if (item.type === "video") {
    const embed = getVideoEmbedUrl(item.url);
    if (embed) {
      return (
        <div className="relative aspect-video rounded-xl overflow-hidden bg-btn/5">
          <iframe
            src={embed}
            title={item.alt ?? "Memorial video"}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <video
        src={item.url}
        controls
        className="w-full rounded-xl"
        aria-label={item.alt ?? "Memorial video"}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.url}
      alt={item.alt ?? "Memorial photo"}
      className="w-full h-full object-cover"
    />
  );
}
