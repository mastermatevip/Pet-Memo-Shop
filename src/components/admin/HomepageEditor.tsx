"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { HomepageContent } from "@/lib/cms/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { SaveStatus } from "@/components/admin/SaveStatus";

interface Props {
  initial: HomepageContent;
}

export function HomepageEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function updateHero(field: keyof HomepageContent["hero"], value: string) {
    setContent((c) => ({ ...c, hero: { ...c.hero, [field]: value } }));
  }

  function updateHeroImage(field: "src" | "alt", value: string) {
    setContent((c) => ({
      ...c,
      hero: { ...c.hero, image: { ...c.hero.image, [field]: value } },
    }));
  }

  function updateHeroCta(which: "primaryCta" | "secondaryCta", field: "label" | "href", value: string) {
    setContent((c) => ({
      ...c,
      hero: { ...c.hero, [which]: { ...c.hero[which], [field]: value } },
    }));
  }

  function updateSectionTitle(
    section: keyof HomepageContent["sections"],
    field: "title" | "subtitle" | "viewAllLabel",
    value: string
  ) {
    setContent((c) => ({
      ...c,
      sections: {
        ...c.sections,
        [section]: { ...c.sections[section], [field]: value },
      },
    }));
  }

  function updateNfc(field: string, value: string) {
    setContent((c) => ({
      ...c,
      sections: {
        ...c.sections,
        nfc: { ...c.sections.nfc, [field]: value },
      },
    }));
  }

  function updateNfcImage(field: "src" | "alt", value: string) {
    setContent((c) => ({
      ...c,
      sections: {
        ...c.sections,
        nfc: {
          ...c.sections.nfc,
          image: { ...c.sections.nfc.image, [field]: value },
        },
      },
    }));
  }

  function updateNfcCta(field: "label" | "href", value: string) {
    setContent((c) => ({
      ...c,
      sections: {
        ...c.sections,
        nfc: { ...c.sections.nfc, cta: { ...c.sections.nfc.cta, [field]: value } },
      },
    }));
  }

  function updateNfcKeyPoints(value: string) {
    setContent((c) => ({
      ...c,
      sections: {
        ...c.sections,
        nfc: {
          ...c.sections.nfc,
          keyPoints: value.split("\n").map((s) => s.trim()).filter(Boolean),
        },
      },
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const res = await fetch("/api/admin/homepage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSave} className="space-y-10">
      <section className="space-y-4">
        <h3 className="font-serif text-lg">首屏 Hero</h3>
        <AdminField label="主标题">
          <input
            className={adminInputClass}
            value={content.hero.h1}
            onChange={(e) => updateHero("h1", e.target.value)}
          />
        </AdminField>
        <AdminField label="副标题">
          <textarea
            className={adminTextareaClass}
            value={content.hero.subtitle}
            onChange={(e) => updateHero("subtitle", e.target.value)}
          />
        </AdminField>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="主按钮文字">
            <input
              className={adminInputClass}
              value={content.hero.primaryCta.label}
              onChange={(e) => updateHeroCta("primaryCta", "label", e.target.value)}
            />
          </AdminField>
          <AdminField label="主按钮链接">
            <input
              className={adminInputClass}
              value={content.hero.primaryCta.href}
              onChange={(e) => updateHeroCta("primaryCta", "href", e.target.value)}
            />
          </AdminField>
          <AdminField label="次按钮文字">
            <input
              className={adminInputClass}
              value={content.hero.secondaryCta.label}
              onChange={(e) => updateHeroCta("secondaryCta", "label", e.target.value)}
            />
          </AdminField>
          <AdminField label="次按钮链接">
            <input
              className={adminInputClass}
              value={content.hero.secondaryCta.href}
              onChange={(e) => updateHeroCta("secondaryCta", "href", e.target.value)}
            />
          </AdminField>
        </div>
        <AdminField label="Hero 图片 URL">
          <input
            className={adminInputClass}
            value={content.hero.image.src}
            onChange={(e) => updateHeroImage("src", e.target.value)}
          />
        </AdminField>
        <AdminField label="Hero 图片 alt">
          <input
            className={adminInputClass}
            value={content.hero.image.alt}
            onChange={(e) => updateHeroImage("alt", e.target.value)}
          />
        </AdminField>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">区块标题</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="分类区标题">
            <input
              className={adminInputClass}
              value={content.sections.categories.title}
              onChange={(e) => updateSectionTitle("categories", "title", e.target.value)}
            />
          </AdminField>
          <AdminField label="分类区副标题">
            <input
              className={adminInputClass}
              value={content.sections.categories.subtitle ?? ""}
              onChange={(e) => updateSectionTitle("categories", "subtitle", e.target.value)}
            />
          </AdminField>
          <AdminField label="畅销区标题">
            <input
              className={adminInputClass}
              value={content.sections.bestSellers.title}
              onChange={(e) => updateSectionTitle("bestSellers", "title", e.target.value)}
            />
          </AdminField>
          <AdminField label="畅销区「查看全部」">
            <input
              className={adminInputClass}
              value={content.sections.bestSellers.viewAllLabel}
              onChange={(e) => updateSectionTitle("bestSellers", "viewAllLabel", e.target.value)}
            />
          </AdminField>
          <AdminField label="流程区标题">
            <input
              className={adminInputClass}
              value={content.sections.howItWorks.title}
              onChange={(e) => updateSectionTitle("howItWorks", "title", e.target.value)}
            />
          </AdminField>
          <AdminField label="流程区副标题">
            <input
              className={adminInputClass}
              value={content.sections.howItWorks.subtitle ?? ""}
              onChange={(e) => updateSectionTitle("howItWorks", "subtitle", e.target.value)}
            />
          </AdminField>
          <AdminField label="个性化区标题">
            <input
              className={adminInputClass}
              value={content.sections.personalization.title}
              onChange={(e) => updateSectionTitle("personalization", "title", e.target.value)}
            />
          </AdminField>
          <AdminField label="博客区标题">
            <input
              className={adminInputClass}
              value={content.sections.blog.title}
              onChange={(e) => updateSectionTitle("blog", "title", e.target.value)}
            />
          </AdminField>
          <AdminField label="博客区「查看全部」">
            <input
              className={adminInputClass}
              value={content.sections.blog.viewAllLabel}
              onChange={(e) => updateSectionTitle("blog", "viewAllLabel", e.target.value)}
            />
          </AdminField>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">NFC 区块</h3>
        <AdminField label="标题">
          <input
            className={adminInputClass}
            value={content.sections.nfc.title}
            onChange={(e) => updateNfc("title", e.target.value)}
          />
        </AdminField>
        <AdminField label="描述">
          <textarea
            className={adminTextareaClass}
            value={content.sections.nfc.description}
            onChange={(e) => updateNfc("description", e.target.value)}
          />
        </AdminField>
        <AdminField label="图片 URL">
          <input
            className={adminInputClass}
            value={content.sections.nfc.image.src}
            onChange={(e) => updateNfcImage("src", e.target.value)}
          />
        </AdminField>
        <AdminField label="图片 alt">
          <input
            className={adminInputClass}
            value={content.sections.nfc.image.alt}
            onChange={(e) => updateNfcImage("alt", e.target.value)}
          />
        </AdminField>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="按钮文字">
            <input
              className={adminInputClass}
              value={content.sections.nfc.cta.label}
              onChange={(e) => updateNfcCta("label", e.target.value)}
            />
          </AdminField>
          <AdminField label="按钮链接">
            <input
              className={adminInputClass}
              value={content.sections.nfc.cta.href}
              onChange={(e) => updateNfcCta("href", e.target.value)}
            />
          </AdminField>
        </div>
        <AdminField label="要点列表" hint="每行一条">
          <textarea
            className={adminTextareaClass}
            value={content.sections.nfc.keyPoints.join("\n")}
            onChange={(e) => updateNfcKeyPoints(e.target.value)}
          />
        </AdminField>
      </section>

      <div className="flex items-center gap-4 sticky bottom-0 bg-bg py-4 border-t border-border">
        <button
          type="submit"
          className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover"
        >
          保存首页
        </button>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
