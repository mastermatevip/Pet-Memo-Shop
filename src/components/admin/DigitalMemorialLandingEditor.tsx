"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type {
  DigitalMemorialHowIcon,
  DigitalMemorialLandingContent,
} from "@/lib/cms/digital-memorial-landing-types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { HomepageImageField } from "@/components/admin/HomepageImageField";
import { SaveStatus } from "@/components/admin/SaveStatus";

interface Props {
  initial: DigitalMemorialLandingContent;
}

const HOW_ICONS: { value: DigitalMemorialHowIcon; label: string }[] = [
  { value: "smartphone", label: "手机" },
  { value: "image", label: "图片" },
  { value: "book", label: "故事" },
  { value: "message", label: "留言" },
];

export function DigitalMemorialLandingEditor({ initial }: Props) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const res = await fetch("/api/admin/digital-memorial-landing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    const data = (await res.json()) as { content?: DigitalMemorialLandingContent };
    if (data.content) setContent(data.content);
    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSave} className="space-y-10">
      <p className="text-sm text-muted rounded-lg border border-border bg-highlight px-4 py-3">
        编辑前台营销页{" "}
        <a
          href="/digital-pet-memorial"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline"
        >
          /digital-pet-memorial
        </a>
        。英文为 CMS 主文案；中文等语言可在翻译包中覆盖文字（图片共用）。
      </p>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">SEO</h3>
        <AdminField label="Meta 标题">
          <input
            className={adminInputClass}
            value={content.metaTitle}
            onChange={(e) => setContent((c) => ({ ...c, metaTitle: e.target.value }))}
          />
        </AdminField>
        <AdminField label="Meta 描述">
          <textarea
            className={adminTextareaClass}
            value={content.metaDescription}
            onChange={(e) => setContent((c) => ({ ...c, metaDescription: e.target.value }))}
          />
        </AdminField>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">Hero</h3>
        <AdminField label="眉题">
          <input
            className={adminInputClass}
            value={content.hero.eyebrow}
            onChange={(e) =>
              setContent((c) => ({ ...c, hero: { ...c.hero, eyebrow: e.target.value } }))
            }
          />
        </AdminField>
        <AdminField label="主标题">
          <input
            className={adminInputClass}
            value={content.hero.h1}
            onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, h1: e.target.value } }))}
          />
        </AdminField>
        <AdminField label="副标题">
          <textarea
            className={adminTextareaClass}
            value={content.hero.subtitle}
            onChange={(e) =>
              setContent((c) => ({ ...c, hero: { ...c.hero, subtitle: e.target.value } }))
            }
          />
        </AdminField>
        <AdminField label="补充说明">
          <textarea
            className={adminTextareaClass}
            value={content.hero.body}
            onChange={(e) =>
              setContent((c) => ({ ...c, hero: { ...c.hero, body: e.target.value } }))
            }
          />
        </AdminField>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="主按钮文字">
            <input
              className={adminInputClass}
              value={content.hero.primaryCta.label}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  hero: {
                    ...c.hero,
                    primaryCta: { ...c.hero.primaryCta, label: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
          <AdminField label="主按钮链接">
            <input
              className={adminInputClass}
              value={content.hero.primaryCta.href}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  hero: {
                    ...c.hero,
                    primaryCta: { ...c.hero.primaryCta, href: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
          <AdminField label="次按钮文字">
            <input
              className={adminInputClass}
              value={content.hero.secondaryCta.label}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  hero: {
                    ...c.hero,
                    secondaryCta: { ...c.hero.secondaryCta, label: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
          <AdminField label="次按钮链接">
            <input
              className={adminInputClass}
              value={content.hero.secondaryCta.href}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  hero: {
                    ...c.hero,
                    secondaryCta: { ...c.hero.secondaryCta, href: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
        </div>
        <HomepageImageField
          label="Hero 图片"
          value={content.hero.image.src}
          onImageChange={(url) =>
            setContent((c) => ({
              ...c,
              hero: { ...c.hero, image: { ...c.hero.image, src: url } },
            }))
          }
          alt={content.hero.image.alt}
          altLabel="Hero 图片 alt"
          onAltChange={(alt) =>
            setContent((c) => ({
              ...c,
              hero: { ...c.hero, image: { ...c.hero.image, alt } },
            }))
          }
        />
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">什么是数字纪念</h3>
        <AdminField label="标题">
          <input
            className={adminInputClass}
            value={content.whatIs.title}
            onChange={(e) =>
              setContent((c) => ({ ...c, whatIs: { ...c.whatIs, title: e.target.value } }))
            }
          />
        </AdminField>
        <AdminField label="段落" hint="每段一行">
          <textarea
            className={adminTextareaClass}
            rows={5}
            value={content.whatIs.paragraphs.join("\n")}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                whatIs: {
                  ...c.whatIs,
                  paragraphs: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                },
              }))
            }
          />
        </AdminField>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">碳纤维 NFC</h3>
        <AdminField label="标题">
          <input
            className={adminInputClass}
            value={content.carbonFiber.title}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                carbonFiber: { ...c.carbonFiber, title: e.target.value },
              }))
            }
          />
        </AdminField>
        <AdminField label="副标题">
          <textarea
            className={adminTextareaClass}
            value={content.carbonFiber.subtitle}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                carbonFiber: { ...c.carbonFiber, subtitle: e.target.value },
              }))
            }
          />
        </AdminField>
        <HomepageImageField
          label="展示图"
          value={content.carbonFiber.image.src}
          onImageChange={(url) =>
            setContent((c) => ({
              ...c,
              carbonFiber: {
                ...c.carbonFiber,
                image: { ...c.carbonFiber.image, src: url },
              },
            }))
          }
          alt={content.carbonFiber.image.alt}
          altLabel="图片 alt"
          onAltChange={(alt) =>
            setContent((c) => ({
              ...c,
              carbonFiber: {
                ...c.carbonFiber,
                image: { ...c.carbonFiber.image, alt },
              },
            }))
          }
        />
        <AdminField label="卖点列表" hint="每行一条">
          <textarea
            className={adminTextareaClass}
            rows={6}
            value={content.carbonFiber.features.join("\n")}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                carbonFiber: {
                  ...c.carbonFiber,
                  features: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                },
              }))
            }
          />
        </AdminField>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="按钮文字">
            <input
              className={adminInputClass}
              value={content.carbonFiber.cta.label}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  carbonFiber: {
                    ...c.carbonFiber,
                    cta: { ...c.carbonFiber.cta, label: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
          <AdminField label="按钮链接">
            <input
              className={adminInputClass}
              value={content.carbonFiber.cta.href}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  carbonFiber: {
                    ...c.carbonFiber,
                    cta: { ...c.carbonFiber.cta, href: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-lg">工作原理</h3>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-text"
            onClick={() =>
              setContent((c) => ({
                ...c,
                howItWorks: {
                  ...c.howItWorks,
                  items: [
                    ...c.howItWorks.items,
                    { icon: "smartphone", title: "", desc: "" },
                  ],
                },
              }))
            }
          >
            <Plus className="w-4 h-4" />
            添加
          </button>
        </div>
        <AdminField label="区块标题">
          <input
            className={adminInputClass}
            value={content.howItWorks.title}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                howItWorks: { ...c.howItWorks, title: e.target.value },
              }))
            }
          />
        </AdminField>
        {content.howItWorks.items.map((item, index) => (
          <div key={index} className="rounded-lg border border-border p-4 space-y-3">
            <div className="flex justify-between gap-2">
              <p className="text-sm font-medium">条目 {index + 1}</p>
              <div className="flex gap-1">
                <button
                  type="button"
                  className="p-1 text-muted hover:text-text"
                  onClick={() =>
                    setContent((c) => {
                      if (index === 0) return c;
                      const items = [...c.howItWorks.items];
                      [items[index - 1], items[index]] = [items[index], items[index - 1]];
                      return { ...c, howItWorks: { ...c.howItWorks, items } };
                    })
                  }
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 text-muted hover:text-text"
                  onClick={() =>
                    setContent((c) => {
                      if (index >= c.howItWorks.items.length - 1) return c;
                      const items = [...c.howItWorks.items];
                      [items[index], items[index + 1]] = [items[index + 1], items[index]];
                      return { ...c, howItWorks: { ...c.howItWorks, items } };
                    })
                  }
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 text-muted hover:text-red-600"
                  onClick={() =>
                    setContent((c) => ({
                      ...c,
                      howItWorks: {
                        ...c.howItWorks,
                        items: c.howItWorks.items.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <AdminField label="图标">
                <select
                  className={adminInputClass}
                  value={item.icon}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      howItWorks: {
                        ...c.howItWorks,
                        items: c.howItWorks.items.map((it, i) =>
                          i === index
                            ? { ...it, icon: e.target.value as DigitalMemorialHowIcon }
                            : it
                        ),
                      },
                    }))
                  }
                >
                  {HOW_ICONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="标题">
                <input
                  className={adminInputClass}
                  value={item.title}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      howItWorks: {
                        ...c.howItWorks,
                        items: c.howItWorks.items.map((it, i) =>
                          i === index ? { ...it, title: e.target.value } : it
                        ),
                      },
                    }))
                  }
                />
              </AdminField>
            </div>
            <AdminField label="描述">
              <textarea
                className={adminTextareaClass}
                rows={2}
                value={item.desc}
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    howItWorks: {
                      ...c.howItWorks,
                      items: c.howItWorks.items.map((it, i) =>
                        i === index ? { ...it, desc: e.target.value } : it
                      ),
                    },
                  }))
                }
              />
            </AdminField>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">可包含内容</h3>
        <AdminField label="标题">
          <input
            className={adminInputClass}
            value={content.included.title}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                included: { ...c.included, title: e.target.value },
              }))
            }
          />
        </AdminField>
        <AdminField label="副标题">
          <input
            className={adminInputClass}
            value={content.included.subtitle}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                included: { ...c.included, subtitle: e.target.value },
              }))
            }
          />
        </AdminField>
        <AdminField label="字段列表" hint="每行一项">
          <textarea
            className={adminTextareaClass}
            rows={6}
            value={content.included.fields.join("\n")}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                included: {
                  ...c.included,
                  fields: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                },
              }))
            }
          />
        </AdminField>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-lg">示例纪念页链接</h3>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-text"
            onClick={() =>
              setContent((c) => ({
                ...c,
                sampleLinks: {
                  ...c.sampleLinks,
                  items: [
                    ...(c.sampleLinks?.items ?? []),
                    { title: "", slug: "", image: "", imageAlt: "" },
                  ],
                },
              }))
            }
          >
            <Plus className="w-4 h-4" />
            添加
          </button>
        </div>
        <p className="text-sm text-muted">
          前台三列展示：上方图片、下方标题链接到 <code className="text-xs">/memorial/&#123;slug&#125;</code>
          。图片可留空，将自动使用该纪念页的主图。
        </p>
        <AdminField label="区块标题">
          <input
            className={adminInputClass}
            value={content.sampleLinks?.title ?? ""}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                sampleLinks: { ...c.sampleLinks, title: e.target.value },
              }))
            }
          />
        </AdminField>
        <AdminField label="副标题">
          <input
            className={adminInputClass}
            value={content.sampleLinks?.subtitle ?? ""}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                sampleLinks: { ...c.sampleLinks, subtitle: e.target.value },
              }))
            }
          />
        </AdminField>
        <AdminField label="卡片底部提示">
          <input
            className={adminInputClass}
            value={content.sampleLinks?.linkLabel ?? ""}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                sampleLinks: { ...c.sampleLinks, linkLabel: e.target.value },
              }))
            }
            placeholder="View memorial →"
          />
        </AdminField>
        {(content.sampleLinks?.items ?? []).map((item, index) => (
          <div key={index} className="rounded-lg border border-border p-4 space-y-3">
            <div className="flex justify-between gap-2">
              <p className="text-sm font-medium">示例 {index + 1}</p>
              <button
                type="button"
                className="p-1 text-muted hover:text-red-600"
                onClick={() =>
                  setContent((c) => ({
                    ...c,
                    sampleLinks: {
                      ...c.sampleLinks,
                      items: c.sampleLinks.items.filter((_, i) => i !== index),
                    },
                  }))
                }
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <AdminField label="标题（宠物名）">
                <input
                  className={adminInputClass}
                  value={item.title}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      sampleLinks: {
                        ...c.sampleLinks,
                        items: c.sampleLinks.items.map((it, i) =>
                          i === index ? { ...it, title: e.target.value } : it
                        ),
                      },
                    }))
                  }
                  placeholder="BELLA"
                />
              </AdminField>
              <AdminField label="纪念页 Slug" hint="来自「客户纪念页」列表">
                <input
                  className={adminInputClass}
                  value={item.slug}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      sampleLinks: {
                        ...c.sampleLinks,
                        items: c.sampleLinks.items.map((it, i) =>
                          i === index ? { ...it, slug: e.target.value.trim() } : it
                        ),
                      },
                    }))
                  }
                  placeholder="companion-1ae0d3"
                />
              </AdminField>
            </div>
            <HomepageImageField
              label="封面图（可选）"
              value={item.image}
              onImageChange={(url) =>
                setContent((c) => ({
                  ...c,
                  sampleLinks: {
                    ...c.sampleLinks,
                    items: c.sampleLinks.items.map((it, i) =>
                      i === index ? { ...it, image: url } : it
                    ),
                  },
                }))
              }
              alt={item.imageAlt}
              altLabel="图片 alt"
              onAltChange={(alt) =>
                setContent((c) => ({
                  ...c,
                  sampleLinks: {
                    ...c.sampleLinks,
                    items: c.sampleLinks.items.map((it, i) =>
                      i === index ? { ...it, imageAlt: alt } : it
                    ),
                  },
                }))
              }
            />
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">下单步骤</h3>
        <AdminField label="标题">
          <input
            className={adminInputClass}
            value={content.orderSteps.title}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                orderSteps: { ...c.orderSteps, title: e.target.value },
              }))
            }
          />
        </AdminField>
        <AdminField label="步骤" hint="每行一步">
          <textarea
            className={adminTextareaClass}
            rows={6}
            value={content.orderSteps.steps.map((s) => s.text).join("\n")}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                orderSteps: {
                  ...c.orderSteps,
                  steps: e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((text, i) => ({ step: i + 1, text })),
                },
              }))
            }
          />
        </AdminField>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">价格方案</h3>
        <AdminField label="标题">
          <input
            className={adminInputClass}
            value={content.pricing.title}
            onChange={(e) =>
              setContent((c) => ({ ...c, pricing: { ...c.pricing, title: e.target.value } }))
            }
          />
        </AdminField>
        <AdminField label="副标题">
          <input
            className={adminInputClass}
            value={content.pricing.subtitle}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                pricing: { ...c.pricing, subtitle: e.target.value },
              }))
            }
          />
        </AdminField>
        {content.pricing.options.map((option, index) => (
          <div key={index} className="rounded-lg border border-border p-4 space-y-3">
            <p className="text-sm font-medium">方案 {index + 1}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <AdminField label="名称">
                <input
                  className={adminInputClass}
                  value={option.name}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      pricing: {
                        ...c.pricing,
                        options: c.pricing.options.map((o, i) =>
                          i === index ? { ...o, name: e.target.value } : o
                        ),
                      },
                    }))
                  }
                />
              </AdminField>
              <AdminField label="价格文案">
                <input
                  className={adminInputClass}
                  value={option.price}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      pricing: {
                        ...c.pricing,
                        options: c.pricing.options.map((o, i) =>
                          i === index ? { ...o, price: e.target.value } : o
                        ),
                      },
                    }))
                  }
                />
              </AdminField>
              <AdminField label="链接">
                <input
                  className={adminInputClass}
                  value={option.href}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      pricing: {
                        ...c.pricing,
                        options: c.pricing.options.map((o, i) =>
                          i === index ? { ...o, href: e.target.value } : o
                        ),
                      },
                    }))
                  }
                />
              </AdminField>
              <AdminField label="主推">
                <select
                  className={adminInputClass}
                  value={option.featured ? "yes" : "no"}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      pricing: {
                        ...c.pricing,
                        options: c.pricing.options.map((o, i) =>
                          i === index ? { ...o, featured: e.target.value === "yes" } : o
                        ),
                      },
                    }))
                  }
                >
                  <option value="no">否</option>
                  <option value="yes">是</option>
                </select>
              </AdminField>
            </div>
            <AdminField label="描述">
              <textarea
                className={adminTextareaClass}
                rows={2}
                value={option.desc}
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    pricing: {
                      ...c.pricing,
                      options: c.pricing.options.map((o, i) =>
                        i === index ? { ...o, desc: e.target.value } : o
                      ),
                    },
                  }))
                }
              />
            </AdminField>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-lg">FAQ</h3>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-text"
            onClick={() =>
              setContent((c) => ({
                ...c,
                faqs: [...c.faqs, { question: "", answer: "" }],
              }))
            }
          >
            <Plus className="w-4 h-4" />
            添加
          </button>
        </div>
        {content.faqs.map((faq, index) => (
          <div key={index} className="rounded-lg border border-border p-4 space-y-3">
            <div className="flex justify-between">
              <p className="text-sm font-medium">问题 {index + 1}</p>
              <button
                type="button"
                className="text-sm text-red-600"
                onClick={() =>
                  setContent((c) => ({
                    ...c,
                    faqs: c.faqs.filter((_, i) => i !== index),
                  }))
                }
              >
                删除
              </button>
            </div>
            <AdminField label="问题">
              <input
                className={adminInputClass}
                value={faq.question}
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    faqs: c.faqs.map((f, i) =>
                      i === index ? { ...f, question: e.target.value } : f
                    ),
                  }))
                }
              />
            </AdminField>
            <AdminField label="回答">
              <textarea
                className={adminTextareaClass}
                rows={3}
                value={faq.answer}
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    faqs: c.faqs.map((f, i) =>
                      i === index ? { ...f, answer: e.target.value } : f
                    ),
                  }))
                }
              />
            </AdminField>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg">底部 CTA</h3>
        <AdminField label="标题">
          <input
            className={adminInputClass}
            value={content.finalCta.title}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                finalCta: { ...c.finalCta, title: e.target.value },
              }))
            }
          />
        </AdminField>
        <AdminField label="说明">
          <textarea
            className={adminTextareaClass}
            value={content.finalCta.subtitle}
            onChange={(e) =>
              setContent((c) => ({
                ...c,
                finalCta: { ...c.finalCta, subtitle: e.target.value },
              }))
            }
          />
        </AdminField>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="主按钮文字">
            <input
              className={adminInputClass}
              value={content.finalCta.primaryCta.label}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  finalCta: {
                    ...c.finalCta,
                    primaryCta: { ...c.finalCta.primaryCta, label: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
          <AdminField label="主按钮链接">
            <input
              className={adminInputClass}
              value={content.finalCta.primaryCta.href}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  finalCta: {
                    ...c.finalCta,
                    primaryCta: { ...c.finalCta.primaryCta, href: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
          <AdminField label="次按钮文字">
            <input
              className={adminInputClass}
              value={content.finalCta.secondaryCta.label}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  finalCta: {
                    ...c.finalCta,
                    secondaryCta: { ...c.finalCta.secondaryCta, label: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
          <AdminField label="次按钮链接">
            <input
              className={adminInputClass}
              value={content.finalCta.secondaryCta.href}
              onChange={(e) =>
                setContent((c) => ({
                  ...c,
                  finalCta: {
                    ...c.finalCta,
                    secondaryCta: { ...c.finalCta.secondaryCta, href: e.target.value },
                  },
                }))
              }
            />
          </AdminField>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-4 sticky bottom-0 bg-bg py-4 border-t border-border">
        <button
          type="submit"
          className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover"
        >
          保存数字纪念页
        </button>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
