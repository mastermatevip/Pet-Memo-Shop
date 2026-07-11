"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type { HomepageContent } from "@/lib/cms/types";
import type { CategoryCard, HowItWorksStep, PersonalizationOption } from "@/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { HomepageImageField } from "@/components/admin/HomepageImageField";
import { AdminImagePreview } from "@/components/admin/AdminImagePreview";
import { SaveStatus } from "@/components/admin/SaveStatus";
import { normalizeImageSrc } from "@/lib/images";

const PERSONALIZATION_ICONS: { value: PersonalizationOption["icon"]; label: string }[] = [
  { value: "type", label: "文字" },
  { value: "image", label: "图片" },
  { value: "calendar", label: "日期" },
  { value: "message", label: "留言" },
  { value: "gift", label: "礼盒" },
  { value: "nfc", label: "NFC" },
];

function emptyCategory(): CategoryCard {
  return { slug: "", title: "", description: "", image: "", imageAlt: "" };
}

function emptyStep(step: number): HowItWorksStep {
  return { step, title: "", description: "" };
}

function emptyPersonalization(): PersonalizationOption {
  return { icon: "type", label: "", description: "" };
}

interface Props {
  initial: HomepageContent;
}

export function HomepageEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function persistHomepage(next: HomepageContent) {
    setStatus("saving");

    const res = await fetch("/api/admin/homepage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });

    if (!res.ok) {
      setStatus("error");
      return false;
    }

    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2000);
    return true;
  }

  function commitContent(
    updater: (current: HomepageContent) => HomepageContent,
    options?: { persist?: boolean }
  ) {
    setContent((current) => {
      const next = updater(current);
      if (options?.persist) {
        void persistHomepage(next);
      }
      return next;
    });
  }

  function updateHero(field: keyof HomepageContent["hero"], value: string) {
    setContent((c) => ({ ...c, hero: { ...c.hero, [field]: value } }));
  }

  function updateHeroImage(field: "src" | "alt", value: string, persist = false) {
    commitContent(
      (c) => ({
        ...c,
        hero: { ...c.hero, image: { ...c.hero.image, [field]: value } },
      }),
      { persist }
    );
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

  function updateNfcImage(field: "src" | "alt", value: string, persist = false) {
    commitContent(
      (c) => ({
        ...c,
        sections: {
          ...c.sections,
          nfc: {
            ...c.sections.nfc,
            image: { ...c.sections.nfc.image, [field]: value },
          },
        },
      }),
      { persist }
    );
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

  function updateCategory(index: number, patch: Partial<CategoryCard>, persist = false) {
    commitContent(
      (c) => ({
        ...c,
        categories: c.categories.map((item, i) => (i === index ? { ...item, ...patch } : item)),
      }),
      { persist }
    );
  }

  function addCategory() {
    setContent((c) => ({ ...c, categories: [...c.categories, emptyCategory()] }));
  }

  function removeCategory(index: number) {
    setContent((c) => ({
      ...c,
      categories: c.categories.filter((_, i) => i !== index),
    }));
  }

  function moveCategory(index: number, direction: -1 | 1) {
    setContent((c) => {
      const target = index + direction;
      if (target < 0 || target >= c.categories.length) return c;
      const next = [...c.categories];
      [next[index], next[target]] = [next[target], next[index]];
      return { ...c, categories: next };
    });
  }

  function updateStep(index: number, patch: Partial<HowItWorksStep>) {
    setContent((c) => ({
      ...c,
      howItWorksSteps: c.howItWorksSteps.map((item, i) =>
        i === index ? { ...item, ...patch } : item
      ),
    }));
  }

  function addStep() {
    setContent((c) => ({
      ...c,
      howItWorksSteps: [
        ...c.howItWorksSteps,
        emptyStep(c.howItWorksSteps.length + 1),
      ],
    }));
  }

  function removeStep(index: number) {
    setContent((c) => ({
      ...c,
      howItWorksSteps: c.howItWorksSteps
        .filter((_, i) => i !== index)
        .map((step, i) => ({ ...step, step: i + 1 })),
    }));
  }

  function moveStep(index: number, direction: -1 | 1) {
    setContent((c) => {
      const target = index + direction;
      if (target < 0 || target >= c.howItWorksSteps.length) return c;
      const next = [...c.howItWorksSteps];
      [next[index], next[target]] = [next[target], next[index]];
      return {
        ...c,
        howItWorksSteps: next.map((step, i) => ({ ...step, step: i + 1 })),
      };
    });
  }

  function updatePersonalization(index: number, patch: Partial<PersonalizationOption>) {
    setContent((c) => ({
      ...c,
      personalizationOptions: c.personalizationOptions.map((item, i) =>
        i === index ? { ...item, ...patch } : item
      ),
    }));
  }

  function addPersonalization() {
    setContent((c) => ({
      ...c,
      personalizationOptions: [...c.personalizationOptions, emptyPersonalization()],
    }));
  }

  function removePersonalization(index: number) {
    setContent((c) => ({
      ...c,
      personalizationOptions: c.personalizationOptions.filter((_, i) => i !== index),
    }));
  }

  function movePersonalization(index: number, direction: -1 | 1) {
    setContent((c) => {
      const target = index + direction;
      if (target < 0 || target >= c.personalizationOptions.length) return c;
      const next = [...c.personalizationOptions];
      [next[index], next[target]] = [next[target], next[index]];
      return { ...c, personalizationOptions: next };
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await persistHomepage(content);
  }

  async function handleRestoreSeedImages() {
    if (!window.confirm("将 Hero、NFC 区块、分类卡片的图片恢复为 Git 默认种子（/images/homepage/），文字内容不变。继续？")) {
      return;
    }

    setStatus("saving");
    const res = await fetch("/api/admin/homepage/restore-images", { method: "POST" });
    if (!res.ok) {
      setStatus("error");
      return;
    }

    const data = (await res.json()) as { content: HomepageContent };
    setContent(data.content);
    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSave} className="space-y-10">
      <nav className="flex flex-wrap gap-2 text-sm">
        {[
          { href: "#hero-section", label: "Hero" },
          { href: "#nfc-section", label: "NFC 介绍区" },
          { href: "#categories-section", label: "分类卡片" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full border border-border px-3 py-1 text-muted hover:text-text hover:bg-highlight"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section id="hero-section" className="space-y-4 scroll-mt-24">
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
        <HomepageImageField
          label="Hero 图片"
          value={content.hero.image.src}
          onImageChange={(url, options) => updateHeroImage("src", url, options?.persist)}
          alt={content.hero.image.alt}
          altLabel="Hero 图片 alt"
          onAltChange={(alt) => updateHeroImage("alt", alt)}
        />
      </section>

      <section id="nfc-section" className="space-y-4 rounded-xl border-2 border-gold/40 bg-highlight/40 p-5 scroll-mt-24">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg text-text">NFC 纪念卡介绍区</h3>
            <p className="text-sm text-muted mt-1">
              对应首页「一张纪念卡，打开它们的故事」——左侧大图可在下方上传替换
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gold hover:underline shrink-0"
          >
            预览首页 ↗
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-4 rounded-lg border border-border bg-card p-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-bg">
            {content.sections.nfc.image.src ? (
              <AdminImagePreview
                src={content.sections.nfc.image.src}
                alt={content.sections.nfc.image.alt}
                className="block h-full w-full cursor-zoom-in"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={normalizeImageSrc(content.sections.nfc.image.src)}
                  alt={content.sections.nfc.image.alt}
                  className="h-full w-full object-cover"
                />
              </AdminImagePreview>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-light">暂无图片</div>
            )}
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-serif text-base text-text">{content.sections.nfc.title}</p>
            <p className="text-muted line-clamp-4">{content.sections.nfc.description}</p>
            <p className="text-xs text-light">{content.sections.nfc.keyPoints.length} 条要点</p>
          </div>
        </div>

        <HomepageImageField
          label="左侧展示图"
          value={content.sections.nfc.image.src}
          onImageChange={(url, options) => updateNfcImage("src", url, options?.persist)}
          alt={content.sections.nfc.image.alt}
          altLabel="图片 alt（SEO）"
          onAltChange={(alt) => updateNfcImage("alt", alt)}
        />
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

      <section id="categories-section" className="space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-lg">分类卡片</h3>
          <button
            type="button"
            onClick={addCategory}
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-text"
          >
            <Plus className="w-4 h-4" />
            添加卡片
          </button>
        </div>
        <p className="text-xs text-light">
          Slug 对应合集路径，如 <code className="font-mono">dog-memorial-gifts</code>
        </p>
        <div className="space-y-4">
          {content.categories.map((cat, index) => (
            <div key={index} className="rounded-lg border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted">卡片 {index + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveCategory(index, -1)}
                    disabled={index === 0}
                    className="p-1 text-muted hover:text-text disabled:opacity-30"
                    aria-label="上移"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveCategory(index, 1)}
                    disabled={index === content.categories.length - 1}
                    className="p-1 text-muted hover:text-text disabled:opacity-30"
                    aria-label="下移"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="p-1 text-muted hover:text-red-600"
                    aria-label="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <AdminField label="合集 Slug">
                  <input
                    className={adminInputClass}
                    value={cat.slug}
                    onChange={(e) => updateCategory(index, { slug: e.target.value })}
                  />
                </AdminField>
                <AdminField label="标题">
                  <input
                    className={adminInputClass}
                    value={cat.title}
                    onChange={(e) => updateCategory(index, { title: e.target.value })}
                  />
                </AdminField>
              </div>
              <AdminField label="描述">
                <input
                  className={adminInputClass}
                  value={cat.description}
                  onChange={(e) => updateCategory(index, { description: e.target.value })}
                />
              </AdminField>
              <HomepageImageField
                label="分类图片"
                value={cat.image}
                onImageChange={(url, options) =>
                  updateCategory(index, { image: url }, options?.persist)
                }
                alt={cat.imageAlt}
                altLabel="图片 alt"
                onAltChange={(alt) => updateCategory(index, { imageAlt: alt })}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-lg">How It Works 步骤</h3>
          <button
            type="button"
            onClick={addStep}
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-text"
          >
            <Plus className="w-4 h-4" />
            添加步骤
          </button>
        </div>
        <div className="space-y-4">
          {content.howItWorksSteps.map((step, index) => (
            <div key={index} className="rounded-lg border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted">步骤 {step.step}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveStep(index, -1)}
                    disabled={index === 0}
                    className="p-1 text-muted hover:text-text disabled:opacity-30"
                    aria-label="上移"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveStep(index, 1)}
                    disabled={index === content.howItWorksSteps.length - 1}
                    className="p-1 text-muted hover:text-text disabled:opacity-30"
                    aria-label="下移"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="p-1 text-muted hover:text-red-600"
                    aria-label="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <AdminField label="标题">
                <input
                  className={adminInputClass}
                  value={step.title}
                  onChange={(e) => updateStep(index, { title: e.target.value })}
                />
              </AdminField>
              <AdminField label="描述">
                <textarea
                  className={adminTextareaClass}
                  value={step.description}
                  onChange={(e) => updateStep(index, { description: e.target.value })}
                />
              </AdminField>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-lg">个性化选项</h3>
          <button
            type="button"
            onClick={addPersonalization}
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-text"
          >
            <Plus className="w-4 h-4" />
            添加选项
          </button>
        </div>
        <div className="space-y-4">
          {content.personalizationOptions.map((option, index) => (
            <div key={index} className="rounded-lg border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted">选项 {index + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => movePersonalization(index, -1)}
                    disabled={index === 0}
                    className="p-1 text-muted hover:text-text disabled:opacity-30"
                    aria-label="上移"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => movePersonalization(index, 1)}
                    disabled={index === content.personalizationOptions.length - 1}
                    className="p-1 text-muted hover:text-text disabled:opacity-30"
                    aria-label="下移"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removePersonalization(index)}
                    className="p-1 text-muted hover:text-red-600"
                    aria-label="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <AdminField label="图标">
                  <select
                    className={adminInputClass}
                    value={option.icon}
                    onChange={(e) =>
                      updatePersonalization(index, {
                        icon: e.target.value as PersonalizationOption["icon"],
                      })
                    }
                  >
                    {PERSONALIZATION_ICONS.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </AdminField>
                <AdminField label="标签">
                  <input
                    className={adminInputClass}
                    value={option.label}
                    onChange={(e) => updatePersonalization(index, { label: e.target.value })}
                  />
                </AdminField>
              </div>
              <AdminField label="描述">
                <input
                  className={adminInputClass}
                  value={option.description}
                  onChange={(e) => updatePersonalization(index, { description: e.target.value })}
                />
              </AdminField>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-4 sticky bottom-0 bg-bg py-4 border-t border-border">
        <button
          type="submit"
          className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover"
        >
          保存首页
        </button>
        <button
          type="button"
          onClick={() => void handleRestoreSeedImages()}
          className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted hover:text-text hover:bg-highlight"
        >
          恢复 Git 默认图片
        </button>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
